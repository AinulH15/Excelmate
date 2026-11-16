'use client';

import { useState } from 'react';
import { ChevronRight, ChevronLeft, Lightbulb, Table } from 'lucide-react';

export default function TableGuidedPractice() {
  const [step, setStep] = useState(0);
  const [isBlok, setIsBlok] = useState(false);
  const [isInsertOpen, setIsInsertOpen] = useState(false);
  const [isTableCreated, setIsTableCreated] = useState(false);

  const steps = [
    {
      title: 'Langkah 1: Blok Data',
      instruction: 'Blok seluruh data (A1:D5) termasuk judul kolom.',
      hint: 'Klik tombol "Blok Data" di bawah.',
      validate: () => isBlok,
    },
    {
      title: 'Langkah 2: Buka Menu Insert',
      instruction: 'Klik tab Insert di Ribbon Excel.',
      hint: 'Klik tab Insert di bagian atas.',
      validate: () => isInsertOpen,
    },
    {
      title: 'Langkah 3: Pilih Table',
      instruction: 'Klik tombol Table di grup Tables.',
      hint: 'Klik tombol "Table" yang muncul.',
      validate: () => isTableCreated,
    },
    {
      title: 'Selesai! 🎉',
      instruction: 'Data kamu sudah menjadi Excel Table. Tabel otomatis terformat dan siap difilter.',
      hint: 'Lihat tabel di sebelah kanan.',
      validate: () => true,
    },
  ];

  const current = steps[step];

  const handleNext = () => {
    if (current.validate() && step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handleReset = () => {
    setStep(0);
    setIsBlok(false);
    setIsInsertOpen(false);
    setIsTableCreated(false);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Panel Tutorial */}
      <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 flex flex-col min-h-[400px]">
        <div className="flex justify-between items-center mb-4 border-b-2 border-ink pb-4">
          <div>
            <span className="bg-yellow border-2 border-ink rounded-full px-3 py-1 text-xs font-black">
              Langkah {step + 1} dari {steps.length}
            </span>
            <h3 className="text-xl font-black mt-2">{current.title}</h3>
          </div>
          <button onClick={handleReset} className="text-gray-500 hover:text-red-500">
            <Table size={20} />
          </button>
        </div>
        <div className="flex-1">
          <p className="mb-4">{current.instruction}</p>
          <div className="bg-yellow border-2 border-ink rounded-xl p-3 flex gap-2 items-start">
            <Lightbulb size={20} className="shrink-0" />
            <p className="text-sm font-bold">{current.hint}</p>
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} className="font-bold disabled:opacity-50 flex items-center gap-1">
            <ChevronLeft size={18} /> Sebelumnya
          </button>
          {current.validate() ? (
            <button onClick={handleNext} disabled={step === steps.length - 1} className="bg-mint border-2 border-ink rounded-xl px-4 py-2 font-bold flex items-center gap-1">
              {step === steps.length - 1 ? 'Selesai' : 'Lanjut'} <ChevronRight size={18} />
            </button>
          ) : (
            <span className="text-sm text-gray-500 font-bold">Lakukan instruksi...</span>
          )}
        </div>
      </div>

      {/* Panel Spreadsheet */}
      <div className="border-2 border-ink rounded-xl overflow-hidden bg-white shadow-neo flex flex-col h-[400px]">
        <div className="bg-green-700 text-white text-xs font-bold px-3 py-1">Book1 - Excel</div>
        <div className="bg-gray-100 flex text-xs font-bold border-b-2 border-gray-300">
          <span className="px-3 py-1 text-gray-600">Home</span>
          <button 
            onClick={() => { setIsInsertOpen(true); if (step === 0 && isBlok) setStep(1); }} 
            className={`px-3 py-1 ${isInsertOpen ? 'bg-white border-t-2 border-l-2 border-r-2 border-green-600 text-green-700' : 'text-gray-600'}`}
          >
            Insert
          </button>
          <span className="px-3 py-1 text-gray-600">Data</span>
        </div>
        
        {isInsertOpen && step >= 1 && (
          <div className="bg-gray-50 border-b-2 p-2 flex gap-2">
            <button 
              onClick={() => { setIsTableCreated(true); if (step === 1) setStep(2); }} 
              className="flex items-center gap-1 px-3 py-1 bg-white border rounded font-bold"
            >
              <Table size={14} /> Table
            </button>
          </div>
        )}

        <div className="flex-1 p-2 overflow-auto">
          <table className="w-full text-xs border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-1 w-8"></th>
                <th className="border p-1">A</th>
                <th className="border p-1">B</th>
                <th className="border p-1">C</th>
                <th className="border p-1">D</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="bg-gray-100 border p-1 text-center font-bold">1</td>
                <td className={`border p-1 ${isBlok ? 'bg-blue-100' : ''}`}>Nama</td>
                <td className={`border p-1 ${isBlok ? 'bg-blue-100' : ''}`}>Nilai</td>
                <td className={`border p-1 ${isBlok ? 'bg-blue-100' : ''}`}>Kelas</td>
                <td className={`border p-1 ${isBlok ? 'bg-blue-100' : ''}`}>Status</td>
              </tr>
              {[
                ['Budi', '80', 'A', 'Lulus'],
                ['Andi', '70', 'B', 'Lulus'],
                ['Siti', '60', 'C', 'Gagal'],
                ['Citra', '90', 'A', 'Lulus'],
              ].map((row, i) => (
                <tr key={i} className={isTableCreated ? 'bg-green-50' : ''}>
                  <td className="bg-gray-100 border p-1 text-center">{i + 2}</td>
                  {row.map((cell, j) => (
                    <td key={j} className={`border p-1 ${isBlok ? 'bg-blue-100' : ''} ${isTableCreated ? 'font-bold' : ''}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tombol Aksi di bawah (opsional) */}
      <div className="md:col-span-2 flex justify-center gap-3">
        <button 
          onClick={() => { setIsBlok(true); if (step === 0) setStep(1); }} 
          className={`px-4 py-2 border-2 border-ink rounded-xl font-bold ${isBlok ? 'bg-green-100' : 'bg-white'}`}
        >
          {isBlok ? '✅ Data Terblok' : 'Blok Data'}
        </button>
      </div>
    </div>
  );
}