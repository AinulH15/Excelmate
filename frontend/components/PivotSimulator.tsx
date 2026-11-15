'use client';

import { useState } from 'react';
import { ChevronRight, ChevronLeft, Lightbulb, RefreshCcw, Check, X, Table } from 'lucide-react';

const rawData = [
  { no: 1, tanggal: '01/01/2026', produk: 'Laptop', kategori: 'Elektronik', karyawan: 'Andi', jumlah: 2, harga: 5000000, total: 10000000 },
  { no: 2, tanggal: '01/01/2026', produk: 'Mouse', kategori: 'Aksesoris', karyawan: 'Budi', jumlah: 5, harga: 150000, total: 750000 },
  { no: 3, tanggal: '02/01/2026', produk: 'Keyboard', kategori: 'Aksesoris', karyawan: 'Citra', jumlah: 3, harga: 300000, total: 900000 },
  { no: 4, tanggal: '02/01/2026', produk: 'Laptop', kategori: 'Elektronik', karyawan: 'Andi', jumlah: 1, harga: 5000000, total: 5000000 },
  { no: 5, tanggal: '03/01/2026', produk: 'Monitor', kategori: 'Elektronik', karyawan: 'Budi', jumlah: 2, harga: 1500000, total: 3000000 },
  { no: 6, tanggal: '03/01/2026', produk: 'Mouse', kategori: 'Aksesoris', karyawan: 'Citra', jumlah: 4, harga: 150000, total: 600000 },
  { no: 7, tanggal: '04/01/2026', produk: 'Keyboard', kategori: 'Aksesoris', karyawan: 'Andi', jumlah: 2, harga: 300000, total: 600000 },
  { no: 8, tanggal: '04/01/2026', produk: 'Laptop', kategori: 'Elektronik', karyawan: 'Citra', jumlah: 1, harga: 5000000, total: 5000000 },
];

const columns = ['produk', 'karyawan', 'kategori', 'jumlah', 'harga', 'total'];

