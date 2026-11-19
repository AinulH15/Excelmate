'use client';

import { useState } from 'react';
import { Lightbulb, Calendar, AlertCircle, Filter, Palette, LayoutDashboard, BarChart3, Table } from 'lucide-react';
import SpreadsheetVisual from './SpreadsheetVisual';
import PivotChartVisual from './PivotChartVisual';

interface Props {
  slug: string;
}

// ==========================================
// KAMUS DATA RUMUS INTERAKTIF
// ==========================================
const formulaData: Record<string, { formula: string, explanations: Record<string, string> }> = {
  'fungsi-sum': {
    formula: '=SUM(B1:B3)',
    explanations: {
      '=': 'Tanda sama dengan memberitahu Excel bahwa ini adalah sebuah rumus.',
      'SUM': 'Fungsi SUM digunakan untuk menjumlahkan semua angka dalam rentang sel.',
      'B1:B3': 'B1:B3 adalah range (rentang) sel dari B1 sampai B3.',
      ':': 'Tanda titik dua (:) berarti "sampai dengan". Contoh B1:B3 berarti dari sel B1 sampai sel B3.',
      '(': 'Tanda kurung buka untuk memulai argumen fungsi.',
      ')': 'Tanda kurung tutup untuk mengakhiri argumen fungsi.'
    }
  },
  'fungsi-average': {
    formula: '=AVERAGE(A1:A5)',
    explanations: {
      '=': 'Awal dari sebuah rumus.',
      'AVERAGE': 'Fungsi untuk mencari nilai rata-rata dari sekumpulan angka.',
      'A1:A5': 'Rentang sel yang berisi data yang akan dihitung rata-ratanya.',
      ':': 'Tanda titik dua (:) berarti "sampai dengan". A1:A5 berarti dari A1 sampai A5.',
      '(': 'Kurung buka argumen.', ')': 'Kurung tutup argumen.'
    }
  }
};

