'use client';

import { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import SpreadsheetVisual from './SpreadsheetVisual';

interface Props {
  slug: string;
}

export default function FormulaVisual({ slug }: Props) {
  const [activePart, setActivePart] = useState<string | null>(null);
  const [activeTextFunc, setActiveTextFunc] = useState<string>('left');
  const [lookupInput, setLookupInput] = useState('');

  const handleReset = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName !== 'BUTTON' && (e.target as HTMLElement).tagName !== 'INPUT') {
      setActivePart(null);
    }
  };

  // ==========================================
  // FUNGSI LOOKUP (VLOOKUP)
  // ==========================================
  if (slug === 'fungsi-lookup') {
    return (
      <div className="space-y-8" onClick={handleReset}>
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
          <h3 className="text-xl font-bold mb-6 text-center">Simulasi VLOOKUP</h3>
          <p className="text-center text-sm text-gray-500 mb-4">Ketik nama buah di kolom C, lalu tekan Enter.</p>

          <div className="grid md:grid-cols-2 gap-6 items-start">
            {/* Tabel Data */}
            <div className="border-2 border-ink rounded-xl overflow-hidden bg-white">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="bg-gray-200 border p-2 text-sm">A (Buah)</th>
                    <th className="bg-gray-200 border p-2 text-sm">B (Harga)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-2 text-center">Apel</td><td className="border p-2 text-center">5000</td></tr>
                  <tr><td className="border p-2 text-center">Jeruk</td><td className="border p-2 text-center">7000</td></tr>
                  <tr><td className="border p-2 text-center">Mangga</td><td className="border p-2 text-center">8000</td></tr>
                </tbody>
              </table>
            </div>

            {/* Kolom Pencarian & Hasil */}
            <div className="space-y-4">
              <div>
                <p className="font-bold text-sm mb-1">Ketik nama buah (D1):</p>
                <input 
                  type="text" 
                  placeholder="Apel/Jeruk/Mangga"
                  className="border-2 border-ink rounded-lg px-4 py-2 font-bold w-full"
                  onChange={(e) => setLookupInput(e.target.value.toLowerCase())}
                />
              </div>
              <div>
                <p className="font-bold text-sm mb-1">Rumus (E1):</p>
                <div 
                  className="bg-gray-100 border-2 border-ink rounded-lg p-3 font-mono text-sm cursor-pointer"
                  onClick={() => setActivePart('vlookup')}
                >
                  {activePart === 'vlookup' 
                    ? '=VLOOKUP(D1, A1:B3, 2, FALSE)'
                    : 'Klik untuk lihat rumus'}
                </div>
              </div>
              <div>
                <p className="font-bold text-sm mb-1">Hasil (E1):</p>
                <div className="bg-mint border-2 border-ink rounded-lg p-3 text-center font-black text-2xl text-green-800">
                  {lookupInput === 'apel' ? '5000' : lookupInput === 'jeruk' ? '7000' : lookupInput === 'mangga' ? '8000' : '-'}
                </div>
              </div>
            </div>
          </div>

          {/* Penjelasan Rumus */}
          {activePart === 'vlookup' && (
            <div className="mt-6 bg-yellow-50 border-2 border-dashed border-yellow-400 rounded-xl p-4">
              <p className="font-bold text-sm mb-2">Penjelasan Rumus VLOOKUP:</p>
              <ul className="text-sm space-y-1">
                <li><strong>=</strong> Tanda mulai rumus.</li>
                <li><strong>VLOOKUP</strong> Nama fungsi (Vertical Lookup).</li>
                <li><strong>D1</strong> Nilai yang dicari (nama buah yang diketik).</li>
                <li><strong>A1:B3</strong> Tabel referensi (kolom A sampai B).</li>
                <li><strong>2</strong> Kolom ke-2 (Harga) yang akan diambil.</li>
                <li><strong>FALSE</strong> Pencarian persis (exact match).</li>
              </ul>
            </div>
          )}
        </div>

        {/* HLOOKUP & XLOOKUP (Informasi Tambahan) */}
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
          <h3 className="text-xl font-bold mb-4 text-center">HLOOKUP & XLOOKUP</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border-2 border-dashed border-blue-300 p-4 rounded-xl">
              <p className="font-bold text-blue-800 mb-1">HLOOKUP (Horizontal)</p>
              <p className="text-sm">Sama seperti VLOOKUP, tapi mencari secara horizontal (baris).</p>
              <code className="text-xs bg-white p-1 rounded mt-2 block">=HLOOKUP(A1, A1:D5, 3, FALSE)</code>
            </div>
            <div className="bg-green-50 border-2 border-dashed border-green-300 p-4 rounded-xl">
              <p className="font-bold text-green-800 mb-1">XLOOKUP (Modern)</p>
              <p className="text-sm">Versi lebih fleksibel dari VLOOKUP. Bisa mencari ke kiri atau kanan.</p>
              <code className="text-xs bg-white p-1 rounded mt-2 block">=XLOOKUP(D1, A1:A3, B1:B3)</code>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // FUNGSI TEKS
  // ==========================================
  if (slug === 'fungsi-teks') {
    const textFuncs = {
      left: {
        name: 'LEFT',
        desc: 'Mengambil sejumlah karakter dari sisi KIRI teks.',
        parts: [
          { key: 'fungsi', text: 'LEFT', color: 'text-blue-600', label: 'Nama fungsi untuk mengambil dari kiri.' },
          { key: 'teks', text: '"EXCEL-001"', color: 'text-purple-600', label: 'Teks sumber yang akan dipotong.' },
          { key: 'jumlah', text: '3', color: 'text-orange-500', label: 'Jumlah karakter yang diambil dari kiri.' },
        ],
        example: '=LEFT("EXCEL-001", 3)',
        result: '"EXC"',
        highlight: 'A2',
      },
      right: {
        name: 'RIGHT',
        desc: 'Mengambil sejumlah karakter dari sisi KANAN teks.',
        parts: [
          { key: 'fungsi', text: 'RIGHT', color: 'text-blue-600', label: 'Nama fungsi untuk mengambil dari kanan.' },
          { key: 'teks', text: '"EXCEL-001"', color: 'text-purple-600', label: 'Teks sumber yang akan dipotong.' },
          { key: 'jumlah', text: '3', color: 'text-orange-500', label: 'Jumlah karakter yang diambil dari kanan.' },
        ],
        example: '=RIGHT("EXCEL-001", 3)',
        result: '"001"',
        highlight: 'A2',
      },
      mid: {
        name: 'MID',
        desc: 'Mengambil sejumlah karakter dari TENGAH teks.',
        parts: [
          { key: 'fungsi', text: 'MID', color: 'text-blue-600', label: 'Nama fungsi untuk mengambil dari tengah.' },
          { key: 'teks', text: '"EXCEL-001"', color: 'text-purple-600', label: 'Teks sumber yang akan dipotong.' },
          { key: 'mulai', text: '2', color: 'text-orange-500', label: 'Posisi awal mulai memotong.' },
          { key: 'jumlah', text: '3', color: 'text-green-600', label: 'Jumlah karakter yang diambil.' },
        ],
        example: '=MID("EXCEL-001", 2, 3)',
        result: '"XCE"',
        highlight: 'A2',
      },
      len: {
        name: 'LEN',
        desc: 'Menghitung jumlah karakter dalam teks.',
        parts: [
          { key: 'fungsi', text: 'LEN', color: 'text-blue-600', label: 'Nama fungsi untuk menghitung panjang teks.' },
          { key: 'teks', text: '"EXCEL-001"', color: 'text-purple-600', label: 'Teks yang akan dihitung panjangnya.' },
        ],
        example: '=LEN("EXCEL-001")',
        result: '9',
        highlight: 'A2',
      },
      concat: {
        name: 'CONCAT',
        desc: 'Menggabungkan beberapa teks menjadi satu.',
        parts: [
          { key: 'fungsi', text: 'CONCAT', color: 'text-blue-600', label: 'Nama fungsi untuk menggabungkan teks.' },
          { key: 'teks1', text: '"Budi"', color: 'text-purple-600', label: 'Teks pertama.' },
          { key: 'spasi', text: '" "', color: 'text-gray-500', label: 'Karakter spasi sebagai pemisah.' },
          { key: 'teks2', text: '"Santoso"', color: 'text-orange-500', label: 'Teks kedua.' },
        ],
        example: '=CONCAT("Budi", " ", "Santoso")',
        result: '"Budi Santoso"',
        highlight: 'A2',
      },
      formulatext: {
        name: 'FORMULATEXT',
        desc: 'Menampilkan rumus sebagai teks.',
        parts: [
          { key: 'fungsi', text: 'FORMULATEXT', color: 'text-blue-600', label: 'Nama fungsi untuk menampilkan rumus sebagai teks.' },
          { key: 'referensi', text: 'A2', color: 'text-purple-600', label: 'Referensi cell yang berisi rumus.' },
        ],
        example: '=FORMULATEXT(A2)',
        result: '=SUM(B2:B10)',
        highlight: 'A2',
      },
    };

    const currentFunc = textFuncs[activeTextFunc as keyof typeof textFuncs];
    const currentExplanation = currentFunc.parts.find(p => p.key === activePart)?.label;

    return (
      <div className="space-y-8" onClick={handleReset}>
        {/* Pilih Fungsi */}
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
          <h3 className="text-xl font-bold mb-6 text-center">Pilih Fungsi Teks</h3>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {Object.entries(textFuncs).map(([key, data]) => (
              <button
                key={key}
                onClick={() => { setActiveTextFunc(key); setActivePart(null); }}
                className={`px-4 py-2 border-2 border-ink rounded-lg font-bold ${activeTextFunc === key ? 'bg-mint' : 'bg-white hover:bg-gray-50'}`}
              >
                {data.name}
              </button>
            ))}
          </div>

          {/* Visual Rumus Interaktif */}
          <div className="mb-4">
            <p className="text-center text-sm font-bold text-gray-600 mb-4">Klik bagian rumus untuk melihat penjelasan:</p>
            <div className="text-xl md:text-3xl font-mono font-bold flex items-center justify-center gap-1 flex-wrap text-center mb-6">
              <span className="text-pink-500">=</span>
              <button 
                onClick={(e) => { e.stopPropagation(); setActivePart('fungsi'); }}
                className={`${currentFunc.parts.find(p => p.key === 'fungsi')?.color} hover:scale-110 transition-transform ${activePart === 'fungsi' ? 'bg-gray-100 rounded px-1' : ''}`}
              >
                {currentFunc.name}
              </button>
              <span className="text-gray-400">(</span>
              {currentFunc.parts.filter(p => p.key !== 'fungsi').map((part, idx, arr) => (
                <span key={idx} className="flex items-center">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setActivePart(part.key); }}
                    className={`${part.color} hover:scale-110 transition-transform ${activePart === part.key ? 'bg-gray-100 rounded px-1' : ''}`}
                  >
                    {part.text}
                  </button>
                  {idx < arr.length - 1 && <span className="text-gray-500">,</span>}
                </span>
              ))}
              <span className="text-gray-400">)</span>
            </div>
          </div>

          {/* Kotak Penjelasan */}
          <div className="min-h-[100px] bg-gray-50 border-2 border-dashed rounded-xl p-4 flex items-center justify-center text-center">
            {activePart && currentExplanation ? (
              <p className="text-lg font-bold text-blue-600">{currentExplanation}</p>
            ) : (
              <p className="text-gray-500 font-bold flex items-center gap-2"><Lightbulb size={20}/> Klik salah satu bagian rumus di atas.</p>
            )}
          </div>
        </div>

        {/* Contoh Tabel */}
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
          <div className="text-center mb-4"><h3 className="text-xl font-bold">Contoh di Tabel</h3></div>
          <SpreadsheetVisual 
            data={[['Kode', 'Hasil'], ['EXCEL-001', '']]}
            highlightCells={activePart ? [] : ['B2']}
            showFormula={currentFunc.example}
            showResult={currentFunc.result.replace(/"/g, '')}
            cellFormulas={activePart ? [{ cell: 'B2', formula: currentFunc.example }] : []}
          />
          <p className="text-center text-sm text-gray-500 mt-4">{currentFunc.desc}</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // SUM & AVERAGE
  // ==========================================
  if (slug === 'fungsi-sum' || slug === 'fungsi-average') {
    const isSum = slug === 'fungsi-sum';
    return (
      <div className="space-y-8" onClick={handleReset}>
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
          <h3 className="text-xl font-bold mb-6 text-center">Klik Bagian Rumus {isSum ? 'SUM' : 'AVERAGE'}</h3>
          <div className="text-3xl md:text-5xl font-mono font-bold flex items-center justify-center gap-1 flex-wrap text-center mb-8">
            <button onClick={() => setActivePart('sama')} className={`text-pink-500 hover:scale-110 ${activePart === 'sama' ? 'bg-pink/20 rounded-lg px-2' : ''}`}>=</button>
            <button onClick={() => setActivePart('fungsi')} className={`text-blue-600 hover:scale-110 ${activePart === 'fungsi' ? 'bg-blue/20 rounded-lg px-2' : ''}`}>{isSum ? 'SUM' : 'AVERAGE'}</button>
            <button onClick={() => setActivePart('kurung')} className={`text-gray-400 hover:scale-110 ${activePart === 'kurung' ? 'bg-gray-200 rounded-lg px-2' : ''}`}>(</button>
            <button onClick={() => setActivePart('range')} className={`text-green-600 hover:scale-110 ${activePart === 'range' ? 'bg-mint rounded-lg px-2' : ''}`}>B1:B3</button>
            <button onClick={() => setActivePart('kurung')} className={`text-gray-400 hover:scale-110 ${activePart === 'kurung' ? 'bg-gray-200 rounded-lg px-2' : ''}`}>)</button>
          </div>
          <div className="min-h-[100px] bg-gray-50 border-2 border-dashed rounded-xl p-4 flex items-center justify-center text-center">
            {activePart === 'sama' && <p className="text-lg font-bold text-pink-600">Tanda (=) memulai rumus.</p>}
            {activePart === 'fungsi' && <p className="text-lg font-bold text-blue-600">{isSum ? 'SUM' : 'AVERAGE'} adalah nama fungsi.</p>}
            {activePart === 'kurung' && <p className="text-lg font-bold text-gray-600">Tanda kurung membungkus data.</p>}
            {activePart === 'range' && <p className="text-lg font-bold text-green-600">B1:B3 adalah rentang data.</p>}
            {!activePart && <p className="text-gray-500 font-bold flex items-center gap-2"><Lightbulb size={20}/> Klik bagian rumus.</p>}
          </div>
        </div>
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
          <div className="text-center mb-4"><h3 className="text-xl font-bold">{isSum ? 'Contoh: Penjualan Barang' : 'Contoh: Rata-rata Nilai'}</h3></div>
          <SpreadsheetVisual 
            data={isSum 
              ? [['Buku', '50000'], ['Pulpen', '30000'], ['Pensil', '20000'], ['Total', '']]
              : [['Siswa A', '80'], ['Siswa B', '90'], ['Siswa C', '70'], ['Rata-rata', '']]
            }
            highlightCells={activePart === 'range' ? ['B1','B2','B3'] : ['B4']}
            multiHighlight={activePart === 'range' ? [{ cells: ['B1','B2','B3'], color: 'green' }] : []}
            showFormula={isSum ? "=SUM(B1:B3)" : "=AVERAGE(B1:B3)"}
            showResult={isSum ? "100000" : "80"}
            cellFormulas={activePart && activePart !== 'range' ? [{ cell: 'B4', formula: isSum ? "=SUM(B1:B3)" : "=AVERAGE(B1:B3)" }] : []}
          />
        </div>
      </div>
    );
  }

  // ==========================================
  // MAX & MIN
  // ==========================================
  if (slug === 'fungsi-max-min') {
    return (
      <div className="space-y-8" onClick={handleReset}>
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
          <h3 className="text-xl font-bold mb-6 text-center">Klik Bagian Rumus MAX / MIN</h3>
          <div className="flex flex-col gap-4 mb-6">
            <div className="text-2xl md:text-4xl font-mono font-bold flex items-center justify-center gap-1">
              <span className="text-pink-500">=</span><span className="text-blue-600">MAX</span><span className="text-gray-400">(</span><span className="text-green-600">B1:B3</span><span className="text-gray-400">)</span>
            </div>
            <div className="text-2xl md:text-4xl font-mono font-bold flex items-center justify-center gap-1">
              <span className="text-pink-500">=</span><span className="text-blue-600">MIN</span><span className="text-gray-400">(</span><span className="text-green-600">B1:B3</span><span className="text-gray-400">)</span>
            </div>
          </div>
          <div className="min-h-[100px] bg-gray-50 border-2 border-dashed rounded-xl p-4 flex items-center justify-center text-center">
            <p className="text-gray-500 font-bold">MAX mencari nilai tertinggi, MIN mencari nilai terendah.</p>
          </div>
        </div>
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
          <div className="text-center mb-4"><h3 className="text-xl font-bold">Contoh: Penjualan Tertinggi & Terendah</h3></div>
          <SpreadsheetVisual 
            data={[['Senin', '100'], ['Selasa', '200'], ['Rabu', '150'], ['MAX', ''], ['MIN', '']]}
            highlightCells={['B4', 'B5']}
            showFormula="=MAX(B1:B3) / =MIN(B1:B3)"
            showResult="200 / 100"
            cellFormulas={activePart ? [{ cell: 'B4', formula: '=MAX(B1:B3)' }, { cell: 'B5', formula: '=MIN(B1:B3)' }] : []}
          />
        </div>
      </div>
    );
  }

  // ==========================================
  // COUNT, COUNTA
  // ==========================================
  if (slug === 'fungsi-count') {
    return (
      <div className="space-y-8" onClick={handleReset}>
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
          <h3 className="text-xl font-bold mb-6 text-center">Klik Bagian Rumus COUNT</h3>
          <div className="text-2xl md:text-4xl font-mono font-bold flex items-center justify-center gap-1 flex-wrap text-center mb-6">
            <button onClick={() => setActivePart('sama')} className="text-pink-500 hover:scale-110">=</button>
            <button onClick={() => setActivePart('count')} className="text-blue-600 hover:scale-110">COUNT</button>
            <button onClick={() => setActivePart('kurung')} className="text-gray-400 hover:scale-110">(</button>
            <button onClick={() => setActivePart('range')} className="text-green-600 hover:scale-110">A1:A3</button>
            <button onClick={() => setActivePart('kurung')} className="text-gray-400 hover:scale-110">)</button>
          </div>
          <div className="min-h-[100px] bg-gray-50 border-2 border-dashed rounded-xl p-4 flex items-center justify-center text-center">
            {activePart === 'sama' && <p className="text-lg font-bold text-pink-600">Tanda (=) memulai rumus.</p>}
            {activePart === 'count' && <p className="text-lg font-bold text-blue-600">COUNT menghitung jumlah cell berisi ANGKA.</p>}
            {activePart === 'kurung' && <p className="text-lg font-bold text-gray-600">Tanda kurung membungkus data.</p>}
            {activePart === 'range' && <p className="text-lg font-bold text-green-600">A1:A3 adalah rentang yang akan dihitung.</p>}
            {!activePart && <p className="text-gray-500 font-bold flex items-center gap-2"><Lightbulb size={20}/> Klik bagian rumus.</p>}
          </div>
        </div>
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
          <div className="text-center mb-4"><h3 className="text-xl font-bold">Contoh: Menghitung Data</h3></div>
          <SpreadsheetVisual 
            data={[['Budi', '80'], ['Andi', 'Teks'], ['Siti', ''], ['COUNT', ''], ['COUNTA', '']]}
            highlightCells={['B4', 'B5']}
            showFormula="=COUNT(A1:A3) / =COUNTA(A1:A3)"
            showResult="2 / 3"
            cellFormulas={activePart ? [{ cell: 'B4', formula: '=COUNT(A1:A3)' }, { cell: 'B5', formula: '=COUNTA(A1:A3)' }] : []}
          />
        </div>
      </div>
    );
  }

  // ==========================================
  // IF
  // ==========================================
  if (slug === 'fungsi-if') {
    return (
      <div className="space-y-8" onClick={handleReset}>
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
          <h3 className="text-xl font-bold mb-6 text-center">Klik Bagian Rumus IF</h3>
          <div className="text-xl md:text-3xl font-mono font-bold flex items-center justify-center gap-1 flex-wrap text-center mb-6">
            <button onClick={() => setActivePart('sama')} className="text-pink-500 hover:scale-110">=</button>
            <button onClick={() => setActivePart('if')} className="text-blue-600 hover:scale-110">IF</button>
            <button onClick={() => setActivePart('kurung')} className="text-gray-400 hover:scale-110">(</button>
            <button onClick={() => setActivePart('kondisi')} className="text-purple-600 hover:scale-110">B2&gt;=75</button>
            <span className="text-gray-500">,</span>
            <button onClick={() => setActivePart('true')} className="text-green-600 hover:scale-110">"Lulus"</button>
            <span className="text-gray-500">,</span>
            <button onClick={() => setActivePart('false')} className="text-red-500 hover:scale-110">"Gagal"</button>
            <button onClick={() => setActivePart('kurung')} className="text-gray-400 hover:scale-110">)</button>
          </div>
          <div className="min-h-[100px] bg-gray-50 border-2 border-dashed rounded-xl p-4 flex items-center justify-center text-center">
            {activePart === 'sama' && <p className="text-lg font-bold text-pink-600">Tanda (=) memulai rumus.</p>}
            {activePart === 'if' && <p className="text-lg font-bold text-blue-600">IF adalah fungsi logika.</p>}
            {activePart === 'kurung' && <p className="text-lg font-bold text-gray-600">Tanda kurung membungkus argumen.</p>}
            {activePart === 'kondisi' && <p className="text-lg font-bold text-purple-600">Kondisi: Apakah nilai B2 &gt;= 75?</p>}
            {activePart === 'true' && <p className="text-lg font-bold text-green-600">Jika BENAR, tampilkan "Lulus".</p>}
            {activePart === 'false' && <p className="text-lg font-bold text-red-600">Jika SALAH, tampilkan "Gagal".</p>}
            {!activePart && <p className="text-gray-500 font-bold flex items-center gap-2"><Lightbulb size={20}/> Klik bagian rumus.</p>}
          </div>
        </div>
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
          <div className="text-center mb-4"><h3 className="text-xl font-bold">Contoh: Status Kelulusan</h3></div>
          <SpreadsheetVisual 
            data={[['Nama', 'Nilai', 'Status'], ['Andi', '80', '']]}
            highlightCells={['C2']}
            showFormula='=IF(B2>=75, "Lulus", "Gagal")'
            showResult="Lulus"
            cellFormulas={activePart ? [{ cell: 'C2', formula: '=IF(B2>=75, "Lulus", "Gagal")' }] : []}
          />
        </div>
      </div>
    );
  }

  // ==========================================
  // SUMIF & SUMIFS
  // ==========================================
  if (slug === 'fungsi-sumif-sumifs') {
    const sumifHighlights = [];
    if (activePart === 'range_kriteria') sumifHighlights.push({ cells: ['A1','A2','A3'], color: 'purple' as const });
    if (activePart === 'kriteria') sumifHighlights.push({ cells: ['A1','A3'], color: 'orange' as const });
    if (activePart === 'range_jumlah') sumifHighlights.push({ cells: ['B1','B2','B3'], color: 'green' as const });

    const sumifsHighlights = [];
    if (activePart === 'range_jumlah') sumifsHighlights.push({ cells: ['C1','C2','C3'], color: 'green' as const });
    if (activePart === 'range_kriteria1') sumifsHighlights.push({ cells: ['A1','A2','A3'], color: 'purple' as const });
    if (activePart === 'kriteria1') sumifsHighlights.push({ cells: ['A1','A3'], color: 'orange' as const });
    if (activePart === 'range_kriteria2') sumifsHighlights.push({ cells: ['B1','B2','B3'], color: 'purple' as const });
    if (activePart === 'kriteria2') sumifsHighlights.push({ cells: ['B1'], color: 'red' as const });

    return (
      <div className="space-y-12" onClick={handleReset}>
        <div>
          <h3 className="text-2xl font-black mb-6 text-center text-ink">1. SUMIF (Satu Kriteria)</h3>
          <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 mb-6">
            <h4 className="text-lg font-bold mb-4 text-center">Klik Bagian Rumus SUMIF</h4>
            <div className="text-xl md:text-3xl font-mono font-bold flex items-center justify-center gap-1 flex-wrap text-center mb-6">
              <button onClick={() => setActivePart('sama')} className="text-pink-500 hover:scale-110">=</button>
              <button onClick={() => setActivePart('sumif')} className="text-blue-600 hover:scale-110">SUMIF</button>
              <button onClick={() => setActivePart('kurung')} className="text-gray-400 hover:scale-110">(</button>
              <button onClick={() => setActivePart('range_kriteria')} className="text-purple-600 hover:scale-110">A1:A3</button>
              <span className="text-gray-500">,</span>
              <button onClick={() => setActivePart('kriteria')} className="text-orange-500 hover:scale-110">"Apel"</button>
              <span className="text-gray-500">,</span>
              <button onClick={() => setActivePart('range_jumlah')} className="text-green-600 hover:scale-110">B1:B3</button>
              <button onClick={() => setActivePart('kurung')} className="text-gray-400 hover:scale-110">)</button>
            </div>
            <div className="min-h-[100px] bg-gray-50 border-2 border-dashed rounded-xl p-4 flex items-center justify-center text-center">
              {activePart === 'sama' && <p className="text-lg font-bold text-pink-600">Tanda (=) memulai rumus.</p>}
              {activePart === 'sumif' && <p className="text-lg font-bold text-blue-600">SUMIF menjumlahkan dengan syarat.</p>}
              {activePart === 'kurung' && <p className="text-lg font-bold text-gray-600">Tanda kurung membungkus argumen.</p>}
              {activePart === 'range_kriteria' && <p className="text-lg font-bold text-purple-600">A1:A3 adalah kolom yang dicek syaratnya.</p>}
              {activePart === 'kriteria' && <p className="text-lg font-bold text-orange-600">"Apel" adalah syaratnya.</p>}
              {activePart === 'range_jumlah' && <p className="text-lg font-bold text-green-600">B1:B3 adalah kolom harga yang dijumlahkan.</p>}
              {!activePart && <p className="text-gray-500 font-bold flex items-center gap-2"><Lightbulb size={20}/> Klik bagian rumus.</p>}
            </div>
          </div>
          <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
            <div className="text-center mb-4"><h4 className="text-lg font-bold">Contoh: Hanya Menghitung Apel</h4></div>
            <SpreadsheetVisual 
              data={[['Apel', '5000'], ['Jeruk', '7000'], ['Apel', '10000'], ['Total Apel', '']]}
              highlightCells={activePart ? [] : ['B4']}
              multiHighlight={sumifHighlights}
              showFormula='=SUMIF(A1:A3, "Apel", B1:B3)'
              showResult="15000"
              cellFormulas={activePart ? [{ cell: 'B4', formula: '=SUMIF(A1:A3, "Apel", B1:B3)' }] : []}
            />
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-black mb-6 text-center text-ink">2. SUMIFS (Banyak Kriteria)</h3>
          <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 mb-6">
            <h4 className="text-lg font-bold mb-4 text-center">Klik Bagian Rumus SUMIFS</h4>
            <div className="text-xl md:text-3xl font-mono font-bold flex items-center justify-center gap-1 flex-wrap text-center mb-6">
              <button onClick={() => setActivePart('sama')} className="text-pink-500 hover:scale-110">=</button>
              <button onClick={() => setActivePart('sumifs')} className="text-blue-600 hover:scale-110">SUMIFS</button>
              <button onClick={() => setActivePart('kurung')} className="text-gray-400 hover:scale-110">(</button>
              <button onClick={() => setActivePart('range_jumlah')} className="text-green-600 hover:scale-110">C1:C3</button>
              <span className="text-gray-500">,</span>
              <button onClick={() => setActivePart('range_kriteria1')} className="text-purple-600 hover:scale-110">A1:A3</button>
              <span className="text-gray-500">,</span>
              <button onClick={() => setActivePart('kriteria1')} className="text-orange-500 hover:scale-110">"Apel"</button>
              <span className="text-gray-500">,</span>
              <button onClick={() => setActivePart('range_kriteria2')} className="text-purple-600 hover:scale-110">B1:B3</button>
              <span className="text-gray-500">,</span>
              <button onClick={() => setActivePart('kriteria2')} className="text-red-500 hover:scale-110">"&gt;50"</button>
              <button onClick={() => setActivePart('kurung')} className="text-gray-400 hover:scale-110">)</button>
            </div>
            <div className="min-h-[120px] bg-gray-50 border-2 border-dashed rounded-xl p-4 flex items-center justify-center text-center">
              {activePart === 'sama' && <p className="text-lg font-bold text-pink-600">Tanda (=) memulai rumus.</p>}
              {activePart === 'sumifs' && <p className="text-lg font-bold text-blue-600">SUMIFS menjumlahkan dengan BANYAK syarat.</p>}
              {activePart === 'kurung' && <p className="text-lg font-bold text-gray-600">Tanda kurung membungkus argumen.</p>}
              {activePart === 'range_jumlah' && <p className="text-lg font-bold text-green-600">C1:C3 adalah kolom angka yang akan dijumlahkan.</p>}
              {activePart === 'range_kriteria1' && <p className="text-lg font-bold text-purple-600">A1:A3 adalah kolom syarat pertama (Nama Buah).</p>}
              {activePart === 'kriteria1' && <p className="text-lg font-bold text-orange-600">"Apel" adalah syarat pertama.</p>}
              {activePart === 'range_kriteria2' && <p className="text-lg font-bold text-purple-600">B1:B3 adalah kolom syarat kedua (Harga).</p>}
              {activePart === 'kriteria2' && <p className="text-lg font-bold text-red-600">"&gt;50" adalah syarat kedua (Harga di atas 50rb).</p>}
              {!activePart && <p className="text-gray-500 font-bold flex items-center gap-2"><Lightbulb size={20}/> Klik bagian rumus.</p>}
            </div>
          </div>
          <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
            <div className="text-center mb-4"><h4 className="text-lg font-bold">Contoh: Apel yang Harganya &gt; 50rb</h4></div>
            <SpreadsheetVisual 
              data={[['Apel', '50000', '50000'], ['Jeruk', '70000', '70000'], ['Apel', '10000', '10000'], ['Total Spesifik', '', '']]}
              highlightCells={activePart ? [] : ['B4']}
              multiHighlight={sumifsHighlights}
              showFormula='=SUMIFS(C1:C3, A1:A3, "Apel", C1:C3, ">50")'
              showResult="50000"
              cellFormulas={activePart ? [{ cell: 'C4', formula: '=SUMIFS(C1:C3, A1:A3, "Apel", C1:C3, ">50")' }] : []}
            />
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // COUNTIF & COUNTIFS
  // ==========================================
  if (slug === 'fungsi-countif') {
    const countifHighlights = [];
    if (activePart === 'range') countifHighlights.push({ cells: ['A1','A2','A3','A4'], color: 'purple' as const });
    if (activePart === 'kriteria') countifHighlights.push({ cells: ['A1','A3','A4'], color: 'orange' as const });

    const countifsHighlights = [];
    if (activePart === 'range1') countifsHighlights.push({ cells: ['A1','A2','A3','A4'], color: 'purple' as const });
    if (activePart === 'kriteria1') countifsHighlights.push({ cells: ['A1','A3','A4'], color: 'orange' as const });
    if (activePart === 'range2') countifsHighlights.push({ cells: ['B1','B2','B3','B4'], color: 'purple' as const });
    if (activePart === 'kriteria2') countifsHighlights.push({ cells: ['B1','B3','B4'], color: 'red' as const });

    return (
      <div className="space-y-12" onClick={handleReset}>
        <div>
          <h3 className="text-2xl font-black mb-6 text-center text-ink">1. COUNTIF (Satu Kriteria)</h3>
          <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 mb-6">
            <h4 className="text-lg font-bold mb-4 text-center">Klik Bagian Rumus COUNTIF</h4>
            <div className="text-xl md:text-3xl font-mono font-bold flex items-center justify-center gap-1 flex-wrap text-center mb-6">
              <button onClick={() => setActivePart('sama')} className="text-pink-500 hover:scale-110">=</button>
              <button onClick={() => setActivePart('countif')} className="text-blue-600 hover:scale-110">COUNTIF</button>
              <button onClick={() => setActivePart('kurung')} className="text-gray-400 hover:scale-110">(</button>
              <button onClick={() => setActivePart('range')} className="text-purple-600 hover:scale-110">A1:A4</button>
              <span className="text-gray-500">,</span>
              <button onClick={() => setActivePart('kriteria')} className="text-orange-500 hover:scale-110">"Laki-laki"</button>
              <button onClick={() => setActivePart('kurung')} className="text-gray-400 hover:scale-110">)</button>
            </div>
            <div className="min-h-[100px] bg-gray-50 border-2 border-dashed rounded-xl p-4 flex items-center justify-center text-center">
              {activePart === 'sama' && <p className="text-lg font-bold text-pink-600">Tanda (=) memulai rumus.</p>}
              {activePart === 'countif' && <p className="text-lg font-bold text-blue-600">COUNTIF menghitung jumlah data dengan syarat.</p>}
              {activePart === 'kurung' && <p className="text-lg font-bold text-gray-600">Tanda kurung membungkus argumen.</p>}
              {activePart === 'range' && <p className="text-lg font-bold text-purple-600">A1:A4 adalah kolom yang dicek syaratnya.</p>}
              {activePart === 'kriteria' && <p className="text-lg font-bold text-orange-600">"Laki-laki" adalah syaratnya.</p>}
              {!activePart && <p className="text-gray-500 font-bold flex items-center gap-2"><Lightbulb size={20}/> Klik bagian rumus.</p>}
            </div>
          </div>
          <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
            <div className="text-center mb-4"><h4 className="text-lg font-bold">Contoh: Menghitung Siswa Laki-laki</h4></div>
            <SpreadsheetVisual 
              data={[['Laki-laki', 'Budi'], ['Perempuan', 'Siti'], ['Laki-laki', 'Andi'], ['Laki-laki', 'Joko'], ['Hasil', '']]}
              highlightCells={activePart ? [] : ['A5']}
              multiHighlight={countifHighlights}
              showFormula='=COUNTIF(A1:A4, "Laki-laki")'
              showResult="3"
              cellFormulas={activePart ? [{ cell: 'B5', formula: '=COUNTIF(A1:A4, "Laki-laki")' }] : []}
            />
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-black mb-6 text-center text-ink">2. COUNTIFS (Banyak Kriteria)</h3>
          <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 mb-6">
            <h4 className="text-lg font-bold mb-4 text-center">Klik Bagian Rumus COUNTIFS</h4>
            <div className="text-xl md:text-3xl font-mono font-bold flex items-center justify-center gap-1 flex-wrap text-center mb-6">
              <button onClick={() => setActivePart('sama')} className="text-pink-500 hover:scale-110">=</button>
              <button onClick={() => setActivePart('countifs')} className="text-blue-600 hover:scale-110">COUNTIFS</button>
              <button onClick={() => setActivePart('kurung')} className="text-gray-400 hover:scale-110">(</button>
              <button onClick={() => setActivePart('range1')} className="text-purple-600 hover:scale-110">A1:A4</button>
              <span className="text-gray-500">,</span>
              <button onClick={() => setActivePart('kriteria1')} className="text-orange-500 hover:scale-110">"Laki-laki"</button>
              <span className="text-gray-500">,</span>
              <button onClick={() => setActivePart('range2')} className="text-purple-600 hover:scale-110">B1:B4</button>
              <span className="text-gray-500">,</span>
              <button onClick={() => setActivePart('kriteria2')} className="text-red-500 hover:scale-110">"&gt;80"</button>
              <button onClick={() => setActivePart('kurung')} className="text-gray-400 hover:scale-110">)</button>
            </div>
            <div className="min-h-[120px] bg-gray-50 border-2 border-dashed rounded-xl p-4 flex items-center justify-center text-center">
              {activePart === 'sama' && <p className="text-lg font-bold text-pink-600">Tanda (=) memulai rumus.</p>}
              {activePart === 'countifs' && <p className="text-lg font-bold text-blue-600">COUNTIFS menghitung dengan BANYAK syarat.</p>}
              {activePart === 'kurung' && <p className="text-lg font-bold text-gray-600">Tanda kurung membungkus argumen.</p>}
              {activePart === 'range1' && <p className="text-lg font-bold text-purple-600">A1:A4 adalah kolom syarat pertama (Jenis Kelamin).</p>}
              {activePart === 'kriteria1' && <p className="text-lg font-bold text-orange-600">"Laki-laki" adalah syarat pertama.</p>}
              {activePart === 'range2' && <p className="text-lg font-bold text-purple-600">B1:B4 adalah kolom syarat kedua (Nilai).</p>}
              {activePart === 'kriteria2' && <p className="text-lg font-bold text-red-600">"&gt;80" adalah syarat kedua (Nilai di atas 80).</p>}
              {!activePart && <p className="text-gray-500 font-bold flex items-center gap-2"><Lightbulb size={20}/> Klik bagian rumus.</p>}
            </div>
          </div>
          <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
            <div className="text-center mb-4"><h4 className="text-lg font-bold">Contoh: Laki-laki dengan Nilai &gt; 80</h4></div>
            <SpreadsheetVisual 
              data={[['Laki-laki', '85'], ['Perempuan', '90'], ['Laki-laki', '75'], ['Laki-laki', '95'], ['Hasil', '']]}
              highlightCells={activePart ? [] : ['A5']}
              multiHighlight={countifsHighlights}
              showFormula='=COUNTIFS(A1:A4, "Laki-laki", B1:B4, ">80")'
              showResult="2"
              cellFormulas={activePart ? [{ cell: 'B5', formula: '=COUNTIFS(A1:A4, "Laki-laki", B1:B4, ">80")' }] : []}
            />
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // AVERAGEIF & AVERAGEIFS
  // ==========================================
  if (slug === 'fungsi-averageif') {
    const avgifHighlights = [];
    if (activePart === 'range_kriteria') avgifHighlights.push({ cells: ['A1','A2','A3'], color: 'purple' as const });
    if (activePart === 'kriteria') avgifHighlights.push({ cells: ['A1','A3'], color: 'orange' as const });
    if (activePart === 'range_rata') avgifHighlights.push({ cells: ['B1','B2','B3'], color: 'green' as const });

    const avgifsHighlights = [];
    if (activePart === 'range_rata') avgifsHighlights.push({ cells: ['C1','C2','C3'], color: 'green' as const });
    if (activePart === 'range_k1') avgifsHighlights.push({ cells: ['A1','A2','A3'], color: 'purple' as const });
    if (activePart === 'kriteria1') avgifsHighlights.push({ cells: ['A1','A3'], color: 'orange' as const });
    if (activePart === 'range_k2') avgifsHighlights.push({ cells: ['B1','B2','B3'], color: 'purple' as const });
    if (activePart === 'kriteria2') avgifsHighlights.push({ cells: ['B1'], color: 'red' as const });

    return (
      <div className="space-y-12" onClick={handleReset}>
        <div>
          <h3 className="text-2xl font-black mb-6 text-center text-ink">1. AVERAGEIF (Satu Kriteria)</h3>
          <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 mb-6">
            <h4 className="text-lg font-bold mb-4 text-center">Klik Bagian Rumus AVERAGEIF</h4>
            <div className="text-xl md:text-3xl font-mono font-bold flex items-center justify-center gap-1 flex-wrap text-center mb-6">
              <button onClick={() => setActivePart('sama')} className="text-pink-500 hover:scale-110">=</button>
              <button onClick={() => setActivePart('avgif')} className="text-blue-600 hover:scale-110">AVERAGEIF</button>
              <button onClick={() => setActivePart('kurung')} className="text-gray-400 hover:scale-110">(</button>
              <button onClick={() => setActivePart('range_kriteria')} className="text-purple-600 hover:scale-110">A1:A3</button>
              <span className="text-gray-500">,</span>
              <button onClick={() => setActivePart('kriteria')} className="text-orange-500 hover:scale-110">"Apel"</button>
              <span className="text-gray-500">,</span>
              <button onClick={() => setActivePart('range_rata')} className="text-green-600 hover:scale-110">B1:B3</button>
              <button onClick={() => setActivePart('kurung')} className="text-gray-400 hover:scale-110">)</button>
            </div>
            <div className="min-h-[100px] bg-gray-50 border-2 border-dashed rounded-xl p-4 flex items-center justify-center text-center">
              {activePart === 'sama' && <p className="text-lg font-bold text-pink-600">Tanda (=) memulai rumus.</p>}
              {activePart === 'avgif' && <p className="text-lg font-bold text-blue-600">AVERAGEIF mencari rata-rata dengan syarat.</p>}
              {activePart === 'kurung' && <p className="text-lg font-bold text-gray-600">Tanda kurung membungkus argumen.</p>}
              {activePart === 'range_kriteria' && <p className="text-lg font-bold text-purple-600">A1:A3 adalah kolom yang dicek syaratnya.</p>}
              {activePart === 'kriteria' && <p className="text-lg font-bold text-orange-600">"Apel" adalah syaratnya.</p>}
              {activePart === 'range_rata' && <p className="text-lg font-bold text-green-600">B1:B3 adalah kolom nilai yang dicari rata-ratanya.</p>}
              {!activePart && <p className="text-gray-500 font-bold flex items-center gap-2"><Lightbulb size={20}/> Klik bagian rumus.</p>}
            </div>
          </div>
          <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
            <div className="text-center mb-4"><h4 className="text-lg font-bold">Contoh: Rata-rata Harga Apel</h4></div>
            <SpreadsheetVisual 
              data={[['Apel', '5000'], ['Jeruk', '7000'], ['Apel', '10000'], ['Rata-rata', '']]}
              highlightCells={activePart ? [] : ['B4']}
              multiHighlight={avgifHighlights}
              showFormula='=AVERAGEIF(A1:A3, "Apel", B1:B3)'
              showResult="7500"
              cellFormulas={activePart ? [{ cell: 'B4', formula: '=AVERAGEIF(A1:A3, "Apel", B1:B3)' }] : []}
            />
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-black mb-6 text-center text-ink">2. AVERAGEIFS (Banyak Kriteria)</h3>
          <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 mb-6">
            <h4 className="text-lg font-bold mb-4 text-center">Klik Bagian Rumus AVERAGEIFS</h4>
            <div className="text-xl md:text-3xl font-mono font-bold flex items-center justify-center gap-1 flex-wrap text-center mb-6">
              <button onClick={() => setActivePart('sama')} className="text-pink-500 hover:scale-110">=</button>
              <button onClick={() => setActivePart('avgifs')} className="text-blue-600 hover:scale-110">AVERAGEIFS</button>
              <button onClick={() => setActivePart('kurung')} className="text-gray-400 hover:scale-110">(</button>
              <button onClick={() => setActivePart('range_rata')} className="text-green-600 hover:scale-110">C1:C3</button>
              <span className="text-gray-500">,</span>
              <button onClick={() => setActivePart('range_k1')} className="text-purple-600 hover:scale-110">A1:A3</button>
              <span className="text-gray-500">,</span>
              <button onClick={() => setActivePart('kriteria1')} className="text-orange-500 hover:scale-110">"Apel"</button>
              <span className="text-gray-500">,</span>
              <button onClick={() => setActivePart('range_k2')} className="text-purple-600 hover:scale-110">B1:B3</button>
              <span className="text-gray-500">,</span>
              <button onClick={() => setActivePart('kriteria2')} className="text-red-500 hover:scale-110">"&gt;5000"</button>
              <button onClick={() => setActivePart('kurung')} className="text-gray-400 hover:scale-110">)</button>
            </div>
            <div className="min-h-[120px] bg-gray-50 border-2 border-dashed rounded-xl p-4 flex items-center justify-center text-center">
              {activePart === 'sama' && <p className="text-lg font-bold text-pink-600">Tanda (=) memulai rumus.</p>}
              {activePart === 'avgifs' && <p className="text-lg font-bold text-blue-600">AVERAGEIFS mencari rata-rata dengan BANYAK syarat.</p>}
              {activePart === 'kurung' && <p className="text-lg font-bold text-gray-600">Tanda kurung membungkus argumen.</p>}
              {activePart === 'range_rata' && <p className="text-lg font-bold text-green-600">C1:C3 adalah kolom nilai yang dirata-ratakan.</p>}
              {activePart === 'range_k1' && <p className="text-lg font-bold text-purple-600">A1:A3 adalah kolom syarat pertama.</p>}
              {activePart === 'kriteria1' && <p className="text-lg font-bold text-orange-600">"Apel" adalah syarat pertama.</p>}
              {activePart === 'range_k2' && <p className="text-lg font-bold text-purple-600">B1:B3 adalah kolom syarat kedua.</p>}
              {activePart === 'kriteria2' && <p className="text-lg font-bold text-red-600">"&gt;5000" adalah syarat kedua (harga di atas 5rb).</p>}
              {!activePart && <p className="text-gray-500 font-bold flex items-center gap-2"><Lightbulb size={20}/> Klik bagian rumus.</p>}
            </div>
          </div>
          <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
            <div className="text-center mb-4"><h4 className="text-lg font-bold">Contoh: Rata-rata Apel &gt; 5rb</h4></div>
            <SpreadsheetVisual 
              data={[['Apel', '6000', '6000'], ['Jeruk', '7000', '7000'], ['Apel', '4000', '4000'], ['Rata-rata', '', '']]}
              highlightCells={activePart ? [] : ['B4']}
              multiHighlight={avgifsHighlights}
              showFormula='=AVERAGEIFS(C1:C3, A1:A3, "Apel", B1:B3, ">5000")'
              showResult="6000"
              cellFormulas={activePart ? [{ cell: 'C4', formula: '=AVERAGEIFS(C1:C3, A1:A3, "Apel", B1:B3, ">5000")' }] : []}
            />
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // AND & OR & IF Bertingkat
  // ==========================================
  if (slug === 'fungsi-and-or') {
    return (
      <div className="space-y-12" onClick={handleReset}>
        {/* AND */}
        <div>
          <h3 className="text-2xl font-black mb-6 text-center text-ink">1. Fungsi AND (Semua Benar)</h3>
          <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 mb-6">
            <h4 className="text-lg font-bold mb-4 text-center">Klik Bagian Rumus AND</h4>
            <div className="text-xl md:text-3xl font-mono font-bold flex items-center justify-center gap-1 flex-wrap text-center mb-6">
              <button onClick={() => setActivePart('and_sama')} className="text-pink-500 hover:scale-110">=</button>
              <button onClick={() => setActivePart('and_fungsi')} className="text-blue-600 hover:scale-110">AND</button>
              <button onClick={() => setActivePart('and_kurung')} className="text-gray-400 hover:scale-110">(</button>
              <button onClick={() => setActivePart('and_kondisi1')} className="text-purple-600 hover:scale-110">A2&gt;10000</button>
              <span className="text-gray-500">,</span>
              <button onClick={() => setActivePart('and_kondisi2')} className="text-orange-500 hover:scale-110">B2=TRUE</button>
              <button onClick={() => setActivePart('and_kurung')} className="text-gray-400 hover:scale-110">)</button>
            </div>
            <div className="min-h-[100px] bg-gray-50 border-2 border-dashed rounded-xl p-4 flex items-center justify-center text-center">
              {activePart?.startsWith('and_') && <p className="text-lg font-bold text-blue-600">
                {activePart === 'and_sama' && 'Tanda (=) memulai rumus.'}
                {activePart === 'and_fungsi' && 'AND bernilai TRUE jika SEMUA kondisi benar.'}
                {activePart === 'and_kurung' && 'Tanda kurung membungkus argumen.'}
                {activePart === 'and_kondisi1' && 'Kondisi 1: Apakah belanja (A2) > 10000?'}
                {activePart === 'and_kondisi2' && 'Kondisi 2: Apakah member aktif (B2 = TRUE)?'}
              </p>}
              {!activePart?.startsWith('and_') && <p className="text-gray-500 font-bold flex items-center gap-2"><Lightbulb size={20}/> Klik bagian rumus AND.</p>}
            </div>
          </div>
          <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
            <div className="text-center mb-4"><h4 className="text-lg font-bold">Contoh: Syarat Dapat Diskon</h4></div>
            <SpreadsheetVisual 
              data={[['Belanja', 'Member', 'Status'], ['15000', 'TRUE', '']]}
              highlightCells={activePart?.startsWith('and_') ? [] : ['C2']}
              multiHighlight={activePart === 'and_kondisi1' ? [{ cells: ['A2'], color: 'purple' }] : activePart === 'and_kondisi2' ? [{ cells: ['B2'], color: 'orange' }] : []}
              showFormula='=AND(A2>10000, B2=TRUE)'
              showResult="TRUE"
              cellFormulas={activePart?.startsWith('and_') ? [{ cell: 'C2', formula: '=AND(A2>10000, B2=TRUE)' }] : []}
            />
          </div>
        </div>

        {/* OR */}
        <div>
          <h3 className="text-2xl font-black mb-6 text-center text-ink">2. Fungsi OR (Salah Satu Benar)</h3>
          <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 mb-6">
            <h4 className="text-lg font-bold mb-4 text-center">Klik Bagian Rumus OR</h4>
            <div className="text-xl md:text-3xl font-mono font-bold flex items-center justify-center gap-1 flex-wrap text-center mb-6">
              <button onClick={() => setActivePart('or_sama')} className="text-pink-500 hover:scale-110">=</button>
              <button onClick={() => setActivePart('or_fungsi')} className="text-blue-600 hover:scale-110">OR</button>
              <button onClick={() => setActivePart('or_kurung')} className="text-gray-400 hover:scale-110">(</button>
              <button onClick={() => setActivePart('or_kondisi1')} className="text-purple-600 hover:scale-110">A2&gt;50000</button>
              <span className="text-gray-500">,</span>
              <button onClick={() => setActivePart('or_kondisi2')} className="text-orange-500 hover:scale-110">B2="VIP"</button>
              <button onClick={() => setActivePart('or_kurung')} className="text-gray-400 hover:scale-110">)</button>
            </div>
            <div className="min-h-[100px] bg-gray-50 border-2 border-dashed rounded-xl p-4 flex items-center justify-center text-center">
              {activePart?.startsWith('or_') && <p className="text-lg font-bold text-blue-600">
                {activePart === 'or_sama' && 'Tanda (=) memulai rumus.'}
                {activePart === 'or_fungsi' && 'OR bernilai TRUE jika SALAH SATU kondisi benar.'}
                {activePart === 'or_kurung' && 'Tanda kurung membungkus argumen.'}
                {activePart === 'or_kondisi1' && 'Kondisi 1: Apakah belanja > 50000?'}
                {activePart === 'or_kondisi2' && 'Kondisi 2: Apakah status VIP?'}
              </p>}
              {!activePart?.startsWith('or_') && <p className="text-gray-500 font-bold flex items-center gap-2"><Lightbulb size={20}/> Klik bagian rumus OR.</p>}
            </div>
          </div>
          <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
            <div className="text-center mb-4"><h4 className="text-lg font-bold">Contoh: Syarat Dapat Hadiah</h4></div>
            <SpreadsheetVisual 
              data={[['Belanja', 'Status', 'Hadiah'], ['60000', 'Biasa', '']]}
              highlightCells={activePart?.startsWith('or_') ? [] : ['C2']}
              multiHighlight={activePart === 'or_kondisi1' ? [{ cells: ['A2'], color: 'purple' }] : activePart === 'or_kondisi2' ? [{ cells: ['B2'], color: 'orange' }] : []}
              showFormula='=OR(A2>50000, B2="VIP")'
              showResult="TRUE"
              cellFormulas={activePart?.startsWith('or_') ? [{ cell: 'C2', formula: '=OR(A2>50000, B2="VIP")' }] : []}
            />
          </div>
        </div>

        {/* IF Bertingkat */}
        <div>
          <h3 className="text-2xl font-black mb-6 text-center text-ink">3. IF Bertingkat (Nested IF)</h3>
          <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 mb-6">
            <h4 className="text-lg font-bold mb-4 text-center">Klik Bagian Rumus IF Bertingkat</h4>
            <div className="text-lg md:text-2xl font-mono font-bold flex items-center justify-center gap-1 flex-wrap text-center mb-6">
              <button onClick={() => setActivePart('nested_sama')} className="text-pink-500 hover:scale-110">=</button>
              <button onClick={() => setActivePart('nested_if1')} className="text-blue-600 hover:scale-110">IF</button>
              <button onClick={() => setActivePart('nested_kurung1')} className="text-gray-400 hover:scale-110">(</button>
              <button onClick={() => setActivePart('nested_kondisi1')} className="text-purple-600 hover:scale-110">A2&gt;=90</button>
              <span className="text-gray-500">,</span>
              <button onClick={() => setActivePart('nested_true1')} className="text-green-600 hover:scale-110">"A"</button>
              <span className="text-gray-500">,</span>
              <button onClick={() => setActivePart('nested_if2')} className="text-blue-600 hover:scale-110">IF</button>
              <button onClick={() => setActivePart('nested_kurung2')} className="text-gray-400 hover:scale-110">(</button>
              <button onClick={() => setActivePart('nested_kondisi2')} className="text-purple-600 hover:scale-110">A2&gt;=75</button>
              <span className="text-gray-500">,</span>
              <button onClick={() => setActivePart('nested_true2')} className="text-green-600 hover:scale-110">"B"</button>
              <span className="text-gray-500">,</span>
              <button onClick={() => setActivePart('nested_false')} className="text-red-500 hover:scale-110">"C"</button>
              <button onClick={() => setActivePart('nested_kurung2')} className="text-gray-400 hover:scale-110">)</button>
              <button onClick={() => setActivePart('nested_kurung1')} className="text-gray-400 hover:scale-110">)</button>
            </div>
            <div className="min-h-[100px] bg-gray-50 border-2 border-dashed rounded-xl p-4 flex items-center justify-center text-center">
              {activePart?.startsWith('nested_') && <p className="text-lg font-bold text-blue-600">
                {activePart === 'nested_sama' && 'Tanda (=) memulai rumus.'}
                {activePart === 'nested_if1' && 'IF pertama mengecek kondisi nilai tertinggi.'}
                {activePart === 'nested_kondisi1' && 'Kondisi 1: Apakah nilai A2 >= 90?'}
                {activePart === 'nested_true1' && 'Jika BENAR (>=90), tampilkan "A".'}
                {activePart === 'nested_if2' && 'Jika SALAH, lanjut ke IF kedua.'}
                {activePart === 'nested_kondisi2' && 'Kondisi 2: Apakah nilai A2 >= 75?'}
                {activePart === 'nested_true2' && 'Jika BENAR (>=75), tampilkan "B".'}
                {activePart === 'nested_false' && 'Jika SALAH (<75), tampilkan "C".'}
                {activePart?.includes('kurung') && 'Tanda kurung membungkus argumen.'}
              </p>}
              {!activePart?.startsWith('nested_') && <p className="text-gray-500 font-bold flex items-center gap-2"><Lightbulb size={20}/> Klik bagian rumus IF Bertingkat.</p>}
            </div>
          </div>
          <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
            <div className="text-center mb-4"><h4 className="text-lg font-bold">Contoh: Konversi Nilai ke Huruf</h4></div>
            <SpreadsheetVisual 
              data={[['Nilai', 'Huruf'], ['85', '']]}
              highlightCells={activePart?.startsWith('nested_') ? [] : ['B2']}
              showFormula='=IF(A2>=90, "A", IF(A2>=75, "B", "C"))'
              showResult="B"
              cellFormulas={activePart?.startsWith('nested_') ? [{ cell: 'B2', formula: '=IF(A2>=90, "A", IF(A2>=75, "B", "C"))' }] : []}
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
}