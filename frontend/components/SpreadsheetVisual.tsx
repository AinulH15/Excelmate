'use client';

interface HighlightGroup {
  cells: string[];
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'yellow';
}

interface CellFormula {
  cell: string;
  formula: string;
}

export default function SpreadsheetVisual({ 
  data, 
  highlightCells = [], 
  highlightColor = 'blue',
  multiHighlight = [],
  showFormula = null, 
  showResult = null,
  cellFormulas = [], // Properti baru: menampilkan rumus di sel tertentu
}: { 
  data: string[][], 
  highlightCells?: string[], 
  highlightColor?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'yellow',
  multiHighlight?: HighlightGroup[],
  showFormula?: string | null,
  showResult?: string | null,
  cellFormulas?: CellFormula[],
}) {
  const cols = ['A', 'B', 'C', 'D'];

  const colorMap = {
    blue: 'border-2 border-blue-500 bg-blue-100 font-bold',
    green: 'border-2 border-green-500 bg-green-100 font-bold',
    purple: 'border-2 border-purple-500 bg-purple-100 font-bold',
    orange: 'border-2 border-orange-500 bg-orange-100 font-bold',
    red: 'border-2 border-red-500 bg-red-100 font-bold',
    yellow: 'border-2 border-yellow-500 bg-yellow-100 font-bold',
  };

  const getCellStyle = (cellId: string) => {
    for (const group of multiHighlight) {
      if (group.cells.includes(cellId)) {
        return colorMap[group.color];
      }
    }
    if (highlightCells.includes(cellId)) {
      return colorMap[highlightColor];
    }
    return 'border border-gray-300 text-gray-700';
  };

  const getCellContent = (cellId: string, originalValue: string) => {
    // Cek apakah ada rumus yang harus ditampilkan di sel ini
    const cellFormula = cellFormulas.find(cf => cf.cell === cellId);
    if (cellFormula) return cellFormula.formula;
    
    // Jika ini sel hasil, tampilkan showResult
    if (showResult && highlightCells.includes(cellId) && highlightCells.length === 1) {
      return showResult;
    }

    return originalValue;
  };

  const isResultCell = (cellId: string) => {
    return showResult && highlightCells.includes(cellId) && highlightCells.length === 1;
  };

  return (
    <div className="border-2 border-ink shadow-neo rounded-xl overflow-hidden bg-white select-none">
      {showFormula && (
        <div className="flex border-b-2 border-ink bg-cream">
          <div className="w-16 bg-gray-200 border-r-2 border-ink flex items-center justify-center font-bold text-sm">
            {highlightCells[0] || 'Cell'}
          </div>
          <div className="px-2 font-bold text-gray-500 flex items-center border-r-2 border-ink">fx</div>
          <div className="flex-1 px-3 py-2 font-mono text-sm text-ink overflow-x-auto whitespace-nowrap">{showFormula}</div>
        </div>
      )}

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
                const resultCell = isResultCell(cellId);
                const content = getCellContent(cellId, cell);
                const isFormulaDisplayed = cellFormulas.some(cf => cf.cell === cellId);

                return (
                  <td
                    key={cellId}
                    className={`p-2 text-sm text-center min-w-[80px] transition-all
                      ${resultCell ? 'border-2 border-green-600 bg-mint text-green-900 font-black' : getCellStyle(cellId)}
                      ${isFormulaDisplayed ? 'font-mono text-xs' : ''}
                    `}
                  >
                    {content}
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