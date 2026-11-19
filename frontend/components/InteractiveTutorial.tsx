'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Lightbulb, RefreshCcw, MousePointer2, Check } from 'lucide-react';
import Button from './ui/Button';
import Card from './ui/Card';

type TutorialStep = {
  id: number;
  title: string;
  instruction: string;
  targetCell?: string | null;
  expectedValue?: string | null;
  /** Rentang yang bisa diblok lewat tombol, contoh: "B2:B4" */
  highlightRange?: string;
  /** Syarat selesai berbasis aksi: "range:B2:B4" | "filter-on" | "filter-gt:80" */
  check?: string;
  /** Teks di tombol abu-abu saat langkah belum selesai */
  waitingText?: string;
  hint?: string;
};

export default function InteractiveTutorial({
  steps,
  data,
  progress = [],
  onReset,
  onHighlightRange,
}: {
  steps: TutorialStep[];
  data: Record<string, string>;
  progress?: string[];
  onReset: () => void;
  onHighlightRange: (range: string) => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isStepValid, setIsStepValid] = useState(false);

  const step = steps[currentStep];

  // Reset saat materi berganti
  useEffect(() => {
    setCurrentStep(0);
    setShowHint(false);
  }, [steps]);

  // Validasi langkah (semua hook ada SEBELUM early return)
  useEffect(() => {
    if (!step) return;

    // 1) Langkah berbasis aksi (blok / sort / filter)
    if (step.check) {
      setIsStepValid(progress.includes(step.check));
      return;
    }

    // 2) Langkah informasi saja
    if (!step.targetCell) {
      setIsStepValid(true);
      return;
    }

    // 3) Langkah isi cell
    const cellValue = (data[step.targetCell] || '').toString().trim();

    if (!step.expectedValue) {
      setIsStepValid(cellValue !== '');
    } else {
      const cleanCellValue = cellValue.replace(/\s/g, '').toLowerCase();
      const cleanExpectedValue = step.expectedValue.replace(/\s/g, '').toLowerCase();
      setIsStepValid(cleanCellValue === cleanExpectedValue);
    }
  }, [data, progress, step]);

  if (!step) return null;

  const isLastStep = currentStep === steps.length - 1;
  const isRangeSelected = step.highlightRange
    ? progress.includes(`range:${step.highlightRange}`)
    : false;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setShowHint(false);
    }
  };

  const renderInstruction = (text: string) => {
    let html = text.replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="bg-blue px-1 border border-ink rounded whitespace-nowrap">$1</strong>'
    );
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    html = html.replace(
      /`(.*?)`/g,
      '<code class="bg-gray-100 border-2 border-ink px-2 py-0.5 rounded text-xs font-mono shadow-neo-sm mx-1 inline-block break-all whitespace-pre-wrap max-w-full align-middle">$1</code>'
    );
    html = html.replace(/\n/g, '<br/>');
    return { __html: html };
  };

  const waitingText =
    step.waitingText ||
    (step.targetCell ? `Isi ${step.targetCell} dulu ya...` : 'Selesaikan langkah ini dulu ya...');

  return (
    <Card bg="bg-white" className="flex flex-col h-full md:min-h-[400px] overflow-hidden">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-3 border-b-2 border-ink pb-3 shrink-0">
        <div>
          <span className="bg-yellow border-2 border-ink rounded-full px-3 py-1 text-xs font-black shadow-neo-sm">
            Langkah {currentStep + 1} dari {steps.length}
          </span>
          <h2 className="text-xl md:text-2xl font-black mt-2">{step.title}</h2>
        </div>
        <button
          onClick={() => {
            setCurrentStep(0);
            setShowHint(false);
            onReset();
          }}
          title="Ulangi"
          className="text-gray-500 hover:text-red-500 shrink-0 p-2"
        >
          <RefreshCcw size={20} />
        </button>
      </div>

      {/* ISI INSTRUKSI (bisa di-scroll) */}
      <div className="flex-1 overflow-y-auto pr-1 max-h-[34vh] md:max-h-none">
        <p
          className="text-sm md:text-base leading-relaxed break-words"
          dangerouslySetInnerHTML={renderInstruction(step.instruction)}
        />

        {step.hint && (
          <div className="mt-4">
            {!showHint ? (
              <button
                onClick={() => setShowHint(true)}
                className="flex items-center gap-2 text-blue-600 font-bold hover:underline"
              >
                <Lightbulb size={18} /> Butuh bantuan?
              </button>
            ) : (
              <div className="bg-yellow border-2 border-ink rounded-xl p-3 shadow-neo-sm flex gap-3 items-start">
                <Lightbulb size={24} className="shrink-0 text-ink" />
                <p className="text-sm font-bold break-words w-full">{step.hint}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* TOMBOL BLOK DATA — sengaja DI LUAR area scroll supaya selalu terlihat (HP & laptop) */}
      {step.highlightRange && (
        <div className="mt-3 shrink-0">
          <button
            onClick={() => onHighlightRange(step.highlightRange!)}
            className={`w-full flex items-center justify-center gap-2 border-2 border-ink rounded-lg px-3 py-3 text-sm font-black shadow-neo-sm transition-all active:translate-y-0.5 ${
              isRangeSelected ? 'bg-green-200' : 'bg-mint hover:bg-green-200'
            }`}
          >
            {isRangeSelected ? <Check size={18} /> : <MousePointer2 size={18} />}
            {isRangeSelected
              ? `Data ${step.highlightRange} sudah terblok`
              : `Blok Data ${step.highlightRange}`}
          </button>
        </div>
      )}

      {/* NAVIGASI */}
      <div className="mt-3 pt-3 border-t-2 border-ink flex items-center justify-between gap-2 shrink-0">
        <Button
          variant="cream"
          onClick={() => {
            setCurrentStep(c => Math.max(0, c - 1));
            setShowHint(false);
          }}
          disabled={currentStep === 0}
        >
          <ChevronLeft size={18} /> Kembali
        </Button>

        {isStepValid ? (
          <Button variant="mint" onClick={handleNext} disabled={isLastStep} className="animate-pulse">
            {isLastStep ? 'Selesai! 🎉' : 'Lanjut'} <ChevronRight size={18} />
          </Button>
        ) : (
          <div className="text-xs md:text-sm font-bold text-gray-500 bg-gray-100 px-3 py-2 rounded-xl border-2 border-dashed border-gray-300 text-center">
            {waitingText}
          </div>
        )}
      </div>
    </Card>
  );
}