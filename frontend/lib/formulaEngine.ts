export const evaluateFormula = (formula: string, data: Record<string, string>): string => {
  try {
    // Jika bukan rumus (tidak diawali '='), kembalikan teks aslinya
    if (!formula.startsWith('=')) return formula;

    // Bersihkan formula dari '=' dan ubah ke UPPERCASE
    let expression = formula.substring(1).toUpperCase().trim();

    // Tandai apakah rumus ini memakai fungsi lookup (hasilnya boleh berupa teks)
    const isLookup = /(VLOOKUP|HLOOKUP|XLOOKUP)\(/.test(expression);

    // Helper: Mengubah referensi sel (A1) menjadi angka atau string
    const getCellValue = (cellRef: string): string | number => {
      const val = data[cellRef] || '';

      // Jika isinya rumus lain, evaluasi dulu (recursive)
      if (val.startsWith('=')) return evaluateFormula(val, data);

      // Cek apakah ini angka murni
      if (/^-?\d*\.?\d+$/.test(val.trim())) {
        return parseFloat(val);
      }

      return val;
    };

    // BARU: Helper untuk argumen lookup.
    // Bisa berupa referensi sel (F1), angka langsung (3), atau teks ("Apel")
    const resolveArg = (arg: string): string | number => {
      const a = arg.trim();
      if (/^[A-Z]+\d+$/.test(a)) return getCellValue(a);      // referensi sel
      if (/^-?\d*\.?\d+$/.test(a)) return parseFloat(a);      // angka langsung
      return a.replace(/^"(.*)"$/, '$1');                      // teks, buang tanda kutip
    };

    // Helper: Mengambil nilai dalam range (A1:A3) sebagai array
    const getRangeValues = (rangeStr: string): (string | number)[] => {
      const parts = rangeStr.split(':');
      if (parts.length !== 2) return [];

      const [start, end] = parts;
      const startCol = start.match(/[A-Z]+/)?.[0] || '';
      const startRow = parseInt(start.match(/\d+/)?.[0] || '1');
      const endCol = end.match(/[A-Z]+/)?.[0] || '';
      const endRow = parseInt(end.match(/\d+/)?.[0] || '1');

      const values: (string | number)[] = [];
      const colStartChar = startCol.charCodeAt(0);
      const colEndChar = endCol.charCodeAt(0);

      for (let row = startRow; row <= endRow; row++) {
        for (let col = colStartChar; col <= colEndChar; col++) {
          const cellRef = String.fromCharCode(col) + row;
          values.push(getCellValue(cellRef));
        }
      }
      return values;
    };

    // Helper: Filter hanya angka
    const getNumbersOnly = (arr: (string | number)[]) =>
      arr.filter(v => typeof v === 'number') as number[];

    // Helper untuk mem-parsing argumen (mendukung koma & titik koma)
    const parseArgs = (str: string): string[] => str.split(/[,;]/).map(s => s.trim());

    // ==========================================
    // 1. EKSEKUSI FUNGSI PENCARIAN (DIDAHULUKAN)
    // ==========================================

    // VLOOKUP
    expression = expression.replace(/VLOOKUP\(([^)]+)\)/g, (_, argsStr) => {
      const args = parseArgs(argsStr);
      const lookupValue = resolveArg(args[0]); // ← diganti
      const tableRange = args[1];
      const colIndex = parseInt(args[2]) - 1;

      const [startCell, endCell] = tableRange.split(':');
      const startCol = startCell.match(/[A-Z]+/)?.[0] || '';
      const startRow = parseInt(startCell.match(/\d+/)?.[0] || '1');
      const endRow = parseInt(endCell.match(/\d+/)?.[0] || '1');

      for (let row = startRow; row <= endRow; row++) {
        const checkCellRef = startCol + row;
        const cellValue = getCellValue(checkCellRef);

        if (String(cellValue).toLowerCase().trim() === String(lookupValue).toLowerCase().trim()) {
          const resultColChar = startCol.charCodeAt(0) + colIndex;
          const resultCellRef = String.fromCharCode(resultColChar) + row;
          return getCellValue(resultCellRef).toString();
        }
      }
      return "#N/A";
    });

    // HLOOKUP
    expression = expression.replace(/HLOOKUP\(([^)]+)\)/g, (_, argsStr) => {
      const args = parseArgs(argsStr);
      const lookupValue = resolveArg(args[0]); // ← diganti
      const tableRange = args[1];
      const rowIndex = parseInt(args[2]) - 1;

      const [startCell, endCell] = tableRange.split(':');
      const startCol = startCell.match(/[A-Z]+/)?.[0] || '';
      const startRow = parseInt(startCell.match(/\d+/)?.[0] || '1');
      const endCol = endCell.match(/[A-Z]+/)?.[0] || '';

      const startColChar = startCol.charCodeAt(0);
      const endColChar = endCol.charCodeAt(0);

      for (let col = startColChar; col <= endColChar; col++) {
        const checkCellRef = String.fromCharCode(col) + startRow;
        const cellValue = getCellValue(checkCellRef);

        if (String(cellValue).toLowerCase().trim() === String(lookupValue).toLowerCase().trim()) {
          const resultRow = startRow + rowIndex;
          const resultCellRef = String.fromCharCode(col) + resultRow;
          return getCellValue(resultCellRef).toString();
        }
      }
      return "#N/A";
    });

    // XLOOKUP
    expression = expression.replace(/XLOOKUP\(([^)]+)\)/g, (_, argsStr) => {
      const args = parseArgs(argsStr);
      const lookupValue = resolveArg(args[0]); // ← diganti
      const lookupRange = args[1];
      const returnRange = args[2];

      const lookupValues = getRangeValues(lookupRange);
      const returnValues = getRangeValues(returnRange);

      const index = lookupValues.findIndex(val =>
        String(val).toLowerCase().trim() === String(lookupValue).toLowerCase().trim()
      );

      if (index !== -1 && index < returnValues.length) {
        return returnValues[index].toString();
      }
      return "#N/A";
    });

    // Jika setelah eksekusi lookup hasilnya #N/A atau #ERROR, langsung kembalikan
    if (expression.includes('#')) return expression;

    // ==========================================
    // 2. FUNGSI MATEMATIKA DASAR
    // ==========================================
    expression = expression.replace(/SUM\(([A-Z0-9:]+)\)/g, (_, range) =>
      getNumbersOnly(getRangeValues(range)).reduce((a, b) => a + b, 0).toString()
    );
    expression = expression.replace(/AVERAGE\(([A-Z0-9:]+)\)/g, (_, range) => {
      const n = getNumbersOnly(getRangeValues(range));
      return n.length ? (n.reduce((a, b) => a + b, 0) / n.length).toString() : '0';
    });
    expression = expression.replace(/MAX\(([A-Z0-9:]+)\)/g, (_, range) => {
      const n = getNumbersOnly(getRangeValues(range));
      return n.length ? Math.max(...n).toString() : '0';
    });
    expression = expression.replace(/MIN\(([A-Z0-9:]+)\)/g, (_, range) => {
      const n = getNumbersOnly(getRangeValues(range));
      return n.length ? Math.min(...n).toString() : '0';
    });

    // ==========================================
    // 3. EVALUASI EKSPRESI MATEMATIKA SISA
    // ==========================================
    if (/^[0-9+\-*/().\s]+$/.test(expression)) {
      const result = new Function(`return ${expression}`)();
      return result.toString();
    }

    // Hasil lookup berupa teks (misal "Budi") -> kembalikan apa adanya
    if (isLookup) return expression;

    return "#ERROR!";
  } catch (error) {
    console.error("Formula Engine Error:", error);
    return "#ERROR!";
  }
};