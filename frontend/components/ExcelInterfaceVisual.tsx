'use client';

import { useState } from 'react';

export default function ExcelInterfaceVisual() {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  return (
    <div className="border-2 border-ink shadow-neo rounded-xl overflow-hidden bg-white select-none w-full max-w-2xl mx-auto font-sans text-sm">
      {/* Title Bar Tiruan */}
      <div className="bg-green-700 text-white px-3 py-1 flex items-center justify-between text-xs font-bold">
        <span>Book1 - Excel</span>
        <div className="flex gap-2">
          <span>—</span><span>□</span><span>X</span>
        </div>
      </div>

      {/* 1. RIBBON (Menu) */}
      <div 
        className={`border-b-2 border-gray-300 transition-colors cursor-pointer ${hoveredPart === 'ribbon' ? 'bg-blue-200' : 'bg-gray-100'}`}
        onMouseEnter={() => setHoveredPart('ribbon')}
        onMouseLeave={() => setHoveredPart(null)}
        onClick={() => setHoveredPart('ribbon')}
      >
        <div className="flex gap-4 px-4 pt-2 text-xs text-gray-600 font-semibold border-b border-gray-300">
          <span className="text-green-700 border-b-2 border-green-700 pb-1">Home</span>
          <span>Insert</span>
          <span>Page Layout</span>
          <span>Formulas</span>
          <span>Data</span>
          <span>Review</span>
          <span>View</span>
        </div>
        <div className="flex gap-4 px-4 py-2 items-center text-xs">
          <div className="flex gap-1">
            <span className="bg-white border px-2 py-1 rounded">Paste</span>
          </div>
          <div className="h-6 w-px bg-gray-300"></div>
          <div className="flex gap-1">
            <span className="bg-white border px-2 py-1 rounded font-bold">B</span>
            <span className="bg-white border px-2 py-1 rounded italic">I</span>
            <span className="bg-white border px-2 py-1 rounded underline">U</span>
          </div>
          <div className="h-6 w-px bg-gray-300"></div>
          <div className="flex gap-1">
            <span className="bg-white border px-2 py-1 rounded">A</span>
            <span className="bg-white border px-2 py-1 rounded">A</span>
          </div>
        </div>
      </div>

      {/* 2. FORMULA BAR */}
      <div 
        className={`flex border-b-2 border-gray-300 transition-colors cursor-pointer ${hoveredPart === 'formula' ? 'bg-yellow-200' : 'bg-white'}`}
        onMouseEnter={() => setHoveredPart('formula')}
        onMouseLeave={() => setHoveredPart(null)}
        onClick={() => setHoveredPart('formula')}
      >
        {/* Name Box */}
        <div className="w-16 border-r-2 border-gray-300 flex items-center justify-center text-xs font-bold bg-gray-50">
          A1
        </div>
        {/* Ikon fx */}
        <div className="w-8 border-r-2 border-gray-300 flex items-center justify-center text-xs font-bold text-gray-500 bg-gray-50">
          fx
        </div>
        {/* Input Formula Bar */}
        <div className="flex-1 px-2 py-1.5 text-gray-800">
          Halo Excel
        </div>
      </div>

      {/* 3. GRID (Kolom & Baris) */}
      <div 
        className={`relative transition-colors cursor-pointer ${hoveredPart === 'grid' ? 'bg-green-100' : 'bg-white'}`}
        onMouseEnter={() => setHoveredPart('grid')}
        onMouseLeave={() => setHoveredPart(null)}
        onClick={() => setHoveredPart('grid')}
      >
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="w-8 bg-gray-200 border border-gray-300 p-1"></th>
              {['A', 'B', 'C', 'D', 'E'].map(col => (
                <th key={col} className="bg-gray-200 border border-gray-300 p-1 text-xs font-bold text-gray-600">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map(row => (
              <tr key={row}>
                <td className="bg-gray-200 border border-gray-300 p-1 text-xs font-bold text-center text-gray-600">{row}</td>
                {['A', 'B', 'C', 'D', 'E'].map(col => {
                  const cellId = `${col}${row}`;
                  const isSelected = cellId === 'A1';
                  return (
                    <td 
                      key={cellId} 
                      className={`border border-gray-300 p-1 text-xs min-w-[50px] h-6 ${isSelected ? 'border-2 border-green-600 bg-green-50' : ''}`}
                    >
                      {isSelected ? 'Halo Excel' : ''}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}