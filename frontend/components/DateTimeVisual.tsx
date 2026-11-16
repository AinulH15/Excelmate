'use client';

import { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';

export default function DateTimeVisual() {
  const [activeFunc, setActiveFunc] = useState<string>('TODAY');

  const functions = [
    { name: 'TODAY', desc: 'Tanggal hari ini', example: '=TODAY()', result: new Date().toLocaleDateString('id-ID') },
    { name: 'NOW', desc: 'Tanggal & waktu sekarang', example: '=NOW()', result: new Date().toLocaleString('id-ID') },
    { name: 'MONTH', desc: 'Mengambil bulan dari tanggal', example: '=MONTH("15/11/2026")', result: '11' },
    { name: 'YEAR', desc: 'Mengambil tahun dari tanggal', example: '=YEAR("15/11/2026")', result: '2026' },
    { name: 'DAY', desc: 'Mengambil hari dari tanggal', example: '=DAY("15/11/2026")', result: '15' },
  ];

  const current = functions.find(f => f.name === activeFunc) || functions[0];

  return (
    <div className="space-y-6">
      <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
        <h3 className="text-xl font-black mb-4 text-center">Pilih Fungsi Tanggal & Waktu</h3>
        
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {functions.map((f) => (
            <button
              key={f.name}
              onClick={() => setActiveFunc(f.name)}
              className={`px-4 py-2 border-2 border-ink rounded-lg font-bold transition-all ${
                activeFunc === f.name ? 'bg-mint shadow-neo' : 'bg-white hover:bg-gray-50'
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-800 text-mint p-4 rounded-xl">
            <p className="text-sm text-gray-400 mb-2">Rumus:</p>
            <code className="text-lg font-mono">{current.example}</code>
          </div>
          <div className="bg-mint border-2 border-ink rounded-xl p-4">
            <p className="text-sm font-bold text-green-800 mb-1">Hasil:</p>
            <p className="text-2xl font-black">{current.result}</p>
          </div>
        </div>

        <div className="mt-4 bg-yellow border-2 border-ink rounded-xl p-3">
          <p className="text-sm font-bold">{current.desc}</p>
        </div>

        {/* Visual Spreadsheet */}
        <div className="mt-6 border-2 border-ink rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">A</th>
                <th className="border p-2">B</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2 text-center bg-blue-100 font-bold">{current.example.split('=')[1].split('(')[0]}</td>
                <td className="border p-2 text-center bg-mint font-bold">{current.result}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}