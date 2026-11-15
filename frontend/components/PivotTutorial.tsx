'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Lightbulb, Info } from 'lucide-react';

export default function PivotTutorial() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "1. Data Mentah",
      image: "/pivot/pivot1.png",
      desc: "Ini adalah data penjualan mentah. Kamu punya banyak transaksi dengan produk yang berulang. Tujuan kita adalah merangkum data ini menjadi ringkasan per produk.",
      tip: "Pastikan data memiliki judul kolom di baris pertama (No, Tanggal, Produk, dst).",
      highlight: null,
    },
    {
      title: "2. Pilih Menu Insert",
      image: "/pivot/pivot2.png",
      desc: "Blok seluruh data (B3:I23), lalu klik tab **Insert** di Ribbon Excel. Di grup Tables, klik tombol **PivotTable**.",
      tip: "Blok dari judul kolom (No) sampai data terakhir (baris 23).",
      highlight: "insert",
    },
    {
      title: "3. Menu PivotTable",
      image: "/pivot/pivot3.png",
      desc: "Muncul jendela 'Create PivotTable'. Ada dua pilihan: Table/Range (data yang akan dianalisis) dan lokasi output (New Worksheet).",
      tip: "Secara default, Excel sudah memilih seluruh data kita secara otomatis.",
      highlight: null,
    },
    {
      title: "4. Penjelasan Create PivotTable",
      image: "/pivot/pivot4.png",
      desc: "Perhatikan bagian penting ini:",
      tip: "Sheet1!$B$3:$I$23 artinya: Ambil data dari Sheet1, mulai cell B3 sampai I23. Tanda $ artinya alamat absolut (tidak berubah jika di-copy).",
      highlight: null,
      table: [
        { part: 'Table/Range', func: 'Alamat data sumber (Sheet1!$B$3:$I$23).' },
        { part: 'New Worksheet', func: 'Laporan PivotTable diletakkan di sheet baru.' },
        { part: 'Existing Worksheet', func: 'Laporan diletakkan di sheet yang sama.' },
      ],
    },
    {
      title: "5. Klik OK",
      image: "/pivot/pivot5.png",
      desc: "Klik OK. Excel akan membuat sheet baru bernama PivotTable1 (atau PivotTable2) dengan panel PivotTable Field List di sebelah kanan.",
      tip: "Jika panel tidak muncul, klik kanan di area PivotTable lalu pilih 'Show Field List'.",
      highlight: null,
    },
    {
      title: "6. Atur PivotTable Fields",
      image: "/pivot/pivot6.png",
      desc: "Di panel sebelah kanan, centang field yang ingin ditampilkan. Untuk laporan ini, centang:",
      tip: "Drag field 'Produk' ke area Rows. Drag 'Jumlah', 'Harga Satuan', dan 'Total Penjualan' ke area Values.",
      highlight: null,
      table: [
        { part: 'Filters', func: 'Menyaring data (misal: tampilkan hanya Andi).' },
        { part: 'Columns', func: 'Mengelompokkan data secara horizontal.' },
        { part: 'Rows', func: 'Mengelompokkan data secara vertikal (contoh: Produk).' },
        { part: 'Values', func: 'Menghitung atau merangkum data (Sum, Count, Average).' },
      ],
    },
  ];

  const current = steps[step];

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <div key={i} className={`h-2 w-8 rounded-full ${i <= step ? 'bg-green-500' : 'bg-gray-300'}`} />
          ))}
        </div>
        <span className="text-sm font-bold text-gray-500">Langkah {step + 1} dari {steps.length}</span>
      </div>

      {/* Judul */}
      <h3 className="text-2xl font-black text-ink">{current.title}</h3>

      {/* Gambar */}
      <div className="relative border-2 border-ink rounded-xl overflow-hidden shadow-neo bg-gray-100">
        <Image
          src={current.image}
          alt={current.title}
          width={1200}
          height={600}
          className="w-full h-auto"
          unoptimized
        />
        {current.highlight === 'insert' && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[22%] left-[15%] w-[120px] h-[60px] border-4 border-red-500 rounded-lg bg-red-500/20 animate-pulse" />
          </div>
        )}
      </div>

      {/* Deskripsi */}
      <div className="space-y-4">
        <p className="text-lg leading-relaxed">{current.desc}</p>

        {current.tip && (
          <div className="bg-yellow border-2 border-ink rounded-xl p-4 shadow-neo-sm flex gap-3 items-start">
            <Lightbulb size={24} className="shrink-0 text-ink mt-1" />
            <p className="text-sm font-bold">{current.tip}</p>
          </div>
        )}

        {current.table && (
          <div className="bg-blue border-2 border-ink rounded-xl p-4 shadow-neo-sm">
            <p className="font-bold text-sm mb-2 flex items-center gap-2"><Info size={16}/> Bagian Penting:</p>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-white/50">
                  <th className="border border-ink p-2 text-left">Bagian</th>
                  <th className="border border-ink p-2 text-left">Fungsi</th>
                </tr>
              </thead>
              <tbody>
                {current.table.map((row, i) => (
                  <tr key={i} className="bg-white/30">
                    <td className="border border-ink p-2 font-bold">{row.part}</td>
                    <td className="border border-ink p-2">{row.func}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Navigasi */}
      <div className="flex justify-between pt-4 border-t-2 border-ink/10">
        <button
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
          className="flex items-center gap-2 font-bold px-4 py-2 bg-cream border-2 border-ink rounded-xl shadow-neo-sm hover:bg-gray-50 disabled:opacity-50"
        >
          <ChevronLeft size={18} /> Sebelumnya
        </button>
        <button
          onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}
          disabled={step === steps.length - 1}
          className="flex items-center gap-2 font-bold px-4 py-2 bg-mint border-2 border-ink rounded-xl shadow-neo-sm hover:bg-gray-50 disabled:opacity-50"
        >
          Selanjutnya <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}