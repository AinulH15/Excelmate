'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { evaluateFormula } from '@/lib/formulaEngine';
import InteractiveTutorial from './InteractiveTutorial';
import { tutorialData } from '@/lib/tutorialData';
import { BarChart2, PieChart, LineChart, Plus, Minus, Trash2, Edit } from 'lucide-react';

const ROWS = 20;
const COLS = 7; 

type Align = 'left' | 'center' | 'right';
type CellFormat = { bold?: boolean; italic?: boolean; align?: Align; bg?: string };
type FormatName = 'bold' | 'italic' | 'align-left' | 'align-center' | 'align-right' | 'bg-yellow' | 'bg-blue' | 'bg-green';
type Range = { start: string; end: string };
type NumberFilter = { col: number; value: number };
type ChartType = 'column' | 'line' | 'pie';

const colLetter = (c: number) => String.fromCharCode(65 + c);
const makeId = (r: number, c: number) => `${colLetter(c)}${r + 1}`;
const parseId = (id: string) => ({
  col: id.charCodeAt(0) - 65,
  row: parseInt(id.slice(1), 10) - 1,
});

const rangeBounds = (r: Range) => {
  const a = parseId(r.start);
  const b = parseId(r.end);
  return {
    minRow: Math.min(a.row, b.row),
    maxRow: Math.max(a.row, b.row),
    minCol: Math.min(a.col, b.col),
    maxCol: Math.max(a.col, b.col),
  };
};

const rangeToString = (r: Range) => {
  const b = rangeBounds(r);
  return `${makeId(b.minRow, b.minCol)}:${makeId(b.maxRow, b.maxCol)}`;
};

const isNumeric = (v: string) => v.trim() !== '' && !isNaN(Number(v));

