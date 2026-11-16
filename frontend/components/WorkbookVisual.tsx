'use client';

import { useState } from 'react';
import { Plus, Edit3, MoveHorizontal } from 'lucide-react';

export default function WorkbookVisual() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: 'Tambah Sheet Baru',
      icon: <Plus size={24} />,
      desc: 'Klik ikon + di samping tab Sheet untuk menambah worksheet baru.',
      before: ['Sheet1'],
      after: ['Sheet1', 'Sheet2'],
      highlight: '+',
    },
    {
      title: 'Ganti Nama Sheet',
      icon: <Edit3 size={24} />,
      desc: 'Klik kanan pada tab sheet, lalu pilih Rename. Ketik nama baru.',
      before: ['Sheet1', 'Sheet2'],
      after: ['Data Januari', 'Sheet2'],
      highlight: 'Sheet1',
    },
    {
      title: 'Atur Lebar Kolom',
      icon: <MoveHorizontal size={24} />,
      desc: 'Arahkan kursor ke garis pembatas antar header kolom, lalu drag ke kiri/kanan.',
      before: ['Kolom A sempit', 'Kolom B sempit'],
      after: ['Kolom A lebar', 'Kolom B lebar'],
      highlight: 'garis pembatas',
    },
  ];

  const current = steps[step];

  return (
    <div className="space-y-6">
      <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
        <div className="flex items-center gap-3 mb-4">
          {current.icon}
          <h3 className="text-xl font-black">{current.title}</h3>
        </div>
        <p className="text-gray-700 mb-6">{current.desc}</p>

        {/* Before After */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-bold text-gray-500 mb-2">Sebelum:</p>
            <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-3">
              {current.before.map((item, i) => (
                <div key={i} className={`bg-white border border-gray-300 px-3 py-1 text-sm mb-1 rounded ${current.highlight === item ? 'ring-2 ring-red-400' : ''}`}>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-green-700 mb-2">Sesudah:</p>
            <div className="bg-green-50 border-2 border-green-400 rounded-lg p-3">
              {current.after.map((item, i) => (
                <div key={i} className="bg-white border border-green-300 px-3 py-1 text-sm mb-1 rounded">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-6 flex justify-between">
          <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} className="px-4 py-2 border-2 border-ink rounded-xl font-bold disabled:opacity-50">
            Sebelumnya
          </button>
          <span className="text-sm font-bold text-gray-500">Langkah {step + 1} dari {steps.length}</span>
          <button onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))} disabled={step === steps.length - 1} className="px-4 py-2 bg-mint border-2 border-ink rounded-xl font-bold disabled:opacity-50">
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
}