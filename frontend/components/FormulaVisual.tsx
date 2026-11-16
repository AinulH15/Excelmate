'use client';

import { useState } from 'react';
import { Lightbulb, Calendar, AlertCircle, Filter, Palette, LayoutDashboard, BarChart3, Table } from 'lucide-react';
import SpreadsheetVisual from './SpreadsheetVisual';

interface Props {
  slug: string;
}

export default function FormulaVisual({ slug }: Props) {
  const [activePart, setActivePart] = useState<string | null>(null);

  // ==========================================
  // CELL REFERENCE (Relative, Absolute, Mixed)
  // ==========================================
  if (slug === 'cell-reference') {
    return (
      <div className="space-y-8">
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
          <h3 className="text-xl font-bold mb-4 text-center">Contoh Perbedaan Referensi</h3>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {/* Relative */}
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4">
              <p className="font-bold text-blue-800 mb-2">Relative (A1)</p>
              <p className="text-sm mb-2">Berubah saat copy-paste.</p>
              <code className="bg-white p-2 rounded text-sm block mb-2">=A1 + B1</code>
              <p className="text-xs">Copy ke bawah: =A2+B2</p>
            </div>
            {/* Absolute */}
            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4">
              <p className="font-bold text-green-800 mb-2">Absolute ($A$1)</p>
              <p className="text-sm mb-2">Tetap saat copy-paste.</p>
              <code className="bg-white p-2 rounded text-sm block mb-2">=$A$1 + B1</code>
              <p className="text-xs">Copy ke bawah: =$A$1+B2</p>
            </div>
            {/* Mixed */}
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
              <code className="bg-white p-2 rounded text-sm block mb-2">=VLOOKUP("Anggur", A1:B3, 2, FALSE)</code>
              <p className="text-red-600 font-bold">Hasil: #N/A</p>
              <p className="text-xs mt-2">Error mengganggu laporan.</p>
            </div>
            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4">
              <p className="font-bold text-green-800 mb-2">✅ Dengan IFERROR</p>
              <code className="bg-white p-2 rounded text-sm block mb-2">=IFERROR(VLOOKUP(...), "Tidak Ada")</code>
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

  // Fallback: Jika tidak ada visual khusus, tampilkan default
  return null;
}