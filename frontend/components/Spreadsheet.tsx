'use client';

import { useState } from 'react';
import { evaluateFormula } from '@/lib/formulaEngine';
import InteractiveTutorial from './InteractiveTutorial';

const ROWS = 10;
const COLS = 3; // A, B, C

export default function Spreadsheet() {
  const [data, setData] = useState<Record<string, string>>({});
  const [activeCell, setActiveCell] = useState<string>('A1');
  const [formulaInput, setFormulaInput] = useState<string>('');

  const handleCellClick = (cellId: string) => {
    setActiveCell(cellId);
    setFormulaInput(data[cellId] || '');
  };

  const commitFormula = () => {
    if (activeCell) {
      setData(prev => ({ ...prev, [activeCell]: formulaInput }));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      commitFormula();
    }
  };

  const getDisplayValue = (cellId: string) => {
    const rawValue = data[cellId] || '';
    if (rawValue.startsWith('=')) {
      return evaluateFormula(rawValue, data);
    }
    return rawValue;
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      {/* Kiri: Tutorial */}
      <div className="sticky top-24">
        <InteractiveTutorial 
          data={data} 
          activeCell={activeCell} 
          onReset={() => { setData({}); setActiveCell('A1'); setFormulaInput(''); }} 
        />
      </div>

      {/* Kanan: Excel Grid */}
      <div className="border-2 border-ink shadow-neo rounded-xl overflow-hidden bg-white select-none">
        {/* Formula Bar */}
        <div className="flex border-b-2 border-ink bg-cream">
          <div className="w-16 bg-gray-200 border-r-2 border-ink flex items-center justify-center font-bold">
            {activeCell}
          </div>
          <div className="px-2 font-bold text-gray-500 flex items-center border-r-2 border-ink">fx</div>
          <input
            type="text"
            value={formulaInput}
            onChange={(e) => setFormulaInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={commitFormula}
            className="flex-1 px-2 py-2 outline-none font-mono"
            placeholder="Ketik rumus atau teks..."
          />
        </div>

        {/* Grid */}
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="w-10 bg-gray-200 border-2 border-ink p-1"></th>
              {Array.from({ length: COLS }).map((_, i) => (
                <th key={i} className="bg-gray-200 border-2 border-ink p-1 font-bold text-sm">
                  {String.fromCharCode(65 + i)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: ROWS }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                <td className="bg-gray-200 border-2 border-ink p-1 text-center font-bold text-sm">
                  {rowIndex + 1}
                </td>
                {Array.from({ length: COLS }).map((_, colIndex) => {
                  const cellId = `${String.fromCharCode(65 + colIndex)}${rowIndex + 1}`;
                  const isActive = activeCell === cellId;
                  
                  return (
                    <td
                      key={cellId}
                      onClick={() => handleCellClick(cellId)}
                      className={`border-2 border-ink p-2 text-sm text-center cursor-pointer min-w-[80px] transition-colors ${
                        isActive ? 'bg-blue-100 ring-2 ring-inset ring-blue-500' : 'bg-white hover:bg-gray-50'
                      }`}
                    >
                      {getDisplayValue(cellId)}
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