'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function ConditionalFormattingVisual() {
  const [step, setStep] = useState(0);

  const steps = [
    { img: '/conditional-format/ConditionalFormatting1.png', title: 'Menu Utama CF', desc: 'Pilih Home > Conditional Formatting untuk melihat semua pilihan.' },
    { img: '/conditional-format/ConditionalFormatting2.png', title: 'Highlight Cells Rules', desc: 'Sorot nilai tertentu (Greater Than, Less Than, dll).' },
    { img: '/conditional-format/ConditionalFormatting3.png', title: 'Top/Bottom Rules', desc: 'Sorot nilai tertinggi/terendah.' },
    { img: '/conditional-format/ConditionalFormatting4.png', title: 'Data Bars', desc: 'Batang visual berdasarkan nilai.' },
    { img: '/conditional-format/ConditionalFormatting5.png', title: 'Color Scales', desc: 'Gradasi warna berdasarkan nilai.' },
    { img: '/conditional-format/ConditionalFormatting6.png', title: 'Icon Sets', desc: 'Ikon (panah, lampu, dll) berdasarkan kategori.' },
    { img: '/conditional-format/ConditionalFormatting7.png', title: 'New Formatting Rule', desc: 'Buat aturan kustom sendiri.' },
  ];

  const current = steps[step];

  return (
    <div className="space-y-6">
      <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
        <h3 className="text-xl font-black mb-4 text-center">{current.title}</h3>
        <div className="border-2 border-ink rounded-xl overflow-hidden mb-4">
          <Image 
            src={current.img} 
            alt={current.title} 
            width={800} 
            height={400} 
            className="w-full h-auto"
            unoptimized
          />
        </div>
        <p className="text-center text-gray-700 mb-4">{current.desc}</p>
        
        <div className="flex justify-between">
          <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} className="flex items-center gap-1 font-bold disabled:opacity-50">
            <ChevronLeft size={18} /> Sebelumnya
          </button>
          <span className="text-sm text-gray-500">Langkah {step + 1} dari {steps.length}</span>
          <button onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))} disabled={step === steps.length - 1} className="flex items-center gap-1 font-bold disabled:opacity-50">
            Selanjutnya <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}