'use client';

import { useState } from 'react';
import { ChevronRight, ChevronLeft, Grid } from 'lucide-react';

const dataBarang = [
  { no: 1, nama: 'Laptop', kategori: 'Elektronik', jumlah: 5, harga: 7500000 },
  { no: 2, nama: 'Mouse', kategori: 'Aksesoris', jumlah: 10, harga: 150000 },
  { no: 3, nama: 'Keyboard', kategori: 'Aksesoris', jumlah: 8, harga: 250000 },
  { no: 4, nama: 'Monitor', kategori: 'Elektronik', jumlah: 4, harga: 1800000 },
  { no: 5, nama: 'Printer', kategori: 'Elektronik', jumlah: 3, harga: 2200000 },
];

type BorderType = 'none' | 'all' | 'outside' | 'thick-outside';

export default function BorderVisualGuide() {
  const [step, setStep] = useState(0);
  const [isBlok, setIsBlok] = useState(false);
  const [isHomeOpen, setIsHomeOpen] = useState(false);
  const [borderType, setBorderType] = useState<BorderType>('none');

  const borderOptions: { type: BorderType; label: string; desc: string }[] = [
    { type: 'all', label: 'All Borders', desc: 'Garis di semua sisi setiap sel.' },
    { type: 'outside', label: 'Outside Borders', desc: 'Garis hanya di tepi luar rentang.' },
    { type: 'thick-outside', label: 'Thick Outside', desc: 'Garis tebal di tepi luar.' },
  ];

  const steps = [
    { title: 'Langkah 1: Blok Data', instruction: 'Pilih rentang A1:E6 untuk diberi border.', hint: 'Klik tombol "Blok A1:E6".', validate: () => isBlok },
    { title: 'Langkah 2: Buka Tab Home', instruction: 'Klik tab **Home** di Ribbon.', hint: 'Klik tab Home.', validate: () => isHomeOpen },
    { title: 'Langkah 3: Pilih Borders', instruction: 'Pilih jenis border yang diinginkan.', hint: 'Klik salah satu tombol border.', validate: () => borderType !== 'none' },
    { title: 'Selesai! 🎉', instruction: 'Border sudah diterapkan pada tabel.', hint: 'Lihat hasil di kanan.', validate: () => true },
  ];

  const current = steps[step];

  const getBorderClass = () => {
    if (borderType === 'all') return 'border border-ink';
    if (borderType === 'outside') return 'border-2 border-ink';
    if (borderType === 'thick-outside') return 'border-4 border-ink';
    return 'border-0';
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
          <p className="mb-4 text-lg">{current.instruction}</p>
          <div className="bg-yellow border-2 border-ink rounded-xl p-3 flex gap-2 items-start">
            <Grid size={20} className="shrink-0" />
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
          <button onClick={() => { setIsHomeOpen(true); if (step === 0 && isBlok) setStep(1); }} className={`px-3 py-1 ${isHomeOpen ? 'bg-white border-t-2 border-l-2 border-r-2 border-green-600 text-green-700' : 'text-gray-600'}`}>Home</button>
          <span className="px-3 py-1 text-gray-600">Insert</span>
        </div>
        {isHomeOpen && step >= 1 && (
          <div className="bg-gray-50 border-b-2 p-2 flex gap-2">
            {borderOptions.map(opt => (
              <button key={opt.type} onClick={() => { setBorderType(opt.type); if (step === 1) setStep(2); }} className={`px-2 py-1 border rounded font-bold text-xs ${borderType === opt.type ? 'bg-green-100' : 'bg-white'}`}>{opt.label}</button>
            ))}
          </div>
        )}
        <div className="flex-1 p-4 overflow-auto flex items-center justify-center">
          <div className={`inline-block ${getBorderClass()} rounded-lg`}>
            <table className="text-xs border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2">No</th>
                  <th className="p-2">Nama</th>
                  <th className="p-2">Kategori</th>
                  <th className="p-2">Jumlah</th>
                  <th className="p-2">Harga</th>
                </tr>
              </thead>
              <tbody>
                {dataBarang.map((row, i) => (
                  <tr key={i} className={isBlok ? 'bg-blue-50' : ''}>
                    <td className="p-2 text-center">{row.no}</td>
                    <td className="p-2">{row.nama}</td>
                    <td className="p-2">{row.kategori}</td>
                    <td className="p-2 text-center">{row.jumlah}</td>
                    <td className="p-2 text-right">{row.harga}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="p-2 bg-blue-50 border-t-2 border-ink flex gap-2">
          {step === 0 && <button onClick={() => setIsBlok(true)} className={`px-3 py-1 border-2 border-ink rounded font-bold ${isBlok ? 'bg-green-500 text-white' : 'bg-white'}`}>{isBlok ? '✅ Terblok' : 'Blok A1:E6'}</button>}
        </div>
      </div>
    </div>
  );
}