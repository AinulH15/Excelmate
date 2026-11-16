'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Lightbulb, RefreshCcw } from 'lucide-react';
import Button from './ui/Button';
import Card from './ui/Card';

export default function InteractiveTutorial({ 
  steps, 
  data, 
  onReset 
}: { 
  steps: any[], 
  data: any, 
  onReset: () => void 
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isStepValid, setIsStepValid] = useState(false);

  // Reset step jika steps berubah (misal ganti materi)
  useEffect(() => {
    setCurrentStep(0);
    setShowHint(false);
  }, [steps]);

  const step = steps[currentStep];
  
  // Guard clause jika step belum ada
  if (!step) return null; 

  const isLastStep = currentStep === steps.length - 1;

  // ==========================================
  // LOGIKA VALIDASI (DIPERBAIKI)
  // ==========================================
  useEffect(() => {
    // Jika tidak ada target cell, langsung valid (misal: step penjelasan teori)
    if (!step.targetCell) {
      setIsStepValid(true);
      return;
    }
    
    // Ambil nilai dari state spreadsheet, pastikan diubah ke string dan dibersihkan spasinya
    const cellValue = (data[step.targetCell] || '').toString().trim();

    // KONDISI 1: Jika expectedValue kosong (user bebas isi, misal A1-A5)
    if (!step.expectedValue) {
      // Cukup cek apakah sel target sudah terisi (tidak kosong)
      setIsStepValid(cellValue !== '');
      return;
    }

    // KONDISI 2: Jika expectedValue ada, cek kecocokan (abaikan spasi & besar-kecil)
    const cleanCellValue = cellValue.replace(/\s/g, '').toLowerCase();
    const cleanExpectedValue = step.expectedValue.replace(/\s/g, '').toLowerCase();
    
    setIsStepValid(cleanCellValue === cleanExpectedValue);
  }, [data, step]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setShowHint(false);
    }
  };

  return (
    <Card bg="bg-white" className="flex flex-col h-full min-h-[400px]">
      <div className="flex items-center justify-between mb-4 border-b-2 border-ink pb-4">
        <div>
          <span className="bg-yellow border-2 border-ink rounded-full px-3 py-1 text-xs font-black shadow-neo-sm">
            Langkah {currentStep + 1} dari {steps.length}
          </span>
          <h2 className="text-2xl font-black mt-2">{step.title}</h2>
        </div>
        <button onClick={() => { setCurrentStep(0); onReset(); }} title="Ulangi" className="text-gray-500 hover:text-red-500">
          <RefreshCcw size={20} />
        </button>
      </div>

      <div className="flex-1">
        <p 
          className="text-lg leading-relaxed"
          dangerouslySetInnerHTML={{ __html: step.instruction.replace(/\*\*(.*?)\*\*/g, '<strong class="bg-blue px-1 border border-ink rounded">$1</strong>').replace(/`(.*?)`/g, '<code class="bg-gray-100 border-2 border-ink px-2 py-0.5 rounded text-sm font-mono shadow-neo-sm mx-1">$1</code>') }} 
        />

        {step.hint && (
          <div className="mt-6">
            {!showHint ? (
              <button onClick={() => setShowHint(true)} className="flex items-center gap-2 text-blue-600 font-bold hover:underline">
                <Lightbulb size={18} /> Butuh bantuan?
              </button>
            ) : (
              <div className="bg-yellow border-2 border-ink rounded-xl p-3 shadow-neo-sm flex gap-3 items-start">
                <Lightbulb size={24} className="shrink-0 text-ink" />
                <p className="text-sm font-bold">{step.hint}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t-2 border-ink flex items-center justify-between">
        <Button variant="cream" onClick={() => setCurrentStep(c => Math.max(0, c - 1))} disabled={currentStep === 0}>
          <ChevronLeft size={18} /> Kembali
        </Button>

        {isStepValid ? (
          <Button variant="mint" onClick={handleNext} disabled={isLastStep} className="animate-pulse">
            {isLastStep ? 'Selesai! 🎉' : 'Lanjut'} <ChevronRight size={18} />
          </Button>
        ) : (
          <div className="text-sm font-bold text-gray-500 bg-gray-100 px-4 py-2 rounded-xl border-2 border-dashed border-gray-300">
            {step.targetCell ? `Isi ${step.targetCell} dulu ya...` : 'Klik Lanjut'}
          </div>
        )}
      </div>
    </Card>
  );
}