export default function FormulaVisual({ slug }: Props) {
  const [activePart, setActivePart] = useState<string | null>(null);
  
  const [maxMinMode, setMaxMinMode] = useState<'MAX' | 'MIN'>('MAX');
  const [countMode, setCountMode] = useState<'COUNT' | 'COUNTA' | 'COUNTBLANK'>('COUNT');
  const [ifMode, setIfMode] = useState<'SIMPLE' | 'NESTED'>('SIMPLE');
  const [logicMode, setLogicMode] = useState<'AND' | 'OR' | 'NESTED'>('AND');
  const [textMode, setTextMode] = useState<'LEFT' | 'RIGHT' | 'MID' | 'LEN' | 'TRIM' | 'CONCAT'>('LEFT');
  const [sumIfMode, setSumIfMode] = useState<'SUMIF' | 'SUMIFS'>('SUMIF');
  const [countIfMode, setCountIfMode] = useState<'COUNTIF' | 'COUNTIFS'>('COUNTIF');
  const [averageIfMode, setAverageIfMode] = useState<'AVERAGEIF' | 'AVERAGEIFS'>('AVERAGEIF');
  const [lookupMode, setLookupMode] = useState<'VLOOKUP' | 'HLOOKUP' | 'XLOOKUP'>('VLOOKUP');

  // ==========================================
  // FUNGSI SUM & AVERAGE (BARU DITAMBAHKAN)
  // ==========================================
  if (slug === 'fungsi-sum' || slug === 'fungsi-average') {
    const data = formulaData[slug];
    // Memecah string rumus menjadi potongan-potongan kecil agar bisa diklik
    const parts = data.formula.match(/(".*?"|[A-Z0-9]+:[A-Z0-9]+|[A-Z]+[0-9]*|[0-9]+|[=(),;:><+\-*/])/g) || [data.formula];

    return (
      <div className="space-y-8">
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 md:p-8">
          <h3 className="text-xl font-bold mb-6 text-center">Klik Bagian Rumusnya</h3>
          
          <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2 text-2xl md:text-3xl font-mono bg-white p-6 rounded-xl border-2 border-ink shadow-neo w-full">
              {parts.map((part, index) => (
                <span
                  key={index}
                  onClick={() => setActivePart(part)}
                  className={`cursor-pointer px-1 rounded transition-all duration-200 ${
                    activePart === part 
                      ? 'bg-yellow-200 text-ink scale-110 font-bold ring-2 ring-ink' 
                      : 'hover:bg-gray-100 text-gray-800'
                  }`}
                >
                  {part}
                </span>
              ))}
            </div>

            <div className="mt-6 min-h-25 w-full">
              {activePart && data.explanations[activePart] ? (
                <div className="p-5 bg-white border-2 border-dashed border-gray-300 rounded-xl text-center shadow-sm animate-in fade-in slide-in-from-top-2">
                  <p className="text-pink-600 font-bold text-lg">{data.explanations[activePart]}</p>
                </div>
              ) : (
                <div className="p-5 text-center text-gray-400 font-medium border-2 border-transparent">
                  👆 Klik pada bagian rumus di atas untuk melihat penjelasan.
                </div>
              )}
            </div>
          </div>

          <div className="bg-yellow border-2 border-ink rounded-xl p-3 mt-8">
            <p className="text-sm font-bold text-center">💡 Tips: Pahami setiap bagian rumus agar kamu tidak kebingungan saat mengetiknya di Excel.</p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // CELL REFERENCE (Relative, Absolute, Mixed)
  // ==========================================
  if (slug === 'cell-reference') {
    return (
      <div className="space-y-8">
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
          <h3 className="text-xl font-bold mb-4 text-center">Contoh Perbedaan Referensi</h3>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4">
              <p className="font-bold text-blue-800 mb-2">Relative (A1)</p>
              <p className="text-sm mb-2">Berubah saat copy-paste.</p>
              <code className="bg-white p-2 rounded text-sm block mb-2">=A1 + B1</code>
              <p className="text-xs">Copy ke bawah: =A2+B2</p>
            </div>
            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4">
              <p className="font-bold text-green-800 mb-2">Absolute ($A$1)</p>
              <p className="text-sm mb-2">Tetap saat copy-paste.</p>
              <code className="bg-white p-2 rounded text-sm block mb-2">=$A$1 + B1</code>
              <p className="text-xs">Copy ke bawah: =$A$1+B2</p>
            </div>
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4">
              <p className="font-bold text-yellow-800 mb-2">Mixed ($A1 / A$1)</p>
              <p className="text-sm mb-2">Hanya kolom/baris tertentu yang terkunci.</p>
              <code className="bg-white p-2 rounded text-sm block mb-2">=$A1 + B$1</code>
              <p className="text-xs">Kolom A tetap, baris 1 tetap.</p>
            </div>
          </div>

          <div className="bg-yellow border-2 border-ink rounded-xl p-3">
            <p className="text-sm font-bold">💡 Tips: Tekan <code className="bg-white px-1 rounded">F4</code> saat mengetik rumus untuk memutar tipe referensi.</p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // FUNGSI TANGGAL & WAKTU
  // ==========================================
  if (slug === 'fungsi-tanggal-waktu') {
    return (
      <div className="space-y-8">
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
          <h3 className="text-xl font-bold mb-4 text-center">Fungsi Tanggal & Waktu</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4">
              <p className="font-bold text-blue-800 mb-2 flex items-center gap-2"><Calendar size={18}/> TODAY()</p>
              <p className="text-sm mb-2">Menampilkan tanggal hari ini.</p>
              <code className="bg-white p-2 rounded text-sm block">=TODAY()</code>
              <p className="text-xs mt-2 text-gray-500">Hasil: {new Date().toLocaleDateString('id-ID')}</p>
            </div>
            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4">
              <p className="font-bold text-green-800 mb-2 flex items-center gap-2"><Calendar size={18}/> NOW()</p>
              <p className="text-sm mb-2">Menampilkan tanggal & waktu sekarang.</p>
              <code className="bg-white p-2 rounded text-sm block">=NOW()</code>
              <p className="text-xs mt-2 text-gray-500">Hasil: {new Date().toLocaleString('id-ID')}</p>
            </div>
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4">
              <p className="font-bold text-yellow-800 mb-2">MONTH() / YEAR() / DAY()</p>
              <p className="text-sm mb-2">Mengambil bagian dari tanggal.</p>
              <code className="bg-white p-2 rounded text-sm block">=MONTH(A1) → 1-12</code>
            </div>
            <div className="bg-pink-50 border-2 border-pink-300 rounded-xl p-4">
              <p className="font-bold text-pink-800 mb-2">Shortcut Tanggal</p>
              <p className="text-sm mb-2">Tanggal hari ini:</p>
              <code className="bg-white p-2 rounded text-sm block">Ctrl + ;</code>
              <p className="text-sm mb-2 mt-2">Waktu sekarang:</p>
              <code className="bg-white p-2 rounded text-sm block">Ctrl + Shift + ;</code>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // IFERROR
  // ==========================================
  if (slug === 'fungsi-iferror') {
    return (
      <div className="space-y-8">
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
          <h3 className="text-xl font-bold mb-4 text-center flex items-center justify-center gap-2">
            <AlertCircle /> Menangani Error dengan IFERROR
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4">
              <p className="font-bold text-red-800 mb-2">❌ Tanpa IFERROR</p>
              <code className="bg-white p-2 rounded text-sm block mb-2">=VLOOKUP("Anggur"; A1:B3; 2; FALSE)</code>
              <p className="text-red-600 font-bold">Hasil: #N/A</p>
              <p className="text-xs mt-2">Error mengganggu laporan.</p>
            </div>
            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4">
              <p className="font-bold text-green-800 mb-2">✅ Dengan IFERROR</p>
              <code className="bg-white p-2 rounded text-sm block mb-2">=IFERROR(VLOOKUP(...); "Tidak Ada")</code>
              <p className="text-green-600 font-bold">Hasil: Tidak Ada</p>
              <p className="text-xs mt-2">Laporan tetap rapi.</p>
            </div>
          </div>

          <div className="bg-yellow border-2 border-ink rounded-xl p-3">
            <p className="text-sm font-bold">💡 Error umum: #N/A (tidak ditemukan), #DIV/0! (bagi nol), #VALUE! (tipe data salah).</p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // SORTING & FILTERING
  // ==========================================
  if (slug === 'sorting-filtering') {
    return (
      <div className="space-y-8">
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
          <h3 className="text-xl font-bold mb-4 text-center flex items-center justify-center gap-2">
            <Filter /> Sorting & Filtering
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4">
              <p className="font-bold text-blue-800 mb-2">🔽 Sorting (Urutkan)</p>
              <p className="text-sm mb-2">Mengurutkan data A-Z atau Z-A.</p>
              <div className="bg-white p-2 rounded text-sm mb-2">
                <p className="font-bold">Sebelum:</p>
                <p>Budi, Andi, Siti</p>
                <p className="font-bold mt-2">Sesudah:</p>
                <p>Andi, Budi, Siti</p>
              </div>
            </div>
            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4">
              <p className="font-bold text-green-800 mb-2">🔍 Filtering (Saring)</p>
              <p className="text-sm mb-2">Hanya menampilkan data yang dipilih.</p>
              <div className="bg-white p-2 rounded text-sm">
                <p className="font-bold">Filter "Laki-laki":</p>
                <p>Budi (Laki-laki)</p>
                <p>Andi (Laki-laki)</p>
                <p className="text-gray-400">Siti (disembunyikan)</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow border-2 border-ink rounded-xl p-3 mt-4">
            <p className="text-sm font-bold">💡 Shortcut Filter: <code className="bg-white px-1 rounded">Ctrl + Shift + L</code></p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // CONDITIONAL FORMATTING
  // ==========================================
  if (slug === 'conditional-formatting') {
    return (
      <div className="space-y-8">
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
          <h3 className="text-xl font-bold mb-4 text-center flex items-center justify-center gap-2">
            <Palette /> Conditional Formatting
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="font-bold mb-2">Tanpa Format:</p>
              <table className="w-full text-sm border-collapse">
                <tbody>
                  <tr><td className="border p-2">Budi</td><td className="border p-2 text-center">70</td></tr>
                  <tr><td className="border p-2">Andi</td><td className="border p-2 text-center">60</td></tr>
                  <tr><td className="border p-2">Siti</td><td className="border p-2 text-center">100</td></tr>
                </tbody>
              </table>
            </div>
            <div>
              <p className="font-bold mb-2">Dengan Format (nilai &lt; 75 = merah):</p>
              <table className="w-full text-sm border-collapse">
                <tbody>
                  <tr><td className="border p-2">Budi</td><td className="border p-2 text-center bg-red-100 text-red-600 font-bold">70</td></tr>
                  <tr><td className="border p-2">Andi</td><td className="border p-2 text-center bg-red-100 text-red-600 font-bold">60</td></tr>
                  <tr><td className="border p-2">Siti</td><td className="border p-2 text-center">100</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-yellow border-2 border-ink rounded-xl p-3 mt-4">
            <p className="text-sm font-bold">💡 Akses: Tab Home &gt; Conditional Formatting &gt; Highlight Cells Rules.</p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // DASHBOARD
  // ==========================================
  if (slug === 'membuat-dashboard') {
    return (
      <div className="space-y-8">
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
          <h3 className="text-xl font-bold mb-4 text-center flex items-center justify-center gap-2">
            <LayoutDashboard /> Membuat Dashboard Sederhana
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4">
              <p className="font-bold text-blue-800 mb-2">1. Siapkan PivotTable</p>
              <p className="text-sm">Buat PivotTable untuk merangkum data penjualan per produk atau bulan.</p>
            </div>
            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4">
              <p className="font-bold text-green-800 mb-2">2. Buat Chart</p>
              <p className="text-sm">Buat chart (Column, Pie, Line) dari PivotTable tersebut.</p>
            </div>
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4">
              <p className="font-bold text-yellow-800 mb-2">3. Tambahkan Slicer</p>
              <p className="text-sm">Slicer berfungsi sebagai filter interaktif untuk semua chart.</p>
            </div>
            <div className="bg-pink-50 border-2 border-pink-300 rounded-xl p-4">
              <p className="font-bold text-pink-800 mb-2">4. Atur Layout</p>
              <p className="text-sm">Susun chart dan PivotTable dalam satu sheet agar terlihat menyeluruh.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // CHART
  // ==========================================
  if (slug === 'membuat-chart') {
    return (
      <div className="space-y-8">
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
          <h3 className="text-xl font-bold mb-4 text-center flex items-center justify-center gap-2">
            <BarChart3 /> Membuat Chart
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4">
              <p className="font-bold text-blue-800 mb-2">1. Pilih Data</p>
              <p className="text-sm">Blok data termasuk judul kolom.</p>
            </div>
            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4">
              <p className="font-bold text-green-800 mb-2">2. Insert &gt; Chart</p>
              <p className="text-sm">Pilih jenis chart (Column, Line, Pie, dll).</p>
            </div>
          </div>

          <div className="bg-gray-100 border-2 border-dashed border-gray-400 rounded-xl p-4">
            <p className="font-bold text-center mb-2">Contoh Chart:</p>
            <div className="flex items-end justify-center gap-2 h-32">
              <div className="w-12 bg-blue-500" style={{height: '60%'}}></div>
              <div className="w-12 bg-blue-500" style={{height: '80%'}}></div>
              <div className="w-12 bg-blue-500" style={{height: '40%'}}></div>
              <div className="w-12 bg-blue-500" style={{height: '90%'}}></div>
            </div>
          </div>

          <div className="bg-yellow border-2 border-ink rounded-xl p-3 mt-4">
            <p className="text-sm font-bold">💡 Shortcut: <code className="bg-white px-1 rounded">Alt + F1</code> (chart di sheet yang sama) atau <code className="bg-white px-1 rounded">F11</code> (sheet baru).</p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // MENGATUR WORKBOOK
  // ==========================================
  if (slug === 'mengatur-workbook-worksheet') {
    return (
      <div className="space-y-8">
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
          <h3 className="text-xl font-bold mb-4 text-center flex items-center justify-center gap-2">
            <Table /> Mengatur Workbook & Worksheet
          </h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 text-center">
              <p className="font-bold text-blue-800 mb-2">➕ Tambah Sheet</p>
              <p className="text-sm">Klik ikon <strong>+</strong> di tab sheet.</p>
            </div>
            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4 text-center">
              <p className="font-bold text-green-800 mb-2">✏️ Ganti Nama</p>
              <p className="text-sm">Klik kanan tab sheet &gt; Rename.</p>
            </div>
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 text-center">
              <p className="font-bold text-yellow-800 mb-2">↔️ Lebar Kolom</p>
              <p className="text-sm">Drag garis di header kolom.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // FUNGSI MAX / MIN (DENGAN TOGGLE)
  // ==========================================
  if (slug === 'fungsi-max-min') {
    const isMax = maxMinMode === 'MAX';
    const currentFormula = isMax ? '=MAX(C1:C10)' : '=MIN(C1:C10)';
    const currentExplanations = isMax 
      ? {
          '=': 'Awal rumus.',
          'MAX': 'Mencari nilai TERTINGGI dari sekumpulan angka.',
          'C1:C10': 'Rentang data yang ingin dicari nilai tertingginya.',
          ':': 'Tanda titik dua (:) berarti "sampai dengan". C1:C10 berarti dari C1 sampai C10.',
          '(': 'Kurung buka.', ')': 'Kurung tutup.'
        }
      : {
          '=': 'Awal rumus.',
          'MIN': 'Mencari nilai TERENDAH dari sekumpulan angka.',
          'C1:C10': 'Rentang data yang ingin dicari nilai terendahnya.',
          ':': 'Tanda titik dua (:) berarti "sampai dengan". C1:C10 berarti dari C1 sampai C10.',
          '(': 'Kurung buka.', ')': 'Kurung tutup.'
        };

    const parts = currentFormula.match(/(".*?"|[A-Z0-9]+:[A-Z0-9]+|[A-Z]+[0-9]*|[0-9]+|[=(),;:><+\-*/])/g) || [currentFormula];

    return (
      <div className="space-y-8">
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 md:p-8">
          <h3 className="text-xl font-bold mb-6 text-center">Klik Bagian Rumusnya</h3>
          
          <div className="flex justify-center mb-6">
            <div className="inline-flex bg-gray-200 border-2 border-ink rounded-xl p-1 shadow-neo-sm">
              <button 
                onClick={() => { setMaxMinMode('MAX'); setActivePart(null); }}
                className={`px-6 py-2 rounded-lg font-bold transition-all ${isMax ? 'bg-white shadow-sm text-ink' : 'text-gray-500 hover:text-ink'}`}
              >
                MAX (Tertinggi)
              </button>
              <button 
                onClick={() => { setMaxMinMode('MIN'); setActivePart(null); }}
                className={`px-6 py-2 rounded-lg font-bold transition-all ${!isMax ? 'bg-white shadow-sm text-ink' : 'text-gray-500 hover:text-ink'}`}
              >
                MIN (Terendah)
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2 text-2xl md:text-3xl font-mono bg-white p-6 rounded-xl border-2 border-ink shadow-neo w-full">
              {parts.map((part, index) => (
                <span
                  key={index}
                  onClick={() => setActivePart(part)}
                  className={`cursor-pointer px-1 rounded transition-all duration-200 ${
                    activePart === part 
                      ? 'bg-yellow-200 text-ink scale-110 font-bold ring-2 ring-ink' 
                      : 'hover:bg-gray-100 text-gray-800'
                  }`}
                >
                  {part}
                </span>
              ))}
            </div>

            <div className="mt-6 min-h-25 w-full">
              {activePart && currentExplanations[activePart as keyof typeof currentExplanations] ? (
                <div className="p-5 bg-white border-2 border-dashed border-gray-300 rounded-xl text-center shadow-sm animate-in fade-in slide-in-from-top-2">
                  <p className="text-pink-600 font-bold text-lg">{currentExplanations[activePart as keyof typeof currentExplanations]}</p>
                </div>
              ) : (
                <div className="p-5 text-center text-gray-400 font-medium border-2 border-transparent">
                  👆 Klik pada bagian rumus di atas untuk melihat penjelasan.
                </div>
              )}
            </div>
          </div>

          <div className="bg-yellow border-2 border-ink rounded-xl p-3 mt-8">
            <p className="text-sm font-bold text-center">💡 Tips: Pahami setiap bagian rumus agar kamu tidak kebingungan saat mengetiknya di Excel.</p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // FUNGSI COUNT / COUNTA / COUNTBLANK (DENGAN TOGGLE)
  // ==========================================
  if (slug === 'fungsi-count') {
    const isCount = countMode === 'COUNT';
    const isCountA = countMode === 'COUNTA';
    const isCountBlank = countMode === 'COUNTBLANK';

    let currentFormula = '=COUNT(A1:A10)';
    let currentExplanations: Record<string, string> = {};

    if (isCount) {
      currentFormula = '=COUNT(A1:A10)';
      currentExplanations = {
        '=': 'Awal rumus.',
        'COUNT': 'Menghitung jumlah sel yang berisi ANGKA saja. Teks dan sel kosong akan diabaikan.',
        'A1:A10': 'Rentang yang akan dihitung.',
        ':': 'Tanda titik dua (:) berarti "sampai dengan". A1:A10 berarti dari A1 sampai A10.',
        '(': 'Kurung buka.', ')': 'Kurung tutup.'
      };
    } else if (isCountA) {
      currentFormula = '=COUNTA(A1:A10)';
      currentExplanations = {
        '=': 'Awal rumus.',
        'COUNTA': 'Menghitung jumlah sel yang TIDAK KOSONG. Baik itu berisi angka, teks, maupun simbol.',
        'A1:A10': 'Rentang yang akan dihitung.',
        ':': 'Tanda titik dua (:) berarti "sampai dengan". A1:A10 berarti dari A1 sampai A10.',
        '(': 'Kurung buka.', ')': 'Kurung tutup.'
      };
    } else {
      currentFormula = '=COUNTBLANK(A1:A10)';
      currentExplanations = {
        '=': 'Awal rumus.',
        'COUNTBLANK': 'Menghitung jumlah sel yang KOSONG (tidak ada data sama sekali).',
        'A1:A10': 'Rentang yang akan dihitung.',
        ':': 'Tanda titik dua (:) berarti "sampai dengan". A1:A10 berarti dari A1 sampai A10.',
        '(': 'Kurung buka.', ')': 'Kurung tutup.'
      };
    }

    const parts = currentFormula.match(/(".*?"|[A-Z0-9]+:[A-Z0-9]+|[A-Z]+[0-9]*|[0-9]+|[=(),;:><+\-*/])/g) || [currentFormula];

    return (
      <div className="space-y-8">
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 md:p-8">
          <h3 className="text-xl font-bold mb-6 text-center">Klik Bagian Rumusnya</h3>
          
          <div className="flex justify-center mb-6">
            <div className="inline-flex bg-gray-200 border-2 border-ink rounded-xl p-1 shadow-neo-sm flex-wrap justify-center">
              <button 
                onClick={() => { setCountMode('COUNT'); setActivePart(null); }}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${isCount ? 'bg-white shadow-sm text-ink' : 'text-gray-500 hover:text-ink'}`}
              >
                COUNT
              </button>
              <button 
                onClick={() => { setCountMode('COUNTA'); setActivePart(null); }}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${isCountA ? 'bg-white shadow-sm text-ink' : 'text-gray-500 hover:text-ink'}`}
              >
                COUNTA
              </button>
              <button 
                onClick={() => { setCountMode('COUNTBLANK'); setActivePart(null); }}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${isCountBlank ? 'bg-white shadow-sm text-ink' : 'text-gray-500 hover:text-ink'}`}
              >
                COUNTBLANK
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2 text-2xl md:text-3xl font-mono bg-white p-6 rounded-xl border-2 border-ink shadow-neo w-full">
              {parts.map((part, index) => (
                <span
                  key={index}
                  onClick={() => setActivePart(part)}
                  className={`cursor-pointer px-1 rounded transition-all duration-200 ${
                    activePart === part 
                      ? 'bg-yellow-200 text-ink scale-110 font-bold ring-2 ring-ink' 
                      : 'hover:bg-gray-100 text-gray-800'
                  }`}
                >
                  {part}
                </span>
              ))}
            </div>

            <div className="mt-6 min-h-25 w-full">
              {activePart && currentExplanations[activePart] ? (
                <div className="p-5 bg-white border-2 border-dashed border-gray-300 rounded-xl text-center shadow-sm animate-in fade-in slide-in-from-top-2">
                  <p className="text-pink-600 font-bold text-lg">{currentExplanations[activePart]}</p>
                </div>
              ) : (
                <div className="p-5 text-center text-gray-400 font-medium border-2 border-transparent">
                  👆 Klik pada bagian rumus di atas untuk melihat penjelasan.
                </div>
              )}
            </div>
          </div>

          <div className="bg-yellow border-2 border-ink rounded-xl p-3 mt-8">
            <p className="text-sm font-bold text-center">💡 Tips: Pahami perbedaan COUNT, COUNTA, dan COUNTBLANK agar tidak salah pilih saat mengolah data.</p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // FUNGSI IF (DENGAN TOGGLE SEDERHANA / BERTINGKAT)
  // ==========================================
  if (slug === 'fungsi-if') {
    const isSimple = ifMode === 'SIMPLE';
    
    let currentFormula = '';
    let currentExplanations: Record<string, string> = {};

    if (isSimple) {
      currentFormula = '=IF(A1>75; "Lulus"; "Gagal")';
      currentExplanations = {
        '=': 'Awal rumus.',
        'IF': 'Fungsi logika untuk mengecek suatu kondisi (True/False).',
        'A1': 'Referensi sel yang dicek.',
        '>': 'Tanda "lebih besar dari". Digunakan untuk membandingkan nilai.',
        '75': 'Angka pembanding (batas nilai).',
        ';': 'Titik koma (;) adalah pemisah antar argumen fungsi (di Excel regional Indonesia).',
        '"Lulus"': 'Value if True: Hasil yang muncul jika kondisi benar (A1 > 75).',
        '"Gagal"': 'Value if False: Hasil yang muncul jika kondisi salah (A1 <= 75).',
        '(': 'Kurung buka.', ')': 'Kurung tutup.'
      };
    } else {
      currentFormula = '=IF(A1>=90; "A"; IF(A1>=75; "B"; "C"))';
      currentExplanations = {
        '=': 'Awal rumus.',
        'IF': 'Fungsi logika utama (IF pertama).',
        'A1': 'Referensi sel yang dicek.',
        '>=': 'Tanda "lebih besar atau sama dengan".',
        '90': 'Angka pembanding pertama.',
        ';': 'Pemisah antar argumen fungsi (titik koma).',
        '"A"': 'Hasil jika kondisi pertama BENAR (>=90).',
        'IF (Nested)': 'IF kedua (Nested IF): Jika kondisi pertama salah, cek kondisi ini.', 
        '75': 'Angka pembanding kedua.',
        '"B"': 'Hasil jika kondisi kedua BENAR (>=75).',
        '"C"': 'Hasil jika SEMUA kondisi di atas SALAH (di bawah 75).',
        '(': 'Kurung buka.', ')': 'Kurung tutup.'
      };
    }

    // REGEX UNTUK MEMISAHKAN TEKS
    const parts = currentFormula.match(/(".*?"|[A-Z0-9]+:[A-Z0-9]+|[A-Z]+[0-9]*|[0-9]+|[=(),;:><+\-*/])/g) || [currentFormula];

    // LOGIKA ALIAS UNTUK IF BERTINGKAT
    let formattedParts = parts.map(p => ({ text: p, key: p }));

    if (!isSimple) {
      formattedParts = parts.map((part, index) => {
        if (part === '>' || part === '>=') {
          return { text: part, key: `Operator ${part}` };
        }
        if (part === '=' && index > 0) {
            return { text: part, key: 'Operator =' };
        }
        return { text: part, key: part };
      });
      
      currentExplanations['Operator >='] = 'Operator pembanding: "Lebih besar atau sama dengan".';
      currentExplanations['Operator >'] = 'Operator pembanding: "Lebih besar dari".';
      currentExplanations['Operator ='] = 'Operator pembanding: "Sama dengan". Bukan awal rumus.';
    }

    return (
      <div className="space-y-8">
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 md:p-8">
          <h3 className="text-xl font-bold mb-6 text-center">Klik Bagian Rumusnya</h3>
          
          <div className="flex justify-center mb-6">
            <div className="inline-flex bg-gray-200 border-2 border-ink rounded-xl p-1 shadow-neo-sm flex-wrap justify-center">
              <button 
                onClick={() => { setIfMode('SIMPLE'); setActivePart(null); }}
                className={`px-6 py-2 rounded-lg font-bold transition-all ${isSimple ? 'bg-white shadow-sm text-ink' : 'text-gray-500 hover:text-ink'}`}
              >
                IF Sederhana
              </button>
              <button 
                onClick={() => { setIfMode('NESTED'); setActivePart(null); }}
                className={`px-6 py-2 rounded-lg font-bold transition-all ${!isSimple ? 'bg-white shadow-sm text-ink' : 'text-gray-500 hover:text-ink'}`}
              >
                IF Bertingkat
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2 text-2xl md:text-3xl font-mono bg-white p-6 rounded-xl border-2 border-ink shadow-neo w-full">
              {formattedParts.map((part, index) => (
                <span
                  key={index}
                  onClick={() => setActivePart(part.key)}
                  className={`cursor-pointer px-1 rounded transition-all duration-200 ${
                    activePart === part.key 
                      ? 'bg-yellow-200 text-ink scale-110 font-bold ring-2 ring-ink' 
                      : 'hover:bg-gray-100 text-gray-800'
                  }`}
                >
                  {part.text}
                </span>
              ))}
            </div>

            <div className="mt-6 min-h-25 w-full">
              {activePart && currentExplanations[activePart] ? (
                <div className="p-5 bg-white border-2 border-dashed border-gray-300 rounded-xl text-center shadow-sm animate-in fade-in slide-in-from-top-2">
                  <p className="text-pink-600 font-bold text-lg">{currentExplanations[activePart]}</p>
                </div>
              ) : (
                <div className="p-5 text-center text-gray-400 font-medium border-2 border-transparent">
                  👆 Klik pada bagian rumus di atas untuk melihat penjelasan.
                </div>
              )}
            </div>
          </div>

          <div className="bg-yellow border-2 border-ink rounded-xl p-3 mt-8">
            <p className="text-sm font-bold text-center">💡 Tips: Gunakan IF Bertingkat (Nested IF) jika kamu punya lebih dari 2 kemungkinan hasil.</p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // FUNGSI AND / OR / NESTED IF (DENGAN TOGGLE)
  // ==========================================
  if (slug === 'fungsi-and-or') {
    const isAnd = logicMode === 'AND';
    const isOr = logicMode === 'OR';
    const isNested = logicMode === 'NESTED';

    let currentFormula = '=IF(AND(A1>50; B1="Lulus"); "Ya"; "Tidak")';
    let currentExplanations: Record<string, string> = {};

    if (isAnd) {
      currentFormula = '=IF(AND(A1>50; B1="Lulus"); "Ya"; "Tidak")';
      currentExplanations = {
        '=': 'Awal rumus (wajib ditaruh di depan).',
        'IF': 'Fungsi logika utama.',
        'AND': 'Mengecek apakah SEMUA kondisi benar. Jika salah satu saja salah, hasilnya False.',
        'A1': 'Referensi sel pertama yang dicek.',
        '>': 'Operator pembanding: "Lebih besar dari".',
        '50': 'Angka pembanding: Apakah nilai A1 lebih dari 50?',
        ';': 'Pemisah antar argumen fungsi (titik koma).',
        'B1': 'Referensi sel kedua yang dicek.',
        '= (Sama Dengan)': 'Operator pembanding: Untuk mencocokkan teks/angka. Bukan awal rumus.',
        '"Lulus"': 'Teks pembanding: Apakah B1 berisi tepat kata "Lulus"?',
        '"Ya"': 'Hasil jika SEMUA kondisi benar.',
        '"Tidak"': 'Hasil jika ada kondisi yang salah.',
        '(': 'Kurung buka.', ')': 'Kurung tutup.'
      };
    } else if (isOr) {
      currentFormula = '=IF(OR(A1>50; B1="Lulus"); "Ya"; "Tidak")';
      currentExplanations = {
        '=': 'Awal rumus (wajib ditaruh di depan).',
        'IF': 'Fungsi logika utama.',
        'OR': 'Mengecek apakah SALAH SATU kondisi benar. Jika salah satu benar, hasilnya True.',
        'A1': 'Referensi sel pertama yang dicek.',
        '>': 'Operator pembanding: "Lebih besar dari".',
        '50': 'Angka pembanding: Apakah nilai A1 lebih dari 50?',
        ';': 'Pemisah antar argumen fungsi (titik koma).',
        'B1': 'Referensi sel kedua yang dicek.',
        '= (Sama Dengan)': 'Operator pembanding: Untuk mencocokkan teks/angka. Bukan awal rumus.',
        '"Lulus"': 'Teks pembanding: Apakah B1 berisi tepat kata "Lulus"?',
        '"Ya"': 'Hasil jika SALAH SATU kondisi benar.',
        '"Tidak"': 'Hasil jika SEMUA kondisi salah.',
        '(': 'Kurung buka.', ')': 'Kurung tutup.'
      };
    } else {
      currentFormula = '=IF(A1>=90; "A"; IF(A1>=75; "B"; "C"))';
      currentExplanations = {
        '=': 'Awal rumus.',
        'IF': 'Fungsi logika utama (IF pertama).',
        'A1': 'Referensi sel yang dicek.',
        '>=': 'Tanda "lebih besar atau sama dengan".',
        '90': 'Angka pembanding pertama.',
        ';': 'Pemisah antar argumen fungsi (titik koma).',
        '"A"': 'Hasil jika kondisi pertama BENAR (>=90).',
        'IF (Nested)': 'IF kedua (Nested IF): Jika kondisi pertama salah, cek kondisi ini.',
        '75': 'Angka pembanding kedua.',
        '"B"': 'Hasil jika kondisi kedua BENAR (>=75).',
        '"C"': 'Hasil jika SEMUA kondisi di atas SALAH.',
        '(': 'Kurung buka.', ')': 'Kurung tutup.'
      };
    }

    // REGEX UNTUK MEMISAHKAN TEKS
    const parts = currentFormula.match(/(".*?"|[A-Z0-9]+:[A-Z0-9]+|[A-Z]+[0-9]*|[0-9]+|[=(),;:><+\-*/])/g) || [currentFormula];

    // LOGIKA ALIAS KHUSUS UNTUK AND/OR DAN NESTED
    let formattedParts = parts.map(p => ({ text: p, key: p }));

    if (isAnd || isOr) {
      formattedParts = parts.map((part, index) => {
        if (part === '=' && parts[index - 1] === 'B1') {
          return { text: part, key: '= (Sama Dengan)' };
        }
        return { text: part, key: part };
      });
    } else if (isNested) {
       formattedParts = parts.map((part, index) => {
        if (part === '>' || part === '>=') {
          return { text: part, key: `Operator ${part}` };
        }
        if (part === '=' && index > 0) {
            return { text: part, key: 'Operator =' };
        }
        return { text: part, key: part };
      });
      currentExplanations['Operator >='] = 'Operator pembanding: "Lebih besar atau sama dengan".';
      currentExplanations['Operator >'] = 'Operator pembanding: "Lebih besar dari".';
      currentExplanations['Operator ='] = 'Operator pembanding: "Sama dengan". Bukan awal rumus.';
    }

    return (
      <div className="space-y-8">
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 md:p-8">
          <h3 className="text-xl font-bold mb-6 text-center">Klik Bagian Rumusnya</h3>
          
          <div className="flex justify-center mb-6">
            <div className="inline-flex bg-gray-200 border-2 border-ink rounded-xl p-1 shadow-neo-sm flex-wrap justify-center">
              <button 
                onClick={() => { setLogicMode('AND'); setActivePart(null); }}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${isAnd ? 'bg-white shadow-sm text-ink' : 'text-gray-500 hover:text-ink'}`}
              >
                Logika AND
              </button>
              <button 
                onClick={() => { setLogicMode('OR'); setActivePart(null); }}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${isOr ? 'bg-white shadow-sm text-ink' : 'text-gray-500 hover:text-ink'}`}
              >
                Logika OR
              </button>
              <button 
                onClick={() => { setLogicMode('NESTED'); setActivePart(null); }}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${isNested ? 'bg-white shadow-sm text-ink' : 'text-gray-500 hover:text-ink'}`}
              >
                IF Bertingkat
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2 text-2xl md:text-3xl font-mono bg-white p-6 rounded-xl border-2 border-ink shadow-neo w-full">
              {formattedParts.map((part, index) => (
                <span
                  key={index}
                  onClick={() => setActivePart(part.key)}
                  className={`cursor-pointer px-1 rounded transition-all duration-200 ${
                    activePart === part.key 
                      ? 'bg-yellow-200 text-ink scale-110 font-bold ring-2 ring-ink' 
                      : 'hover:bg-gray-100 text-gray-800'
                  }`}
                >
                  {part.text}
                </span>
              ))}
            </div>

            <div className="mt-6 min-h-25 w-full">
              {activePart && currentExplanations[activePart] ? (
                <div className="p-5 bg-white border-2 border-dashed border-gray-300 rounded-xl text-center shadow-sm animate-in fade-in slide-in-from-top-2">
                  <p className="text-pink-600 font-bold text-lg">{currentExplanations[activePart]}</p>
                </div>
              ) : (
                <div className="p-5 text-center text-gray-400 font-medium border-2 border-transparent">
                  👆 Klik pada bagian rumus di atas untuk melihat penjelasan.
                </div>
              )}
            </div>
          </div>

          <div className="bg-yellow border-2 border-ink rounded-xl p-3 mt-8">
            <p className="text-sm font-bold text-center">💡 Tips: Pahami perbedaan AND dan OR agar logikamu tidak terbalik.</p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // FUNGSI TEKS (LEFT, RIGHT, MID, LEN, TRIM, CONCAT)
  // ==========================================
  if (slug === 'fungsi-teks') {
    let currentFormula = '';
    let currentExplanations: Record<string, string> = {};

    switch (textMode) {
      case 'LEFT':
        currentFormula = '=LEFT(A1; 3)';
        currentExplanations = {
          '=': 'Awal rumus.',
          'LEFT': 'Mengambil karakter dari SISI KIRI teks.',
          'A1': 'Teks asli yang ingin diambil.',
          ';': 'Pemisah antar argumen fungsi (titik koma).',
          '3': 'Jumlah karakter yang ingin diambil.',
          '(': 'Kurung buka.', ')': 'Kurung tutup.'
        };
        break;
      case 'RIGHT':
        currentFormula = '=RIGHT(A1; 3)';
        currentExplanations = {
          '=': 'Awal rumus.',
          'RIGHT': 'Mengambil karakter dari SISI KANAN teks.',
          'A1': 'Teks asli yang ingin diambil.',
          ';': 'Pemisah antar argumen fungsi (titik koma).',
          '3': 'Jumlah karakter yang ingin diambil.',
          '(': 'Kurung buka.', ')': 'Kurung tutup.'
        };
        break;
      case 'MID':
        currentFormula = '=MID(A1; 3; 2)';
        currentExplanations = {
          '=': 'Awal rumus.',
          'MID': 'Mengambil karakter dari TENGAH teks.',
          'A1': 'Teks asli yang ingin diambil.',
          ';': 'Pemisah antar argumen fungsi (titik koma).',
          '3': 'Start Number: Mulai mengambil dari karakter ke-3.',
          '2': 'Jumlah karakter yang ingin diambil.',
          '(': 'Kurung buka.', ')': 'Kurung tutup.'
        };
        break;
      case 'LEN':
        currentFormula = '=LEN(A1)';
        currentExplanations = {
          '=': 'Awal rumus.',
          'LEN': 'Menghitung PANJANG (jumlah karakter) dari sebuah teks.',
          'A1': 'Teks yang ingin dihitung panjangnya.',
          '(': 'Kurung buka.', ')': 'Kurung tutup.'
        };
        break;
      case 'TRIM':
        currentFormula = '=TRIM(A1)';
        currentExplanations = {
          '=': 'Awal rumus.',
          'TRIM': 'Menghapus spasi berlebih di awal, akhir, atau tengah teks.',
          'A1': 'Teks yang ingin dibersihkan spasinya.',
          '(': 'Kurung buka.', ')': 'Kurung tutup.'
        };
        break;
      case 'CONCAT':
        currentFormula = '=CONCAT(A1; B1)';
        currentExplanations = {
          '=': 'Awal rumus.',
          'CONCAT': 'Menggabungkan beberapa teks menjadi satu.',
          'A1': 'Teks pertama.',
          ';': 'Pemisah antar argumen fungsi (titik koma).',
          'B1': 'Teks kedua yang akan digabungkan.',
          '(': 'Kurung buka.', ')': 'Kurung tutup.'
        };
        break;
    }

    const parts = currentFormula.match(/(".*?"|[A-Z0-9]+:[A-Z0-9]+|[A-Z]+[0-9]*|[0-9]+|[=(),;:><+\-*/])/g) || [currentFormula];

    return (
      <div className="space-y-8">
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 md:p-8">
          <h3 className="text-xl font-bold mb-6 text-center">Klik Bagian Rumusnya</h3>
          
          <div className="flex justify-center mb-6">
            <div className="inline-flex bg-gray-200 border-2 border-ink rounded-xl p-1 shadow-neo-sm flex-wrap justify-center gap-1">
              {['LEFT', 'RIGHT', 'MID', 'LEN', 'TRIM', 'CONCAT'].map((mode) => (
                <button 
                  key={mode}
                  onClick={() => { setTextMode(mode as any); setActivePart(null); }}
                  className={`px-3 py-2 rounded-lg font-bold text-sm transition-all ${textMode === mode ? 'bg-white shadow-sm text-ink' : 'text-gray-500 hover:text-ink'}`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2 text-2xl md:text-3xl font-mono bg-white p-6 rounded-xl border-2 border-ink shadow-neo w-full">
              {parts.map((part, index) => (
                <span
                  key={index}
                  onClick={() => setActivePart(part)}
                  className={`cursor-pointer px-1 rounded transition-all duration-200 ${
                    activePart === part 
                      ? 'bg-yellow-200 text-ink scale-110 font-bold ring-2 ring-ink' 
                      : 'hover:bg-gray-100 text-gray-800'
                  }`}
                >
                  {part}
                </span>
              ))}
            </div>

            <div className="mt-6 min-h-25 w-full">
              {activePart && currentExplanations[activePart] ? (
                <div className="p-5 bg-white border-2 border-dashed border-gray-300 rounded-xl text-center shadow-sm animate-in fade-in slide-in-from-top-2">
                  <p className="text-pink-600 font-bold text-lg">{currentExplanations[activePart]}</p>
                </div>
              ) : (
                <div className="p-5 text-center text-gray-400 font-medium border-2 border-transparent">
                  👆 Klik pada bagian rumus di atas untuk melihat penjelasan.
                </div>
              )}
            </div>
          </div>

          <div className="bg-yellow border-2 border-ink rounded-xl p-3 mt-8">
            <p className="text-sm font-bold text-center">💡 Tips: Pahami kegunaan masing-masing fungsi teks agar kamu bisa memanipulasi data dengan tepat.</p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // FUNGSI SUMIF / SUMIFS (DENGAN TOGGLE)
  // ==========================================
  if (slug === 'fungsi-sumif-sumifs') {
    const isSumIf = sumIfMode === 'SUMIF';
    
    let currentFormula = '';
    let currentExplanations: Record<string, string> = {};

    if (isSumIf) {
      currentFormula = '=SUMIF(B1:B10; "A"; C1:C10)';
      currentExplanations = {
        '=': 'Awal rumus.',
        'SUMIF': 'Menjumlahkan data dengan SATU kriteria saja.',
        'B1:B10': 'Range kriteria: Tempat mencari kata "A".',
        ':': 'Tanda "sampai dengan". B1:B10 berarti dari B1 sampai B10.',
        ';': 'Pemisah antar argumen fungsi (titik koma).',
        '"A"': 'Kriteria: Hanya jumlahkan jika isinya "A".',
        'C1:C10': 'Sum Range: Kolom angka yang akan dijumlahkan.',
        '(': 'Kurung buka.', ')': 'Kurung tutup.'
      };
    } else {
      currentFormula = '=SUMIFS(C1:C10; B1:B10; "A"; D1:D10; "Lulus")';
      currentExplanations = {
        '=': 'Awal rumus.',
        'SUMIFS': 'Menjumlahkan data dengan LEBIH DARI SATU kriteria.',
        'C1:C10': 'Sum Range: Kolom angka yang akan dijumlahkan.',
        ';': 'Pemisah antar argumen fungsi (titik koma).',
        'B1:B10': 'Range kriteria 1: Tempat mencari kriteria pertama.',
        '"A"': 'Kriteria 1: Hanya jika isinya "A".',
        'D1:D10': 'Range kriteria 2: Tempat mencari kriteria kedua.',
        '"Lulus"': 'Kriteria 2: Hanya jika isinya "Lulus".',
        ':': 'Tanda "sampai dengan".',
        '(': 'Kurung buka.', ')': 'Kurung tutup.'
      };
    }

    const parts = currentFormula.match(/(".*?"|[A-Z0-9]+:[A-Z0-9]+|[A-Z]+[0-9]*|[0-9]+|[=(),;:><+\-*/])/g) || [currentFormula];

    return (
      <div className="space-y-8">
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 md:p-8">
          <h3 className="text-xl font-bold mb-6 text-center">Klik Bagian Rumusnya</h3>
          
          <div className="flex justify-center mb-6">
            <div className="inline-flex bg-gray-200 border-2 border-ink rounded-xl p-1 shadow-neo-sm flex-wrap justify-center">
              <button 
                onClick={() => { setSumIfMode('SUMIF'); setActivePart(null); }}
                className={`px-6 py-2 rounded-lg font-bold transition-all ${isSumIf ? 'bg-white shadow-sm text-ink' : 'text-gray-500 hover:text-ink'}`}
              >
                SUMIF (1 Kriteria)
              </button>
              <button 
                onClick={() => { setSumIfMode('SUMIFS'); setActivePart(null); }}
                className={`px-6 py-2 rounded-lg font-bold transition-all ${!isSumIf ? 'bg-white shadow-sm text-ink' : 'text-gray-500 hover:text-ink'}`}
              >
                SUMIFS (Banyak Kriteria)
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2 text-2xl md:text-3xl font-mono bg-white p-6 rounded-xl border-2 border-ink shadow-neo w-full">
              {parts.map((part, index) => (
                <span
                  key={index}
                  onClick={() => setActivePart(part)}
                  className={`cursor-pointer px-1 rounded transition-all duration-200 ${
                    activePart === part 
                      ? 'bg-yellow-200 text-ink scale-110 font-bold ring-2 ring-ink' 
                      : 'hover:bg-gray-100 text-gray-800'
                  }`}
                >
                  {part}
                </span>
              ))}
            </div>

            <div className="mt-6 min-h-25 w-full">
              {activePart && currentExplanations[activePart] ? (
                <div className="p-5 bg-white border-2 border-dashed border-gray-300 rounded-xl text-center shadow-sm animate-in fade-in slide-in-from-top-2">
                  <p className="text-pink-600 font-bold text-lg">{currentExplanations[activePart]}</p>
                </div>
              ) : (
                <div className="p-5 text-center text-gray-400 font-medium border-2 border-transparent">
                  👆 Klik pada bagian rumus di atas untuk melihat penjelasan.
                </div>
              )}
            </div>
          </div>

          <div className="bg-yellow border-2 border-ink rounded-xl p-3 mt-8">
            <p className="text-sm font-bold text-center">💡 Tips: Gunakan SUMIFS jika kamu punya lebih dari 1 kriteria (misal: penjualan produk A di bulan Januari).</p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // FUNGSI COUNTIF / COUNTIFS (DENGAN TOGGLE)
  // ==========================================
  if (slug === 'fungsi-countif') {
    const isCountIf = countIfMode === 'COUNTIF';
    
    let currentFormula = '';
    let currentExplanations: Record<string, string> = {};

    if (isCountIf) {
      currentFormula = '=COUNTIF(A1:A10; ">50")';
      currentExplanations = {
        '=': 'Awal rumus.',
        'COUNTIF': 'Menghitung jumlah sel dengan SATU kriteria saja.',
        'A1:A10': 'Range data yang diperiksa.',
        ':': 'Tanda "sampai dengan". A1:A10 berarti dari A1 sampai A10.',
        ';': 'Pemisah antar argumen fungsi (titik koma).',
        '">50"': 'Kriteria: Hanya hitung angka yang lebih dari 50.',
        '(': 'Kurung buka.', ')': 'Kurung tutup.'
      };
    } else {
      currentFormula = '=COUNTIFS(B1:B10; "A"; D1:D10; "Lulus")';
      currentExplanations = {
        '=': 'Awal rumus.',
        'COUNTIFS': 'Menghitung jumlah sel dengan LEBIH DARI SATU kriteria.',
        ';': 'Pemisah antar argumen fungsi (titik koma).',
        'B1:B10': 'Range kriteria 1: Tempat mencari kriteria pertama.',
        '"A"': 'Kriteria 1: Hanya jika isinya "A".',
        'D1:D10': 'Range kriteria 2: Tempat mencari kriteria kedua.',
        '"Lulus"': 'Kriteria 2: Hanya jika isinya "Lulus".',
        ':': 'Tanda "sampai dengan".',
        '(': 'Kurung buka.', ')': 'Kurung tutup.'
      };
    }

    const parts = currentFormula.match(/(".*?"|[A-Z0-9]+:[A-Z0-9]+|[A-Z]+[0-9]*|[0-9]+|[=(),;:><+\-*/])/g) || [currentFormula];

    return (
      <div className="space-y-8">
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 md:p-8">
          <h3 className="text-xl font-bold mb-6 text-center">Klik Bagian Rumusnya</h3>
          
          <div className="flex justify-center mb-6">
            <div className="inline-flex bg-gray-200 border-2 border-ink rounded-xl p-1 shadow-neo-sm flex-wrap justify-center">
              <button 
                onClick={() => { setCountIfMode('COUNTIF'); setActivePart(null); }}
                className={`px-6 py-2 rounded-lg font-bold transition-all ${isCountIf ? 'bg-white shadow-sm text-ink' : 'text-gray-500 hover:text-ink'}`}
              >
                COUNTIF (1 Kriteria)
              </button>
              <button 
                onClick={() => { setCountIfMode('COUNTIFS'); setActivePart(null); }}
                className={`px-6 py-2 rounded-lg font-bold transition-all ${!isCountIf ? 'bg-white shadow-sm text-ink' : 'text-gray-500 hover:text-ink'}`}
              >
                COUNTIFS (Banyak Kriteria)
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2 text-2xl md:text-3xl font-mono bg-white p-6 rounded-xl border-2 border-ink shadow-neo w-full">
              {parts.map((part, index) => (
                <span
                  key={index}
                  onClick={() => setActivePart(part)}
                  className={`cursor-pointer px-1 rounded transition-all duration-200 ${
                    activePart === part 
                      ? 'bg-yellow-200 text-ink scale-110 font-bold ring-2 ring-ink' 
                      : 'hover:bg-gray-100 text-gray-800'
                  }`}
                >
                  {part}
                </span>
              ))}
            </div>

            <div className="mt-6 min-h-25 w-full">
              {activePart && currentExplanations[activePart] ? (
                <div className="p-5 bg-white border-2 border-dashed border-gray-300 rounded-xl text-center shadow-sm animate-in fade-in slide-in-from-top-2">
                  <p className="text-pink-600 font-bold text-lg">{currentExplanations[activePart]}</p>
                </div>
              ) : (
                <div className="p-5 text-center text-gray-400 font-medium border-2 border-transparent">
                  👆 Klik pada bagian rumus di atas untuk melihat penjelasan.
                </div>
              )}
            </div>
          </div>

          <div className="bg-yellow border-2 border-ink rounded-xl p-3 mt-8">
            <p className="text-sm font-bold text-center">💡 Tips: Gunakan COUNTIFS jika kamu ingin menghitung dengan lebih dari 1 syarat (misal: menghitung siswa laki-laki yang lulus).</p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // FUNGSI AVERAGEIF / AVERAGEIFS (DENGAN TOGGLE)
  // ==========================================
  if (slug === 'fungsi-averageif') {
    const isAverageIf = averageIfMode === 'AVERAGEIF';
    
    let currentFormula = '';
    let currentExplanations: Record<string, string> = {};

    if (isAverageIf) {
      currentFormula = '=AVERAGEIF(B1:B10; "Laki-laki"; C1:C10)';
      currentExplanations = {
        '=': 'Awal rumus.',
        'AVERAGEIF': 'Mencari rata-rata dengan SATU kriteria saja.',
        'B1:B10': 'Range kriteria: Tempat mencari kata "Laki-laki".',
        ':': 'Tanda "sampai dengan". B1:B10 berarti dari B1 sampai B10.',
        ';': 'Pemisah antar argumen fungsi (titik koma).',
        '"Laki-laki"': 'Kriteria: Hanya hitung rata-rata jika isinya "Laki-laki".',
        'C1:C10': 'Average Range: Kolom angka yang akan dirata-ratakan.',
        '(': 'Kurung buka.', ')': 'Kurung tutup.'
      };
    } else {
      currentFormula = '=AVERAGEIFS(C1:C10; B1:B10; "Laki-laki"; D1:D10; "Lulus")';
      currentExplanations = {
        '=': 'Awal rumus.',
        'AVERAGEIFS': 'Mencari rata-rata dengan LEBIH DARI SATU kriteria.',
        'C1:C10': 'Average Range: Kolom angka yang akan dirata-ratakan.',
        ';': 'Pemisah antar argumen fungsi (titik koma).',
        'B1:B10': 'Range kriteria 1: Tempat mencari kriteria pertama.',
        '"Laki-laki"': 'Kriteria 1: Hanya jika isinya "Laki-laki".',
        'D1:D10': 'Range kriteria 2: Tempat mencari kriteria kedua.',
        '"Lulus"': 'Kriteria 2: Hanya jika isinya "Lulus".',
        ':': 'Tanda "sampai dengan".',
        '(': 'Kurung buka.', ')': 'Kurung tutup.'
      };
    }

    const parts = currentFormula.match(/(".*?"|[A-Z0-9]+:[A-Z0-9]+|[A-Z]+[0-9]*|[0-9]+|[=(),;:><+\-*/])/g) || [currentFormula];

    return (
      <div className="space-y-8">
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 md:p-8">
          <h3 className="text-xl font-bold mb-6 text-center">Klik Bagian Rumusnya</h3>
          
          <div className="flex justify-center mb-6">
            <div className="inline-flex bg-gray-200 border-2 border-ink rounded-xl p-1 shadow-neo-sm flex-wrap justify-center">
              <button 
                onClick={() => { setAverageIfMode('AVERAGEIF'); setActivePart(null); }}
                className={`px-6 py-2 rounded-lg font-bold transition-all ${isAverageIf ? 'bg-white shadow-sm text-ink' : 'text-gray-500 hover:text-ink'}`}
              >
                AVERAGEIF (1 Kriteria)
              </button>
              <button 
                onClick={() => { setAverageIfMode('AVERAGEIFS'); setActivePart(null); }}
                className={`px-6 py-2 rounded-lg font-bold transition-all ${!isAverageIf ? 'bg-white shadow-sm text-ink' : 'text-gray-500 hover:text-ink'}`}
              >
                AVERAGEIFS (Banyak Kriteria)
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2 text-2xl md:text-3xl font-mono bg-white p-6 rounded-xl border-2 border-ink shadow-neo w-full">
              {parts.map((part, index) => (
                <span
                  key={index}
                  onClick={() => setActivePart(part)}
                  className={`cursor-pointer px-1 rounded transition-all duration-200 ${
                    activePart === part 
                      ? 'bg-yellow-200 text-ink scale-110 font-bold ring-2 ring-ink' 
                      : 'hover:bg-gray-100 text-gray-800'
                  }`}
                >
                  {part}
                </span>
              ))}
            </div>

            <div className="mt-6 min-h-25 w-full">
              {activePart && currentExplanations[activePart] ? (
                <div className="p-5 bg-white border-2 border-dashed border-gray-300 rounded-xl text-center shadow-sm animate-in fade-in slide-in-from-top-2">
                  <p className="text-pink-600 font-bold text-lg">{currentExplanations[activePart]}</p>
                </div>
              ) : (
                <div className="p-5 text-center text-gray-400 font-medium border-2 border-transparent">
                  👆 Klik pada bagian rumus di atas untuk melihat penjelasan.
                </div>
              )}
            </div>
          </div>

          <div className="bg-yellow border-2 border-ink rounded-xl p-3 mt-8">
            <p className="text-sm font-bold text-center">💡 Tips: Gunakan AVERAGEIFS jika kamu ingin mencari rata-rata dengan lebih dari 1 syarat.</p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // FUNGSI LOOKUP (VLOOKUP, HLOOKUP, XLOOKUP)
  // ==========================================
  if (slug === 'fungsi-lookup') {
    let currentFormula = '';
    let currentExplanations: Record<string, string> = {};

    if (lookupMode === 'VLOOKUP') {
      currentFormula = '=VLOOKUP(A2; B1:D10; 3; FALSE)';
      currentExplanations = {
        '=': 'Awal rumus.',
        'VLOOKUP': 'Mencari data secara VERTIKAL (per kolom).',
        'A2': 'Lookup Value: Nilai yang dicari (misal: ID).',
        ';': 'Pemisah antar argumen fungsi (titik koma).',
        'B1:D10': 'Table Array: Tabel tempat mencari data. Titik dua (:) berarti dari B1 sampai D10.',
        ':': 'Tanda "sampai dengan".',
        '3': 'Col Index Num: Kolom ke-3 di tabel tersebut yang diambil hasilnya.',
        'FALSE': 'Range Lookup: Gunakan FALSE untuk pencarian PERSIS.',
        '(': 'Kurung buka.', ')': 'Kurung tutup.'
      };
    } else if (lookupMode === 'HLOOKUP') {
      currentFormula = '=HLOOKUP(A5; B1:D10; 3; FALSE)';
      currentExplanations = {
        '=': 'Awal rumus.',
        'HLOOKUP': 'Mencari data secara HORIZONTAL (per baris).',
        'A5': 'Lookup Value: Nilai yang dicari (misal: ID).',
        ';': 'Pemisah antar argumen fungsi (titik koma).',
        'B1:D10': 'Table Array: Tabel tempat mencari data. Titik dua (:) berarti dari B1 sampai D10.',
        ':': 'Tanda "sampai dengan".',
        '3': 'Row Index Num: Baris ke-3 di tabel tersebut yang diambil hasilnya.',
        'FALSE': 'Range Lookup: Gunakan FALSE untuk pencarian PERSIS.',
        '(': 'Kurung buka.', ')': 'Kurung tutup.'
      };
    } else {
      currentFormula = '=XLOOKUP(A2; B1:B10; D1:D10)';
      currentExplanations = {
        '=': 'Awal rumus.',
        'XLOOKUP': 'Fungsi modern untuk mencari data (bisa vertikal/horizontal).',
        'A2': 'Lookup Value: Nilai yang dicari.',
        ';': 'Pemisah antar argumen fungsi (titik koma).',
        'B1:B10': 'Lookup Array: Kolom/baris tempat mencari nilai.',
        ':': 'Tanda "sampai dengan".',
        'D1:D10': 'Return Array: Kolom/baris yang berisi hasil yang ingin diambil.',
        '(': 'Kurung buka.', ')': 'Kurung tutup.'
      };
    }

    const parts = currentFormula.match(/(".*?"|[A-Z0-9]+:[A-Z0-9]+|[A-Z]+[0-9]*|[0-9]+|[=(),;:><+\-*/])/g) || [currentFormula];

    return (
      <div className="space-y-8">
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 md:p-8">
          <h3 className="text-xl font-bold mb-6 text-center">Klik Bagian Rumusnya</h3>
          
          <div className="flex justify-center mb-6">
            <div className="inline-flex bg-gray-200 border-2 border-ink rounded-xl p-1 shadow-neo-sm flex-wrap justify-center gap-1">
              {['VLOOKUP', 'HLOOKUP', 'XLOOKUP'].map((mode) => (
                <button 
                  key={mode}
                  onClick={() => { setLookupMode(mode as any); setActivePart(null); }}
                  className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${lookupMode === mode ? 'bg-white shadow-sm text-ink' : 'text-gray-500 hover:text-ink'}`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2 text-2xl md:text-3xl font-mono bg-white p-6 rounded-xl border-2 border-ink shadow-neo w-full">
              {parts.map((part, index) => (
                <span
                  key={index}
                  onClick={() => setActivePart(part)}
                  className={`cursor-pointer px-1 rounded transition-all duration-200 ${
                    activePart === part 
                      ? 'bg-yellow-200 text-ink scale-110 font-bold ring-2 ring-ink' 
                      : 'hover:bg-gray-100 text-gray-800'
                  }`}
                >
                  {part}
                </span>
              ))}
            </div>

            <div className="mt-6 min-h-25 w-full">
              {activePart && currentExplanations[activePart] ? (
                <div className="p-5 bg-white border-2 border-dashed border-gray-300 rounded-xl text-center shadow-sm animate-in fade-in slide-in-from-top-2">
                  <p className="text-pink-600 font-bold text-lg">{currentExplanations[activePart]}</p>
                </div>
              ) : (
                <div className="p-5 text-center text-gray-400 font-medium border-2 border-transparent">
                  👆 Klik pada bagian rumus di atas untuk melihat penjelasan.
                </div>
              )}
            </div>
          </div>

          <div className="bg-yellow border-2 border-ink rounded-xl p-3 mt-8">
            <p className="text-sm font-bold text-center">💡 Tips: XLOOKUP adalah fungsi paling fleksibel dan modern, tapi VLOOKUP/HLOOKUP masih sering dipakai di dunia kerja.</p>
          </div>
        </div>
      </div>
    );
  }
// ==========================================
// MATERI PIVOT TABLE & PIVOT CHART
// ==========================================
if (slug === 'membuat-pivottable-pivotchart' || slug === 'pivottable-dashboard') { // Sesuaikan slug-nya
  return <PivotChartVisual />;
}

  // Fallback: Jika tidak ada visual khusus, tampilkan default
  return null;
}