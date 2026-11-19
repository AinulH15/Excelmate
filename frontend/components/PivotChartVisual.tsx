'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Step = {
  id: 1 | 2 | 3 | 4;
  tab: string;
  img: string;
  alt: string;
  title: string;
  content: React.ReactNode;
};

const Callout = ({ color, children }: { color: 'blue' | 'yellow'; children: React.ReactNode }) => (
  <div
    className={`border-l-4 p-3 rounded-r-lg text-sm ${
      color === 'blue' ? 'bg-blue-50 border-blue-500' : 'bg-yellow/60 border-ink'
    }`}
  >
    {children}
  </div>
);

const steps: Step[] = [
  {
    id: 1,
    tab: '1. Insert',
    img: '/pivot1.png',
    alt: 'Blok data lalu buka menu Insert dan klik PivotChart',
    title: 'Langkah 1: Blok Data lalu Klik Insert → PivotChart',
    content: (
      <>
        <p>
          Pada gambar, seluruh data mentah sudah <strong>diblok</strong>, menu <strong>Insert</strong> sudah terbuka,
          dan kursor sedang berada di tombol <strong>PivotChart</strong>. Ini yang akan kamu lakukan:
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            Blok seluruh data, dari <strong>A1</strong> sampai <strong>G31</strong>, <em>termasuk baris judul kolom</em>.
          </li>
          <li>
            Buka tab <strong>Insert</strong> di Ribbon.
          </li>
          <li>
            Pada grup <strong>Charts</strong>, klik <strong>PivotChart</strong>. Kalau muncul pilihan, pilih{' '}
            <strong>PivotChart</strong> (bukan <em>PivotChart &amp; PivotTable</em>).
          </li>
        </ol>
        <Callout color="blue">
          Judul kolom wajib ikut terblok. Judul inilah yang nanti menjadi <strong>nama field</strong> (misalnya
          &quot;Nama Produk&quot; dan &quot;Total Penjualan&quot;). Tanpa judul, Excel tidak tahu nama kolomnya.
        </Callout>
        <Callout color="yellow">
          <strong>Apa itu PivotChart?</strong> Grafik yang dibuat dari data mentah dan otomatis meringkas data tersebut,
          misalnya total penjualan per produk, tanpa kamu menghitung manual.
        </Callout>
      </>
    ),
  },
  {
    id: 2,
    tab: '2. Pop-up',
    img: '/pivot2.png',
    alt: 'Kotak dialog Create PivotChart',
    title: 'Langkah 2: Kotak Dialog Create PivotChart',
    content: (
      <>
        <p>
          Setelah klik PivotChart, muncul kotak dialog <strong>Create PivotChart</strong>. Fungsinya untuk menanyakan
          dua hal: <strong>data mana yang dipakai</strong> dan <strong>hasilnya ditaruh di mana</strong>.
        </p>

        <div className="space-y-3">
          <div>
            <p className="font-bold text-ink">① Choose the data that you want to analyze</p>
            <p>
              Kolom <strong>Table/Range</strong> berisi alamat data yang kamu blok tadi:
            </p>
            <code className="block bg-gray-100 border-2 border-ink rounded-lg px-3 py-2 my-2 font-mono text-sm shadow-neo-sm overflow-x-auto">
              Sheet1!$A$1:$G$31
            </code>
            <p className="mb-1">Cara membacanya:</p>
            <ul className="space-y-1">
              <li>
                <code className="bg-gray-100 border border-ink px-1.5 rounded">Sheet1</code> → nama sheet tempat data
                berada.
              </li>
              <li>
                <code className="bg-gray-100 border border-ink px-1.5 rounded">!</code> → pemisah antara nama sheet dan
                alamat cell.
              </li>
              <li>
                <code className="bg-gray-100 border border-ink px-1.5 rounded">$A$1</code> → cell awal (pojok kiri atas
                data).
              </li>
              <li>
                <code className="bg-gray-100 border border-ink px-1.5 rounded">:</code> → artinya &quot;sampai&quot;.
              </li>
              <li>
                <code className="bg-gray-100 border border-ink px-1.5 rounded">$G$31</code> → cell akhir (pojok kanan
                bawah data).
              </li>
            </ul>
            <p className="mt-2">
              Jadi artinya: data diambil dari <strong>Sheet1, kolom A–G (7 kolom), baris 1–31</strong>, yaitu 1 baris judul
              + 30 baris data. Tanda <strong>$</strong> mengunci alamat agar tidak bergeser.
            </p>
          </div>

          <div>
            <p className="font-bold text-ink">② Choose where you want the PivotChart to be placed</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>New Worksheet</strong>: PivotChart dibuat di sheet baru. <em>Disarankan</em>, supaya data mentah
                tetap rapi dan tidak tertimpa.
              </li>
              <li>
                <strong>Existing Worksheet</strong>: PivotChart ditaruh di sheet yang sudah ada, sesuai lokasi yang kamu
                tentukan.
              </li>
            </ul>
          </div>
        </div>

        <p>
          Pilih <strong>New Worksheet</strong>, lalu klik <strong>OK</strong>.
        </p>
        <Callout color="blue">
          Kalau Table/Range salah (misalnya baris judul tidak ikut), kamu bisa mengetik alamat yang benar langsung di
          kolom itu, atau klik ikon panah di sebelahnya lalu blok ulang datanya.
        </Callout>
      </>
    ),
  },
  {
    id: 3,
    tab: '3. Area Kerja',
    img: '/pivot3.png',
    alt: 'Sheet baru berisi area PivotChart dan PivotChart Fields',
    title: 'Langkah 3: Mengenal Area Kerja PivotChart',
    content: (
      <>
        <p>
          Setelah klik OK, Excel membuat <strong>sheet baru</strong>. Isinya masih kosong karena kamu belum memilih data
          apa yang mau ditampilkan. Ada dua bagian utama:
        </p>

        <div>
          <p className="font-bold text-ink">Sebelah kiri: area kosong</p>
          <p>Tempat PivotChart (dan PivotTable pendampingnya) akan muncul setelah kamu memilih field.</p>
        </div>

        <div>
          <p className="font-bold text-ink">Sebelah kanan: panel PivotChart Fields</p>
          <p className="mb-2">
            Bagian atas berisi <strong>daftar field</strong> (semua judul kolom dari data mentahmu, lengkap dengan
            kotak centang). Di bawahnya ada <strong>4 area</strong> untuk menaruh field:
          </p>
          <ul className="space-y-2">
            <li className="bg-gray-50 border-2 border-gray-200 rounded-lg p-2">
              <strong>Filters</strong>: menyaring data. Contoh: hanya tampilkan bulan Januari. Filter tidak mengubah
              bentuk chart, hanya membatasi data yang dihitung.
            </li>
            <li className="bg-gray-50 border-2 border-gray-200 rounded-lg p-2">
              <strong>Legend (Series)</strong>: membagi data menjadi beberapa warna/seri. Contoh: tiap kategori
              memiliki warna sendiri.
            </li>
            <li className="bg-gray-50 border-2 border-gray-200 rounded-lg p-2">
              <strong>Axis (Categories)</strong>: isi sumbu bawah (sumbu X) chart. Biasanya berisi teks/kelompok,
              seperti Nama Produk atau Bulan.
            </li>
            <li className="bg-gray-50 border-2 border-gray-200 rounded-lg p-2">
              <strong>Values</strong>: angka yang dihitung dan menjadi tinggi batang/garis. Biasanya berisi angka,
              seperti Total Penjualan. Secara bawaan dijumlahkan (Sum).
            </li>
          </ul>
        </div>
        <Callout color="blue">
          Cara menggunakannya: <strong>centang</strong> field di daftar, atau <strong>seret (drag)</strong> field ke
          salah satu dari 4 area di atas.
        </Callout>
      </>
    ),
  },
  {
    id: 4,
    tab: '4. Pilih Data',
    img: '/pivot4.png',
    alt: 'PivotChart setelah beberapa field dicentang',
    title: 'Langkah 4: Centang Field untuk Menampilkan Data',
    content: (
      <>
        <p>
          Pada gambar, beberapa field sudah dicentang sehingga chart langsung terbentuk. Excel menaruh field ke area yang
          sesuai secara otomatis:
        </p>
        <ul className="space-y-2">
          <li className="bg-gray-50 border-2 border-gray-200 rounded-lg p-2">
            Centang <strong>Nama Produk</strong> → masuk ke <strong>Axis (Categories)</strong>, sehingga setiap produk
            menjadi satu kelompok batang.
          </li>
          <li className="bg-gray-50 border-2 border-gray-200 rounded-lg p-2">
            Centang <strong>Total Penjualan</strong> → masuk ke <strong>Values</strong> sebagai <em>Sum of Total
            Penjualan</em>, sehingga tinggi batang = jumlah penjualan tiap produk.
          </li>
        </ul>
        <p>
          Aturan umumnya: field berisi <strong>teks</strong> masuk ke Axis/Legend, field berisi <strong>angka</strong>{' '}
          masuk ke Values. Kalau Excel menaruh field di area yang kurang pas, seret saja ke area yang kamu mau.
        </p>
        <p>
          Voila! Data mentah yang panjang kini jadi grafik ringkas yang mudah dibaca. Coba centang atau hilangkan
          centang field lain dan lihat chart berubah.
        </p>
        <Callout color="blue">
          Dua kotak centang saja sudah cukup untuk membuat PivotChart sederhana. Tambah field lain di Legend atau Filters
          kalau kamu ingin analisis yang lebih detail.
        </Callout>
      </>
    ),
  },
];

