'use client';

import { useState } from 'react';
import { BookOpen, Table, Rows, Columns } from 'lucide-react';

type TabType = 'workbook' | 'worksheet' | 'rows' | 'columns';

export default function WorkbookVisual() {
  const [activeTab, setActiveTab] = useState<TabType>('workbook');

  const tabs = [
    { id: 'workbook', label: 'Workbook', icon: <BookOpen size={18} /> },
    { id: 'worksheet', label: 'Worksheet', icon: <Table size={18} /> },
    { id: 'rows', label: 'Baris (Rows)', icon: <Rows size={18} /> },
    { id: 'columns', label: 'Kolom (Columns)', icon: <Columns size={18} /> },
  ];

  return (
    <div className="space-y-8">
      {/* TABS NAVIGASI */}
      <div className="flex flex-wrap md:flex-nowrap bg-gray-100 p-1 border-2 border-ink rounded-xl shadow-neo max-w-fit mx-auto md:mx-0 gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`flex items-center gap-2 px-3 md:px-5 py-2.5 rounded-lg font-bold text-sm transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-white shadow-sm text-ink border-2 border-ink'
                : 'text-gray-500 hover:text-ink border-2 border-transparent'
            }`}
          >
            {tab.icon} <span className="hidden md:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* KONTEN WORKBOOK */}
      {activeTab === 'workbook' && (
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 md:p-8 space-y-8 animate-in fade-in duration-300">
          <div>
            <h3 className="text-2xl font-black mb-4">1. Mengenal Workbook</h3>
            <p className="text-gray-700 leading-relaxed">
              <strong>Workbook</strong> adalah satu file Excel utuh. Di dalamnya terdapat beberapa <strong>Worksheet</strong> (lembar kerja). 
              Jika diibaratkan, Workbook adalah sebuah buku, dan Worksheet adalah halaman-halaman di dalamnya.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-black mb-4">2. Membuat Workbook Baru</h3>
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-4 mb-4">
              <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                <li>Buka aplikasi Microsoft Excel.</li>
                <li>Klik menu <strong>File</strong> di pojok kiri atas.</li>
                <li>Pilih <strong>New</strong> untuk membuat dokumen baru.</li>
                <li>Pilih <strong>Blank Workbook</strong> atau klik tombol <strong>Create</strong>.</li>
              </ol>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <img src="/worksheet/workbook1.png" alt="Membuat Workbook Baru" className="w-full border-2 border-ink rounded-xl shadow-sm" />
                <p className="text-center text-sm text-gray-500 mt-2 font-bold">Menu File &gt; New &gt; Create</p>
              </div>
              <div>
                <img src="/worksheet/workbook2.png" alt="Hasil Workbook Baru" className="w-full border-2 border-ink rounded-xl shadow-sm" />
                <p className="text-center text-sm text-gray-500 mt-2 font-bold">Tampilan Workbook baru yang siap digunakan.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* KONTEN WORKSHEET */}
      {activeTab === 'worksheet' && (
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 md:p-8 space-y-8 animate-in fade-in duration-300">
          <div>
            <h3 className="text-2xl font-black mb-4">1. Mengenal Worksheet</h3>
            <p className="text-gray-700 leading-relaxed">
              <strong>Worksheet</strong> adalah lembar kerja di dalam Workbook. Setiap Worksheet memiliki tab nama di bagian bawah Excel. Kamu bisa memiliki banyak Worksheet untuk memisahkan data (misal: Data Januari, Data Februari).
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-black mb-4">2. Menambahkan Worksheet</h3>
            <p className="text-gray-700 mb-4">Klik ikon <strong>+</strong> di samping tab Sheet untuk menambahkan Worksheet baru.</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <img src="/worksheet/worksheet1.png" alt="Tombol Tambah Sheet" className="w-full border-2 border-ink rounded-xl shadow-sm" />
                <p className="text-center text-sm text-gray-500 mt-2 font-bold">Klik ikon + di samping tab Sheet.</p>
              </div>
              <div>
                <img src="/worksheet/worksheet2.png" alt="Sheet Baru" className="w-full border-2 border-ink rounded-xl shadow-sm" />
                <p className="text-center text-sm text-gray-500 mt-2 font-bold">Sheet baru berhasil ditambahkan.</p>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 pt-4 border-t-2 border-dashed border-gray-200">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
              <h4 className="font-bold mb-2 text-blue-800">3. Mengganti Nama Worksheet</h4>
              <ul className="list-disc pl-5 text-sm space-y-1 text-gray-700">
                <li>Klik dua kali nama Sheet, ATAU</li>
                <li>Klik kanan tab Sheet &gt; pilih <strong>Rename</strong>.</li>
                <li>Ketik nama baru lalu tekan Enter.</li>
              </ul>
            </div>
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
              <h4 className="font-bold mb-2 text-red-800">4. Menghapus Worksheet</h4>
              <ul className="list-disc pl-5 text-sm space-y-1 text-gray-700">
                <li>Klik kanan tab Sheet.</li>
                <li>Pilih <strong>Delete</strong>.</li>
                <li className="font-bold text-red-600 mt-2">⚠️ Peringatan: Menghapus Sheet akan menghilangkan semua data di dalamnya secara permanen.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* KONTEN BARIS */}
      {activeTab === 'rows' && (
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 md:p-8 space-y-8 animate-in fade-in duration-300">
          <div>
            <h3 className="text-2xl font-black mb-4">1. Mengenal Baris</h3>
            <p className="text-gray-700 leading-relaxed">
              <strong>Row (Baris)</strong> adalah baris horizontal yang ditandai dengan angka (1, 2, 3...) di sisi kiri lembar kerja. Baris membantu mengorganisasi data secara horizontal.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
              <h4 className="font-bold mb-2">2. Menambah / Menghapus Baris</h4>
              <ul className="list-disc pl-5 text-sm space-y-1 text-gray-700">
                <li>Klik angka nomor baris (misal: 5) untuk memilih baris penuh.</li>
                <li>Klik kanan &gt; <strong>Insert</strong> untuk menambah baris baru di atasnya.</li>
                <li>Klik kanan &gt; <strong>Delete</strong> untuk menghapus baris.</li>
              </ul>
            </div>
            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
              <h4 className="font-bold mb-2">3. Mengatur Tinggi Baris</h4>
              <ul className="list-disc pl-5 text-sm space-y-1 text-gray-700">
                <li>Pilih baris yang ingin diubah.</li>
                <li>Buka tab <strong>Home</strong> &gt; <strong>Format</strong> &gt; <strong>Row Height</strong>.</li>
                <li>Masukkan ukuran angka tinggi baris secara manual, lalu klik OK.</li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black mb-4">4. AutoFit Row Height</h3>
            <p className="text-gray-700 mb-4">AutoFit digunakan agar Excel menyesuaikan tinggi baris secara otomatis berdasarkan isi teks terpanjang di dalamnya.</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <img src="/worksheet/autoheight1.png" alt="Menu AutoFit Height" className="w-full border-2 border-ink rounded-xl shadow-sm" />
                <p className="text-center text-sm text-gray-500 mt-2 font-bold">Pilih Home &gt; Format &gt; AutoFit Row Height.</p>
              </div>
              <div>
                <img src="/worksheet/autoheight2.png" alt="Hasil AutoFit Height" className="w-full border-2 border-ink rounded-xl shadow-sm" />
                <p className="text-center text-sm text-gray-500 mt-2 font-bold">Tinggi baris menyesuaikan secara otomatis.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* KONTEN KOLOM */}
      {activeTab === 'columns' && (
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 md:p-8 space-y-8 animate-in fade-in duration-300">
          <div>
            <h3 className="text-2xl font-black mb-4">1. Mengenal Kolom</h3>
            <p className="text-gray-700 leading-relaxed">
              <strong>Column (Kolom)</strong> adalah kolom vertikal yang ditandai dengan huruf (A, B, C...) di bagian atas lembar kerja. Kolom membantu mengorganisasi data secara vertikal.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
              <h4 className="font-bold mb-2">2. Menambah / Menghapus Kolom</h4>
              <ul className="list-disc pl-5 text-sm space-y-1 text-gray-700">
                <li>Klik huruf kolom (misal: C) untuk memilih kolom penuh.</li>
                <li>Klik kanan &gt; <strong>Insert</strong> untuk menambah kolom baru di kirinya.</li>
                <li>Klik kanan &gt; <strong>Delete</strong> untuk menghapus kolom.</li>
              </ul>
            </div>
            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
              <h4 className="font-bold mb-2">3. Mengatur Lebar Kolom</h4>
              <ul className="list-disc pl-5 text-sm space-y-1 text-gray-700">
                <li>Pilih kolom yang ingin diubah.</li>
                <li>Buka tab <strong>Home</strong> &gt; <strong>Format</strong> &gt; <strong>Column Width</strong>.</li>
                <li>Masukkan angka lebar kolom secara manual, lalu klik OK.</li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black mb-4">4. AutoFit Column Width</h3>
            <p className="text-gray-700 mb-4">Excel akan menyesuaikan lebar kolom secara otomatis berdasarkan isi sel terpanjang di dalam kolom tersebut.</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <img src="/worksheet/autoweidth1.png" alt="Menu AutoFit Width" className="w-full border-2 border-ink rounded-xl shadow-sm" />
                <p className="text-center text-sm text-gray-500 mt-2 font-bold">Pilih Home &gt; Format &gt; AutoFit Column Width.</p>
              </div>
              <div>
                <img src="/worksheet/autoweidth2.png" alt="Hasil AutoFit Width" className="w-full border-2 border-ink rounded-xl shadow-sm" />
                <p className="text-center text-sm text-gray-500 mt-2 font-bold">Lebar kolom menyesuaikan secara otomatis.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}