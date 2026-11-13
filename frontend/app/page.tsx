import Link from 'next/link';
import Button from '@/components/ui/Button';
import Spreadsheet from '@/components/Spreadsheet';

export default function Home() {
  return (
    <div className="pt-10">
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <span className="inline-block bg-lavender border-2 border-ink rounded-full px-4 py-1 text-sm font-bold shadow-neo-sm mb-6">
            ✨ Belajar Excel Tanpa Drama
          </span>
          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
            Master Excel,<br />
            <span className="bg-yellow border-2 border-ink rounded-xl px-2 inline-block shadow-neo">
              One Formula
            </span> at a Time!
          </h1>
          <p className="text-lg text-ink/80 mb-8 max-w-md">
            Belajar Excel dari nol sampai mahir. Pahami rumusnya, praktikkan caranya, dan tingkatkan kemampuanmu.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link href="/materi">
              <Button variant="pink" className="text-lg px-8 py-4">Mulai Belajar →</Button>
            </Link>
            <Link href="/materi">
              <Button variant="blue" className="text-lg px-8 py-4">Jelajahi Materi</Button>
            </Link>
          </div>
        </div>
        
        {/* Ilustrasi Kartun Sederhana */}
        <div className="hidden md:flex justify-center relative">
          <div className="w-72 h-72 bg-mint border-2 border-ink rounded-3xl shadow-neo flex items-center justify-center rotate-3">
            <span className="text-8xl">📊</span>
          </div>
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-pink border-2 border-ink rounded-2xl shadow-neo flex items-center justify-center -rotate-6">
            <span className="text-4xl">🧮</span>
          </div>
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-yellow border-2 border-ink rounded-full shadow-neo flex items-center justify-center">
            <span className="text-3xl">✨</span>
          </div>
        </div>
      </section>

      <section className="py-12 border-t-2 border-ink mt-12">
  <h2 className="text-3xl font-black mb-6 text-center">Coba Langsung: Praktik Fungsi SUM</h2>
  <Spreadsheet />
</section>
    </div>
  );
}