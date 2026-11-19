'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image'; // <-- IMPORT IMAGE DITAMBAHKAN
import { 
  BookOpen, Calculator, PlayCircle, Clock, Target, 
  Lightbulb, ChevronLeft, ChevronRight, Trophy, Sparkles
} from 'lucide-react';
import Spreadsheet from '@/components/Spreadsheet';
import SpreadsheetVisual from '@/components/SpreadsheetVisual';
import QuestionPlayer from '@/components/QuestionPlayer';
import Note from '@/components/ui/Note';
import ExcelInterfaceVisual from '@/components/ExcelInterfaceVisual';
import WorksheetVisual from '@/components/WorksheetVisual';
import KeyboardVisual from '@/components/KeyboardVisual';
import NumberFormatVisual from '@/components/NumberFormatVisual';
import OperasiMatematikaVisual from '@/components/OperasiMatematikaVisual';
import FormulaVisual from '@/components/FormulaVisual';
import DataToolsVisual from '@/components/DataToolsVisual';
import PivotChartVisual from '@/components/PivotChartVisual';
import PivotSimulator from '@/components/PivotSimulator';
import TipsCard from '@/components/TipsCard';
import WorkbookVisual from '@/components/WorkbookVisual';
import CellReferenceVisual from '@/components/CellReferenceVisual';
import DateTimeVisual from '@/components/DateTimeVisual';
import IfErrorVisual from '@/components/IfErrorVisual';
import SortingFilteringVisual from '@/components/SortingFilteringVisual';
import ConditionalFormattingVisual from '@/components/ConditionalFormattingVisual';
import ConditionalFormattingGuidedPractice from '@/components/ConditionalFormattingGuidedPractice';
import TableVisualGuide from '@/components/TableVisualGuide';
import BorderVisualGuide from '@/components/BorderVisualGuide';
import MergeCellVisualGuide from '@/components/MergeCellVisualGuide';
import TableBorderMergePractice from '@/components/TableBorderMergePractice';
import DataValidationVisual from '@/components/DataValidationVisual';
import DataValidationPractice from '@/components/DataValidationPractice';
import ChartVisualGuide from '@/components/ChartVisualGuide';
import PivotToggle from '@/components/PivotToggle';

import api from "@/lib/api";

