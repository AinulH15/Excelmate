'use client';

import { useState } from 'react';
import { Info, ChevronDown, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './ui/Button';

const STEPS = [
  {
    id: 1,
    title: "Mengenal Data Mentah",
    color: "bg-blue",
    content: (
      <div className="space-y-4 animate-in fade-in duration-300">
        <p className="text-gray-700 leading-relaxed">
          Perhatikan data penjualan toko ATK di atas. Data ini adalah <strong>data mentah</strong>. 
          Saat ini, kolom <strong>Nama Produk</strong> (Kolom C) masih diketik secara manual. 
          Jika dibiarkan, pengguna bisa salah ketik (misal: "Pulpen" menjadi "Pulpan"), yang akan merusak laporan.
        </p>
        <div className="border-2 border-ink rounded-xl overflow-hidden shadow-neo">
          <img src="/data-validation1.png" alt="Data Mentah" className="w-full h-auto" />
        </div>
        <div className="bg-yellow border-2 border-ink rounded-xl p-4">
          <p className="font-bold text-sm">💡 Mengapa kita butuh Data Validation?</p>
          <p className="text-sm mt-1">Agar input data konsisten dan mencegah kesalahan pengetikan yang merusak data.</p>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Membuka Data Validation",
    color: "bg-mint",
    content: (
      <div className="space-y-4 animate-in fade-in duration-300">
        <p className="text-gray-700 leading-relaxed">
          Klik cell **C2** (yang berisi "Pulpen"). Lalu buka tab **Data** di Ribbon, dan klik menu **Data Validation**.
        </p>
        <div className="border-2 border-ink rounded-xl overflow-hidden shadow-neo">
          <img src="/data-validation2.png" alt="Membuka Data Validation" className="w-full h-auto" />
        </div>
        <p className="text-gray-700 leading-relaxed">
          Kita memilih cell terlebih dahulu karena <strong>Data Validation hanya berlaku untuk cell yang sedang dipilih</strong>. 
          Menu ini berfungsi untuk memberi aturan pada cell tersebut.
        </p>
      </div>
    )
  },
  {
    id: 3,
    title: "Jendela Data Validation",
    color: "bg-pink",
    content: <Step3Content />
  },
  {
    id: 4,
    title: "Melihat Dropdown List",
    color: "bg-lavender",
    content: (
      <div className="space-y-4 animate-in fade-in duration-300">
        <p className="text-gray-700 leading-relaxed">
          Setelah klik **OK**, sekarang cell C2 memiliki tanda panah kecil di sebelah kanannya. 
          Saat panah diklik, pilihan yang muncul persis seperti yang kita tulis di Source: Pulpen, Buku Tulis, Penghapus, Pensil, Map.
        </p>
        <div className="border-2 border-ink rounded-xl overflow-hidden shadow-neo">
          <img src="/data-validation4.png" alt="Melihat Dropdown" className="w-full h-auto" />
        </div>
        <div className="bg-blue border-2 border-ink rounded-xl p-4 flex gap-3 items-start">
          <CheckCircle2 className="shrink-0 mt-0.5" />
          <p className="text-sm">Keuntungannya: Pengguna tidak bisa lagi salah ketik. Mereka hanya bisa memilih dari daftar yang sudah disediakan.</p>
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: "Mengubah Isi Cell",
    color: "bg-orange",
    content: (
      <div className="space-y-4 animate-in fade-in duration-300">
        <p className="text-gray-700 leading-relaxed">
          Ketika kita memilih **Pensil** dari dropdown, isi cell C2 berubah dari "Pulpen" menjadi "Pensil". 
          Pengguna bisa mengganti pilihan kapan saja asalkan masih dalam daftar.
        </p>
        <div className="border-2 border-ink rounded-xl overflow-hidden shadow-neo">
          <img src="/data-validation5.png" alt="Mengubah Isi Cell" className="w-full h-auto" />
        </div>
        <div className="bg-green-100 border-2 border-ink rounded-xl p-4 text-sm font-bold text-center">
          🎉 Selesai! Data Validation berhasil diterapkan.
        </div>
      </div>
    )
  }
];

function Step3Content() {
  const [activeTab, setActiveTab] = useState<'settings' | 'input' | 'error'>('settings');
  
  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <p className="text-gray-700 leading-relaxed">
        Ini adalah jendela pengaturan Data Validation. Ada 3 tab penting: **Settings**, **Input Message**, dan **Error Alert**.
      </p>
      
      <div className="border-2 border-ink rounded-xl overflow-hidden shadow-neo mb-4">
        <img src="/data-validation3.png" alt="Jendela Data Validation" className="w-full h-auto" />
      </div>

      <div className="flex gap-2 mb-2">
        <button onClick={() => setActiveTab('settings')} className={`px-4 py-2 rounded-t-lg font-bold border-2 border-ink border-b-0 text-sm ${activeTab === 'settings' ? 'bg-blue text-ink' : 'bg-gray-100 text-gray-500'}`}>Settings</button>
        <button onClick={() => setActiveTab('input')} className={`px-4 py-2 rounded-t-lg font-bold border-2 border-ink border-b-0 text-sm ${activeTab === 'input' ? 'bg-mint text-ink' : 'bg-gray-100 text-gray-500'}`}>Input Message</button>
        <button onClick={() => setActiveTab('error')} className={`px-4 py-2 rounded-t-lg font-bold border-2 border-ink border-b-0 text-sm ${activeTab === 'error' ? 'bg-pink text-ink' : 'bg-gray-100 text-gray-500'}`}>Error Alert</button>
      </div>

      <div className="border-2 border-ink rounded-b-xl rounded-tr-xl p-4 bg-white">
        {activeTab === 'settings' && (
          <div className="space-y-4 text-sm">
            <p><strong>Tab Settings</strong> digunakan untuk menentukan aturan data apa yang diperbolehkan.</p>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2 border border-gray-200">
              <p className="font-bold">Pilihan pada "Allow":</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Any Value:</strong> Tidak ada batasan (default).</li>
                <li><strong>Whole Number:</strong> Hanya angka bulat (1, 2, 3...).</li>
                <li><strong>Decimal:</strong> Angka desimal (1.5, 2.75...).</li>
                <li><strong>List:</strong> Hanya boleh memilih dari daftar yang kita tentukan. <em>(Ini yang akan kita pakai).</em></li>
                <li><strong>Date / Time:</strong> Hanya format tanggal atau waktu.</li>
                <li><strong>Text Length:</strong> Membatasi panjang teks (misal maksimal 10 karakter).</li>
                <li><strong>Custom:</strong> Menggunakan rumus Excel sendiri.</li>
              </ul>
            </div>
            <div className="bg-yellow p-4 rounded-lg mt-2 border-2 border-ink">
              <p className="font-bold">Kenapa menggunakan "List"?</p>
              <p>Karena kita mengisi kolom <strong>Source</strong> dengan:</p>
              <code className="bg-white px-2 py-1 border border-gray-300 block my-2">Pulpen;Buku Tulis;Penghapus;Pensil;Map</code>
              <p className="mt-1 text-xs">*Catatan: Pemisah titik koma (;) bisa berbeda di setiap komputer, tergantung pengaturan bahasa. Jika error, kamu bisa menggunakan koma (,).</p>
              <p className="mt-2">Centang <strong>In-cell dropdown</strong> agar muncul panah pilihan di cell.</p>
            </div>
          </div>
        )}
        {activeTab === 'input' && (
          <div className="space-y-4 text-sm">
            <p><strong>Tab Input Message</strong> digunakan untuk menampilkan pesan bantuan saat cell diklik.</p>
            <p>Misalnya: "Silakan pilih nama produk dari daftar." Pesan ini akan muncul dalam kotak kecil di dekat cell.</p>
          </div>
        )}
        {activeTab === 'error' && (
          <div className="space-y-4 text-sm">
            <p><strong>Tab Error Alert</strong> digunakan untuk memunculkan peringatan jika pengguna mencoba mengetik data yang tidak ada di daftar.</p>
            <p>Kamu bisa mengatur gaya peringatannya: <em>Stop</em> (mencegah input), <em>Warning</em> (memberi peringatan tapi boleh lanjut), atau <em>Information</em>.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DataValidationVisual() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const stepData = STEPS[currentStep];
  const isLastStep = currentStep === STEPS.length - 1;

  return (
    <div className="bg-white border-2 border-ink rounded-2xl shadow-neo flex flex-col h-full min-h-[500px]">
      {/* Header Step */}
      <div className="p-6 md:p-8 border-b-2 border-ink bg-gray-50 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`${stepData.color} border-2 border-ink rounded-lg px-3 py-1 font-black text-lg shadow-neo-sm`}>
            {stepData.id}
          </span>
          <h3 className="text-2xl font-black">{stepData.title}</h3>
        </div>
        <span className="text-sm font-bold text-gray-500 bg-white border border-gray-300 px-3 py-1 rounded-full">
          Langkah {stepData.id} dari {STEPS.length}
        </span>
      </div>

      {/* Konten Step */}
      <div className="p-6 md:p-8 flex-1">
        {stepData.content}
      </div>

      {/* Navigasi Bawah */}
      <div className="p-4 border-t-2 border-ink flex items-center justify-between bg-white rounded-b-2xl">
        <button 
          onClick={handlePrev} 
          disabled={currentStep === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold border-2 border-ink shadow-neo transition-all
            ${currentStep === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50' : 'bg-white text-ink hover:bg-gray-50'}`}
        >
          <ChevronLeft size={18} /> Kembali
        </button>

        <button 
          onClick={handleNext} 
          disabled={isLastStep}
          className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold border-2 border-ink shadow-neo transition-all
            ${isLastStep ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50' : 'bg-mint text-ink hover:bg-green-200'}`}
        >
          {isLastStep ? 'Selesai' : 'Lanjut'} <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}