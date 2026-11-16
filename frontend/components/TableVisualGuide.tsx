'use client';

import { useState } from 'react';
import { ChevronRight, ChevronLeft, Table, Check } from 'lucide-react';

const dataBarang = [
  { no: 1, nama: 'Laptop', kategori: 'Elektronik', jumlah: 5, harga: 7500000 },
  { no: 2, nama: 'Mouse', kategori: 'Aksesoris', jumlah: 10, harga: 150000 },
  { no: 3, nama: 'Keyboard', kategori: 'Aksesoris', jumlah: 8, harga: 250000 },
  { no: 4, nama: 'Monitor', kategori: 'Elektronik', jumlah: 4, harga: 1800000 },
  { no: 5, nama: 'Printer', kategori: 'Elektronik', jumlah: 3, harga: 2200000 },
];

export default function TableVisualGuide() {
  const [step, setStep] = useState(0);
  const [isBlok, setIsBlok] = useState(false);
  const [isInsertOpen, setIsInsertOpen] = useState(false);
  const [isTableCreated, setIsTableCreated] = useState(false);
  const [showStylePicker, setShowStylePicker] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<'default' | 'green' | 'blue'>('default');

  const steps = [
    { title: 'Langkah 1: Blok Data', instruction: 'Pilih seluruh data tabel (A1:E6) termasuk judul kolom.', hint: 'Klik tombol "Blok A1:E6".', validate: () => isBlok },
    { title: 'Langkah 2: Buka Menu Insert', instruction: 'Klik tab **Insert** di Ribbon Excel.', hint: 'Klik tab Insert.', validate: () => isInsertOpen },
    { title: 'Langkah 3: Pilih Table', instruction: 'Klik tombol **Table** di grup Tables.', hint: 'Klik tombol "Table".', validate: () => isTableCreated },
    { title: 'Langkah 4: Ubah Style', instruction: 'Klik **Table Design** > pilih style yang diinginkan.', hint: 'Klik salah satu style di bawah.', validate: () => selectedStyle !== 'default' || showStylePicker },
    { title: 'Selesai! 🎉', instruction: 'Tabel sudah menjadi Excel Table dengan style pilihanmu.', hint: 'Lihat hasil di kanan.', validate: () => true },
  ];

  const current = steps[step];

  const getRowBg = (index: number) => {
    if (!isTableCreated) return '';
    if (selectedStyle === 'green') return index % 2 === 0 ? 'bg-green-100' : 'bg-white';
    if (selectedStyle === 'blue') return index % 2 === 0 ? 'bg-blue-100' : 'bg-white';
    return index % 2 === 0 ? 'bg-green-50' : 'bg-white';
  };

  const getHeaderBg = () => {
    if (selectedStyle === 'blue') return 'bg-blue-600 text-white';
    return 'bg-green-600 text-white';
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 items-start">
      <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 flex flex-col min-h-[450px]">
        <div className="flex justify-between items-center mb-4 border-b-2 border-ink pb-4">
          <div>
            <span className="bg-yellow border-2 border-ink rounded-full px-3 py-1 text-xs font-black">Langkah {step + 1} dari {steps.length}</span>
            <h3 className="text-xl font-black mt-2">{current.title}</h3>
          </div>
        </div>
        <div className="flex-1">
          <p className="mb-4 text-lg" dangerouslySetInnerHTML={{ __html: current.instruction.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          <div className="bg-yellow border-2 border-ink rounded-xl p-3 flex gap-2 items-start">
            <Table size={20} className="shrink-0" />
            <p className="text-sm font-bold">{current.hint}</p>
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} className="font-bold disabled:opacity-50 flex items-center gap-1"><ChevronLeft size={18} /> Sebelumnya</button>
          {current.validate() ? (
            <button onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))} disabled={step === steps.length - 1} className="bg-mint border-2 border-ink rounded-xl px-4 py-2 font-bold flex items-center gap-1">
              {step === steps.length - 1 ? 'Selesai' : 'Lanjut'} <ChevronRight size={18} />
            </button>
          ) : <span className="text-sm text-gray-500 font-bold">Lakukan instruksi...</span>}
        </div>
      </div>

      <div className="border-2 border-ink rounded-xl overflow-hidden bg-white shadow-neo flex flex-col h-[450px]">
        <div className="bg-green-700 text-white text-xs font-bold px-3 py-1">Book1 - Excel</div>
        <div className="bg-gray-100 flex text-xs font-bold border-b-2 border-gray-300">
          <span className="px-3 py-1 text-gray-600">Home</span>
          <button onClick={() => { setIsInsertOpen(true); if (step === 0 && isBlok) setStep(1); }} className={`px-3 py-1 ${isInsertOpen ? 'bg-white border-t-2 border-l-2 border-r-2 border-green-600 text-green-700' : 'text-gray-600'}`}>Insert</button>
          {isTableCreated && <button onClick={() => { setShowStylePicker(true); if (step === 3) setStep(4); }} className={`px-3 py-1 ${showStylePicker ? 'bg-white border-t-2 border-l-2 border-r-2 border-green-600 text-green-700' : 'text-gray-600'}`}>Table Design</button>}
        </div>
        {isInsertOpen && step >= 1 && (
          <div className="bg-gray-50 border-b-2 p-2 flex gap-2">
            <button onClick={() => { setIsTableCreated(true); if (step === 1) setStep(2); }} className={`flex items-center gap-1 px-3 py-1 border rounded font-bold ${isTableCreated ? 'bg-green-100' : 'bg-white'}`}><Table size={14} /> Table</button>
          </div>
        )}
        {showStylePicker && (
          <div className="bg-gray-50 border-b-2 p-2 flex gap-2">
            <button onClick={() => { setSelectedStyle('green'); if (step === 3) setStep(4); }} className="px-3 py-1 border rounded font-bold bg-green-100">Green Style</button>
            <button onClick={() => { setSelectedStyle('blue'); if (step === 3) setStep(4); }} className="px-3 py-1 border rounded font-bold bg-blue-100">Blue Style</button>
          </div>
        )}
        <div className="flex-1 p-2 overflow-auto">
          <table className="w-full text-xs border-collapse">
            <thead className={isTableCreated ? getHeaderBg() : 'bg-gray-200'}>
              <tr>
                <th className="border p-1 w-8"></th>
                <th className="border p-1">A (No)</th>
                <th className="border p-1">B (Nama)</th>
                <th className="border p-1">C (Kategori)</th>
                <th className="border p-1">D (Jumlah)</th>
                <th className="border p-1">E (Harga)</th>
              </tr>
            </thead>
            <tbody>
              {dataBarang.map((row, i) => (
                <tr key={i} className={getRowBg(i)}>
                  <td className="border p-1 text-center">{i + 2}</td>
                  <td className={`border p-1 text-center ${isBlok ? 'bg-blue-100' : ''}`}>{row.no}</td>
                  <td className={`border p-1 ${isBlok ? 'bg-blue-100' : ''}`}>{row.nama}</td>
                  <td className={`border p-1 ${isBlok ? 'bg-blue-100' : ''}`}>{row.kategori}</td>
                  <td className={`border p-1 text-center ${isBlok ? 'bg-blue-100' : ''}`}>{row.jumlah}</td>
                  <td className={`border p-1 text-right ${isBlok ? 'bg-blue-100' : ''}`}>{row.harga}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-2 bg-blue-50 border-t-2 border-ink flex gap-2">
          {step === 0 && <button onClick={() => setIsBlok(true)} className={`px-3 py-1 border-2 border-ink rounded font-bold ${isBlok ? 'bg-green-500 text-white' : 'bg-white'}`}>{isBlok ? '✅ Terblok' : 'Blok A1:E6'}</button>}
        </div>
      </div>
    </div>
  );
}