'use client';

import { useState } from 'react';
import { ChevronRight, ChevronLeft, Lightbulb, RefreshCcw, Database, Filter, BarChart3 } from 'lucide-react';

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

const columns = ['produk', 'karyawan', 'kategori'];

export default function SpreadsheetPivot() {
  const [step, setStep] = useState(0);
  const [rowField, setRowField] = useState<string>('');
  const [valueField, setValueField] = useState<string>('');
  const [isPivotCreated, setIsPivotCreated] = useState(false);

  const steps = [
    {
      title: "Mengenal Data Mentah",
      instruction: "Ini adalah data penjualan mentah. Kamu punya banyak transaksi dengan produk berulang. Tugas kita adalah merangkumnya menggunakan PivotTable.",
      target: null,
      hint: "Lihat tabel di kanan. Ada 8 transaksi. Produk apa saja yang muncul?",
      validate: () => true,
    },
    {
      title: "Membuat PivotTable",
      instruction: "Klik tombol **Buat PivotTable** di toolbar untuk memulai. Setelah diklik, panel PivotTable Fields akan muncul di kanan.",
      target: 'create-pivot',
      hint: "Klik tombol biru 'Buat PivotTable' di atas tabel.",
      validate: () => isPivotCreated,
    },
    {
      title: "Pilih Baris (Rows)",
      instruction: "Di panel PivotTable Fields, pilih **Produk** sebagai baris. Ini akan mengelompokkan data berdasarkan produk.",
      target: 'row-produk',
      hint: "Klik tombol 'produk' di bagian Pilih Baris.",
      validate: () => rowField === 'produk',
    },
    {
      title: "Pilih Nilai (Values)",
      instruction: "Sekarang pilih **Total Penjualan** sebagai nilai. Ini akan menjumlahkan total penjualan setiap produk.",
      target: 'value-total',
      hint: "Klik tombol 'Total Penjualan' di bagian Pilih Nilai.",
      validate: () => valueField === 'total',
    },
    {
      title: "Selesai!",
      instruction: "Hebat! Kamu sudah membuat PivotTable pertama. Data 8 transaksi berhasil diringkas menjadi ringkasan per produk. Coba ganti nilai menjadi 'Harga Satuan' untuk melihat hasil berbeda.",
      target: null,
      hint: "Perhatikan tabel ringkasan di sebelah kanan.",
      validate: () => true,
    },
  ];

  const current = steps[step];

  const getPivotData = () => {
    if (!rowField || !valueField) return [];
    const grouped: Record<string, Record<string, number>> = {};
    
    rawData.forEach(row => {
      const key = row[rowField as keyof typeof row] as string;
      const value = row[valueField as keyof typeof row] as number;
      
      if (!grouped[key]) grouped[key] = { total: 0, count: 0 };
      grouped[key].total += value;
      grouped[key].count += 1;
    });

    return Object.entries(grouped).map(([key, vals]) => ({
      label: key,
      total: vals.total,
      count: vals.count,
    }));
  };

  const pivotData = getPivotData();
  const grandTotal = pivotData.reduce((sum, item) => sum + item.total, 0);

  const handleNext = () => {
    if (current.validate()) {
      setStep(s => Math.min(steps.length - 1, s + 1));
    }
  };

  const isStepValid = current.validate();

  return (
    <div className="grid lg:grid-cols-2 gap-6 items-start">
      {/* KIRI: Tutorial */}
      <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 min-h-[500px] flex flex-col">
        <div className="flex items-center justify-between mb-4 border-b-2 border-ink pb-4">
          <div>
            <span className="bg-yellow border-2 border-ink rounded-full px-3 py-1 text-xs font-black shadow-neo-sm">
              Langkah {step + 1} dari {steps.length}
            </span>
            <h2 className="text-2xl font-black mt-2">{current.title}</h2>
          </div>
          <button onClick={() => { setStep(0); setIsPivotCreated(false); setRowField(''); setValueField(''); }} className="text-gray-500 hover:text-red-500">
            <RefreshCcw size={20} />
          </button>
        </div>

        <div className="flex-1">
          <p className="text-lg leading-relaxed mb-4">{current.instruction}</p>
          
          {current.hint && (
            <div className="bg-yellow border-2 border-ink rounded-xl p-3 shadow-neo-sm flex gap-3 items-start">
              <Lightbulb size={24} className="shrink-0 text-ink" />
              <p className="text-sm font-bold">{current.hint}</p>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t-2 border-ink flex items-center justify-between">
          <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} className="flex items-center gap-2 font-bold disabled:opacity-50">
            <ChevronLeft size={18} /> Sebelumnya
          </button>

          {isStepValid ? (
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
      <div className="border-2 border-ink rounded-2xl shadow-neo overflow-hidden bg-white">
        {/* Toolbar */}
        <div className="bg-gray-100 border-b-2 border-gray-300 p-2 flex gap-2">
          <button onClick={() => setIsPivotCreated(false)} className={`text-xs px-3 py-1 rounded border ${!isPivotCreated ? 'bg-blue-100 border-blue-500 font-bold' : 'bg-white'}`}>
            <Database size={14} className="inline mr-1"/> Data Mentah
          </button>
          <button onClick={() => setIsPivotCreated(true)} className={`text-xs px-3 py-1 rounded border ${isPivotCreated ? 'bg-mint border-green-500 font-bold' : 'bg-white'}`}>
            <Filter size={14} className="inline mr-1"/> Buat PivotTable
          </button>
        </div>

        {/* Area Konten */}
        <div className="flex h-[450px]">
          {/* Grid/Tabel */}
          <div className="flex-1 overflow-auto p-2">
            {!isPivotCreated ? (
              <table className="w-full border-collapse text-xs">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border p-1">No</th><th className="border p-1">Produk</th>
                    <th className="border p-1">Karyawan</th><th className="border p-1">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {rawData.map(row => (
                    <tr key={row.no}>
                      <td className="border p-1 text-center">{row.no}</td>
                      <td className="border p-1">{row.produk}</td>
                      <td className="border p-1">{row.karyawan}</td>
                      <td className="border p-1 text-right">Rp{row.total.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>
                <div className="mb-2 flex gap-2 text-xs">
                  <span className="bg-blue-100 px-2 py-0.5 rounded border">Rows: {rowField || '...'}</span>
                  <span className="bg-green-100 px-2 py-0.5 rounded border">Values: {valueField || '...'}</span>
                </div>
                <table className="w-full border-collapse text-xs">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="border p-2 text-left capitalize">{rowField || 'Kategori'}</th>
                      <th className="border p-2 text-right">Total</th>
                      <th className="border p-2 text-center">Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pivotData.length > 0 ? (
                      pivotData.map((item, idx) => (
                        <tr key={idx}>
                          <td className="border p-2 font-bold">{item.label}</td>
                          <td className="border p-2 text-right">Rp{item.total.toLocaleString()}</td>
                          <td className="border p-2 text-center">{item.count}</td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan={3} className="border p-4 text-center text-gray-500">Pilih Rows & Values di panel kanan.</td></tr>
                    )}
                    {pivotData.length > 0 && (
                      <tr className="bg-yellow-100 font-bold">
                        <td className="border p-2">Grand Total</td>
                        <td className="border p-2 text-right">Rp{grandTotal.toLocaleString()}</td>
                        <td className="border p-2 text-center">{rawData.length}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Panel Pivot Fields */}
          {isPivotCreated && (
            <div className="w-1/3 border-l-2 border-gray-300 bg-gray-50 p-2 overflow-y-auto">
              <h4 className="font-bold text-xs mb-2 border-b pb-1">PivotTable Fields</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] font-bold text-gray-500 mb-1">Pilih Baris (Rows):</p>
                  <div className="flex flex-col gap-1">
                    {columns.map(col => (
                      <button 
                        key={col}
                        onClick={() => setRowField(col)}
                        className={`text-xs px-2 py-1 border rounded text-left ${rowField === col ? 'bg-blue-100 border-blue-500 font-bold' : 'bg-white'}`}
                      >
                        {col}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 mb-1">Pilih Nilai (Values):</p>
                  <div className="flex flex-col gap-1">
                    <button onClick={() => setValueField('total')} className={`text-xs px-2 py-1 border rounded text-left ${valueField === 'total' ? 'bg-green-100 border-green-500 font-bold' : 'bg-white'}`}>Total Penjualan</button>
                    <button onClick={() => setValueField('harga')} className={`text-xs px-2 py-1 border rounded text-left ${valueField === 'harga' ? 'bg-green-100 border-green-500 font-bold' : 'bg-white'}`}>Harga Satuan</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}