'use client';

export default function WorksheetVisual({ 
  highlightCells = [], 
  highlightColor = 'blue',
  label 
}: { 
  highlightCells?: string[], 
  highlightColor?: 'blue' | 'green' | 'yellow',
  label?: string 
}) {
  const cols = ['A', 'B', 'C', 'D'];
  const rows = [1, 2, 3, 4];

  const colorMap = {
    blue: 'border-blue-500 bg-blue-200 ring-2 ring-blue-400',
    green: 'border-green-500 bg-green-200 ring-2 ring-green-400',
    yellow: 'border-yellow-500 bg-yellow-200 ring-2 ring-yellow-400',
  };

  return (
    <div className="border-2 border-ink shadow-neo rounded-xl overflow-hidden bg-white select-none w-full">
      <div className="bg-gray-100 border-b-2 border-ink px-4 py-2 text-sm font-bold text-gray-600 flex justify-between items-center">
        <span>Sheet1</span>
        {label && <span className="bg-white border border-ink px-2 py-0.5 rounded text-xs">{label}</span>}
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="w-8 bg-gray-200 border border-gray-300 p-1"></th>
            {cols.map(col => (
              <th key={col} className="bg-gray-200 border border-gray-300 p-1 text-xs font-bold text-gray-600">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row}>
              <td className="bg-gray-200 border border-gray-300 p-1 text-xs font-bold text-center text-gray-600">{row}</td>
              {cols.map(col => {
                const cellId = `${col}${row}`;
                const isHighlighted = highlightCells.includes(cellId);
                return (
                  <td
                    key={cellId}
                    className={`border p-2 text-xs text-center min-w-[50px] h-8 transition-all ${
                      isHighlighted 
                        ? colorMap[highlightColor] 
                        : 'border-gray-300 text-gray-400 bg-white'
                    }`}
                  >
                    {cellId}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}