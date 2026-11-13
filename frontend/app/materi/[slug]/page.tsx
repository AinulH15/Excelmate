'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Calculator, PlayCircle, BookOpen } from 'lucide-react';
import Spreadsheet from '@/components/Spreadsheet';
import ExercisePlayer from '@/components/ExercisePlayer';
import Button from '@/components/ui/Button';
import Note from '@/components/ui/Note';

const api = axios.create({ baseURL: 'http://127.0.0.1:8000/api' });

export default function DetailMateriPage() {
  const { slug } = useParams();
  const [lesson, setLesson] = useState<any>(null);
  const [mode, setMode] = useState<'belajar' | 'latihan'>('belajar');

  useEffect(() => {
    api.get(`/lessons/${slug}`).then(res => setLesson(res.data.data)).catch(console.error);
  }, [slug]);

  if (!lesson) return <div className="text-center py-20 font-bold animate-pulse">Memuat materi...</div>;

  return (
    <div className="space-y-8 pb-20">
      
      {/* 1. Header Materi */}
      <div className="bg-mint border-2 border-ink rounded-2xl shadow-neo p-8">
        <h1 className="text-4xl font-black mb-4">{lesson.title}</h1>
        <p className="text-lg leading-relaxed">{lesson.intro}</p>
      </div>

      {/* 2. Penjelasan Note */}
      <div className="space-y-4">
        <Note type="info" title="Apa itu SUM?">
          <div className="whitespace-pre-line">{lesson.content?.apa_itu}</div>
        </Note>
        <Note type="tip" title="Mengapa harus menggunakan SUM?">
          <div className="whitespace-pre-line">{lesson.content?.mengapa}</div>
        </Note>
        <Note type="success" title="Bentuk Penulisan Rumus SUM">
          <div className="whitespace-pre-line">{lesson.content?.sintaks}</div>
        </Note>
      </div>

      {/* 3. TABS: Mode Belajar vs Mode Latihan */}
      <div className="flex gap-4 border-b-2 border-ink pb-4 mt-8">
        <Button 
          variant={mode === 'belajar' ? 'pink' : 'cream'} 
          onClick={() => setMode('belajar')}
          className="flex-1 md:flex-none flex items-center justify-center gap-2"
        >
          <BookOpen size={18} /> Mode Belajar (Spreadsheet)
        </Button>
        <Button 
          variant={mode === 'latihan' ? 'pink' : 'cream'} 
          onClick={() => setMode('latihan')}
          className="flex-1 md:flex-none flex items-center justify-center gap-2"
        >
          <PlayCircle size={18} /> Mode Latihan (5 Soal)
        </Button>
      </div>

      {/* 4. Konten Berdasarkan Mode */}
      <div className="mt-8">
        {mode === 'belajar' ? (
          <div>
            <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
              <Calculator /> Praktik Langsung (Guided Practice)
            </h2>
            <Spreadsheet />
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
              <PlayCircle /> Uji Pemahamanmu
            </h2>
            <ExercisePlayer onComplete={() => alert('Latihan Selesai!')} />
          </div>
        )}
      </div>

    </div>
  );
}