export default function PivotChartVisual() {
  const [stepId, setStepId] = useState<1 | 2 | 3 | 4>(1);
  const [zoom, setZoom] = useState(false);
  const step = steps[stepId - 1];

  const go = (id: number) => setStepId(Math.min(4, Math.max(1, id)) as 1 | 2 | 3 | 4);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* KARTU UTAMA */}
      <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-4 md:p-8 space-y-6">
        {/* Progress */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            {steps.map((s) => (
              <span
                key={s.id}
                className={`h-2 w-10 rounded-full ${s.id <= stepId ? 'bg-green-500' : 'bg-gray-200'}`}
              />
            ))}
          </div>
          <span className="text-sm font-bold text-gray-500">Langkah {stepId} dari 4</span>
        </div>

        <h3 className="text-2xl font-black text-ink">{step.title}</h3>

        {/* GAMBAR (klik untuk perbesar) */}
        <button
          type="button"
          onClick={() => setZoom(true)}
          className="block w-full rounded-xl overflow-hidden border-2 border-ink bg-gray-50 cursor-zoom-in"
          title="Klik untuk memperbesar"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={step.img} alt={step.alt} className="w-full h-auto" />
        </button>
        <p className="text-xs text-gray-500 text-center -mt-3">Klik gambar untuk memperbesar</p>

        {/* PENJELASAN */}
        <div className="space-y-4 text-sm md:text-base text-gray-700 leading-relaxed">{step.content}</div>

        {/* NAVIGASI */}
        <div className="flex items-center justify-between pt-4 border-t-2 border-ink">
          <button
            onClick={() => go(stepId - 1)}
            disabled={stepId === 1}
            className="flex items-center gap-1 px-4 py-2 rounded-xl border-2 border-ink font-bold bg-cream shadow-neo-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} /> Kembali
          </button>
          <button
            onClick={() => go(stepId + 1)}
            disabled={stepId === 4}
            className="flex items-center gap-1 px-4 py-2 rounded-xl border-2 border-ink font-bold bg-mint shadow-neo-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Lanjut <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* TIPS */}
      <div className="bg-yellow border-2 border-ink rounded-xl p-3">
        <p className="text-sm font-bold text-center">
          💡 Tips: Ubah jenis chart (Column, Pie, Line) dengan klik kanan pada chart, lalu pilih &quot;Change Chart
          Type&quot;.
        </p>
      </div>

      {/* ZOOM GAMBAR */}
      {zoom && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setZoom(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={step.img}
            alt={step.alt}
            className="max-w-full max-h-full rounded-xl border-2 border-ink bg-white"
          />
        </div>
      )}
    </div>
  );
}
