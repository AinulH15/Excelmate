'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle, ChevronRight, ChevronLeft, RotateCcw, AlertCircle } from 'lucide-react';
import Button from './ui/Button';
import Card from './ui/Card';

export default function QuestionPlayer({ questions, onSubmit }: { questions: any[], onSubmit: (answers: any) => void }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // PROTEKSI: Jika questions kosong atau undefined, tampilkan pesan
  if (!questions || questions.length === 0) {
    return (
      <Card className="text-center py-12">
        <AlertCircle size={48} className="mx-auto text-yellow-500 mb-4" />
        <h3 className="text-2xl font-black mb-2">Soal Belum Tersedia</h3>
        <p className="text-gray-600">
          Soal untuk materi ini belum tersedia. Pastikan database sudah di-seed.
        </p>
        <p className="text-sm text-gray-400 mt-4">
          Jalankan: <code className="bg-gray-100 px-2 py-1 rounded">php artisan migrate:fresh --seed</code>
        </p>
      </Card>
    );
  }

  const q = questions[current];

  // PROTEKSI: Jika q undefined (index out of bounds)
  if (!q) return null;

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({ ...prev, [q.id]: answer }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    onSubmit(answers);
  };

  const isAllAnswered = questions.every(q => answers[q.id]);
  const correctCount = questions.filter(q => answers[q.id] === q.correct_answer).length;
  const score = Math.round((correctCount / questions.length) * 100);

  if (isSubmitted) {
    return (
      <Card className="text-center space-y-6">
        <h2 className="text-3xl font-black">Hasil Latihan</h2>
        <div className="bg-yellow border-2 border-ink rounded-xl p-6">
          <p className="text-5xl font-black">{score}/100</p>
          <p className="text-lg">Benar: {correctCount} / {questions.length}</p>
          <p className={`text-xl font-bold mt-2 ${score >= 70 ? 'text-green-700' : 'text-red-700'}`}>
            {score >= 70 ? 'Lulus! 🎉' : 'Perlu Belajar Lagi'}
          </p>
        </div>
        <div className="text-left space-y-4">
          {questions.map((q, i) => (
            <div key={q.id} className={`p-4 border-2 border-ink rounded-xl ${answers[q.id] === q.correct_answer ? 'bg-green-50' : 'bg-red-50'}`}>
              <p className="font-bold">Soal {i + 1}: {q.question}</p>
              <p className="text-sm mt-1">Jawabanmu: <strong>{answers[q.id] || 'Tidak dijawab'}</strong></p>
              <p className="text-sm">Jawaban benar: <strong>{q.correct_answer}</strong></p>
              <p className="text-sm mt-2 text-gray-700">{q.explanation}</p>
            </div>
          ))}
        </div>
        <Button onClick={() => { setAnswers({}); setIsSubmitted(false); setCurrent(0); }}>
          <RotateCcw size={18} /> Ulangi Latihan
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <span className="bg-yellow border-2 border-ink px-3 py-1 rounded-full font-bold text-sm">
          Soal {current + 1} dari {questions.length}
        </span>
        <div className="flex gap-2">
          <button onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0} className="p-2 border-2 border-ink rounded-lg disabled:opacity-50">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => setCurrent(c => Math.min(questions.length - 1, c + 1))} disabled={current === questions.length - 1} className="p-2 border-2 border-ink rounded-lg disabled:opacity-50">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <Card>
        <p className="text-xl font-bold mb-4">{q.question}</p>
        <div className="space-y-2">
          {q.options?.map((opt: string) => (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              className={`w-full text-left p-3 border-2 border-ink rounded-xl font-bold transition-all ${
                answers[q.id] === opt ? 'bg-blue shadow-neo-sm' : 'bg-white hover:bg-gray-50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </Card>

      <div className="flex justify-between">
        <span className="text-sm text-gray-500">
          {Object.keys(answers).length} / {questions.length} terjawab
        </span>
        <Button onClick={handleSubmit} disabled={!isAllAnswered} variant="mint">
          Periksa Semua Jawaban
        </Button>
      </div>
    </div>
  );
}