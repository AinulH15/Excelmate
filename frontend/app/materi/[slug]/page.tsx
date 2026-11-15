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
import ExcelInterfaceVisual from '@/components/ExcelInterfaceVisual';
import WorksheetVisual from '@/components/WorksheetVisual';
import KeyboardVisual from '@/components/KeyboardVisual';
import NumberFormatVisual from '@/components/NumberFormatVisual';
import OperasiMatematikaVisual from '@/components/OperasiMatematikaVisual';
import FormulaVisual from '@/components/FormulaVisual';
import DataToolsVisual from '@/components/DataToolsVisual';
import PivotTutorial from '@/components/PivotTutorial';

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

  const getHeroIcon = () => {
    if (slug === 'pengenalan-antarmuka-excel') return '👋';
    if (slug === 'workbook-worksheet-cell') return '📁';
    if (slug === 'input-edit-hapus-data') return '⌨️';
    if (slug === 'format-cell') return '🎨';
    if (slug === 'operasi-matematika') return '🧮';
    if (slug === 'fungsi-sum') return '📊';
    if (slug === 'fungsi-average') return '📈';
    if (slug === 'fungsi-max-min') return '🔝';
    if (slug === 'fungsi-count') return '🔢';
    if (slug === 'fungsi-if') return '🔀';
    if (slug === 'fungsi-sumif-sumifs') return '➕';
    if (slug === 'fungsi-countif') return '🔣';
    if (slug === 'fungsi-averageif') return '📉';
    if (slug === 'fungsi-and-or') return '🧠';
    if (slug === 'fungsi-teks') return '🔤';
    if (slug === 'fungsi-lookup') return '🔍';
    if (slug === 'data-tools') return '🛠️';
    if (slug === 'pivottable-dashboard') return '📊';
    return '📚';
  };

  const formulaSlugs = [
    'fungsi-sum', 'fungsi-average', 'fungsi-max-min', 'fungsi-count', 
    'fungsi-if', 'fungsi-sumif-sumifs', 'fungsi-countif', 'fungsi-averageif', 
    'fungsi-and-or', 'fungsi-teks', 'fungsi-lookup'
  ];

  const getConceptVisual = () => {
    if (formulaSlugs.includes(slug as string)) {
      return null; 
    }
    if (slug === 'operasi-matematika') {
      return (
        <div className="bg-gray-800 text-mint p-4 rounded-xl font-mono text-center border-2 border-ink shadow-neo">
          <p className="text-sm text-gray-400 mb-2">Di Excel, kamu mengetik:</p>
          <p className="text-2xl font-bold">=10 + 5 * 2</p>
          <p className="text-sm text-gray-400 mt-2">Excel akan menghitung (5*2) dulu.</p>
          <p className="text-3xl font-black mt-2 text-white">20</p>
        </div>
      );
    }
    return (
      <SpreadsheetVisual 
        data={[['Contoh', 'Data'], ['Baris 1', '100'], ['Baris 2', '200']]}
        highlightCells={['B2']}
      />
    );
  };

  const renderInteractiveSection = () => {
    if (slug === 'pengenalan-antarmuka-excel') {
      return (
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 md:p-8 max-w-3xl mx-auto space-y-6">
          <ExcelInterfaceVisual />
          <div className="grid md:grid-cols-3 gap-4">
            <button onClick={() => setActivePart('ribbon')} className={`p-3 border-2 border-ink rounded-xl font-bold transition-all text-sm ${activePart === 'ribbon' ? 'bg-blue-100 ring-2 ring-blue-500' : 'bg-gray-50 hover:bg-gray-100'}`}>1. Ribbon</button>
            <button onClick={() => setActivePart('formula')} className={`p-3 border-2 border-ink rounded-xl font-bold transition-all text-sm ${activePart === 'formula' ? 'bg-blue-100 ring-2 ring-blue-500' : 'bg-gray-50 hover:bg-gray-100'}`}>2. Formula Bar</button>
            <button onClick={() => setActivePart('grid')} className={`p-3 border-2 border-ink rounded-xl font-bold transition-all text-sm ${activePart === 'grid' ? 'bg-blue-100 ring-2 ring-blue-500' : 'bg-gray-50 hover:bg-gray-100'}`}>3. Grid</button>
          </div>
          <div className="min-h-[120px] bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-4 flex items-center justify-center text-center transition-all">
            {activePart === 'ribbon' && <p className="text-base font-bold text-blue-600">Ribbon adalah menu utama Excel.</p>}
            {activePart === 'formula' && <p className="text-base font-bold text-green-600">Formula Bar adalah kotak panjang di atas grid.</p>}
            {activePart === 'grid' && <p className="text-base font-bold text-purple-600">Grid adalah area kotak-kotak utama tempat kamu bekerja.</p>}
            {!activePart && <p className="text-gray-500 font-bold flex items-center gap-2"><Lightbulb size={20}/> Klik salah satu tombol di atas.</p>}
          </div>
        </div>
      );
    }

    if (slug === 'workbook-worksheet-cell') {
      return (
        <div className="space-y-8 max-w-3xl mx-auto">
          <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue border-2 border-ink rounded-lg px-3 py-1 font-black text-lg">1</span>
              <h3 className="text-xl font-black">Cell (Sel)</h3>
            </div>
            <p className="text-gray-700 mb-4"><strong>Cell</strong> adalah kotak kecil tempat kamu mengetik data.</p>
            <div className="grid md:grid-cols-2 gap-4 items-center">
              <WorksheetVisual highlightCells={['B2']} highlightColor="blue" label="Cell = B2" />
              <div className="bg-blue border-2 border-ink rounded-xl p-4"><p>Cell <strong>B2</strong> artinya pertemuan Kolom B dan Baris 2.</p></div>
            </div>
          </div>
          <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-mint border-2 border-ink rounded-lg px-3 py-1 font-black text-lg">2</span>
              <h3 className="text-xl font-black">Range (Rentang)</h3>
            </div>
            <p className="text-gray-700 mb-4"><strong>Range</strong> adalah kumpulan beberapa Cell.</p>
            <div className="grid md:grid-cols-2 gap-4 items-center">
              <WorksheetVisual highlightCells={['A1','A2','A3','B1','B2','B3']} highlightColor="green" label="Range = A1:B3" />
              <div className="bg-mint border-2 border-ink rounded-xl p-4"><p>Range <strong>A1:B3</strong> artinya kumpulan cell dari A1 sampai B3.</p></div>
            </div>
          </div>
          <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-yellow border-2 border-ink rounded-lg px-3 py-1 font-black text-lg">3</span>
              <h3 className="text-xl font-black">Workbook & Worksheet</h3>
            </div>
            <p className="text-gray-700 mb-4"><strong>Workbook</strong> adalah 1 file Excel. Di dalamnya bisa ada banyak <strong>Worksheet</strong>.</p>
            <div className="border-2 border-ink rounded-xl overflow-hidden">
              <div className="bg-gray-100 border-b-2 border-ink flex px-2 pt-2 gap-1 text-sm font-bold">
                <button onClick={() => setActivePart('sheet1')} className={`px-4 py-2 border-t-2 border-l-2 border-r-2 border-ink rounded-t-lg ${activePart === 'sheet1' || !activePart ? 'bg-white text-green-700' : 'bg-gray-200 text-gray-500'}`}>Sheet1</button>
                <button onClick={() => setActivePart('sheet2')} className={`px-4 py-2 border-t-2 border-l-2 border-r-2 border-ink rounded-t-lg ${activePart === 'sheet2' ? 'bg-white text-green-700' : 'bg-gray-200 text-gray-500'}`}>Sheet2</button>
                <button onClick={() => setActivePart('sheet3')} className={`px-4 py-2 border-t-2 border-l-2 border-r-2 border-ink rounded-t-lg ${activePart === 'sheet3' ? 'bg-white text-green-700' : 'bg-gray-200 text-gray-500'}`}>Sheet3</button>
              </div>
              <div className="bg-white p-4 h-24 flex items-center justify-center">
                {(!activePart || activePart === 'sheet1') && <p className="text-gray-600 font-bold">📄 Ini isi <span className="text-green-700">Sheet1</span></p>}
                {activePart === 'sheet2' && <p className="text-gray-600 font-bold">📄 Ini isi <span className="text-green-700">Sheet2</span></p>}
                {activePart === 'sheet3' && <p className="text-gray-600 font-bold">📄 Ini isi <span className="text-green-700">Sheet3</span></p>}
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (slug === 'input-edit-hapus-data') {
      return (
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 md:p-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-black mb-6 text-center">Simulasi Tombol Keyboard</h3>
          <KeyboardVisual />
        </div>
      );
    }

    if (slug === 'format-cell') {
      return (
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 md:p-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-black mb-6 text-center">Simulasi Format Angka</h3>
          <NumberFormatVisual />
        </div>
      );
    }

    if (slug === 'operasi-matematika') {
      return (
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 md:p-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-black mb-2 text-center">Kalkulator Excel Interaktif</h3>
          <p className="text-center text-gray-500 mb-6">Klik tombol operator untuk melihat cara kerjanya.</p>
          <OperasiMatematikaVisual />
        </div>
      );
    }

    if (slug === 'data-tools') {
      return (
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 md:p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-black mb-6 text-center">Simulasi Data Tools</h3>
          <DataToolsVisual />
        </div>
      );
    }

    if (slug === 'pivottable-dashboard') {
      return (
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 md:p-8 max-w-4xl mx-auto">
          <PivotTutorial />
        </div>
      );
    }

    if (formulaSlugs.includes(slug as string)) {
      return (
        <div className="max-w-3xl mx-auto">
          <FormulaVisual slug={slug as string} />
        </div>
      );
    }

    return (
      <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 md:p-8 max-w-3xl mx-auto">
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4 text-center">Simulasi Rumus {lesson.title}</h3>
          <div className="bg-gray-800 text-mint p-4 rounded-xl font-mono text-center text-lg md:text-2xl">
            {lesson.content?.sintaks.split('\n')[0] || `=${lesson.title.split(' ')[1] || 'RUMUS'}(...)`}
          </div>
        </div>
        
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6">
          <p className="text-center text-gray-700 mb-4">
            Rumus <strong>{lesson.title}</strong> digunakan untuk: 
            <span className="block mt-2 font-bold text-blue-600">{lesson.intro}</span>
          </p>
          <div className="bg-white border-2 border-ink rounded-xl shadow-neo p-4">
             <p className="text-sm font-bold mb-2">Contoh Penggunaan:</p>
             <pre className="bg-gray-100 p-2 rounded text-sm text-green-700 overflow-x-auto">
               {lesson.content?.sintaks}
             </pre>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-16 pb-24 pt-8">
      <section className="text-center md:text-left flex flex-col md:flex-row gap-8 items-center justify-between">
        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <span className="bg-mint border-2 border-ink rounded-full px-4 py-1 text-sm font-bold shadow-neo-sm">{lesson.level?.name}</span>
            <span className="bg-lavender border-2 border-ink rounded-full px-4 py-1 text-sm font-bold shadow-neo-sm">{lesson.category?.name}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-ink leading-tight">{lesson.title}</h1>
          <p className="text-lg text-gray-700 max-w-xl mx-auto md:mx-0">{lesson.intro}</p>
          <div className="flex flex-wrap gap-6 pt-4 justify-center md:justify-start">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-600"><Clock size={18} /> Estimasi: 10 Menit</div>
            <div className="flex items-center gap-2 text-sm font-bold text-gray-600"><Target size={18} /> Tujuan: Menguasai Materi</div>
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

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-black text-ink mb-6">Memahami Konsep</h2>
          <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">{lesson.content?.apa_itu}</div>
          <Note type="info" title="Mengapa ini penting?"><div className="whitespace-pre-line">{lesson.content?.mengapa}</div></Note>
        </div>
        {getConceptVisual() && (
          <div className="space-y-4">{getConceptVisual()}</div>
        )}
      </section>

      <hr className="border-t-2 border-ink/10" />

      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-ink mb-2">Bagian Penting</h2>
          <p className="text-gray-600">Pahami penjelasan di bawah ini.</p>
        </div>
        {renderInteractiveSection()}
      </section>

      <hr className="border-t-2 border-ink/10" />

      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-black text-ink mb-6">Saatnya Praktik!</h2>
          <div className="inline-flex bg-gray-200 border-2 border-ink rounded-xl p-1 shadow-neo">
            <button onClick={() => setMode('belajar')} className={`px-4 md:px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${mode === 'belajar' ? 'bg-white shadow-sm text-ink' : 'text-gray-500 hover:text-ink'}`}>
              <BookOpen size={18} /> <span className="hidden md:inline">Mode Belajar</span><span className="md:hidden">Belajar</span>
            </button>
            <button onClick={() => setMode('latihan')} className={`px-4 md:px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${mode === 'latihan' ? 'bg-white shadow-sm text-ink' : 'text-gray-500 hover:text-ink'}`}>
              <PlayCircle size={18} /> <span className="hidden md:inline">Mode Latihan</span><span className="md:hidden">Latihan</span>
            </button>
          </div>
        </div>
        <div className="mt-8">
          {mode === 'belajar' ? (
            <div className="space-y-6">
              <div className="text-center mb-8"><h3 className="text-xl font-bold text-ink flex items-center justify-center gap-2"><Calculator /> Guided Practice</h3></div>
              {slug !== 'data-tools' && slug !== 'pivottable-dashboard' ? (
                <Spreadsheet lessonSlug={slug as string} />
              ) : (
                <div className="bg-yellow border-2 border-ink rounded-2xl p-8 text-center shadow-neo">
                  <p className="font-bold text-lg">✅ Simulasi interaktif untuk materi ini sudah ada di bagian "Bagian Penting" di atas.</p>
                  <p className="text-sm mt-2">Silakan gulir ke atas untuk mencoba simulasi {slug === 'pivottable-dashboard' ? 'PivotTable' : 'Data Tools'}.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center mb-8"><h3 className="text-xl font-bold text-ink flex items-center justify-center gap-2"><PlayCircle /> Uji Pemahamanmu</h3></div>
              <ExercisePlayer onComplete={() => alert('Latihan Selesai!')} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}