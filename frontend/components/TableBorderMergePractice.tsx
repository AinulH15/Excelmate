'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronRight, ChevronLeft, Table, Grid, Combine, ListOrdered } from 'lucide-react';

const tutorials = [
  {
    id: 'tabel',
    title: 'Membuat Excel Table',
    icon: Table,
    before: '/materi/sebelum-tabel.png',
    after: '/materi/sesudah-tabel.png',
    steps: [
      'Blok seluruh data tabel (A1:E6) termasuk judul kolom.',
      'Klik tab Insert di Ribbon.',
      'Pilih Table (atau tekan Ctrl+T).',
      'Pastikan opsi "My table has headers" dicentang.',
      'Klik OK untuk membuat tabel.',
      'Pilih Table Style yang diinginkan untuk mempercantik tampilan.',
    ],
    result: 'Data berubah menjadi Excel Table dengan header berwarna, filter otomatis, dan format yang rapi.',
  },
  {
    id: 'border',
    title: 'Mengatur Border',
    icon: Grid,
    before: '/materi/sebelum-border.png',
    after: '/materi/sesudah-border.png',
    steps: [
      'Blok seluruh data tabel (A1:E6).',
      'Klik tab Home di Ribbon.',
      'Klik ikon Borders (ikon kotak dengan garis tepi).',
      'Pilih All Borders untuk memberi garis di semua sisi sel.',
      'Pilih Outside Borders untuk garis di tepi luar saja.',
      'Pilih Thick Outside Borders untuk garis tebal di tepi luar.',
    ],
    result: 'Tabel menjadi lebih rapi dengan garis pembatas yang jelas di setiap sel atau di tepi luar.',
  },
  {
    id: 'merge',
    title: 'Merge Cell',
    icon: Combine,
    before: '/materi/sebelum-merge.png',
    after: '/materi/sesudah-merge.png',
    steps: [
      'Blok rentang A1:E1 untuk judul tabel.',
      'Klik tab Home di Ribbon.',
      'Klik tombol Merge & Center.',
      'Judul akan tergabung menjadi satu sel besar.',
      'Teks otomatis berada di tengah.',
      'Untuk memisahkan kembali, pilih Unmerge Cells.',
    ],
    result: 'Judul tabel menjadi satu sel besar dengan teks di tengah, membuat tampilan lebih profesional.',
  },
];

export default function TableBorderMergePractice() {
  const [activeId, setActiveId] = useState('tabel');
  const [showAfter, setShowAfter] = useState(false);

  const current = tutorials.find(t => t.id === activeId)!;

  const handleSwitch = (id: string) => {
    setActiveId(id);
    setShowAfter(false);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Tab Pemilih Menu */}
      <div className="grid md:grid-cols-3 gap-3">
        {tutorials.map(t => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => handleSwitch(t.id)}
              className={`p-3 border-2 border-ink rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
                activeId === t.id ? 'bg-mint shadow-neo' : 'bg-white hover:bg-gray-50'
              }`}
            >
              <Icon size={18} /> {t.title}
            </button>
          );
        })}
      </div>

      {/* Panel Visual Before/After */}
      <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
        <div className="flex items-center justify-between mb-4 border-b-2 border-ink pb-2">
          <h3 className="text-xl font-black">{current.title}</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAfter(false)}
              className={`px-3 py-1 border-2 border-ink rounded-lg text-xs font-bold ${!showAfter ? 'bg-yellow' : 'bg-white'}`}
            >
              Sebelum
            </button>
            <button
              onClick={() => setShowAfter(true)}
              className={`px-3 py-1 border-2 border-ink rounded-lg text-xs font-bold ${showAfter ? 'bg-mint' : 'bg-white'}`}
            >
              Sesudah
            </button>
          </div>
        </div>

        {/* Gambar */}
        <div className="relative border-2 border-ink rounded-xl overflow-hidden mb-6">
          <Image
            src={showAfter ? current.after : current.before}
            alt={showAfter ? 'Sesudah' : 'Sebelum'}
            width={800}
            height={500}
            className="w-full h-auto"
            unoptimized
          />
        </div>

        {/* Langkah-langkah Tutorial */}
        <div>
          <h4 className="font-black text-lg mb-3 flex items-center gap-2">
            <ListOrdered size={20} /> Langkah-langkah:
          </h4>
          <ol className="space-y-2">
            {current.steps.map((step, i) => (
              <li key={i} className="flex gap-3 bg-gray-50 border-2 border-ink rounded-lg p-3">
                <span className="bg-yellow border-2 border-ink rounded-full w-7 h-7 flex items-center justify-center font-black text-sm shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm font-medium">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Hasil Akhir */}
        <div className="mt-4 bg-mint border-2 border-ink rounded-xl p-4">
          <p className="font-bold text-sm mb-1">Hasil Akhir:</p>
          <p className="text-sm">{current.result}</p>
        </div>
      </div>
    </div>
  );
}