'use client';

import { useState } from 'react';
import { Plus, Minus, X, Divide, ArrowRight } from 'lucide-react';

export default function OperasiMatematikaVisual() {
  const [activeOp, setActiveOp] = useState<string>('+');

  const examples: Record<string, { formula: string; result: string; steps: string[] }> = {
    '+': {
      formula: '=10 + 5',
      result: '15',
      steps: ['Ketik =', 'Ketik 10', 'Ketik +', 'Ketik 5', 'Tekan Enter'],
    },
    '-': {
      formula: '=20 - 8',
      result: '12',
      steps: ['Ketik =', 'Ketik 20', 'Ketik -', 'Ketik 8', 'Tekan Enter'],
    },
    '*': {
      formula: '=4 * 5',
      result: '20',
      steps: ['Ketik =', 'Ketik 4', 'Ketik *', 'Ketik 5', 'Tekan Enter'],
    },
    '/': {
      formula: '=100 / 4',
      result: '25',
      steps: ['Ketik =', 'Ketik 100', 'Ketik /', 'Ketik 4', 'Tekan Enter'],
    },
  };

  const ops = [
    { symbol: '+', label: 'Tambah', icon: Plus, color: 'bg-mint' },
    { symbol: '-', label: 'Kurang', icon: Minus, color: 'bg-pink' },
    { symbol: '*', label: 'Kali', icon: X, color: 'bg-yellow' },
    { symbol: '/', label: 'Bagi', icon: Divide, color: 'bg-blue' },
  ];

  const current = examples[activeOp];

  return (
    <div className="space-y-6">
      {/* Pilih Operator */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {ops.map((op) => (
          <button
            key={op.symbol}
            onClick={() => setActiveOp(op.symbol)}
            className={`p-3 border-2 border-ink rounded-xl font-bold text-sm transition-all flex flex-col items-center gap-1 ${
              activeOp === op.symbol ? `${op.color} shadow-neo` : 'bg-white hover:bg-gray-50'
            }`}
          >
            <op.icon size={24} />
            {op.label}
          </button>
        ))}
      </div>

      {/* Visual Formula & Result */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Formula */}
        <div className="bg-gray-800 text-mint border-2 border-ink rounded-xl p-6 flex flex-col items-center justify-center min-h-[120px]">
          <p className="text-sm text-gray-400 mb-2">Ketik di Cell:</p>
          <p className="text-3xl md:text-4xl font-mono font-black">{current.formula}</p>
        </div>

        {/* Result */}
        <div className="bg-mint border-2 border-ink rounded-xl p-6 flex flex-col items-center justify-center shadow-neo min-h-[120px]">
          <p className="text-sm text-green-800 font-bold mb-2">Hasil:</p>
          <p className="text-3xl md:text-4xl font-mono font-black text-green-900">{current.result}</p>
        </div>
      </div>

      {/* Langkah-langkah */}
      <div className="bg-yellow-50 border-2 border-dashed border-yellow-400 rounded-xl p-4">
        <p className="font-bold text-sm mb-3 text-yellow-800">📝 Langkah-langkahnya:</p>
        <div className="flex flex-wrap items-center gap-2">
          {current.steps.map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="bg-white border-2 border-ink rounded-lg px-3 py-1.5 text-xs font-bold shadow-sm">{step}</span>
              {i < current.steps.length - 1 && <ArrowRight size={16} className="text-gray-400" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}