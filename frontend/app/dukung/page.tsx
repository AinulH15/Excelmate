'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function DukungPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#FFF9F0] text-black">
      {/* ===== HERO SECTION ===== */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-12 md:pt-24 md:pb-16 overflow-hidden">
        {/* dekorasi geometris */}
        <div className="absolute top-10 right-6 w-16 h-16 bg-[#A8D5BA] border-4 border-black rotate-12 hidden md:block" />
        <div className="absolute bottom-8 left-6 w-10 h-10 bg-[#FFD166] border-4 border-black rounded-full hidden md:block" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1 mb-6 bg-[#A8D5BA] border-2 border-black rounded-full text-xs font-bold uppercase tracking-wider shadow-[3px_3px_0_0_#000]">
            Dukungan Sukarela
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-6">
            Dukung ExcelMate{' '}
            <span className="inline-block text-[#E63946]">♡</span>
          </h1>

          <p className="text-lg md:text-xl font-bold mb-4 max-w-2xl mx-auto">
            Belajar Excel jadi lebih mudah, kapan saja dan di mana saja.
          </p>

          <p className="text-sm md:text-base max-w-2xl mx-auto text-black/80 leading-relaxed">
            ExcelMate hadir untuk membantu siapa saja belajar Microsoft Excel
            melalui materi yang mudah dipahami dan latihan spreadsheet interaktif
            yang bisa dicoba langsung, bahkan melalui HP tanpa harus membuka
            laptop.
          </p>
        </div>
      </section>

      {/* ===== SECTION: MENGAPA DUKUNGANMU BERARTI ===== */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-center mb-10">
            Mengapa Dukunganmu Berarti?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '📚',
                title: 'Menambah Materi',
                desc: 'Membantu menghadirkan lebih banyak materi dan tutorial Excel yang mudah dipahami.',
                bg: '#A8D5BA',
              },
              {
                icon: '🛠️',
                title: 'Mengembangkan Fitur',
                desc: 'Membantu pengembangan fitur latihan interaktif agar pengalaman belajar semakin menyenangkan.',
                bg: '#FFD166',
              },
              {
                icon: '💚',
                title: 'Menjaga ExcelMate Tetap Gratis',
                desc: 'Membantu biaya operasional dan pemeliharaan agar ExcelMate tetap bisa diakses oleh siapa saja.',
                bg: '#FFB4A2',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0_0_#000] transition-all duration-150"
              >
                <div
                  className="w-14 h-14 flex items-center justify-center text-2xl border-4 border-black rounded-xl mb-4 shadow-[3px_3px_0_0_#000]"
                  style={{ backgroundColor: item.bg }}
                >
                  {item.icon}
                </div>
                <h3 className="text-lg font-black mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed text-black/80">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION: BERIKAN DUKUNGANMU ===== */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16 bg-[#A8D5BA] border-y-4 border-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4">
            Setiap Dukungan Berarti
          </h2>
          <p className="text-sm md:text-base text-black/80 leading-relaxed mb-8 max-w-2xl mx-auto">
            Jika ExcelMate membantumu belajar, kamu bisa ikut mendukung
            pengembangannya melalui QRIS. Tidak ada nominal wajib. Dukungan
            sepenuhnya sukarela.
          </p>

          {/* QRIS Card */}
          <div className="inline-block bg-white border-4 border-black rounded-2xl p-5 sm:p-6 shadow-[8px_8px_0_0_#000]">
            <div className="bg-white p-2 sm:p-3 rounded-lg border-2 border-black">
              <Image
                src="/qris.png"
                alt="QRIS ExcelMate"
                width={280}
                height={280}
                className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 object-contain mx-auto"
                priority
              />
            </div>
            <p className="mt-4 text-sm font-bold text-center">
              Scan QRIS untuk memberikan dukungan
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 w-full px-4 py-3 bg-[#FFD166] border-4 border-black rounded-xl font-black text-sm uppercase tracking-wide shadow-[4px_4px_0_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#000] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all duration-150"
            >
              🔍 Perbesar QRIS
            </button>
          </div>

          <p className="mt-6 text-xs font-semibold text-black/60 max-w-md mx-auto">
            *Belajar tetap gratis. Dukungan tidak wajib. Setiap kontribusi sangat
            berarti.
          </p>
        </div>
      </section>

      {/* ===== SECTION: PENUTUP ===== */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-16 md:py-24 overflow-hidden">
        {/* dekorasi sparkle */}
        <span className="absolute top-10 left-10 text-3xl select-none hidden md:block">✦</span>
        <span className="absolute bottom-12 right-12 text-2xl select-none hidden md:block text-[#E63946]">✦</span>
        <span className="absolute top-1/3 right-8 text-xl select-none hidden md:block">✧</span>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-block bg-[#A8D5BA] border-4 border-black rounded-2xl p-8 sm:p-10 shadow-[6px_6px_0_0_#000]">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4">
              Terima Kasih Sudah Menjadi Bagian dari ExcelMate!
            </h2>
            <p className="text-sm md:text-base text-black/80 leading-relaxed mb-6">
              Terlepas dari ada atau tidaknya dukungan yang diberikan, terima
              kasih sudah menggunakan ExcelMate untuk belajar. Semoga setiap
              materi yang kamu pelajari membawa manfaat.
            </p>

            <Link
              href="/materi"
              className="inline-block px-6 py-3 bg-black text-white border-4 border-black rounded-xl font-black text-sm uppercase tracking-wide shadow-[4px_4px_0_0_#A8D5BA] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#A8D5BA] transition-all duration-150"
            >
              ← Kembali Belajar
            </Link>
          </div>
        </div>
      </section>

      {/* ===== MODAL QRIS (LIGHTBOX) ===== */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative bg-white border-4 border-black rounded-2xl p-4 sm:p-6 shadow-[8px_8px_0_0_#000] max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-3 -right-3 w-10 h-10 flex items-center justify-center bg-[#E63946] text-white border-4 border-black rounded-full font-black text-lg shadow-[3px_3px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_0_#000] transition-all"
              aria-label="Tutup"
            >
              ✕
            </button>
            <h3 className="text-lg font-black text-center mb-4">
              Scan QRIS untuk Dukungan
            </h3>
            <div className="bg-white p-2 rounded-lg border-2 border-black">
              <Image
                src="/qris.png"
                alt="QRIS ExcelMate Diperbesar"
                width={500}
                height={500}
                className="w-full h-auto object-contain"
              />
            </div>
            <p className="mt-4 text-xs text-center font-semibold text-black/60">
              Dukungan sepenuhnya sukarela. Tidak ada nominal wajib.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}