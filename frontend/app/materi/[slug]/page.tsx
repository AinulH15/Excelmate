'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { 
  BookOpen, Calculator, PlayCircle, Clock, Target, 
  Lightbulb
} from 'lucide-react';
import Spreadsheet from '@/components/Spreadsheet';
import SpreadsheetVisual from '@/components/SpreadsheetVisual';
import ExercisePlayer from '@/components/ExercisePlayer';
import Note from '@/components/ui/Note';

const api = axios.create({ baseURL: 'http://127.0.0.1:8000/api' });

export default function DetailMateriPage() {
  const { slug } = useParams();
  const [lesson, setLesson] = useState<any>(null);
  const [mode, setMode] = useState<'belajar' | 'latihan'>('belajar');
  const [activePart, setActivePart] = useState<string | null>(null);

  useEffect(() => {
    api.get(`/lessons/${slug}`).then(res => setLesson(res.data.data)).catch(console.error);
  }, [slug]);

  if (!lesson) return <div className="text-center py-20 font-bold animate-pulse">Memuat materi...</div>;

  // Menentukan Ikon Hero Berdasarkan Judul
  const getHeroIcon = () => {
    if (lesson.title.includes('Pengenalan')) return '👋';
    if (lesson.title.includes('Workbook')) return '📁';
    if (lesson.title.includes('Memasukkan')) return '⌨️';
    if (lesson.title.includes('Format')) return '🎨';
    if (lesson.title.includes('Matematika')) return '🧮';
    if (lesson.title.includes('SUM')) return '📊';
    if (lesson.title.includes('AVERAGE')) return '📈';
    if (lesson.title.includes('MAX')) return '🔝';
    if (lesson.title.includes('COUNT')) return '🔢';
    if (lesson.title.includes('IF')) return '🔀';
    if (lesson.title.includes('VLOOKUP')) return '🔍';
    if (lesson.title.includes('Pivot')) return '📉';
    return '📚';
  };

  return (
    <div className="max-w-5xl mx-auto space-y-16 pb-24 pt-8">
      
      {/* SECTION 1 — HERO MATERI */}
      <section className="text-center md:text-left flex flex-col md:flex-row gap-8 items-center justify-between">
        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <span className="bg-mint border-2 border-ink rounded-full px-4 py-1 text-sm font-bold shadow-neo-sm">
              {lesson.level?.name || 'Pemula'}
            </span>
            <span className="bg-lavender border-2 border-ink rounded-full px-4 py-1 text-sm font-bold shadow-neo-sm">
              {lesson.category?.name || 'Kategori'}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-ink leading-tight">
            {lesson.title}
          </h1>
          
          <p className="text-lg text-gray-700 max-w-xl mx-auto md:mx-0">
            {lesson.intro}
          </p>
          
          <div className="flex flex-wrap gap-6 pt-4 justify-center md:justify-start">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
              <Clock size={18} /> Estimasi: 10 Menit
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
              <Target size={18} /> Tujuan: Menguasai Materi
            </div>
          </div>
        </div>

        <div className="relative w-48 h-48 md:w-64 md:h-64 shrink-0 block">
          <div className="absolute inset-0 bg-yellow border-2 border-ink rounded-3xl shadow-neo rotate-6"></div>
          <div className="absolute inset-0 bg-white border-2 border-ink rounded-3xl shadow-neo flex items-center justify-center -rotate-3">
            <span className="text-7xl md:text-8xl">{getHeroIcon()}</span>
          </div>
        </div>
      </section>

      <hr className="border-t-2 border-ink/10" />

      {/* SECTION 2 — MEMAHAMI KONSEP */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-black text-ink mb-6">Memahami Konsep</h2>
          <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
            {lesson.content?.apa_itu}
          </div>
          
          <Note type="info" title="Mengapa ini penting?">
            <div className="whitespace-pre-line">{lesson.content?.mengapa}</div>
          </Note>
        </div>

        <div className="space-y-4">
          <SpreadsheetVisual 
            data={[
              ['Contoh', 'Data'], 
              ['Baris 1', '100'], 
              ['Baris 2', '200'], 
              ['Baris 3', '300']
            ]}
            highlightCells={['B2']}
          />
          <p className="text-center text-sm font-bold text-gray-500">
            *Ilustrasi visual untuk membantu pemahaman.
          </p>
        </div>
      </section>

      <hr className="border-t-2 border-ink/10" />

      {/* SECTION 3 — CARA KERJA RUMUS / BAGIAN PENTING */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-ink mb-2">Bagian Penting</h2>
          <p className="text-gray-600">Pahami penjelasan di bawah ini.</p>
        </div>

        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 md:p-8 max-w-3xl mx-auto">
          
          {slug === 'fungsi-sum' ? (
            <>
              <div className="text-3xl md:text-5xl font-mono font-bold flex items-center justify-center gap-1 md:gap-2 flex-wrap text-center mb-8">
                <button onClick={() => setActivePart('sama-dengan')} className="text-pink-500 hover:scale-110 active:scale-95 transition-transform">=</button>
                <button onClick={() => setActivePart('fungsi')} className="text-blue-600 hover:scale-110 active:scale-95 transition-transform">SUM</button>
                <button onClick={() => setActivePart('kurung')} className="text-gray-400 hover:scale-110 active:scale-95 transition-transform">(</button>
                <button onClick={() => setActivePart('range')} className="text-green-600 hover:scale-110 active:scale-95 transition-transform">B1:B3</button>
                <button onClick={() => setActivePart('kurung')} className="text-gray-400 hover:scale-110 active:scale-95 transition-transform">)</button>
              </div>

              <div className="min-h-[100px] bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-4 flex items-center justify-center text-center transition-all">
                {activePart === 'sama-dengan' && <p className="text-lg font-bold text-pink-600">Tanda (=) memberitahu Excel bahwa ini adalah sebuah rumus.</p>}
                {activePart === 'fungsi' && <p className="text-lg font-bold text-blue-600">SUM adalah nama fungsi untuk menjumlahkan angka.</p>}
                {activePart === 'kurung' && <p className="text-lg font-bold text-gray-600">Tanda kurung ( ) membungkus data yang akan dihitung.</p>}
                {activePart === 'range' && <p className="text-lg font-bold text-green-600">B1:B3 adalah rentang cell. Jumlahkan isi dari B1, B2, sampai B3.</p>}
                {!activePart && <p className="text-gray-500 font-bold flex items-center gap-2"><Lightbulb size={20}/> Klik salah satu bagian rumus di atas.</p>}
              </div>
            </>
          ) : (
            <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-line bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6">
              {lesson.content?.sintaks}
            </div>
          )}

        </div>
      </section>

      <hr className="border-t-2 border-ink/10" />

      {/* SECTION 4 — PRAKTIK (SPREADSHEET) */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-black text-ink mb-6">Saatnya Praktik!</h2>
          
          <div className="inline-flex bg-gray-200 border-2 border-ink rounded-xl p-1 shadow-neo">
            <button 
              onClick={() => setMode('belajar')}
              className={`px-4 md:px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${mode === 'belajar' ? 'bg-white shadow-sm text-ink' : 'text-gray-500 hover:text-ink'}`}
            >
              <BookOpen size={18} /> <span className="hidden md:inline">Mode Belajar</span><span className="md:hidden">Belajar</span>
            </button>
            <button 
              onClick={() => setMode('latihan')}
              className={`px-4 md:px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${mode === 'latihan' ? 'bg-white shadow-sm text-ink' : 'text-gray-500 hover:text-ink'}`}
            >
              <PlayCircle size={18} /> <span className="hidden md:inline">Mode Latihan</span><span className="md:hidden">Latihan</span>
            </button>
          </div>
        </div>

        <div className="mt-8">
          {mode === 'belajar' ? (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-ink flex items-center justify-center gap-2">
                  <Calculator /> Guided Practice
                </h3>
              </div>
              {/* Kirim slug ke Spreadsheet agar tutorialnya sesuai */}
              <Spreadsheet lessonSlug={slug as string} />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-ink flex items-center justify-center gap-2">
                  <PlayCircle /> Uji Pemahamanmu
                </h3>
              </div>
              <ExercisePlayer onComplete={() => alert('Latihan Selesai!')} />
            </div>
          )}
        </div>
      </section>

    </div>
  );
}