export default function Spreadsheet({
  lessonSlug,
  initialData = {},
}: {
  lessonSlug: string;
  initialData?: Record<string, string>;
}) {
  const [data, setData] = useState<Record<string, string>>(initialData);
  const [formats, setFormats] = useState<Record<string, CellFormat>>({});
  const [activeCell, setActiveCell] = useState<string>('A1');
  const [activeSheet, setActiveSheet] = useState('Sheet1');
  const [activeTab, setActiveTab] = useState('Home');

  // State untuk mode edit
  const [isEditing, setIsEditing] = useState(false);
  const [editSource, setEditSource] = useState<'cell' | 'bar'>('cell');
  const [editValue, setEditValue] = useState('');
  const editingRef = useRef(false);

  // State untuk fitur Blok Area
  const [selectedRange, setSelectedRange] = useState<Range | null>(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef<string | null>(null);
  const wasActiveRef = useRef(false);

  // State untuk Filter
  const [filterOn, setFilterOn] = useState(false);
  const [filter, setFilter] = useState<NumberFilter | null>(null);
  const [filterMenuCol, setFilterMenuCol] = useState<number | null>(null);
  const [filterInput, setFilterInput] = useState('');

  // State untuk Simulasi Chart
  const [showChartSimulation, setShowChartSimulation] = useState(false);
  const [chartType, setChartType] = useState<ChartType>('column');

  // State Khusus Materi Workbook
  const [dynamicSheets, setDynamicSheets] = useState(['Sheet1', 'Sheet2', 'Sheet3']);
  const [editingSheetName, setEditingSheetName] = useState<string | null>(null);

  // Pesan singkat (toast) di atas grid
  const [notice, setNotice] = useState<string | null>(null);
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const gridRef = useRef<HTMLDivElement>(null);

  const currentSteps = tutorialData[lessonSlug] || tutorialData['dasar'];
  const isWorkbookMateri = lessonSlug === 'mengatur-workbook-worksheet';

  const focusGrid = () => {
    setTimeout(() => gridRef.current?.focus({ preventScroll: true }), 0);
  };

  const showNotice = (msg: string) => {
    setNotice(msg);
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(null), 3500);
  };

  useEffect(() => {
    const stop = () => { isDraggingRef.current = false; };
    window.addEventListener('mouseup', stop);
    return () => window.removeEventListener('mouseup', stop);
  }, []);

  useEffect(() => {
    return () => { if (noticeTimer.current) clearTimeout(noticeTimer.current); };
  }, []);

  const startEdit = (initial: string, source: 'cell' | 'bar') => {
    editingRef.current = true;
    setIsEditing(true);
    setEditSource(source);
    setEditValue(initial);
  };

  const commitEdit = (value: string = editValue) => {
    if (!editingRef.current) return;
    editingRef.current = false;
    setIsEditing(false);
    setData(prev => {
      const next = { ...prev };
      if (value === '') delete next[activeCell];
      else next[activeCell] = value;
      return next;
    });
  };

  const cancelEdit = () => {
    editingRef.current = false;
    setIsEditing(false);
    setEditValue('');
  };

  const moveActive = (dRow: number, dCol: number) => {
    const { row, col } = parseId(activeCell);
    const newRow = Math.min(ROWS - 1, Math.max(0, row + dRow));
    const newCol = Math.min(COLS - 1, Math.max(0, col + dCol));
    setActiveCell(makeId(newRow, newCol));
  };

  const handleCellMouseDown = (e: React.MouseEvent, cellId: string) => {
    if (e.button !== 0) return;
    if (editingRef.current && cellId === activeCell && editSource === 'cell') return;
    if (editingRef.current) commitEdit();
    wasActiveRef.current = cellId === activeCell;
    isDraggingRef.current = true;
    dragStartRef.current = cellId;
    setActiveCell(cellId);
    setSelectedRange(null);
    setFilterMenuCol(null);
  };

  const handleCellMouseEnter = (cellId: string) => {
    if (!isDraggingRef.current || !dragStartRef.current) return;
    if (cellId === dragStartRef.current) setSelectedRange(null);
    else setSelectedRange({ start: dragStartRef.current, end: cellId });
  };

  const handleCellClick = (cellId: string) => {
    const isTouch = typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches;
    if (isTouch && wasActiveRef.current && !editingRef.current) {
      startEdit(data[cellId] || '', 'cell');
    }
    wasActiveRef.current = false;
  };

  const handleCellDoubleClick = (cellId: string) => {
    setActiveCell(cellId);
    startEdit(data[cellId] || '', 'cell');
  };

  const handleHighlightRange = (rangeStr: string) => {
    if (editingRef.current) commitEdit();
    const [start, end] = rangeStr.split(':');
    setSelectedRange({ start, end });
    setActiveCell(start);
    setFilterMenuCol(null);
    focusGrid();
  };

  const isCellInRange = (cellId: string, range: Range | null) => {
    if (!range) return false;
    const b = rangeBounds(range);
    const current = parseId(cellId);
    return current.row >= b.minRow && current.row <= b.maxRow && current.col >= b.minCol && current.col <= b.maxCol;
  };

  const sortSelection = (dir: 'asc' | 'desc') => {
    if (!selectedRange) {
      showNotice('Blok dulu areanya (contoh: B2:B4), baru klik Sort.');
      return;
    }
    const b = rangeBounds(selectedRange);
    const keyCol = b.minCol;
    let startRow = b.minRow;
    const endRow = b.maxRow;

    let lastCol = 0;
    Object.keys(data).forEach(id => { lastCol = Math.max(lastCol, parseId(id).col); });

    const first = data[makeId(startRow, keyCol)] ?? '';
    const second = data[makeId(startRow + 1, keyCol)] ?? '';
    if (startRow < endRow && !isNumeric(first) && isNumeric(second)) startRow += 1;
    if (startRow >= endRow) { showNotice('Blok minimal 2 baris data agar bisa diurutkan.'); return; }

    const rows: string[][] = [];
    for (let r = startRow; r <= endRow; r++) {
      rows.push(Array.from({ length: lastCol + 1 }, (_, c) => data[makeId(r, c)] ?? ''));
    }

    rows.sort((a, z) => {
      const x = a[keyCol]; const y = z[keyCol];
      if (x === '' && y === '') return 0;
      if (x === '') return 1;
      if (y === '') return -1;
      const cmp = isNumeric(x) && isNumeric(y) ? Number(x) - Number(y) : x.localeCompare(y, 'id', { sensitivity: 'base' });
      return dir === 'asc' ? cmp : -cmp;
    });

    setData(prev => {
      const next = { ...prev };
      rows.forEach((row, i) => {
        row.forEach((v, c) => {
          const id = makeId(startRow + i, c);
          if (v === '') delete next[id]; else next[id] = v;
        });
      });
      return next;
    });
    showNotice(dir === 'asc' ? 'Data diurutkan dari terkecil ke terbesar.' : 'Data diurutkan dari terbesar ke terkecil.');
  };

  const toggleFilter = () => {
    if (filterOn) {
      setFilterOn(false); setFilter(null); setFilterMenuCol(null);
      showNotice('Filter dimatikan. Semua baris tampil lagi.'); return;
    }
    const hasHeader = Object.keys(data).some(id => parseId(id).row === 0);
    if (!hasHeader) { showNotice('Isi judul kolom di baris 1 dulu, baru aktifkan Filter.'); return; }
    setFilterOn(true); showNotice('Filter aktif! Klik panah ▼ di judul kolom.');
  };

  const openFilterMenu = (col: number) => {
    setFilterMenuCol(col);
    setFilterInput(filter && filter.col === col ? String(filter.value) : '');
  };

  const applyFilter = () => {
    if (filterMenuCol === null) return;
    const n = Number(filterInput);
    if (filterInput.trim() === '' || isNaN(n)) { showNotice('Ketik angka dulu, misalnya 80.'); return; }
    setFilter({ col: filterMenuCol, value: n }); setFilterMenuCol(null);
  };

  const clearFilter = () => {
    setFilter(null); setFilterMenuCol(null); setFilterInput('');
    showNotice('Filter dihapus. Semua baris tampil lagi.');
  };

  const tableLastRow = useMemo(() => {
    let last = 0;
    for (let r = 0; r < ROWS; r++) {
      const hasData = Array.from({ length: COLS }).some((_, c) => (data[makeId(r, c)] ?? '') !== '');
      if (!hasData) break;
      last = r;
    }
    return last;
  }, [data]);

  const handleGridKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (editingRef.current) return;
    if (['Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) return;
    setSelectedRange(null);

    switch (e.key) {
      case 'ArrowUp': e.preventDefault(); moveActive(-1, 0); return;
      case 'ArrowDown': e.preventDefault(); moveActive(1, 0); return;
      case 'ArrowLeft': e.preventDefault(); moveActive(0, -1); return;
      case 'ArrowRight': e.preventDefault(); moveActive(0, 1); return;
      case 'Tab': e.preventDefault(); moveActive(0, e.shiftKey ? -1 : 1); return;
      case 'Enter': e.preventDefault(); moveActive(e.shiftKey ? -1 : 1, 0); return;
      case 'F2': e.preventDefault(); startEdit(data[activeCell] || '', 'cell'); return;
      case 'Delete':
      case 'Backspace':
        e.preventDefault();
        setData(prev => { const next = { ...prev }; delete next[activeCell]; return next; });
        return;
    }

    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault(); startEdit(e.key, 'cell');
    }
  };

  const handleCellInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const value = e.currentTarget.value;
    if (e.key === 'Enter') { e.preventDefault(); commitEdit(value); moveActive(e.shiftKey ? -1 : 1, 0); focusGrid(); }
    else if (e.key === 'Tab') { e.preventDefault(); commitEdit(value); moveActive(0, e.shiftKey ? -1 : 1); focusGrid(); }
    else if (e.key === 'Escape') { e.preventDefault(); cancelEdit(); focusGrid(); }
  };

  const handleBarKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { e.preventDefault(); commitEdit(e.currentTarget.value); moveActive(1, 0); focusGrid(); }
    else if (e.key === 'Escape') { e.preventDefault(); cancelEdit(); focusGrid(); }
  };

  const getDisplayValue = (cellId: string) => {
    const rawValue = data[cellId] || '';
    if (rawValue.startsWith('=')) return evaluateFormula(rawValue, data);
    return rawValue;
  };

  const isRowHidden = (rowIndex: number) => {
    if (!filterOn || !filter) return false;
    if (rowIndex < 1 || rowIndex > tableLastRow) return false;
    const v = Number(getDisplayValue(makeId(rowIndex, filter.col)));
    return !(v > filter.value);
  };

  const getCellStyle = (cellId: string) => {
    const f = formats[cellId] || {};
    const classes: string[] = [];
    const isBlocked = isCellInRange(cellId, selectedRange);

    if (f.bold) classes.push('font-bold');
    if (f.italic) classes.push('italic');

    const align = f.align ?? 'center';
    if (align === 'center') classes.push('text-center');
    if (align === 'right') classes.push('text-right');
    if (align === 'left') classes.push('text-left');

    if (cellId === activeCell) {
      classes.push(isEditing ? 'bg-white ring-2 ring-inset ring-green-600 z-10' : 'bg-blue-100 ring-2 ring-inset ring-blue-500 z-10');
    } else if (isBlocked) {
      classes.push('bg-blue-100 ring-1 ring-inset ring-blue-400 z-0');
    } else {
      classes.push(f.bg || 'bg-white');
    }

    return classes.join(' ');
  };

  const activeFormat: CellFormat = formats[activeCell] || {};

  const applyFormat = (format: FormatName) => {
    setFormats(prev => {
      const current = prev[activeCell] || {};
      const next: CellFormat = { ...current };

      if (format === 'bold') next.bold = !current.bold;
      if (format === 'italic') next.italic = !current.italic;
      if (format === 'align-left') next.align = 'left';
      if (format === 'align-center') next.align = 'center';
      if (format === 'align-right') next.align = 'right';
      if (format === 'bg-yellow') next.bg = current.bg === 'bg-yellow-200' ? undefined : 'bg-yellow-200';
      if (format === 'bg-blue') next.bg = current.bg === 'bg-blue-200' ? undefined : 'bg-blue-200';
      if (format === 'bg-green') next.bg = current.bg === 'bg-green-200' ? undefined : 'bg-green-200';

      return { ...prev, [activeCell]: next };
    });
    focusGrid();
  };

  const handleReset = () => {
    editingRef.current = false;
    setIsEditing(false);
    setEditValue('');
    setData(initialData);
    setFormats({});
    setActiveCell('A1');
    setSelectedRange(null);
    setFilterOn(false);
    setFilter(null);
    setFilterMenuCol(null);
    setFilterInput('');
    setShowChartSimulation(false);
    setNotice(null);
    focusGrid();
  };

  const handleInsertChart = (type: ChartType) => {
    setChartType(type); setShowChartSimulation(true);
    showNotice(`Simulasi: Membuat ${type.charAt(0).toUpperCase() + type.slice(1)} Chart.`);
  };

  // --- FITUR TAMBAHAN UNTUK MATERI WORKBOOK ---
  const addSheet = () => {
    const newSheetName = `Sheet${dynamicSheets.length + 1}`;
    setDynamicSheets([...dynamicSheets, newSheetName]);
    setActiveSheet(newSheetName);
    showNotice(`Berhasil menambahkan ${newSheetName}`);
  };

  const renameSheet = () => {
    if (!editingSheetName) return;
    setDynamicSheets(prev => prev.map(s => s === activeSheet ? editingSheetName : s));
    setActiveSheet(editingSheetName);
    setEditingSheetName(null);
    showNotice(`Berhasil mengganti nama menjadi ${editingSheetName}`);
  };

  const deleteSheet = (sheetToDelete: string) => {
    if (dynamicSheets.length <= 1) {
      showNotice("Minimal harus ada 1 sheet.");
      return;
    }
    const newSheets = dynamicSheets.filter(s => s !== sheetToDelete);
    setDynamicSheets(newSheets);
    if (activeSheet === sheetToDelete) setActiveSheet(newSheets[0]);
    showNotice(`Berhasil menghapus ${sheetToDelete}`);
  };

  const addRow = () => {
    const { row } = parseId(activeCell);
    const nextData = { ...data };
    for (let r = ROWS - 1; r > row; r--) {
      for (let c = 0; c < COLS; c++) {
        const currId = makeId(r, c);
        const prevId = makeId(r - 1, c);
        if (nextData[prevId] !== undefined) nextData[currId] = nextData[prevId];
        else delete nextData[currId];
      }
    }
    for (let c = 0; c < COLS; c++) delete nextData[makeId(row, c)];
    setData(nextData);
    showNotice("Baris baru ditambahkan.");
  };

  const deleteRow = () => {
    const { row } = parseId(activeCell);
    const nextData = { ...data };
    for (let r = row; r < ROWS - 1; r++) {
      for (let c = 0; c < COLS; c++) {
        const currId = makeId(r, c);
        const nextId = makeId(r + 1, c);
        if (nextData[nextId] !== undefined) nextData[currId] = nextData[nextId];
        else delete nextData[currId];
      }
    }
    setData(nextData);
    showNotice("Baris dihapus.");
  };

  const progress = useMemo(() => {
    const p: string[] = [];
    if (selectedRange) p.push(`range:${rangeToString(selectedRange)}`);
    if (filterOn) p.push('filter-on');
    if (filterOn && filter) p.push(`filter-gt:${filter.value}`);
    return p;
  }, [selectedRange, filterOn, filter]);

  const { row: activeRow, col: activeCol } = parseId(activeCell);
  const formulaBarValue = isEditing ? editValue : data[activeCell] || '';

  const tabs = ['Home', 'Insert', 'Page Layout', 'Formulas', 'Data', 'Review', 'View'];

  const dataBtn = 'flex flex-col items-center px-2 text-center whitespace-nowrap active:translate-y-0.5';
  const dataIcon = 'border border-gray-300 p-1 rounded shadow-sm text-lg';

  return (
    <div className="border-2 border-ink rounded-xl overflow-hidden bg-white shadow-neo select-none font-sans text-sm flex flex-col md:h-[600px]">
      {/* TITLE BAR */}
      <div className="bg-green-700 text-white px-3 py-1 text-xs flex justify-between items-center font-bold">
        <span>Book1 - Excel (Produk Aktivasi Gagal)</span>
        <div className="flex gap-2"><span>—</span><span>□</span><span>X</span></div>
      </div>

      {/* TABS MENU */}
      <div className="bg-gray-100 border-b-2 border-gray-300 flex text-xs font-bold pt-2 px-2 gap-1 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-2 rounded-t transition-colors whitespace-nowrap ${
              activeTab === tab ? 'bg-white border-t-2 border-l-2 border-r-2 border-green-600 text-green-700' : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* RIBBON TOOLBAR */}
      <div className="bg-gray-50 border-b-2 border-gray-300 px-2 py-2 flex flex-wrap gap-4 items-start text-xs text-gray-700 h-20 overflow-y-auto">
        {activeTab === 'Home' && (
          <>
            <div className="flex flex-col items-center border-r border-gray-300 pr-4">
              <div className="flex gap-1 mb-1">
                <div className="bg-white border border-gray-300 p-1 rounded shadow-sm hover:bg-gray-100 cursor-pointer text-lg">📋</div>
              </div>
              <span>Clipboard</span>
            </div>
            <div className="flex flex-col items-center border-r border-gray-300 pr-4">
              <div className="flex gap-1 mb-1">
                <div className="bg-white border border-gray-300 px-2 py-1 rounded shadow-sm">Calibri</div>
                <div className="bg-white border border-gray-300 px-2 py-1 rounded shadow-sm">11</div>
                <button onMouseDown={e => e.preventDefault()} onClick={() => applyFormat('bold')} className={`border border-gray-300 px-2 py-1 rounded font-bold shadow-sm ${activeFormat.bold ? 'bg-gray-300' : 'bg-white'}`}>B</button>
                <button onMouseDown={e => e.preventDefault()} onClick={() => applyFormat('italic')} className={`border border-gray-300 px-2 py-1 rounded italic shadow-sm ${activeFormat.italic ? 'bg-gray-300' : 'bg-white'}`}>I</button>
              </div>
              <span>Font</span>
            </div>
          </>
        )}

        {activeTab === 'Insert' && (
          <div className="flex items-start divide-x divide-gray-300">
            <button onMouseDown={e => e.preventDefault()} onClick={() => handleInsertChart('column')} className={dataBtn}>
              <div className={`bg-white ${dataIcon} hover:bg-gray-100 text-blue-600`}><BarChart2 size={18} /></div>
              <span>Column Chart</span>
            </button>
            <button onMouseDown={e => e.preventDefault()} onClick={() => handleInsertChart('line')} className={dataBtn}>
              <div className={`bg-white ${dataIcon} hover:bg-gray-100 text-orange-500`}><LineChart size={18} /></div>
              <span>Line</span>
            </button>
            <button onMouseDown={e => e.preventDefault()} onClick={() => handleInsertChart('pie')} className={dataBtn}>
              <div className={`bg-white ${dataIcon} hover:bg-gray-100 text-green-600`}><PieChart size={18} /></div>
              <span>Pie</span>
            </button>
          </div>
        )}

        {activeTab === 'Data' && (
          <div className="flex items-start divide-x divide-gray-300">
            <button onMouseDown={e => e.preventDefault()} onClick={() => sortSelection('asc')} className={dataBtn}>
              <div className={`bg-white ${dataIcon}`}>🔽</div>
              <span>Smallest to Largest</span>
            </button>
            <button onMouseDown={e => e.preventDefault()} onClick={() => sortSelection('desc')} className={dataBtn}>
              <div className={`bg-white ${dataIcon}`}>⏫</div>
              <span>Largest to Smallest</span>
            </button>
            <button onMouseDown={e => e.preventDefault()} onClick={toggleFilter} className={dataBtn}>
              <div className={`${filterOn ? 'bg-green-200 border-green-600' : 'bg-white'} ${dataIcon}`}>🔍</div>
              <span>Filter</span>
            </button>
          </div>
        )}
        
        {/* TOOLBAR TAMBAHAN KHUSUS MATERI WORKBOOK */}
        {isWorkbookMateri && activeTab === 'Home' && (
          <div className="flex items-start divide-x divide-gray-300 ml-4 pl-4 border-l-2 border-gray-300">
             <button onMouseDown={e => e.preventDefault()} onClick={addRow} className={dataBtn}>
              <div className={`bg-white ${dataIcon} hover:bg-gray-100 text-blue-600`}><Plus size={18}/></div>
              <span>Insert Row</span>
            </button>
            <button onMouseDown={e => e.preventDefault()} onClick={deleteRow} className={dataBtn}>
              <div className={`bg-white ${dataIcon} hover:bg-gray-100 text-red-600`}><Minus size={18}/></div>
              <span>Delete Row</span>
            </button>
          </div>
        )}

        {['Page Layout', 'Review', 'View', 'Formulas'].includes(activeTab) && (
          <div className="flex items-center justify-center w-full h-full text-gray-400 font-bold">
            Fitur Tab {activeTab} belum tersedia di simulasi ini.
          </div>
        )}
      </div>

      {/* FORMULA BAR */}
      <div className="flex border-b-2 border-gray-300 text-xs bg-white">
        <div className="w-16 border-r-2 border-gray-300 flex items-center justify-center font-bold">
          {selectedRange ? rangeToString(selectedRange) : activeCell}
        </div>
        <div className="w-8 border-r-2 border-gray-300 flex items-center justify-center font-bold text-gray-500 bg-gray-50">fx</div>
        <input
          type="text"
          value={formulaBarValue}
          onFocus={() => { if (!editingRef.current) startEdit(data[activeCell] || '', 'bar'); }}
          onChange={e => { if (!editingRef.current) startEdit(e.target.value, 'bar'); else setEditValue(e.target.value); }}
          onKeyDown={handleBarKeyDown}
          onBlur={() => { if (editingRef.current && editSource === 'bar') commitEdit(); }}
          className="flex-1 px-2 py-2 outline-none font-mono select-text text-base md:text-xs"
          placeholder="Ketik rumus atau teks..."
        />
      </div>

      {/* LAYOUT UTAMA */}
      <div className="flex-1 flex flex-col md:flex-row md:overflow-hidden">
        <div className="w-full md:w-1/3 border-b-2 md:border-b-0 md:border-r-2 border-gray-300 md:overflow-y-auto p-2 bg-gray-50">
          <InteractiveTutorial
            steps={currentSteps}
            data={data}
            progress={progress}
            onReset={handleReset}
            onHighlightRange={handleHighlightRange}
          />
        </div>

        <div className="relative w-full md:w-2/3 h-[340px] md:h-auto">
          <div
            ref={gridRef}
            tabIndex={0}
            onKeyDown={handleGridKeyDown}
            className="absolute inset-0 overflow-auto bg-white outline-none"
          >
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-gray-100 z-20">
                <tr>
                  <th className="w-8 border border-gray-300 p-1 bg-gray-200"></th>
                  {Array.from({ length: COLS }).map((_, i) => (
                    <th key={i} className={`border border-gray-300 p-1 font-bold text-xs ${i === activeCol ? 'bg-gray-300 text-green-800' : 'bg-gray-200 text-gray-600'}`}>
                      {colLetter(i)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: ROWS }).map((_, rowIndex) => (
                  <tr key={rowIndex} className={isRowHidden(rowIndex) ? 'hidden' : ''}>
                    <td className={`border border-gray-300 p-1 text-center font-bold text-xs sticky left-0 z-10 ${rowIndex === activeRow ? 'bg-gray-300 text-green-800' : 'bg-gray-200 text-gray-600'}`}>
                      {rowIndex + 1}
                    </td>
                    {Array.from({ length: COLS }).map((_, colIndex) => {
                      const cellId = makeId(rowIndex, colIndex);
                      const isActive = cellId === activeCell;
                      const editingInThisCell = isActive && isEditing && editSource === 'cell';
                      const showBarEditText = isActive && isEditing && editSource === 'bar';
                      const showFilterArrow = filterOn && rowIndex === 0 && (data[cellId] ?? '') !== '' && !editingInThisCell;
                      const colFiltered = filter?.col === colIndex;

                      return (
                        <td
                          key={cellId}
                          onMouseDown={e => handleCellMouseDown(e, cellId)}
                          onMouseEnter={() => handleCellMouseEnter(cellId)}
                          onClick={() => handleCellClick(cellId)}
                          onDoubleClick={() => handleCellDoubleClick(cellId)}
                          className={`relative border border-gray-300 p-1 text-xs h-7 min-w-[80px] cursor-cell transition-colors duration-200 ${getCellStyle(cellId)}`}
                        >
                          {editingInThisCell ? (
                            <input
                              autoFocus
                              type="text"
                              value={editValue}
                              onChange={e => setEditValue(e.target.value)}
                              onKeyDown={handleCellInputKeyDown}
                              onFocus={e => { const len = e.target.value.length; e.target.setSelectionRange(len, len); }}
                              onBlur={e => commitEdit(e.target.value)}
                              className="w-full h-full bg-transparent outline-none font-mono text-base md:text-xs p-0 m-0 select-text text-left"
                            />
                          ) : showBarEditText ? (
                            editValue
                          ) : (
                            getDisplayValue(cellId)
                          )}

                          {showFilterArrow && (
                            <button
                              type="button"
                              title="Filter"
                              onMouseDown={e => e.stopPropagation()}
                              onClick={e => { e.stopPropagation(); openFilterMenu(colIndex); }}
                              className={`absolute right-0.5 top-1/2 -translate-y-1/2 w-6 h-5 text-[10px] leading-none border rounded ${colFiltered ? 'bg-green-300 border-green-700 text-green-900' : 'bg-gray-100 border-gray-400 text-gray-700'}`}
                            >
                              ▼
                            </button>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PANEL FILTER */}
          {filterMenuCol !== null && (
            <div className="absolute z-30 top-10 left-10 right-3 max-w-[270px] bg-white border-2 border-ink rounded-xl shadow-neo-sm p-3 text-xs select-text">
              <p className="font-black mb-1">Filter kolom {data[makeId(0, filterMenuCol)] || colLetter(filterMenuCol)}</p>
              <p className="font-bold text-gray-600 mb-2">Number Filters › Greater Than...</p>
              <div className="flex gap-2 items-center">
                <input
                  autoFocus
                  type="number"
                  inputMode="numeric"
                  value={filterInput}
                  onChange={e => setFilterInput(e.target.value)}
                  onKeyDown={e => { e.stopPropagation(); if (e.key === 'Enter') applyFilter(); if (e.key === 'Escape') setFilterMenuCol(null); }}
                  placeholder="contoh: 80"
                  className="flex-1 min-w-0 border-2 border-ink rounded-lg px-2 py-1.5 text-base md:text-xs font-mono outline-none"
                />
                <button type="button" onClick={applyFilter} className="bg-mint border-2 border-ink rounded-lg px-3 py-1.5 font-black shadow-neo-sm active:translate-y-0.5">OK</button>
              </div>
              <div className="flex justify-between mt-3">
                <button type="button" onClick={clearFilter} className="font-bold text-red-600 hover:underline">Clear Filter</button>
                <button type="button" onClick={() => setFilterMenuCol(null)} className="font-bold text-gray-500 hover:underline">Tutup</button>
              </div>
            </div>
          )}

          {/* SIMULASI GRAFIK DINAMIS */}
          {showChartSimulation && (
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 bg-white border-2 border-ink rounded-xl shadow-2xl p-4 flex flex-col items-center z-40 animate-in zoom-in-95 w-[280px]">
              <div className="flex justify-between w-full mb-2">
                <h3 className="font-bold text-sm">Simulasi Grafik</h3>
                <button onClick={() => setShowChartSimulation(false)} className="text-gray-500 hover:text-red-500 font-bold px-1">X</button>
              </div>
              <div className="flex items-end justify-center gap-2 h-32 w-full mt-2">
                {chartType === 'column' && (
                  <>
                    <div className="flex flex-col items-center w-10">
                      <div className="bg-blue-500 w-full rounded-t-sm" style={{ height: '33%' }}></div>
                      <span className="text-[9px] mt-1 -rotate-45">Apel</span>
                    </div>
                    <div className="flex flex-col items-center w-10">
                      <div className="bg-orange-500 w-full rounded-t-sm" style={{ height: '66%' }}></div>
                      <span className="text-[9px] mt-1 -rotate-45">Jeruk</span>
                    </div>
                    <div className="flex flex-col items-center w-10">
                      <div className="bg-green-500 w-full rounded-t-sm" style={{ height: '50%' }}></div>
                      <span className="text-[9px] mt-1 -rotate-45">Mangga</span>
                    </div>
                  </>
                )}
                {chartType === 'line' && (
                  <div className="relative w-full h-full border-l border-b border-gray-400 flex items-end">
                     <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
                        <polyline fill="none" stroke="#f97316" strokeWidth="3" points="20,80 100,20 180,60" />
                        <circle cx="20" cy="80" r="4" fill="#f97316" /><circle cx="100" cy="20" r="4" fill="#f97316" /><circle cx="180" cy="60" r="4" fill="#f97316" />
                     </svg>
                     <div className="absolute bottom-[-20px] left-[10%] text-[9px]">Apel</div>
                     <div className="absolute bottom-[-20px] left-[45%] text-[9px]">Jeruk</div>
                     <div className="absolute bottom-[-20px] left-[85%] text-[9px]">Mangga</div>
                  </div>
                )}
                {chartType === 'pie' && (
                  <div className="flex gap-4 items-center">
                    <div className="w-24 h-24 rounded-full border-2 border-white" style={{ background: 'conic-gradient(#3b82f6 0% 33%, #f97316 33% 66%, #22c55e 66% 100%)' }}></div>
                    <div className="flex flex-col gap-1 text-[10px] font-bold">
                      <div className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-500 rounded-sm"></div> Apel</div>
                      <div className="flex items-center gap-1"><div className="w-3 h-3 bg-orange-500 rounded-sm"></div> Jeruk</div>
                      <div className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500 rounded-sm"></div> Mangga</div>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-[10px] font-bold text-gray-500 mt-6 capitalize">{chartType} Chart</p>
            </div>
          )}

          {/* TOAST */}
          {notice && (
            <div className="absolute z-30 bottom-2 left-2 right-2 bg-yellow border-2 border-ink rounded-lg px-3 py-2 text-xs font-bold shadow-neo-sm pointer-events-none">
              {notice}
            </div>
          )}
        </div>
      </div>

      {/* SHEET TABS */}
      <div className="bg-gray-100 border-t-2 border-gray-300 px-2 pt-1 flex items-center text-xs font-bold gap-1 overflow-x-auto">
        {dynamicSheets.map(sheet => (
          <div key={sheet} className="relative group flex items-center">
            {editingSheetName !== null && activeSheet === sheet ? (
              <input 
                autoFocus
                type="text"
                value={editingSheetName}
                onChange={(e) => setEditingSheetName(e.target.value)}
                onBlur={renameSheet}
                onKeyDown={(e) => { if(e.key === 'Enter') renameSheet(); }}
                className="px-2 py-1 w-24 border-2 border-green-500 outline-none"
              />
            ) : (
              <button
                onClick={() => setActiveSheet(sheet)}
                onDoubleClick={() => isWorkbookMateri && setEditingSheetName(sheet)}
                className={`px-4 py-1 rounded-t border-t-2 border-l-2 border-r-2 whitespace-nowrap ${activeSheet === sheet ? 'bg-white border-gray-400 text-green-700' : 'bg-gray-200 border-transparent text-gray-500'}`}
              >
                {sheet}
              </button>
            )}
            {isWorkbookMateri && dynamicSheets.length > 1 && activeSheet === sheet && (
              <button onClick={() => deleteSheet(sheet)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity z-10" title="Hapus Sheet">
                <Trash2 size={12} />
              </button>
            )}
          </div>
        ))}
        
        {isWorkbookMateri && (
          <button onClick={addSheet} className="px-2 py-1 text-gray-600 hover:text-green-700 border border-transparent hover:border-gray-300 rounded" title="Tambah Sheet">
            <Plus size={16} />
          </button>
        )}
      </div>

      {/* STATUS BAR */}
      <div className="bg-green-700 text-white text-[10px] px-3 py-0.5 flex justify-between">
        <span>{isEditing ? 'Edit' : filterOn ? 'Filter Mode' : 'Ready'}</span>
        <span>100%</span>
      </div>
    </div>
  );
}// Data mentah + langkah praktik untuk materi "Mengatur Workbook, Worksheet, Baris, dan Kolom"
// slug: 'mengatur-workbook-worksheet'
//
// Pemakaian:
//   <Spreadsheet lessonSlug="mengatur-workbook-worksheet" initialData={workbookInitialData} />
//   lalu di lib/tutorialData.ts:  'mengatur-workbook-worksheet': workbookSteps

// Sengaja dibuat "berantakan": nama barang & keterangan panjang, jadi
// kolom B dan F terpotong dan baris perlu AutoFit.
export const workbookInitialData: Record<string, string> = {
  // Header
  A1: 'No', B1: 'Nama Barang', C1: 'Kategori', D1: 'Harga Satuan', E1: 'Stok', F1: 'Keterangan',

  A2: '1', B2: 'Beras Premium Pandan Wangi Kemasan 5 Kg', C2: 'Sembako', D2: '78000', E2: '24',
  F2: 'Stok baru datang minggu lalu, simpan di rak paling bawah dekat pintu gudang',

  A3: '2', B3: 'Minyak Goreng Kemasan Pouch 2 Liter', C3: 'Sembako', D3: '38500', E3: '40',
  F3: 'Harga naik sejak awal bulan, cek harga distributor sebelum pesan ulang',

  A4: '3', B4: 'Gula Pasir Kristal Putih 1 Kg', C4: 'Sembako', D4: '17500', E4: '30',
  F4: 'Aman',

  A5: '4', B5: 'Telur Ayam Negeri Grade A (per Tray)', C5: 'Sembako', D5: '52000', E5: '12',
  F5: 'Cepat habis di akhir pekan, usahakan stok minimal 15 tray',

  A6: '5', B6: 'Kopi Bubuk Robusta Kapal Api 165 Gram', C6: 'Minuman', D6: '14000', E6: '48',
  F6: 'Aman',

  A7: '6', B7: 'Teh Celup Sariwangi Isi 25 Kantong', C7: 'Minuman', D7: '6500', E7: '60',
  F7: 'Masa kedaluwarsa masih panjang, boleh dipajang di etalase depan',

  A8: '8', B8: 'Air Mineral Botol 600 ml (Dus isi 24)', C8: 'Minuman', D8: '45000', E8: '18',
  F8: 'Dus bagian bawah agak penyok, tawarkan diskon kecil kepada pembeli',

  A9: '9', B9: 'Mi Instan Goreng Spesial Rasa Ayam Bawang', C9: 'Makanan', D9: '3200', E9: '120',
  F9: 'Terlaris bulan ini',

  A10: '10', B10: 'Biskuit Kelapa Kaleng Besar (Kemasan Hari Raya)', C10: 'Makanan', D10: '68000', E10: '6',
  F10: 'Stok menipis, segera hubungi sales untuk pemesanan ulang sebelum musim ramai tiba',

  A11: '11', B11: 'Sabun Mandi Cair Refill 450 ml', C11: 'Kebersihan', D11: '21500', E11: '35',
  F11: 'Aman',

  A12: '12', B12: 'Deterjen Bubuk Anti Noda 1,8 Kg', C12: 'Kebersihan', D12: '36000', E12: '22',
  F12: 'Promo beli 2 gratis 1 plastik belanja, tempel label promo di rak',
};

// Catatan: A8 sengaja diberi nomor 8 (bukan 7) untuk latihan Insert Row + perbaiki nomor urut.

// ----------------------------------------------------------------------
// Langkah praktik.
// PENTING: sesuaikan nama field (id/title/instruction/hint/isDone) dengan
// tipe langkah yang dipakai materi lain di tutorialData.ts.
// `progress` berisi token dari Spreadsheet.tsx, mis:
//   range:B1:B20 | autofit-col:B | col-resized:F | autofit-row:2 | row-resized:3
//   row-inserted | row-deleted | col-inserted | col-deleted
//   sheet-added | sheet-renamed | sheet-deleted | sheet-count:N | sheet-active:Nama
//   new-workbook
// ----------------------------------------------------------------------
type Ctx = { data: Record<string, string>; progress: string[] };

export const workbookSteps = [
  {
    id: 'lihat-data',
    title: '1. Kenali Data Mentah',
    instruction:
      'Perhatikan tabel stok barang di sheet. Kolom B (Nama Barang) dan kolom F (Keterangan) isinya terpotong. Ini yang akan kita rapikan. Klik header kolom B untuk memilih seluruh kolom.',
    hint: 'Header kolom adalah huruf A, B, C... di bagian atas tabel.',
    isDone: ({ progress }: Ctx) => progress.includes('range:B1:B20'),
  },
  {
    id: 'autofit-lebar-b',
    title: '2. AutoFit Lebar Kolom (Autowidth)',
    instruction:
      'Dengan kolom B terpilih, klik tombol "AutoFit Width" di tab Home. Cara cepat lain: klik 2x garis pembatas di antara header B dan C. Lebar kolom otomatis menyesuaikan teks terpanjang.',
    hint: 'Garis pembatas ada di sisi kanan huruf B pada header.',
    isDone: ({ progress }: Ctx) => progress.includes('autofit-col:B'),
  },
  {
    id: 'autofit-lebar-c',
    title: '3. AutoFit Kolom Lain',
    instruction:
      'Ulangi untuk kolom C (Kategori) dan D (Harga Satuan): klik header kolomnya, lalu klik 2x pembatas kanan header atau tombol AutoFit Width.',
    isDone: ({ progress }: Ctx) => progress.includes('autofit-col:C') && progress.includes('autofit-col:D'),
  },
  {
    id: 'ubah-lebar-manual',
    title: '4. Ubah Lebar Kolom Manual',
    instruction:
      'Kolom F (Keterangan) terlalu panjang jika di-AutoFit. Geser pembatas kanan header F ke kiri/kanan sampai lebarnya sekitar 200 px, supaya teks akan turun ke baris berikutnya.',
    hint: 'Tahan dan geser garis pembatas kanan header F.',
    isDone: ({ progress }: Ctx) => progress.includes('col-resized:F'),
  },
  {
    id: 'autofit-tinggi',
    title: '5. AutoFit Tinggi Baris (Autoheight)',
    instruction:
      'Sekarang teks di kolom F tertumpuk dan terpotong karena tinggi barisnya kurang. Blok area A2:F12 (geser dari A2 sampai F12), lalu klik "AutoFit Height" di tab Home. Tinggi tiap baris menyesuaikan isi sel.',
    hint: 'Alternatif: klik 2x pembatas bawah nomor baris.',
    isDone: ({ progress }: Ctx) => progress.includes('autofit-row:2') && progress.includes('autofit-row:12'),
  },
  {
    id: 'ubah-tinggi-manual',
    title: '6. Ubah Tinggi Baris Manual',
    instruction:
      'Baris 1 adalah judul tabel. Geser pembatas bawah nomor baris 1 ke bawah agar lebih tinggi dari baris lain.',
    isDone: ({ progress }: Ctx) => progress.includes('row-resized:1'),
  },
  {
    id: 'insert-baris',
    title: '7. Sisipkan Baris',
    instruction:
      'Nomor urut di kolom A melompat dari 6 ke 8, ada barang yang terlewat. Klik sel A8, lalu klik "Insert Row" di tab Home. Isi baris baru dengan: No 7, Nama Barang: Susu Kental Manis Kaleng 370 g, Kategori Minuman, Harga 12500, Stok 36.',
    isDone: ({ progress, data }: Ctx) => progress.includes('row-inserted') && !!data['B8'],
  },
  {
    id: 'hapus-baris',
    title: '8. Hapus Baris',
    instruction:
      'Barang "Biskuit Kelapa Kaleng Besar" sudah tidak dijual lagi. Klik salah satu sel pada barisnya, lalu klik "Delete Row".',
    isDone: ({ progress }: Ctx) => progress.includes('row-deleted'),
  },
  {
    id: 'insert-kolom',
    title: '9. Sisipkan Kolom',
    instruction:
      'Tambahkan kolom Satuan di antara Kategori dan Harga. Klik sel D1, lalu klik "Insert Col". Ketik "Satuan" di D1.',
    isDone: ({ progress, data }: Ctx) => progress.includes('col-inserted') && (data['D1'] ?? '').toLowerCase() === 'satuan',
  },
  {
    id: 'sheet',
    title: '10. Tambah dan Ganti Nama Worksheet',
    instruction:
      'Klik tombol + di samping tab sheet untuk menambah worksheet. Lalu klik 2x tab sheet baru dan ganti namanya menjadi "Stok Barang".',
    isDone: ({ progress }: Ctx) => progress.includes('sheet-added') && progress.includes('sheet-renamed'),
  },
  {
    id: 'hapus-sheet',
    title: '11. Hapus Worksheet',
    instruction:
      'Pilih tab Sheet3, arahkan kursor ke tab-nya, lalu klik ikon tempat sampah merah di pojok kanan atas tab.',
    isDone: ({ progress }: Ctx) => progress.includes('sheet-deleted'),
  },
  {
    id: 'dokumen-baru',
    title: '12. Buat Dokumen (Workbook) Baru',
    instruction:
      'Klik "New Workbook" di tab Home. Kamu akan mendapat workbook kosong (Book2) dengan satu sheet. Ini sama seperti Ctrl + N di Excel. Ketik data apa saja untuk latihan, lalu coba AutoFit Width lagi.',
    isDone: ({ progress }: Ctx) => progress.includes('new-workbook'),
  },
];