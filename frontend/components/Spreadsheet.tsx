'use client';

import { useState } from 'react';
import { evaluateFormula } from '@/lib/formulaEngine';
import InteractiveTutorial from './InteractiveTutorial';
import { tutorialData } from '@/lib/tutorialData';

const ROWS = 20;
const COLS = 7; // A sampai G

export default function Spreadsheet({ lessonSlug, initialData = {} }: { lessonSlug: string, initialData?: Record<string, string> }) {
  const [data, setData] = useState<Record<string, string>>(initialData);
  const [activeCell, setActiveCell] = useState<string>('A1');
  const [formulaInput, setFormulaInput] = useState<string>('');
  const [activeSheet, setActiveSheet] = useState('Sheet1');
  const [activeTab, setActiveTab] = useState('Home');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('center');
  const [bgColor, setBgColor] = useState('bg-white');

  const currentSteps = tutorialData[lessonSlug] || tutorialData['dasar'];

  const handleCellClick = (cellId: string) => {
    setActiveCell(cellId);
    setFormulaInput(data[cellId] || '');
  };

  const commitFormula = () => {
    if (activeCell) {
      setData(prev => ({ ...prev, [activeCell]: formulaInput }));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') commitFormula();
  };

  const getDisplayValue = (cellId: string) => {
    const rawValue = data[cellId] || '';
    if (rawValue.startsWith('=')) {
      return evaluateFormula(rawValue, data);
    }
    return rawValue;
  };

  const getCellStyle = (cellId: string) => {
    // HANYA BERI WARNA BIRU JIKA SEDANG DIKLIK (AKTIF)
    if (cellId === activeCell) return 'bg-blue-100 ring-2 ring-inset ring-blue-500 z-10';
    
    // LOGIKA WARNA KUNING DIHAPUS

    const formats = [];
    if (isBold) formats.push('font-bold');
    if (isItalic) formats.push('italic');
    if (textAlign === 'center') formats.push('text-center');
    if (textAlign === 'right') formats.push('text-right');
    
    if (bgColor !== 'bg-white') formats.push(bgColor);

    return formats.join(' ') || 'bg-white';
  };

  const applyFormat = (format: 'bold' | 'italic' | 'align-left' | 'align-center' | 'align-right' | 'bg-yellow' | 'bg-blue' | 'bg-green') => {
    if (format === 'bold') setIsBold(!isBold);
    if (format === 'italic') setIsItalic(!isItalic);
    if (format === 'align-left') setTextAlign('left');
    if (format === 'align-center') setTextAlign('center');
    if (format === 'align-right') setTextAlign('right');
    if (format === 'bg-yellow') setBgColor(bgColor === 'bg-yellow' ? 'bg-white' : 'bg-yellow');
    if (format === 'bg-blue') setBgColor(bgColor === 'bg-blue' ? 'bg-white' : 'bg-blue');
    if (format === 'bg-green') setBgColor(bgColor === 'bg-green' ? 'bg-white' : 'bg-green');
  };

  const tabs = ['Home', 'Insert', 'Page Layout', 'Formulas', 'Data', 'Review', 'View'];

  return (
    <div className="border-2 border-ink rounded-xl overflow-hidden bg-white shadow-neo select-none font-sans text-sm flex flex-col h-[600px]">
      
      {/* 1. TITLE BAR */}
      <div className="bg-green-700 text-white px-3 py-1 text-xs flex justify-between items-center font-bold">
        <span>Book1 - Excel (Produk Aktivasi Gagal)</span>
        <div className="flex gap-2"><span>—</span><span>□</span><span>X</span></div>
      </div>

      {/* 2. TABS MENU */}
      <div className="bg-gray-100 border-b-2 border-gray-300 flex text-xs font-bold pt-2 px-2 gap-1 overflow-x-auto">
        {tabs.map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 rounded-t transition-colors whitespace-nowrap ${activeTab === tab ? 'bg-white border-t-2 border-l-2 border-r-2 border-green-600 text-green-700' : 'text-gray-600 hover:bg-gray-200'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 3. RIBBON TOOLBAR */}
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
                <button onClick={() => applyFormat('bold')} className={`border border-gray-300 px-2 py-1 rounded font-bold shadow-sm ${isBold ? 'bg-gray-300' : 'bg-white'}`}>B</button>
                <button onClick={() => applyFormat('italic')} className={`border border-gray-300 px-2 py-1 rounded italic shadow-sm ${isItalic ? 'bg-gray-300' : 'bg-white'}`}>I</button>
              </div>
              <span>Font</span>
            </div>
            <div className="flex flex-col items-center border-r border-gray-300 pr-4">
              <div className="flex gap-1 mb-1">
                <button onClick={() => applyFormat('align-left')} className={`border border-gray-300 px-2 py-1 rounded shadow-sm ${textAlign === 'left' ? 'bg-gray-300' : 'bg-white'}`}>≡</button>
                <button onClick={() => applyFormat('align-center')} className={`border border-gray-300 px-2 py-1 rounded shadow-sm ${textAlign === 'center' ? 'bg-gray-300' : 'bg-white'}`}>☰</button>
                <button onClick={() => applyFormat('align-right')} className={`border border-gray-300 px-2 py-1 rounded shadow-sm ${textAlign === 'right' ? 'bg-gray-300' : 'bg-white'}`}>≡</button>
              </div>
              <span>Alignment</span>
            </div>
            <div className="flex flex-col items-center border-r border-gray-300 pr-4">
              <div className="flex gap-1 mb-1 items-center">
                <div className="bg-white border border-gray-300 px-2 py-1 rounded shadow-sm flex items-center gap-1 font-bold min-w-[100px] justify-between">
                  General <span className="text-[10px] text-gray-500">▼</span>
                </div>
                <div className="bg-white border border-gray-300 px-2 py-1 rounded shadow-sm text-green-700 font-bold">Rp</div>
                <div className="bg-white border border-gray-300 px-2 py-1 rounded shadow-sm text-blue-700 font-bold">%</div>
              </div>
              <span>Number</span>
            </div>
          </>
        )}

        {activeTab === 'Insert' && (
          <div className="flex gap-4 items-start">
            <div className="flex flex-col items-center"><div className="bg-white border border-gray-300 p-1 rounded shadow-sm text-lg">📊</div><span>PivotTable</span></div>
            <div className="flex flex-col items-center border-l border-gray-300 pl-4"><div className="bg-white border border-gray-300 p-1 rounded shadow-sm text-lg">📈</div><span>Chart</span></div>
            <div className="flex flex-col items-center border-l border-gray-300 pl-4"><div className="bg-white border border-gray-300 p-1 rounded shadow-sm text-lg">🔗</div><span>Link</span></div>
          </div>
        )}

        {activeTab === 'Data' && (
          <div className="flex gap-4 items-start">
            <div className="flex flex-col items-center"><div className="bg-white border border-gray-300 p-1 rounded shadow-sm text-lg">🔽</div><span>Sort A-Z</span></div>
            <div className="flex flex-col items-center border-l border-gray-300 pl-4"><div className="bg-white border border-gray-300 p-1 rounded shadow-sm text-lg">⏫</div><span>Sort Z-A</span></div>
            <div className="flex flex-col items-center border-l border-gray-300 pl-4"><div className="bg-white border border-gray-300 p-1 rounded shadow-sm text-lg">🔍</div><span>Filter</span></div>
            <div className="flex flex-col items-center border-l border-gray-300 pl-4"><div className="bg-white border border-gray-300 p-1 rounded shadow-sm text-lg">🛡️</div><span>Validation</span></div>
          </div>
        )}

        {activeTab === 'Formulas' && (
          <div className="flex gap-4 items-start">
            <div className="flex flex-col items-center"><div className="bg-white border border-gray-300 p-1 rounded shadow-sm text-lg">🧮</div><span>AutoSum</span></div>
            <div className="flex flex-col items-center border-l border-gray-300 pl-4"><div className="bg-white border border-gray-300 p-1 rounded shadow-sm text-lg">📚</div><span>Function</span></div>
          </div>
        )}

        {['Page Layout', 'Review', 'View'].includes(activeTab) && (
          <div className="flex items-center justify-center w-full h-full text-gray-400 font-bold">
            Fitur Tab {activeTab} belum tersedia di simulasi ini.
          </div>
        )}
      </div>

      {/* 4. FORMULA BAR */}
      <div className="flex border-b-2 border-gray-300 text-xs bg-white">
        <div className="w-16 border-r-2 border-gray-300 flex items-center justify-center font-bold">{activeCell}</div>
        <div className="w-8 border-r-2 border-gray-300 flex items-center justify-center font-bold text-gray-500 bg-gray-50">fx</div>
        <input
          type="text"
          value={formulaInput}
          onChange={(e) => setFormulaInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commitFormula}
          className="flex-1 px-2 py-1 outline-none font-mono"
          placeholder="Ketik rumus atau teks..."
        />
      </div>

      {/* 5. LAYOUT UTAMA */}
      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/3 border-r-2 border-gray-300 overflow-y-auto p-2 bg-gray-50">
          <InteractiveTutorial 
            steps={currentSteps}
            data={data} 
            onReset={() => { setData(initialData); setActiveCell('A1'); setFormulaInput(''); setIsBold(false); setIsItalic(false); setBgColor('bg-white'); }} 
          />
        </div>

        <div className="w-2/3 overflow-auto bg-white relative">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-gray-100 z-20">
              <tr>
                <th className="w-8 border border-gray-300 p-1 bg-gray-200"></th>
                {Array.from({ length: COLS }).map((_, i) => (
                  <th key={i} className="border border-gray-300 p-1 font-bold text-gray-600 text-xs bg-gray-200">
                    {String.fromCharCode(65 + i)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: ROWS }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="bg-gray-200 border border-gray-300 p-1 text-center font-bold text-xs text-gray-600 sticky left-0 z-10">
                    {rowIndex + 1}
                  </td>
                  {Array.from({ length: COLS }).map((_, colIndex) => {
                    const cellId = `${String.fromCharCode(65 + colIndex)}${rowIndex + 1}`;
                    return (
                      <td
                        key={cellId}
                        onClick={() => handleCellClick(cellId)}
                        className={`border border-gray-300 p-1 text-xs h-6 min-w-[80px] cursor-cell transition-colors ${getCellStyle(cellId)}`}
                      >
                        {getDisplayValue(cellId)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. SHEET TABS */}
      <div className="bg-gray-100 border-t-2 border-gray-300 px-2 pt-1 flex text-xs font-bold gap-1">
        {['Sheet1', 'Sheet2', 'Sheet3'].map(sheet => (
          <button 
            key={sheet} 
            onClick={() => setActiveSheet(sheet)}
            className={`px-4 py-1 rounded-t border-t-2 border-l-2 border-r-2 ${activeSheet === sheet ? 'bg-white border-gray-400 text-green-700' : 'bg-gray-200 border-transparent text-gray-500'}`}
          >
            {sheet}
          </button>
        ))}
        <button className="px-2 py-1 text-gray-500 hover:text-ink">+</button>
      </div>

      {/* 7. STATUS BAR */}
      <div className="bg-green-700 text-white text-[10px] px-3 py-0.5 flex justify-between">
        <span>Ready</span>
        <span>100%</span>
      </div>
    </div>
  );
}