export default function PivotSimulator() {
  const [step, setStep] = useState(0);
  const [isDataSelected, setIsDataSelected] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [showDialog, setShowDialog] = useState(false);
  const [activeSheet, setActiveSheet] = useState('Sheet1');
  const [pivotSheetExists, setPivotSheetExists] = useState(false);
  
  // State untuk Pivot Fields (Multi-select)
  const [rowFields, setRowFields] = useState<string[]>([]);
  const [valueFields, setValueFields] = useState<string[]>([]);

  const steps = [
    {
      title: "Langkah 1: Blok Data Mentah",
      instruction: "Di **Sheet1**, blok seluruh tabel data penjualan mulai dari cell **A1** sampai **H9**. Klik tombol 'Blok Data' untuk simulasi.",
      hint: "Klik tombol 'Blok Data' di toolbar.",
      validate: () => isDataSelected,
    },
    {
      title: "Langkah 2: Pilih Menu Insert",
      instruction: "Setelah data diblok, klik tab **Insert** di Ribbon Excel.",
      hint: "Klik tab 'Insert' di bagian atas.",
      validate: () => activeTab === 'Insert',
    },
    {
      title: "Langkah 3: Klik PivotTable",
      instruction: "Di Ribbon Insert, klik tombol **PivotTable**.",
      hint: "Klik tombol 'PivotTable' yang muncul.",
      validate: () => showDialog,
    },
    {
      title: "Langkah 4: Buat PivotTable",
      instruction: "Dialog Create PivotTable muncul dengan range `Sheet1!$A$1:$H$9`. Klik **OK**. Excel akan membuat sheet baru bernama PivotTable1.",
      hint: "Klik tombol OK di dialog.",
      validate: () => pivotSheetExists,
    },
    {
      title: "Langkah 5: Atur PivotTable Fields",
      instruction: "Di sheet PivotTable1, centang field yang ingin ditampilkan. Untuk laporan ini: centang **Produk** (Rows) dan **Total** (Values).",
      hint: "Centang 'produk' di bagian Rows, dan 'total' di bagian Values.",
      validate: () => rowFields.includes('produk') && valueFields.includes('total'),
    },
    {
      title: "Selesai! 🎉",
      instruction: "Hebat! Kamu berhasil membuat PivotTable. Data 8 transaksi sudah diringkas menjadi ringkasan per produk. Kamu bisa mencentang field lain untuk melihat ringkasan berbeda.",
      hint: "Lihat tabel ringkasan di kanan.",
      validate: () => true,
    },
  ];

  const current = steps[step];

  const handleNext = () => {
    if (current.validate() && step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handleRowToggle = (field: string) => {
    setRowFields(prev => 
      prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]
    );
  };

  const handleValueToggle = (field: string) => {
    setValueFields(prev => 
      prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]
    );
  };

  // Fungsi untuk merangkum data
  const getPivotData = () => {
    if (rowFields.length === 0 || valueFields.length === 0) return [];

    const grouped: Record<string, Record<string, number>> = {};

    rawData.forEach(row => {
      const key = rowFields.map(f => row[f as keyof typeof row]).join(' | ');
      
      if (!grouped[key]) {
        grouped[key] = {};
        valueFields.forEach(vf => { grouped[key][vf] = 0; });
      }

      valueFields.forEach(vf => {
        const val = row[vf as keyof typeof row];
        if (typeof val === 'number') {
          grouped[key][vf] += val;
        }
      });
    });

    return Object.entries(grouped).map(([key, vals]) => ({
      label: key,
      values: vals,
    }));
  };

  const pivotData = getPivotData();

  // Helper untuk format angka
  const formatValue = (value: number, field: string) => {
    if (field === 'harga' || field === 'total') {
      return `Rp${value.toLocaleString()}`;
    }
    return value.toLocaleString();
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6 items-start">
      {/* KIRI: Tutorial */}
      <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 flex flex-col min-h-[500px]">
        <div className="flex items-center justify-between mb-4 border-b-2 border-ink pb-4">
          <div>
            <span className="bg-yellow border-2 border-ink rounded-full px-3 py-1 text-xs font-black shadow-neo-sm">
              Langkah {step + 1} dari {steps.length}
            </span>
            <h2 className="text-2xl font-black mt-2">{current.title}</h2>
          </div>
          <button onClick={() => { setStep(0); setIsDataSelected(false); setActiveTab('Home'); setShowDialog(false); setPivotSheetExists(false); setActiveSheet('Sheet1'); setRowFields([]); setValueFields([]); }} className="text-gray-500 hover:text-red-500">
            <RefreshCcw size={20} />
          </button>
        </div>
        <div className="flex-1">
          <p className="text-lg leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: current.instruction.replace(/\*\*(.*?)\*\*/g, '<strong class="bg-blue px-1 rounded border border-ink">$1</strong>').replace(/`(.*?)`/g, '<code class="bg-gray-100 border-2 border-ink px-2 py-0.5 rounded text-sm font-mono">$1</code>') }} />
          <div className="bg-yellow border-2 border-ink rounded-xl p-3 shadow-neo-sm flex gap-3 items-start">
            <Lightbulb size={24} className="shrink-0 text-ink" />
            <p className="text-sm font-bold">{current.hint}</p>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t-2 border-ink flex justify-between">
          <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} className="flex items-center gap-2 font-bold disabled:opacity-50">
            <ChevronLeft size={18} /> Sebelumnya
          </button>
          {current.validate() ? (
            <button onClick={handleNext} disabled={step === steps.length - 1} className="bg-mint border-2 border-ink rounded-xl px-4 py-2 font-bold shadow-neo-sm hover:bg-gray-50 disabled:opacity-50 flex items-center gap-2">
              {step === steps.length - 1 ? 'Selesai! 🎉' : 'Lanjut'} <ChevronRight size={18} />
            </button>
          ) : (
            <div className="text-sm font-bold text-gray-500 bg-gray-100 px-4 py-2 rounded-xl border-2 border-dashed">
              Lakukan instruksi dulu...
            </div>
          )}
        </div>
      </div>

      {/* KANAN: Simulasi Excel */}
      <div className="border-2 border-ink rounded-xl overflow-hidden bg-white shadow-neo flex flex-col h-[600px]">
        <div className="bg-green-700 text-white px-3 py-1 text-xs font-bold">Book1 - Excel (PivotTable Simulator)</div>
        
        {/* Tabs Menu */}
        <div className="bg-gray-100 border-b-2 border-gray-300 flex text-xs font-bold pt-2 px-2 gap-1">
          {['Home', 'Insert', 'Data'].map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`px-3 py-1 rounded-t transition-colors ${activeTab === tab ? 'bg-white border-t-2 border-l-2 border-r-2 border-green-600 text-green-700' : 'text-gray-600 hover:bg-gray-200'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Ribbon */}
        <div className="bg-gray-50 border-b-2 border-gray-300 p-2 flex gap-2 text-xs min-h-[40px]">
          {activeTab === 'Home' && (
            <button 
              onClick={() => { setIsDataSelected(true); }}
              className={`px-3 py-1 border rounded font-bold flex items-center gap-2 ${isDataSelected ? 'bg-green-100 border-green-500' : 'bg-white hover:bg-gray-100'}`}
            >
              {isDataSelected ? <><Check size={14}/> Data Terblok</> : 'Blok Data'}
            </button>
          )}
          {activeTab === 'Insert' && (
            <button onClick={() => setShowDialog(true)} className="px-3 py-1 bg-white border rounded font-bold flex items-center gap-1 hover:bg-gray-100">
              📊 PivotTable
            </button>
          )}
          {activeTab === 'Data' && <span className="text-gray-400 py-1">Menu Data belum tersedia.</span>}
        </div>

        {/* Formula Bar */}
        <div className="flex border-b-2 border-gray-300 text-xs bg-white">
          <div className="w-16 border-r-2 border-gray-300 flex items-center justify-center font-bold bg-gray-100">{activeSheet === 'PivotTable1' ? 'A3' : 'A1'}</div>
          <div className="flex-1 px-2 py-1 font-mono text-gray-600">{isDataSelected && activeSheet === 'Sheet1' ? 'Sheet1!$A$1:$H$9' : ''}</div>
        </div>

        {/* Konten Utama */}
        <div className="flex-1 flex overflow-hidden">
          {activeSheet === 'Sheet1' && (
            <div className="flex-1 overflow-auto bg-white p-2">
              <table className="w-full border-collapse text-xs">
                <thead className="bg-gray-200 sticky top-0 z-10">
                  <tr>
                    <th className="border border-gray-400 p-1 w-8 bg-gray-300"></th>
                    <th className="border border-gray-400 p-1 bg-gray-300">A</th>
                    <th className="border border-gray-400 p-1 bg-gray-300">B</th>
                    <th className="border border-gray-400 p-1 bg-gray-300">C</th>
                    <th className="border border-gray-400 p-1 bg-gray-300">D</th>
                    <th className="border border-gray-400 p-1 bg-gray-300">E</th>
                    <th className="border border-gray-400 p-1 bg-gray-300">F</th>
                    <th className="border border-gray-400 p-1 bg-gray-300">G</th>
                    <th className="border border-gray-400 p-1 bg-gray-300">H</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="bg-gray-100 border border-gray-400 p-1 text-center font-bold">1</td>
                    <td className={`border border-gray-400 p-1 font-bold ${isDataSelected ? 'bg-blue-100 border-blue-500' : ''}`}>No</td>
                    <td className={`border border-gray-400 p-1 font-bold ${isDataSelected ? 'bg-blue-100 border-blue-500' : ''}`}>Tanggal</td>
                    <td className={`border border-gray-400 p-1 font-bold ${isDataSelected ? 'bg-blue-100 border-blue-500' : ''}`}>Produk</td>
                    <td className={`border border-gray-400 p-1 font-bold ${isDataSelected ? 'bg-blue-100 border-blue-500' : ''}`}>Kategori</td>
                    <td className={`border border-gray-400 p-1 font-bold ${isDataSelected ? 'bg-blue-100 border-blue-500' : ''}`}>Karyawan</td>
                    <td className={`border border-gray-400 p-1 font-bold ${isDataSelected ? 'bg-blue-100 border-blue-500' : ''}`}>Jumlah</td>
                    <td className={`border border-gray-400 p-1 font-bold ${isDataSelected ? 'bg-blue-100 border-blue-500' : ''}`}>Harga Satuan</td>
                    <td className={`border border-gray-400 p-1 font-bold ${isDataSelected ? 'bg-blue-100 border-blue-500' : ''}`}>Total Penjualan</td>
                  </tr>
                  {rawData.map((row, idx) => (
                    <tr key={row.no}>
                      <td className="bg-gray-100 border border-gray-400 p-1 text-center font-bold">{idx + 2}</td>
                      <td className={`border border-gray-400 p-1 text-center ${isDataSelected ? 'bg-blue-100 border-blue-500' : ''}`}>{row.no}</td>
                      <td className={`border border-gray-400 p-1 text-center ${isDataSelected ? 'bg-blue-100 border-blue-500' : ''}`}>{row.tanggal}</td>
                      <td className={`border border-gray-400 p-1 ${isDataSelected ? 'bg-blue-100 border-blue-500' : ''}`}>{row.produk}</td>
                      <td className={`border border-gray-400 p-1 ${isDataSelected ? 'bg-blue-100 border-blue-500' : ''}`}>{row.kategori}</td>
                      <td className={`border border-gray-400 p-1 ${isDataSelected ? 'bg-blue-100 border-blue-500' : ''}`}>{row.karyawan}</td>
                      <td className={`border border-gray-400 p-1 text-center ${isDataSelected ? 'bg-blue-100 border-blue-500' : ''}`}>{row.jumlah}</td>
                      <td className={`border border-gray-400 p-1 text-right ${isDataSelected ? 'bg-blue-100 border-blue-500' : ''}`}>Rp{row.harga.toLocaleString()}</td>
                      <td className={`border border-gray-400 p-1 text-right ${isDataSelected ? 'bg-blue-100 border-blue-500' : ''}`}>Rp{row.total.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeSheet === 'PivotTable1' && (
            <div className="flex-1 flex overflow-hidden">
              <div className="flex-1 p-2 overflow-auto bg-white">
                {pivotData.length > 0 ? (
                  <table className="w-full border-collapse text-xs">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="border p-2 text-left">Label</th>
                        {valueFields.map(vf => (
                          <th key={vf} className="border p-2 text-right capitalize">Sum of {vf}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {pivotData.map((item, idx) => (
                        <tr key={idx}>
                          <td className="border p-2 font-bold">{item.label}</td>
                          {valueFields.map(vf => (
                            <td key={vf} className="border p-2 text-right">
                              {formatValue(item.values[vf] || 0, vf)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-gray-400 text-center mt-10 flex flex-col items-center">
                    <div className="text-4xl mb-2">📊</div>
                    <p className="font-bold">Centang field di panel kanan.</p>
                  </div>
                )}
              </div>

              {/* Panel PivotTable Fields */}
              <div className="w-1/3 border-l-2 border-gray-300 bg-gray-50 p-2 overflow-y-auto">
                <h4 className="font-bold text-xs mb-2 border-b pb-1">PivotTable Fields</h4>
                <div className="space-y-2">
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 mb-1">Rows (Centang):</p>
                    {columns.filter(c => c !== 'total' && c !== 'harga' && c !== 'jumlah').map(col => (
                      <label key={col} className="flex items-center gap-2 text-xs mb-1 cursor-pointer">
                        <input type="checkbox" checked={rowFields.includes(col)} onChange={() => handleRowToggle(col)} className="w-3 h-3" />
                        <span className="capitalize">{col}</span>
                      </label>
                    ))}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 mb-1">Values (Centang):</p>
                    {columns.filter(c => c === 'total' || c === 'harga' || c === 'jumlah').map(col => (
                      <label key={col} className="flex items-center gap-2 text-xs mb-1 cursor-pointer">
                        <input type="checkbox" checked={valueFields.includes(col)} onChange={() => handleValueToggle(col)} className="w-3 h-3" />
                        <span className="capitalize">{col}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SHEET TABS */}
        <div className="bg-gray-100 border-t-2 border-gray-300 px-2 pt-1 flex text-xs font-bold gap-1">
          <button onClick={() => setActiveSheet('Sheet1')} className={`px-4 py-1 rounded-t border-t-2 border-l-2 border-r-2 ${activeSheet === 'Sheet1' ? 'bg-white border-gray-400 text-green-700' : 'bg-gray-200 border-transparent text-gray-500'}`}>Sheet1</button>
          {pivotSheetExists && (
            <button onClick={() => setActiveSheet('PivotTable1')} className={`px-4 py-1 rounded-t border-t-2 border-l-2 border-r-2 ${activeSheet === 'PivotTable1' ? 'bg-white border-gray-400 text-green-700' : 'bg-gray-200 border-transparent text-gray-500'}`}>PivotTable1</button>
          )}
        </div>
      </div>

      {/* DIALOG CREATE PIVOTTABLE */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white border-2 border-ink rounded-xl p-6 w-96 shadow-neo">
            <h3 className="text-lg font-bold mb-4">Create PivotTable</h3>
            <p className="text-sm mb-2">Table/Range:</p>
            <input type="text" readOnly value="Sheet1!$A$1:$H$9" className="w-full border-2 border-ink p-2 rounded bg-gray-100 mb-4 font-mono text-sm" />
            <p className="text-xs text-gray-500 mb-4">Data dari Sheet1, cell A1 sampai H9.</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowDialog(false)} className="px-4 py-1 border-2 border-ink rounded font-bold hover:bg-gray-100">Cancel</button>
              <button onClick={() => { setShowDialog(false); setPivotSheetExists(true); setActiveSheet('PivotTable1'); }} className="px-4 py-1 bg-green-500 text-white border-2 border-ink rounded font-bold hover:bg-green-600">OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}