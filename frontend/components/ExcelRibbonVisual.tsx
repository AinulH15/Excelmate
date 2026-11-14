'use client';

import { useState } from 'react';

export default function ExcelRibbonVisual() {
  const [format, setFormat] = useState<'general' | 'currency' | 'percent' | 'date'>('general');
  const [showDropdown, setShowDropdown] = useState(false);

  // Nilai simulasi di cell
  const cellValue = 1000;

  // Menentukan tampilan berdasarkan format yang dipilih
  const getDisplayValue = () => {
    if (format === 'currency') return 'Rp 1.000';
    if (format === 'percent') return '100000%'; // 1000 * 100%
    if (format === 'date') return '26/09/1902'; // Angka 1000 di Excel = 26 Sept 1902
    return cellValue.toString(); // General
  };

  return (
    <div className="border-2 border-ink rounded-xl overflow-hidden bg-white shadow-neo font-sans select-none">
      
      {/* 1. TITLE BAR */}
      <div className="bg-green-700 text-white text-xs px-3 py-1 flex justify-between items-center font-bold">
        <span>Book1 - Excel</span>
        <div className="flex gap-2"><span>—</span><span>□</span><span>X</span></div>
      </div>

      {/* 2. TABS MENU */}
      <div className="bg-gray-100 border-b-2 border-gray-300 flex text-xs font-bold pt-2 px-2 gap-1">
        <span className="bg-white border-t-2 border-l-2 border-r-2 border-green-600 text-green-700 px-3 py-1 rounded-t">Home</span>
        <span className="px-3 py-1 text-gray-600 hover:bg-gray-200 rounded-t cursor-pointer">Insert</span>
        <span className="px-3 py-1 text-gray-600 hover:bg-gray-200 rounded-t cursor-pointer">Page Layout</span>
        <span className="px-3 py-1 text-gray-600 hover:bg-gray-200 rounded-t cursor-pointer">Formulas</span>
        <span className="px-3 py-1 text-gray-600 hover:bg-gray-200 rounded-t cursor-pointer">Data</span>
        <span className="px-3 py-1 text-gray-600 hover:bg-gray-200 rounded-t cursor-pointer">Review</span>
        <span className="px-3 py-1 text-gray-600 hover:bg-gray-200 rounded-t cursor-pointer">View</span>
      </div>

      {/* 3. RIBBON TOOLBAR (Home Tab) */}
      <div className="bg-gray-50 border-b-2 border-gray-300 px-2 py-2 flex flex-wrap gap-4 items-start text-xs text-gray-700">
        
        {/* Grup Clipboard */}
        <div className="flex flex-col items-center border-r border-gray-300 pr-4">
          <div className="flex gap-1 mb-1">
            <div className="bg-white border border-gray-300 p-1 rounded shadow-sm hover:bg-gray-100 cursor-pointer">
              <span className="text-lg">📋</span>
            </div>
          </div>
          <span>Clipboard</span>
        </div>

        {/* Grup Font (Tiruan) */}
        <div className="flex flex-col items-center border-r border-gray-300 pr-4">
          <div className="flex gap-1 mb-1">
            <div className="bg-white border border-gray-300 px-2 py-1 rounded shadow-sm">Calibri</div>
            <div className="bg-white border border-gray-300 px-2 py-1 rounded shadow-sm">11</div>
            <div className="bg-white border border-gray-300 px-2 py-1 rounded font-bold shadow-sm">B</div>
            <div className="bg-white border border-gray-300 px-2 py-1 rounded italic shadow-sm">I</div>
            <div className="bg-white border border-gray-300 px-2 py-1 rounded underline shadow-sm">U</div>
          </div>
          <span>Font</span>
        </div>

        {/* Grup Alignment (Tiruan) */}
        <div className="flex flex-col items-center border-r border-gray-300 pr-4">
          <div className="flex gap-1 mb-1">
            <div className="bg-white border border-gray-300 px-2 py-1 rounded shadow-sm">≡</div>
            <div className="bg-white border border-gray-300 px-2 py-1 rounded shadow-sm">☰</div>
            <div className="bg-white border border-gray-300 px-2 py-1 rounded shadow-sm">≡</div>
          </div>
          <span>Alignment</span>
        </div>

        {/* 🔥 GRUP NUMBER (INTERAKTIF) */}
        <div className="flex flex-col items-center relative">
          <div className="flex gap-1 mb-1 items-center">
            {/* Dropdown Format */}
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className={`bg-white border-2 ${showDropdown ? 'border-green-600' : 'border-gray-300'} px-2 py-1 rounded shadow-sm flex items-center gap-1 font-bold min-w-[100px] justify-between`}
              >
                {format === 'general' && 'General'}
                {format === 'currency' && 'Currency'}
                {format === 'percent' && 'Percentage'}
                {format === 'date' && 'Short Date'}
                <span className="text-[10px] text-gray-500">▼</span>
              </button>

              {/* Isi Dropdown */}
              {showDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white border-2 border-ink rounded-lg shadow-neo z-50 w-40 overflow-hidden">
                  <button 
                    onClick={() => { setFormat('general'); setShowDropdown(false); }}
                    className="w-full text-left px-3 py-2 hover:bg-mint border-b border-gray-200 font-medium"
                  >
                    General
                  </button>
                  <button 
                    onClick={() => { setFormat('currency'); setShowDropdown(false); }}
                    className="w-full text-left px-3 py-2 hover:bg-mint border-b border-gray-200 font-medium"
                  >
                    💰 Currency
                  </button>
                  <button 
                    onClick={() => { setFormat('percent'); setShowDropdown(false); }}
                    className="w-full text-left px-3 py-2 hover:bg-mint border-b border-gray-200 font-medium"
                  >
                    📊 Percentage
                  </button>
                  <button 
                    onClick={() => { setFormat('date'); setShowDropdown(false); }}
                    className="w-full text-left px-3 py-2 hover:bg-mint font-medium"
                  >
                    📅 Short Date
                  </button>
                </div>
              )}
            </div>

            {/* Tombol Cepat */}
            <div className="bg-white border border-gray-300 px-2 py-1 rounded shadow-sm text-green-700 font-bold">Rp</div>
            <div className="bg-white border border-gray-300 px-2 py-1 rounded shadow-sm text-blue-700 font-bold">%</div>
            <div className="bg-white border border-gray-300 px-2 py-1 rounded shadow-sm">.00</div>
          </div>
          <span className="font-bold">Number</span>
        </div>

      </div>

      {/* 4. FORMULA BAR */}
      <div className="flex border-b-2 border-gray-300 text-xs">
        <div className="w-16 border-r-2 border-gray-300 flex items-center justify-center font-bold bg-white">A1</div>
        <div className="w-8 border-r-2 border-gray-300 flex items-center justify-center font-bold text-gray-500 bg-gray-50">fx</div>
        <div className="flex-1 px-2 py-1 bg-white">{format === 'general' ? '1000' : ''}</div>
      </div>

      {/* 5. GRID SPREADSHEET */}
      <div className="relative">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="w-8 bg-gray-200 border border-gray-300 p-1"></th>
              {['A', 'B', 'C', 'D', 'E'].map(col => (
                <th key={col} className="bg-gray-200 border border-gray-300 p-1 text-[10px] font-bold text-gray-600">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map(row => (
              <tr key={row}>
                <td className="bg-gray-200 border border-gray-300 p-1 text-[10px] font-bold text-center text-gray-600">{row}</td>
                {['A', 'B', 'C', 'D', 'E'].map(col => {
                  const cellId = `${col}${row}`;
                  const isActive = cellId === 'A1';
                  return (
                    <td 
                      key={cellId} 
                      className={`border border-gray-300 p-1 text-xs min-w-[60px] h-6 ${
                        isActive ? 'border-2 border-green-600 bg-green-50 relative' : ''
                      }`}
                    >
                      {isActive && (
                        <>
                          {getDisplayValue()}
                          {/* Kotak kecil di pojok kanan bawah (penanda cell aktif) */}
                          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-green-600"></div>
                        </>
                      )}
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