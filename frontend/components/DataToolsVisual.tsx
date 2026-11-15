'use client';

import { useState } from 'react';
import { ArrowDownUp, Filter, Palette, ShieldCheck } from 'lucide-react';

export default function DataToolsVisual() {
  const [activeTool, setActiveTool] = useState<string>('sort');

  const tools = [
    { id: 'sort', label: 'Sorting', icon: ArrowDownUp },
    { id: 'filter', label: 'Filter', icon: Filter },
    { id: 'format', label: 'Cond. Format', icon: Palette },
    { id: 'valid', label: 'Data Valid.', icon: ShieldCheck },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className={`p-3 border-2 border-ink rounded-xl font-bold text-sm flex flex-col items-center gap-2 transition-all ${
              activeTool === tool.id ? 'bg-mint shadow-neo' : 'bg-white hover:bg-gray-50'
            }`}
          >
            <tool.icon size={24} />
            {tool.label}
          </button>
        ))}
      </div>

      <div className="bg-white border-2 border-ink rounded-xl p-6 shadow-neo">
        {activeTool === 'sort' && (
          <div className="space-y-4">
            <h4 className="font-bold text-lg">Sorting (Mengurutkan)</h4>
            <p className="text-sm mb-4">Data diurutkan dari nilai terkecil ke terbesar.</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold text-gray-500 mb-1">Sebelum:</p>
                <table className="w-full text-sm border-collapse">
                  <thead><tr className="bg-gray-100"><th className="border p-2">Nama</th><th className="border p-2">Nilai</th></tr></thead>
                  <tbody>
                    <tr><td className="border p-2">Budi</td><td className="border p-2">70</td></tr>
                    <tr><td className="border p-2">Andi</td><td className="border p-2">90</td></tr>
                    <tr><td className="border p-2">Siti</td><td className="border p-2">100</td></tr>
                  </tbody>
                </table>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-1">Sesudah (Ascending):</p>
                <table className="w-full text-sm border-collapse">
                  <thead><tr className="bg-mint"><th className="border p-2">Nama</th><th className="border p-2">Nilai</th></tr></thead>
                  <tbody>
                    <tr><td className="border p-2">Budi</td><td className="border p-2">70</td></tr>
                    <tr><td className="border p-2">Andi</td><td className="border p-2">90</td></tr>
                    <tr className="bg-mint font-bold"><td className="border p-2">Siti</td><td className="border p-2">100</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTool === 'filter' && (
          <div className="space-y-4">
            <h4 className="font-bold text-lg">Filter (Menyaring)</h4>
            <p className="text-sm mb-4">Hanya menampilkan data yang memenuhi kriteria (misal: nilai &gt;= 80).</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold text-gray-500 mb-1">Sebelum (Semua Data):</p>
                <table className="w-full text-sm border-collapse">
                  <thead><tr className="bg-gray-100"><th className="border p-2">Nama</th><th className="border p-2">Nilai</th></tr></thead>
                  <tbody>
                    <tr><td className="border p-2">Budi</td><td className="border p-2">70</td></tr>
                    <tr><td className="border p-2">Andi</td><td className="border p-2">90</td></tr>
                    <tr><td className="border p-2">Siti</td><td className="border p-2">100</td></tr>
                  </tbody>
                </table>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-1">Sesudah (Nilai &gt;= 80):</p>
                <table className="w-full text-sm border-collapse">
                  <thead><tr className="bg-yellow"><th className="border p-2">Nama</th><th className="border p-2">Nilai</th></tr></thead>
                  <tbody>
                    <tr><td className="border p-2">Andi</td><td className="border p-2">90</td></tr>
                    <tr className="bg-yellow"><td className="border p-2">Siti</td><td className="border p-2">100</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTool === 'format' && (
          <div className="space-y-4">
            <h4 className="font-bold text-lg">Conditional Formatting</h4>
            <p className="text-sm mb-4">Cell yang nilainya di bawah 75 akan otomatis berwarna merah.</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold text-gray-500 mb-1">Sebelum (Tanpa Format):</p>
                <table className="w-full text-sm border-collapse">
                  <thead><tr className="bg-gray-100"><th className="border p-2">Nama</th><th className="border p-2">Nilai</th></tr></thead>
                  <tbody>
                    <tr><td className="border p-2">Budi</td><td className="border p-2">70</td></tr>
                    <tr><td className="border p-2">Andi</td><td className="border p-2">60</td></tr>
                    <tr><td className="border p-2">Siti</td><td className="border p-2">100</td></tr>
                  </tbody>
                </table>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-1">Sesudah (Format Otomatis):</p>
                <table className="w-full text-sm border-collapse">
                  <thead><tr className="bg-pink"><th className="border p-2">Nama</th><th className="border p-2">Nilai</th></tr></thead>
                  <tbody>
                    <tr><td className="border p-2">Budi</td><td className="border p-2 text-red-600 font-bold bg-red-100">70</td></tr>
                    <tr><td className="border p-2">Andi</td><td className="border p-2 text-red-600 font-bold bg-red-100">60</td></tr>
                    <tr><td className="border p-2">Siti</td><td className="border p-2">100</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTool === 'valid' && (
          <div className="space-y-4">
            <h4 className="font-bold text-lg">Data Validation</h4>
            <p className="text-sm mb-4">Hanya boleh memasukkan angka 1-100. Jika memasukkan 150, muncul error.</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold text-gray-500 mb-1">Input Diterima:</p>
                <div className="bg-green-50 border-2 border-green-400 p-3 rounded-lg text-center text-green-700 font-bold">
                  Nilai 80 dimasukkan. Berhasil!
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-1">Input Ditolak:</p>
                <div className="bg-red-50 border-2 border-red-400 p-3 rounded-lg text-center text-red-700 font-bold">
                  Nilai 150 dimasukkan. Error! Melebihi batas.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}