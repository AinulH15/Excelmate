'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import Button from './ui/Button';
import Card from './ui/Card';

// Simulasi soal (Bisa diganti dengan ambil dari API Laravel nanti)
const dummyExercises = [
  { id: 1, question: "Fungsi apa yang digunakan untuk menjumlahkan angka?", options: [{id:1, text:'SUM', is_correct:true}, {id:2, text:'AVERAGE', is_correct:false}, {id:3, text:'MAX', is_correct:false}] },
  { id: 2, question: "Rumus =SUM(A1:A3) artinya?", options: [{id:4, text:'Menjumlahkan A1, A2, A3', is_correct:true}, {id:5, text:'Mengalikan A1-A3', is_correct:false}] },
  { id: 3, question: "Hasil dari =SUM(10, 20) adalah...", options: [{id:6, text:'30', is_correct:true}, {id:7, text:'1020', is_correct:false}] },
  { id: 4, question: "Penulisan SUM yang benar?", options: [{id:8, text:'=SUM(A1:A5)', is_correct:true}, {id:9, text:'SUM[A1:A5]', is_correct:false}] },
  { id: 5, question: "Jika A1=5, A2=5, =SUM(A1:A2) menghasilkan?", options: [{id:10, text:'10', is_correct:true}, {id:11, text:'55', is_correct:false}] },
];

export default function ExercisePlayer({ onComplete }: { onComplete: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const exercise = dummyExercises[currentIdx];

  const handleSubmit = () => {
    if (!selectedOpt) return;
    setIsAnswered(true);
    const isCorrect = exercise.options.find(o => o.id === selectedOpt)?.is_correct;
    if (isCorrect) setScore(score + 1);
  };

  const handleNext = () => {
    if (currentIdx < dummyExercises.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      onComplete(); // Selesai semua soal
    }
  };

  return (
    <Card bg="bg-white" className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <span className="bg-lavender border-2 border-ink rounded-lg px-3 py-1 font-bold shadow-neo-sm">
          Soal {currentIdx + 1} / {dummyExercises.length}
        </span>
        <span className="font-bold">Skor: {score}</span>
      </div>

      <h3 className="text-xl font-bold mb-6">{exercise.question}</h3>

      <div className="space-y-3 mb-8">
        {exercise.options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => !isAnswered && setSelectedOpt(opt.id)}
            className={`w-full text-left p-4 border-2 border-ink rounded-xl font-bold transition-all ${
              isAnswered 
                ? opt.is_correct 
                  ? 'bg-mint shadow-neo-sm' 
                  : opt.id === selectedOpt ? 'bg-pink shadow-neo-sm' : 'bg-gray-100 opacity-50'
                : selectedOpt === opt.id 
                  ? 'bg-blue shadow-neo-sm translate-x-1' 
                  : 'bg-white hover:bg-gray-50 shadow-neo'
            }`}
            disabled={isAnswered}
          >
            {opt.text}
            {isAnswered && opt.is_correct && <CheckCircle2 className="inline ml-2 text-green-700" size={18} />}
            {isAnswered && !opt.is_correct && opt.id === selectedOpt && <XCircle className="inline ml-2 text-red-700" size={18} />}
          </button>
        ))}
      </div>

      {!isAnswered ? (
        <Button onClick={handleSubmit} disabled={!selectedOpt} className="w-full">
          Kirim Jawaban
        </Button>
      ) : (
        <Button onClick={handleNext} variant="yellow" className="w-full flex justify-center items-center gap-2">
          {currentIdx === dummyExercises.length - 1 ? 'Selesai & Lihat Hasil' : 'Soal Selanjutnya'} <ArrowRight size={18} />
        </Button>
      )}
    </Card>
  );
}