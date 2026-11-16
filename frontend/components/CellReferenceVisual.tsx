'use client';

import { useState } from 'react';
import { Info } from 'lucide-react';

export default function CellReferenceVisual() {
  const [activeType, setActiveType] = useState<'relative' | 'absolute' | 'mixed'>('relative');

  const data = {
    relative: {
      title: 'Relative (A1)',
      desc: 'Berubah saat copy-paste.',
      formula: '=C2*11%',
      result: '1.100',
      explanation: 'C2 dikalikan dengan 11% (angka langsung).',
      note: 'Jika copy ke D3, rumus jadi =C3*11%.',
      color: 'blue',
    },
    absolute: {
      title: 'Absolute ($A$1)',
      desc: 'Tetap saat copy-paste.',
      formula: '=C2*$G$1',
      result: '1.100',
      explanation: 'C2 dikalikan dengan nilai pajak di G1 yang dikunci.',
      note: 'Jika copy ke D3, rumus tetap =C3*$G$1. G1 tidak berubah.',
      color: 'green',
    },
    mixed: {
      title: 'Mixed ($A1 / A$1)',
      desc: 'Hanya kolom/baris tertentu yang terkunci.',
      formula: '=$C2*D$1',
      result: 'Sesuai konteks',
      explanation: 'Kolom C dikunci ($C), baris 1 dikunci (D$1).',
      note: 'Cocok untuk tabel dengan banyak kolom & baris.',
      color: 'yellow',
    },
  };

  const current = data[activeType];

  return (
    <div className="space-y-6">
      <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
        <h3 className="text-xl font-black mb-4 text-center">Pilih Tipe Referensi</h3>
        
        <div className="grid grid-cols-3 gap-3 mb-6">
          {(['relative', 'absolute', 'mixed'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`p-3 border-2 border-ink rounded-xl font-bold text-sm transition-all ${
                activeType === type 
                  ? `bg-${data[type].color} shadow-neo` 
                  : 'bg-white hover:bg-gray-50'
              }`}
            >
              {data[type].title}
            </button>
          ))}
        </div>

        <div className={`bg-${current.color}-50 border-2 border-${current.color}-300 rounded-xl p-6`}>
          <p className="text-sm mb-2">{current.desc}</p>
          
          <div className="bg-white border-2 border-ink rounded-lg p-4 mb-4">
            <p className="text-xs font-bold text-gray-500 mb-1">Rumus:</p>
            <code className="text-lg font-mono font-bold text-blue-700">{current.formula}</code>
            <p className="text-xs text-gray-500 mt-2">Hasil: {current.result}</p>
          </div>

          <div className="bg-white/50 p-3 rounded-lg mb-3">
            <p className="text-sm font-bold mb-1">Cara Membaca:</p>
            <p className="text-sm">{current.explanation}</p>
          </div>

          <div className="flex items-start gap-2 bg-yellow border-2 border-ink rounded-lg p-3">
            <Info size={18} className="shrink-0 mt-0.5" />
            <p className="text-sm font-bold">{current.note}</p>
          </div>
        </div>

        {/* Tabel Studi Kasus */}
        <div className="mt-6">
          <p className="font-bold mb-2">Studi Kasus: Menghitung Pajak 11%</p>
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Nama Barang</th>
                <th className="border p-2">Harga</th>
                <th className="border p-2">Pajak</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Buku</td><td className="border p-2 text-right">10.000</td><td className="border p-2 text-right">1.100</td></tr>
              <tr><td className="border p-2">Pulpen</td><td className="border p-2 text-right">5.000</td><td className="border p-2 text-right">550</td></tr>
              <tr><td className="border p-2">Tas</td><td className="border p-2 text-right">50.000</td><td className="border p-2 text-right">5.500</td></tr>
            </tbody>
          </table>
          <p className="text-xs text-gray-500 mt-2">Tarif pajak 11% disimpan di sel G1.</p>
        </div>
      </div>
    </div>
  );
}