export const evaluateFormula = (formula: string, data: Record<string, string>): string => {
  try {
    // Jika bukan rumus (tidak diawali '='), kembalikan teks aslinya
    if (!formula.startsWith('=')) return formula;

    let expression = formula.substring(1).toUpperCase().trim();

    // Fungsi pembantu untuk mengekstrak nilai dari range (misal: A1:A3)
    const getRangeValues = (rangeStr: string): number[] => {
      const parts = rangeStr.split(':');
      if (parts.length !== 2) return [];
      
      const [start, end] = parts;
      const startCol = start.match(/[A-Z]+/)?.[0] || '';
      const startRow = parseInt(start.match(/\d+/)?.[0] || '1');
      const endCol = end.match(/[A-Z]+/)?.[0] || '';
      const endRow = parseInt(end.match(/\d+/)?.[0] || '1');

      const values: number[] = [];
      const colStartChar = startCol.charCodeAt(0);
      const colEndChar = endCol.charCodeAt(0);
      
      for (let row = startRow; row <= endRow; row++) {
        for (let col = colStartChar; col <= colEndChar; col++) {
          const cellRef = String.fromCharCode(col) + row;
          const val = parseFloat(data[cellRef] || '0');
          if (!isNaN(val)) values.push(val);
        }
      }
      return values;
    };

    // Ganti fungsi SUM(range)
    expression = expression.replace(/SUM\(([A-Z0-9:]+)\)/g, (_, range) => {
      return getRangeValues(range).reduce((a, b) => a + b, 0).toString();
    });

    // Ganti fungsi AVERAGE(range)
    expression = expression.replace(/AVERAGE\(([A-Z0-9:]+)\)/g, (_, range) => {
      const vals = getRangeValues(range);
      return vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length).toString() : '0';
    });

    // Ganti fungsi MAX(range)
    expression = expression.replace(/MAX\(([A-Z0-9:]+)\)/g, (_, range) => {
      const vals = getRangeValues(range);
      return vals.length ? Math.max(...vals).toString() : '0';
    });

    // Ganti fungsi MIN(range)
    expression = expression.replace(/MIN\(([A-Z0-9:]+)\)/g, (_, range) => {
      const vals = getRangeValues(range);
      return vals.length ? Math.min(...vals).toString() : '0';
    });

    // Evaluasi ekspresi matematika sisanya (misal: 10 + 20)
    if (/^[0-9+\-*/().\s]+$/.test(expression)) {
      const result = new Function(`return ${expression}`)();
      return result.toString();
    }

    return "#ERROR!";
  } catch (error) {
    return "#ERROR!";
  }
};