'use client';

import { useState } from 'react';
import { ArrowDown, ArrowRight, Trash2 } from 'lucide-react';

export default function KeyboardVisual() {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const cells = [
    { id: 'A1', value: activeKey === 'enter' ? 'Terisi!' : '' },
    { id: 'A2', value: '' },
    { id: 'B1', value: activeKey === 'tab' ? 'Terisi!' : '' },
    { id: 'B2', value: '' },
    { id: 'A3', value: activeKey === 'delete' ? '(dihapus)' : 'Data Lama' },
  ];

  return (
    <div className="space-y-8">
      {/* Penjelasan Tombol */}
      <div className="grid md:grid-cols-3 gap-4">
        <button
          onClick={() => setActiveKey('enter')}
          className={`p-4 border-2 border-ink rounded-xl text-left transition-all ${
            activeKey === 'enter' ? 'bg-mint shadow-neo' : 'bg-white hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center gap-2 font-black text-lg mb-1">
            <ArrowDown size={20} /> Enter
          </div>
          <p className="text-sm text-gray-600">Menyimpan data dan pindah ke <strong>bawah</strong>.</p>
        </button>

        <button
          onClick={() => setActiveKey('tab')}
          className={`p-4 border-2 border-ink rounded-xl text-left transition-all ${
            activeKey === 'tab' ? 'bg-blue shadow-neo' : 'bg-white hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center gap-2 font-black text-lg mb-1">
            <ArrowRight size={20} /> Tab
          </div>
          <p className="text-sm text-gray-600">Menyimpan data dan pindah ke <strong>kanan</strong>.</p>
        </button>

        <button
          onClick={() => setActiveKey('delete')}
          className={`p-4 border-2 border-ink rounded-xl text-left transition-all ${
            activeKey === 'delete' ? 'bg-pink shadow-neo' : 'bg-white hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center gap-2 font-black text-lg mb-1">
            <Trash2 size={20} /> Delete
          </div>
          <p className="text-sm text-gray-600">Menghapus isi <strong>cell yang dipilih</strong>.</p>
        </button>
      </div>

      {/* Visual Grid */}
      <div className="border-2 border-ink shadow-neo rounded-xl overflow-hidden bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="w-10 bg-gray-200 border border-gray-300 p-2"></th>
              <th className="bg-gray-200 border border-gray-300 p-2 font-bold text-sm">A</th>
              <th className="bg-gray-200 border border-gray-300 p-2 font-bold text-sm">B</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map(row => (
              <tr key={row}>
                <td className="bg-gray-200 border border-gray-300 p-2 text-center font-bold text-sm">{row}</td>
                {['A', 'B'].map(col => {
                  const cellId = `${col}${row}`;
                  const cell = cells.find(c => c.id === cellId);
                  const isActive = 
                    (activeKey === 'enter' && cellId === 'A1') ||
                    (activeKey === 'tab' && cellId === 'B1') ||
                    (activeKey === 'delete' && cellId === 'A3');
                  return (
                    <td
                      key={cellId}
                      className={`border p-3 text-center text-sm min-h-[40px] transition-all ${
                        isActive ? 'bg-yellow-100 border-2 border-yellow-500 font-bold' : 'border-gray-300'
                      } ${cellId === 'A3' && activeKey === 'delete' ? 'text-red-500 line-through' : ''}`}
                    >
                      {cell?.value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pesan Instruksi */}
      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-4 text-center text-sm font-bold">
        {activeKey === 'enter' && <p className="text-green-700">✅ Data "Terisi!" masuk ke A1. Setelah tekan Enter, kursor pindah ke A2.</p>}
        {activeKey === 'tab' && <p className="text-blue-700">✅ Data "Terisi!" masuk ke B1. Setelah tekan Tab, kursor pindah ke C1.</p>}
        {activeKey === 'delete' && <p className="text-red-700">❌ Data di A3 dihapus. Cell jadi kosong.</p>}
        {!activeKey && <p className="text-gray-500">Klik salah satu tombol di atas untuk melihat perbedaannya.</p>}
      </div>
    </div>
  );
}