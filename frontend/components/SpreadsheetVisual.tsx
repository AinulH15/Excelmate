'use client';

export default function SpreadsheetVisual({ 
  data, 
  highlightCells = [], 
  showFormula = null, 
  showResult = null 
}: { 
  data: string[][], 
  highlightCells?: string[], 
  showFormula?: string | null,
  showResult?: string | null 
}) {
  const cols = ['A', 'B', 'C'];

  return (
    <div className="border-2 border-ink shadow-neo rounded-xl overflow-hidden bg-white select-none">
      {/* Formula Bar (Static) */}
      {showFormula && (
        <div className="flex border-b-2 border-ink bg-cream">
          <div className="w-16 bg-gray-200 border-r-2 border-ink flex items-center justify-center font-bold text-sm">
            {highlightCells[0] || 'Cell'}
          </div>
          <div className="px-2 font-bold text-gray-500 flex items-center border-r-2 border-ink">fx</div>
          <div className="flex-1 px-3 py-2 font-mono text-sm text-ink">{showFormula}</div>
        </div>
      )}

      {/* Grid Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="w-10 bg-gray-200 border border-gray-300 p-1"></th>
            {cols.map((col) => (
              <th key={col} className="bg-gray-200 border border-gray-300 p-1 font-bold text-sm text-gray-600">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="bg-gray-200 border border-gray-300 p-1 text-center font-bold text-sm text-gray-600">
                {rowIndex + 1}
              </td>
              {row.map((cell, colIndex) => {
                const cellId = `${cols[colIndex]}${rowIndex + 1}`;
                const isHighlighted = highlightCells.includes(cellId);
                const isResultCell = showResult && highlightCells[0] === cellId;

                return (
                  <td
                    key={cellId}
                    className={`border p-2 text-sm text-center min-w-[80px] transition-all
                      ${isHighlighted ? 'border-2 border-blue-500 bg-blue-100 font-bold text-blue-900 shadow-inner' : 'border-gray-300 text-gray-800'}
                      ${isResultCell ? 'bg-mint border-green-600 text-green-900 font-black' : ''}
                    `}
                  >
                    {isResultCell ? showResult : cell}
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