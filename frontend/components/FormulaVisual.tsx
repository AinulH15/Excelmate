'use client';

import { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import SpreadsheetVisual from '@/components/SpreadsheetVisual';
interface Props {
  slug: string;
}

export default function FormulaVisual({ slug }: Props) {
  const [activePart, setActivePart] = useState<string | null>(null);

  // ==========================================
  // AVERAGE
  // ==========================================
  if (slug === 'fungsi-average') {
    return (
      <div className="space-y-6">
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
          <h3 className="text-xl font-bold mb-4 text-center">Klik Bagian Rumus AVERAGE</h3>
          <div className="text-3xl md:text-5xl font-mono font-bold flex items-center justify-center gap-1 md:gap-2 flex-wrap text-center mb-6">
            <button onClick={() => setActivePart('sama')} className={`text-pink-500 hover:scale-110 ${activePart === 'sama' ? 'bg-pink/20 rounded-lg px-2' : ''}`}>=</button>
            <button onClick={() => setActivePart('fungsi')} className={`text-blue-600 hover:scale-110 ${activePart === 'fungsi' ? 'bg-blue/20 rounded-lg px-2' : ''}`}>AVERAGE</button>
            <button onClick={() => setActivePart('kurung')} className={`text-gray-400 hover:scale-110 ${activePart === 'kurung' ? 'bg-gray-200 rounded-lg px-2' : ''}`}>(</button>
            <button onClick={() => setActivePart('range')} className={`text-green-600 hover:scale-110 ${activePart === 'range' ? 'bg-mint rounded-lg px-2' : ''}`}>B1:B3</button>
            <button onClick={() => setActivePart('kurung')} className={`text-gray-400 hover:scale-110 ${activePart === 'kurung' ? 'bg-gray-200 rounded-lg px-2' : ''}`}>)</button>
          </div>
          <div className="min-h-[100px] bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-4 flex items-center justify-center text-center">
            {activePart === 'sama' && <p className="text-lg font-bold text-pink-600">Tanda (=) memberitahu Excel bahwa ini adalah sebuah rumus.</p>}
            {activePart === 'fungsi' && <p className="text-lg font-bold text-blue-600">AVERAGE adalah nama fungsi untuk mencari rata-rata.</p>}
            {activePart === 'kurung' && <p className="text-lg font-bold text-gray-600">Tanda kurung ( ) membungkus data yang akan dihitung.</p>}
            {activePart === 'range' && <p className="text-lg font-bold text-green-600">B1:B3 adalah rentang cell yang akan dicari rata-ratanya.</p>}
            {!activePart && <p className="text-gray-500 font-bold flex items-center gap-2"><Lightbulb size={20}/> Klik salah satu bagian rumus.</p>}
          </div>
        </div>

        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold">Contoh: Rata-rata Nilai Ujian</h3>
          </div>
          <SpreadsheetVisual 
            data={[['Siswa A', '80'], ['Siswa B', '90'], ['Siswa C', '70'], ['Rata-rata', '=AVERAGE(B1:B3)']]}
            highlightCells={['B4']}
            showFormula="=AVERAGE(B1:B3)"
            showResult="80"
          />
          <p className="text-center text-sm font-bold text-gray-500 mt-4">*AVERAGE menjumlahkan (80+90+70) lalu dibagi 3, hasilnya 80.</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // MAX & MIN
  // ==========================================
  if (slug === 'fungsi-max-min') {
    return (
      <div className="space-y-6">
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
          <h3 className="text-xl font-bold mb-4 text-center">Klik Bagian Rumus MAX / MIN</h3>
          <div className="flex flex-col gap-4">
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-mono font-bold flex items-center justify-center gap-1 mb-2">
                <button onClick={() => setActivePart('sama')} className="text-pink-500 hover:scale-110">=</button>
                <button onClick={() => setActivePart('max')} className="text-blue-600 hover:scale-110">MAX</button>
                <button onClick={() => setActivePart('kurung')} className="text-gray-400 hover:scale-110">(</button>
                <button onClick={() => setActivePart('range')} className="text-green-600 hover:scale-110">B1:B3</button>
                <button onClick={() => setActivePart('kurung')} className="text-gray-400 hover:scale-110">)</button>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-mono font-bold flex items-center justify-center gap-1 mb-2">
                <button onClick={() => setActivePart('sama')} className="text-pink-500 hover:scale-110">=</button>
                <button onClick={() => setActivePart('min')} className="text-blue-600 hover:scale-110">MIN</button>
                <button onClick={() => setActivePart('kurung')} className="text-gray-400 hover:scale-110">(</button>
                <button onClick={() => setActivePart('range')} className="text-green-600 hover:scale-110">B1:B3</button>
                <button onClick={() => setActivePart('kurung')} className="text-gray-400 hover:scale-110">)</button>
              </div>
            </div>
          </div>
          <div className="min-h-[100px] bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-4 flex items-center justify-center text-center mt-4">
            {activePart === 'sama' && <p className="text-lg font-bold text-pink-600">Tanda (=) memulai rumus.</p>}
            {activePart === 'max' && <p className="text-lg font-bold text-blue-600">MAX mencari nilai paling besar.</p>}
            {activePart === 'min' && <p className="text-lg font-bold text-blue-600">MIN mencari nilai paling kecil.</p>}
            {activePart === 'kurung' && <p className="text-lg font-bold text-gray-600">Tanda kurung membungkus data.</p>}
            {activePart === 'range' && <p className="text-lg font-bold text-green-600">B1:B3 adalah data yang dicari.</p>}
            {!activePart && <p className="text-gray-500 font-bold flex items-center gap-2"><Lightbulb size={20}/> Klik bagian rumus.</p>}
          </div>
        </div>

        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold">Contoh: Penjualan Tertinggi & Terendah</h3>
          </div>
          <SpreadsheetVisual 
            data={[['Senin', '100'], ['Selasa', '200'], ['Rabu', '150'], ['MAX', '=MAX(B1:B3)'], ['MIN', '=MIN(B1:B3)']]}
            highlightCells={['B4', 'B5']}
            showFormula="=MAX(B1:B3) / =MIN(B1:B3)"
            showResult="200 / 100"
          />
          <p className="text-center text-sm font-bold text-gray-500 mt-4">*MAX menghasilkan 200, MIN menghasilkan 100.</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // COUNT, COUNTA, COUNTBLANK
  // ==========================================
  if (slug === 'fungsi-count') {
    return (
      <div className="space-y-6">
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
          <h3 className="text-xl font-bold mb-4 text-center">Klik Bagian Rumus COUNT</h3>
          <div className="text-2xl md:text-4xl font-mono font-bold flex items-center justify-center gap-1 flex-wrap text-center mb-6">
            <button onClick={() => setActivePart('sama')} className="text-pink-500 hover:scale-110">=</button>
            <button onClick={() => setActivePart('count')} className="text-blue-600 hover:scale-110">COUNT</button>
            <button onClick={() => setActivePart('kurung')} className="text-gray-400 hover:scale-110">(</button>
            <button onClick={() => setActivePart('range')} className="text-green-600 hover:scale-110">A1:A3</button>
            <button onClick={() => setActivePart('kurung')} className="text-gray-400 hover:scale-110">)</button>
          </div>
          <div className="min-h-[100px] bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-4 flex items-center justify-center text-center">
            {activePart === 'sama' && <p className="text-lg font-bold text-pink-600">Tanda (=) memulai rumus.</p>}
            {activePart === 'count' && <p className="text-lg font-bold text-blue-600">COUNT menghitung jumlah cell berisi ANGKA.</p>}
            {activePart === 'kurung' && <p className="text-lg font-bold text-gray-600">Tanda kurung membungkus data.</p>}
            {activePart === 'range' && <p className="text-lg font-bold text-green-600">A1:A3 adalah rentang yang akan dihitung.</p>}
            {!activePart && <p className="text-gray-500 font-bold flex items-center gap-2"><Lightbulb size={20}/> Klik bagian rumus.</p>}
          </div>
        </div>

        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold">Contoh: Menghitung Data</h3>
          </div>
          <SpreadsheetVisual 
            data={[['Budi', '80'], ['Andi', 'Teks'], ['Siti', '(kosong)'], ['COUNT', '=COUNT(A1:A3)'], ['COUNTA', '=COUNTA(A1:A3)']]}
            highlightCells={['B4', 'B5']}
            showFormula="=COUNT(A1:A3) / =COUNTA(A1:A3)"
            showResult="2 / 3"
          />
          <p className="text-center text-sm font-bold text-gray-500 mt-4">*COUNT hanya menghitung angka (2), COUNTA menghitung semua yang terisi (3).</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // IF
  // ==========================================
  if (slug === 'fungsi-if') {
    return (
      <div className="space-y-6">
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
          <h3 className="text-xl font-bold mb-4 text-center">Klik Bagian Rumus IF</h3>
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
          <div className="min-h-[100px] bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-4 flex items-center justify-center text-center">
            {activePart === 'sama' && <p className="text-lg font-bold text-pink-600">Tanda (=) memulai rumus.</p>}
            {activePart === 'if' && <p className="text-lg font-bold text-blue-600">IF adalah fungsi logika (Jika).</p>}
            {activePart === 'kurung' && <p className="text-lg font-bold text-gray-600">Tanda kurung membungkus semua argumen.</p>}
            {activePart === 'kondisi' && <p className="text-lg font-bold text-purple-600">Kondisi yang dicek: Apakah nilai B2 lebih besar atau sama dengan 75?</p>}
            {activePart === 'true' && <p className="text-lg font-bold text-green-600">Jika kondisi BENAR, tampilkan "Lulus".</p>}
            {activePart === 'false' && <p className="text-lg font-bold text-red-600">Jika kondisi SALAH, tampilkan "Gagal".</p>}
            {!activePart && <p className="text-gray-500 font-bold flex items-center gap-2"><Lightbulb size={20}/> Klik bagian rumus.</p>}
          </div>
        </div>

        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold">Contoh: Status Kelulusan</h3>
          </div>
          <SpreadsheetVisual 
            data={[['Nama', 'Nilai', 'Status'], ['Andi', '80', '=IF(B2>=75, "Lulus", "Gagal")']]}
            highlightCells={['C2']}
            showFormula='=IF(B2>=75, "Lulus", "Gagal")'
            showResult="Lulus"
          />
          <p className="text-center text-sm font-bold text-gray-500 mt-4">*Karena nilai Andi 80 (di atas 75), hasilnya "Lulus".</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // FALLBACK (SUM)
  // ==========================================
  return null;
}