'use client';

import { useState } from 'react';
import { ChevronRight, ChevronLeft, Combine } from 'lucide-react';

export default function MergeCellVisualGuide() {
  const [step, setStep] = useState(0);
  const [isBlok, setIsBlok] = useState(false);
  const [isHomeOpen, setIsHomeOpen] = useState(false);
  const [isMerged, setIsMerged] = useState(false);
  const [isCentered, setIsCentered] = useState(false);

  const steps = [
    { title: 'Langkah 1: Blok Judul', instruction: 'Pilih rentang A1:E1 sebagai judul tabel.', hint: 'Klik tombol "Blok A1:E1".', validate: () => isBlok },
    { title: 'Langkah 2: Buka Tab Home', instruction: 'Klik tab **Home** di Ribbon.', hint: 'Klik tab Home.', validate: () => isHomeOpen },
    { title: 'Langkah 3: Merge & Center', instruction: 'Klik tombol **Merge & Center**.', hint: 'Klik tombol Merge & Center.', validate: () => isMerged },
    { title: 'Langkah 4: Rata Tengah', instruction: 'Pastikan judul berada di tengah dengan klik Center.', hint: 'Klik tombol Center.', validate: () => isCentered },
    { title: 'Selesai! 🎉', instruction: 'Judul sudah tergabung dan berada di tengah.', hint: 'Lihat hasil di kanan.', validate: () => true },
  ];

  const current = steps[step];

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
            <Combine size={20} className="shrink-0" />
            <p className="text-sm font-bold">{current.hint}</p>
          </div>
          <div className="mt-4 bg-red-50 border-2 border-red-300 rounded-lg p-2 text-xs font-bold text-red-700">
            ⚠️ Peringatan: Jika selain sel kiri atas berisi data, data tersebut akan hilang saat merge.
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
            <button onClick={() => { setIsMerged(true); if (step === 1) setStep(2); }} className={`px-3 py-1 border rounded font-bold text-xs ${isMerged ? 'bg-green-100' : 'bg-white'}`}>Merge & Center</button>
            {isMerged && <button onClick={() => { setIsCentered(true); if (step === 2) setStep(3); }} className={`px-3 py-1 border rounded font-bold text-xs ${isCentered ? 'bg-green-100' : 'bg-white'}`}>Center</button>}
          </div>
        )}
        <div className="flex-1 p-4 overflow-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              {isMerged ? (
                <tr>
                  <th colSpan={5} className={`bg-green-200 border-2 border-ink p-2 text-sm ${isCentered ? 'text-center' : 'text-left'}`}>
                    Judul Tabel Inventaris
                  </th>
                </tr>
              ) : (
                <tr className="bg-gray-200">
                  <th className={`border p-2 ${isBlok ? 'bg-blue-100' : ''}`}>A</th>
                  <th className={`border p-2 ${isBlok ? 'bg-blue-100' : ''}`}>B</th>
                  <th className={`border p-2 ${isBlok ? 'bg-blue-100' : ''}`}>C</th>
                  <th className={`border p-2 ${isBlok ? 'bg-blue-100' : ''}`}>D</th>
                  <th className={`border p-2 ${isBlok ? 'bg-blue-100' : ''}`}>E</th>
                </tr>
              )}
            </thead>
            <tbody>
              {['No', 'Nama', 'Kategori', 'Jumlah', 'Harga'].map((h, i) => (
                <tr key={i}>
                  <td className="border p-2">{h}</td>
                  <td className="border p-2">...</td>
                  <td className="border p-2">...</td>
                  <td className="border p-2">...</td>
                  <td className="border p-2">...</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-2 bg-blue-50 border-t-2 border-ink flex gap-2">
          {step === 0 && <button onClick={() => setIsBlok(true)} className={`px-3 py-1 border-2 border-ink rounded font-bold ${isBlok ? 'bg-green-500 text-white' : 'bg-white'}`}>{isBlok ? '✅ Terblok' : 'Blok A1:E1'}</button>}
        </div>
      </div>
    </div>
  );
}