'use client';

import { useState } from 'react';
import { ArrowDownAZ, Filter } from 'lucide-react';

export default function SortingFilteringVisual() {
  const [data, setData] = useState([
    { nama: 'Budi', nilai: 70 },
    { nama: 'Andi', nilai: 90 },
    { nama: 'Siti', nilai: 100 },
    { nama: 'Citra', nilai: 85 },
  ]);
  const [filtered, setFiltered] = useState<number | null>(null);

  const sortData = () => {
    setData([...data].sort((a, b) => a.nilai - b.nilai));
  };

  const filterData = () => {
    setFiltered(80);
  };

  const displayData = filtered ? data.filter(d => d.nilai >= filtered) : data;

  return (
    <div className="space-y-6">
      <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
        <h3 className="text-xl font-black mb-4 text-center">Simulasi Sorting & Filtering</h3>
        
        <div className="flex gap-3 mb-4">
          <button onClick={sortData} className="flex items-center gap-2 px-4 py-2 bg-blue-100 border-2 border-ink rounded-xl font-bold shadow-neo-sm hover:bg-blue-200">
            <ArrowDownAZ size={18} /> Sort A-Z
          </button>
          <button onClick={filterData} className="flex items-center gap-2 px-4 py-2 bg-yellow border-2 border-ink rounded-xl font-bold shadow-neo-sm hover:bg-yellow-200">
            <Filter size={18} /> Filter Nilai ≥ 80
          </button>
          <button onClick={() => { setFiltered(null); setData([...data].sort((a,b) => a.nama.localeCompare(b.nama))); }} className="px-4 py-2 bg-gray-100 border-2 border-ink rounded-xl font-bold">
            Reset
          </button>
        </div>

        <div className="border-2 border-ink rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Nama</th>
                <th className="border p-2">Nilai</th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((d, i) => (
                <tr key={i} className={d.nilai >= 80 ? 'bg-green-50' : ''}>
                  <td className="border p-2">{d.nama}</td>
                  <td className="border p-2 text-center">{d.nilai}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 bg-yellow border-2 border-ink rounded-xl p-3">
          <p className="text-sm font-bold">💡 Shortcut Filter: Ctrl + Shift + L</p>
        </div>
      </div>
    </div>
  );
}