export default function DetailMateriPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [lesson, setLesson] = useState<any>(null);
  const [tips, setTips] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [prevLesson, setPrevLesson] = useState<any>(null);
  const [nextLesson, setNextLesson] = useState<any>(null);
  const [mode, setMode] = useState<'belajar' | 'latihan'>('belajar');
  const [activePart, setActivePart] = useState<string | null>(null);
  
  // State untuk Popup Selamat
  const [showCongrats, setShowCongrats] = useState(false);
  const [pendingNextSlug, setPendingNextSlug] = useState<string | null>(null);

  useEffect(() => {
    api.get(`/lessons/${slug}`).then(res => {
      setLesson(res.data.data);
      setPrevLesson(res.data.prev);
      setNextLesson(res.data.next);
    }).catch(console.error);
    api.get(`/lessons/${slug}/tips`).then(res => setTips(res.data.data)).catch(console.error);
    api.get(`/lessons/${slug}/questions`).then(res => setQuestions(res.data.data)).catch(console.error);
  }, [slug]);

  if (!lesson) return <div className="text-center py-20 font-bold animate-pulse">Memuat materi...</div>;

  // --- FUNGSI GET HERO ICON YANG SUDAH DIUBAH KE GAMBAR ---
  const getHeroIcon = () => {
    let imgNumber = '1'; // Default

    if (slug === 'pengenalan-antarmuka-excel') imgNumber = '1';
    else if (slug === 'workbook-worksheet-cell') imgNumber = '2';
    else if (slug === 'mengatur-workbook-worksheet') imgNumber = '3';
    else if (slug === 'input-edit-hapus-data') imgNumber = '4';
    else if (slug === 'format-cell') imgNumber = '5';
    else if (slug === 'operasi-matematika') imgNumber = '6';
    else if (slug === 'fungsi-sum') imgNumber = '7';
    else if (slug === 'fungsi-average') imgNumber = '8';
    else if (slug === 'fungsi-max-min') imgNumber = '9';
    else if (slug === 'fungsi-count') imgNumber = '10';
    else if (slug === 'fungsi-if') imgNumber = '11';
    else if (slug === 'fungsi-sumif-sumifs') imgNumber = '12';
    else if (slug === 'fungsi-countif') imgNumber = '13';
    else if (slug === 'fungsi-averageif') imgNumber = '14';
    else if (slug === 'fungsi-and-or') imgNumber = '15';
    else if (slug === 'fungsi-teks') imgNumber = '16';
    else if (slug === 'fungsi-lookup') imgNumber = '17';
    else if (slug === 'data-tools') imgNumber = '18';
    else if (slug === 'pivottable-dashboard') imgNumber = '19';
    else if (slug === 'data-validation') imgNumber = '20';
    else if (slug === 'membuat-chart') imgNumber = '21';

    return (
      <Image 
        src={`/icon/${imgNumber}.jfif`} 
        alt={`Ikon Materi ${lesson.title}`}
        width={250} 
        height={250} 
        className="w-full h-full object-contain p-4 md:p-6 drop-shadow-md" 
      />
    );
  };

  const formulaSlugs = [
    'fungsi-sum', 'fungsi-average', 'fungsi-max-min', 'fungsi-count', 
    'fungsi-if', 'fungsi-sumif-sumifs', 'fungsi-countif', 'fungsi-averageif', 
    'fungsi-and-or', 'fungsi-teks', 'fungsi-lookup'
  ];

  const getConceptVisual = () => {
    if (formulaSlugs.includes(slug as string)) return null; 
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

  const handleNextClick = () => {
    if (!nextLesson) return;
    setPendingNextSlug(nextLesson.slug);
    setShowCongrats(true);
  };

  const confirmNext = () => {
    if (pendingNextSlug) {
      router.push(`/materi/${pendingNextSlug}`);
    }
    setShowCongrats(false);
  };

  const renderInteractiveSection = () => {
    if (slug === 'membuat-tabel-border') {
      return (
        <div className="max-w-4xl mx-auto">
          <TableBorderMergePractice />
        </div>
      );
    }

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

    if (slug === 'mengatur-workbook-worksheet') {
      return (
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 md:p-8 max-w-4xl mx-auto">
          <WorkbookVisual />
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

    if (slug === 'data-tools' || slug === 'sorting-filtering') {
      return (
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 md:p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-black mb-6 text-center">Simulasi Data Tools</h3>
          <SortingFilteringVisual />
        </div>
      );
    }

    if (slug === 'conditional-formatting') {
      return (
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 md:p-8 max-w-4xl mx-auto">
          <ConditionalFormattingVisual />
        </div>
      );
    }

    if (slug === 'pivottable-dashboard') {
      return (
           <PivotToggle />
      );
    }

    if (slug === 'cell-reference') {
      return (
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 md:p-8 max-w-4xl mx-auto">
          <CellReferenceVisual />
        </div>
      );
    }

    if (slug === 'fungsi-tanggal-waktu') {
      return (
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 md:p-8 max-w-4xl mx-auto">
          <DateTimeVisual />
        </div>
      );
    }

    if (slug === 'fungsi-iferror') {
      return (
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 md:p-8 max-w-4xl mx-auto">
          <IfErrorVisual />
        </div>
      );
    }

    if (slug === 'data-validation') {
      return (
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 md:p-8 max-w-4xl mx-auto">
          <DataValidationVisual />
        </div>
      );
    }

    if (slug === 'membuat-chart') {
      return (
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 md:p-8 max-w-4xl mx-auto">
          <ChartVisualGuide />
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

  const renderPracticeSection = () => {
    if (slug === 'membuat-tabel-border') {
      return (
        <div className="space-y-12 max-w-4xl mx-auto">
          <section>
            <h3 className="text-2xl font-black mb-4 text-center">Praktik 1: Membuat Excel Table</h3>
            <TableVisualGuide />
          </section>
          <section>
            <h3 className="text-2xl font-black mb-4 text-center">Praktik 2: Mengatur Border</h3>
            <BorderVisualGuide />
          </section>
          <section>
            <h3 className="text-2xl font-black mb-4 text-center">Praktik 3: Merge Cell</h3>
            <MergeCellVisualGuide />
          </section>
        </div>
      );
    }

    if (mode === 'belajar') {
      if (slug === 'pivottable-dashboard') return <PivotSimulator />;
      if (slug === 'conditional-formatting') return <ConditionalFormattingGuidedPractice />;
      if (slug === 'data-validation') return <DataValidationPractice />;
      return <Spreadsheet lessonSlug={slug as string} />;
    }
    
    return null;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-16 pb-24 pt-8">
      {/* POPUP SELAMAT */}
      {showCongrats && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-2 border-ink rounded-3xl shadow-neo p-8 max-w-sm w-full text-center animate-in zoom-in duration-200">
            <div className="bg-yellow border-2 border-ink rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <Trophy size={48} className="text-ink" />
            </div>
            <h2 className="text-3xl font-black mb-2">Selamat! 🎉</h2>
            <p className="text-gray-700 mb-6">
              Kamu telah menyelesaikan level ini! Terus semangat belajar Excel ya!
            </p>
            <div className="flex flex-col gap-2">
              <button onClick={confirmNext} className="bg-mint border-2 border-ink rounded-xl py-3 font-bold shadow-neo hover:bg-green-100 flex items-center justify-center gap-2">
                <Sparkles size={18} /> Lanjut ke Materi Selanjutnya
              </button>
              <button onClick={() => setShowCongrats(false)} className="text-sm font-bold text-gray-500 hover:text-ink">
                Tetap di Halaman Ini
              </button>
            </div>
          </div>
        </div>
      )}

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
        
        {/* BAGIAN INI SUDAH DIUBAH: overflow-hidden ditambahkan agar gambar tidak bocor keluar card */}
        <div className="relative w-48 h-48 md:w-64 md:h-64 shrink-0 block">
          <div className="absolute inset-0 bg-yellow border-2 border-ink rounded-3xl shadow-neo rotate-6"></div>
          <div className="absolute inset-0 bg-white border-2 border-ink rounded-3xl shadow-neo flex items-center justify-center -rotate-3 overflow-hidden">
            {getHeroIcon()}
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

      {tips.length > 0 && (
        <section className="space-y-8">
          <TipsCard tips={tips} />
        </section>
      )}

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
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-ink flex items-center justify-center gap-2">
                  <Calculator /> Guided Practice
                </h3>
              </div>
              {renderPracticeSection()}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-ink flex items-center justify-center gap-2">
                  <PlayCircle /> Uji Pemahamanmu
                </h3>
              </div>
              <QuestionPlayer questions={questions} onSubmit={(answers) => console.log(answers)} />
            </div>
          )}
        </div>
      </section>

      <hr className="border-t-2 border-ink/10" />
      
      {/* NAVIGASI MATERI */}
      <section className="grid md:grid-cols-2 gap-4">
        {prevLesson ? (
          <Link href={`/materi/${prevLesson.slug}`}>
            <div className="bg-white border-2 border-ink rounded-xl shadow-neo p-4 hover:bg-gray-50 transition-all h-full flex flex-col justify-center">
              <div className="flex items-center gap-2 text-gray-500 text-sm font-bold mb-1">
                <ChevronLeft size={16} /> Materi Sebelumnya
              </div>
              <p className="font-black text-lg">{prevLesson.title}</p>
            </div>
          </Link>
        ) : <div />}
        
        {nextLesson ? (
          <div onClick={handleNextClick} className="cursor-pointer">
            <div className="bg-mint border-2 border-ink rounded-xl shadow-neo p-4 hover:bg-green-100 transition-all h-full flex flex-col justify-center text-right">
              <div className="flex items-center justify-end gap-2 text-gray-700 text-sm font-bold mb-1">
                Materi Selanjutnya <ChevronRight size={16} />
              </div>
              <p className="font-black text-lg">{nextLesson.title}</p>
            </div>
          </div>
        ) : <div />}
      </section>
    </div>
  );
}