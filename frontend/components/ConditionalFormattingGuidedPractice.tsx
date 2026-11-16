'use client';

import { useState } from 'react';
import { ChevronRight, ChevronLeft, Lightbulb, Palette } from 'lucide-react';

const dataSiswa = [
  { no: 1, nama: 'Budi', nilai: 85, status: 'Lulus' },
  { no: 2, nama: 'Andi', nilai: 60, status: 'Gagal' },
  { no: 3, nama: 'Siti', nilai: 90, status: 'Lulus' },
  { no: 4, nama: 'Citra', nilai: 70, status: 'Lulus' },
  { no: 5, nama: 'Dewi', nilai: 50, status: 'Gagal' },
  { no: 6, nama: 'Eko', nilai: 75, status: 'Lulus' },
  { no: 7, nama: 'Fani', nilai: 95, status: 'Lulus' },
  { no: 8, nama: 'Gilang', nilai: 65, status: 'Gagal' },
  { no: 9, nama: 'Hana', nilai: 80, status: 'Lulus' },
  { no: 10, nama: 'Indra', nilai: 55, status: 'Gagal' },
];

export default function ConditionalFormattingGuidedPractice() {
  const [step, setStep] = useState(0);
  const [selectedRange, setSelectedRange] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<string>('');
  const [isFormatted, setIsFormatted] = useState(false);

  const steps = [
    {
      title: 'Langkah 1: Pilih Range Data',
      instruction: 'Blok kolom **Nilai** mulai dari cell **C2** sampai **C11**. Klik tombol di bawah untuk simulasi blok.',
      hint: 'Klik tombol "Blok C2:C11" di bawah.',
      validate: () => selectedRange === 'C2:C11',
    },
    {
      title: 'Langkah 2: Buka Menu Home',
      instruction: 'Setelah data diblok, klik tab **Home** di Ribbon Excel.',
      hint: 'Klik tab Home di bagian atas.',
      validate: () => isMenuOpen,
    },
    {
      title: 'Langkah 3: Pilih Conditional Formatting',
      instruction: 'Di grup Styles, klik **Conditional Formatting** > **Highlight Cells Rules** > **Less Than**.',
      hint: 'Pilih menu Conditional Formatting di toolbar.',
      validate: () => selectedRule === 'less-than',
    },
    {
      title: 'Langkah 4: Masukkan Kriteria',
      instruction: 'Isi nilai **75** pada kolom input, lalu pilih format warna **Light Red Fill with Dark Red Text**. Klik OK.',
      hint: 'Klik tombol "Terapkan Format Merah" di bawah.',
      validate: () => isFormatted,
    },
    {
      title: 'Selesai! 🎉',
      instruction: 'Hebat! Sekarang semua nilai di bawah 75 otomatis berwarna merah. Conditional Formatting bekerja secara dinamis: jika nilai diubah, warnanya akan berubah otomatis.',
      hint: 'Lihat tabel di kanan.',
      validate: () => true,
    },
  ];

  const current = steps[step];

  const handleNext = () => {
    if (current.validate() && step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handleReset = () => {
    setStep(0);
    setSelectedRange('');
    setIsMenuOpen(false);
    setSelectedRule('');
    setIsFormatted(false);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6 items-start">
      {/* Panel Tutorial */}
      <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 flex flex-col min-h-[500px]">
        <div className="flex items-center justify-between mb-4 border-b-2 border-ink pb-4">
          <div>
            <span className="bg-yellow border-2 border-ink rounded-full px-3 py-1 text-xs font-black shadow-neo-sm">
              Langkah {step + 1} dari {steps.length}
            </span>
            <h2 className="text-2xl font-black mt-2">{current.title}</h2>
          </div>
          <button onClick={handleReset} className="text-gray-500 hover:text-red-500">
            <Palette size={20} />
          </button>
        </div>
        <div className="flex-1">
          <p 
            className="text-lg leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: current.instruction.replace(/\*\*(.*?)\*\*/g, '<strong class="bg-blue px-1 border border-ink rounded">$1</strong>') }}
          />
          <div className="bg-yellow border-2 border-ink rounded-xl p-3 shadow-neo-sm flex gap-3 items-start">
            <Lightbulb size={24} className="shrink-0 text-ink" />
            <p className="text-sm font-bold">{current.hint}</p>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t-2 border-ink flex justify-between">
          <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} className="flex items-center gap-2 font-bold disabled:opacity-50">
            <ChevronLeft size={18} /> Sebelumnya
          </button>
          {current.validate() ? (
            <button onClick={handleNext} disabled={step === steps.length - 1} className="bg-mint border-2 border-ink rounded-xl px-4 py-2 font-bold shadow-neo-sm hover:bg-gray-50 disabled:opacity-50 flex items-center gap-2">
              {step === steps.length - 1 ? 'Selesai! 🎉' : 'Lanjut'} <ChevronRight size={18} />
            </button>
          ) : (
            <div className="text-sm font-bold text-gray-500 bg-gray-100 px-4 py-2 rounded-xl border-2 border-dashed">
              Lakukan instruksi dulu...
            </div>
          )}
        </div>
      </div>

      {/* Panel Spreadsheet */}
      <div className="border-2 border-ink rounded-xl overflow-hidden bg-white shadow-neo flex flex-col h-[500px]">
        <div className="bg-green-700 text-white text-xs font-bold px-3 py-1">Book1 - Excel</div>
        
        {/* Tabs Menu */}
        <div className="bg-gray-100 border-b-2 border-gray-300 flex text-xs font-bold pt-2 px-2 gap-1">
          <button 
            onClick={() => { setIsMenuOpen(true); if (step === 0 && selectedRange === 'C2:C11') setStep(1); }}
            className={`px-3 py-1 rounded-t ${isMenuOpen ? 'bg-white border-t-2 border-l-2 border-r-2 border-green-600 text-green-700' : 'text-gray-600'}`}
          >
            Home
          </button>
          <span className="px-3 py-1 text-gray-600">Insert</span>
          <span className="px-3 py-1 text-gray-600">Data</span>
        </div>

        {/* Toolbar Home */}
        {isMenuOpen && step >= 1 && (
          <div className="bg-gray-50 border-b-2 p-2 flex gap-2">
            <button 
              onClick={() => { setSelectedRule('less-than'); if (step === 1) setStep(2); }}
              className={`flex items-center gap-1 px-3 py-1 border rounded font-bold ${selectedRule === 'less-than' ? 'bg-green-100 border-green-500' : 'bg-white'}`}
            >
              <Palette size={14} /> Conditional Formatting
            </button>
          </div>
        )}

        {/* Formula Bar */}
        <div className="flex border-b-2 border-gray-300 text-xs bg-white">
          <div className="w-16 border-r-2 border-gray-300 flex items-center justify-center font-bold bg-gray-100">
            {selectedRange || 'A1'}
          </div>
          <div className="px-2 font-bold text-gray-500 flex items-center border-r-2 border-gray-300">fx</div>
          <div className="flex-1 px-2 py-1 font-mono text-gray-600">{selectedRange ? 'Range terpilih' : ''}</div>
        </div>

        {/* Panel Aksi */}
        <div className="p-3 bg-blue-50 border-b-2 border-ink">
          {step === 0 && (
            <button onClick={() => setSelectedRange('C2:C11')} className={`px-3 py-1 border-2 border-ink rounded font-bold ${selectedRange === 'C2:C11' ? 'bg-green-500 text-white' : 'bg-white'}`}>
              {selectedRange === 'C2:C11' ? '✅ C2:C11 Terblok' : 'Blok C2:C11'}
            </button>
          )}
          {step === 3 && (
            <button onClick={() => { setIsFormatted(true); setStep(4); }} className="px-3 py-1 border-2 border-ink rounded font-bold bg-red-100">
              Terapkan Format Merah untuk Nilai &lt; 75
            </button>
          )}
        </div>

        {/* Grid Spreadsheet */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-xs border-collapse">
            <thead className="bg-gray-200 sticky top-0">
              <tr>
                <th className="border p-1 w-8"></th>
                <th className="border p-1">A (No)</th>
                <th className="border p-1">B (Nama)</th>
                <th className="border p-1">C (Nilai)</th>
                <th className="border p-1">D (Status)</th>
              </tr>
            </thead>
            <tbody>
              {dataSiswa.map((row) => (
                <tr key={row.no}>
                  <td className="bg-gray-100 border p-1 text-center font-bold">{row.no + 1}</td>
                  <td className="border p-1 text-center">{row.no}</td>
                  <td className="border p-1">{row.nama}</td>
                  <td className={`border p-1 text-center ${selectedRange === 'C2:C11' ? 'bg-blue-100' : ''} ${isFormatted && row.nilai < 75 ? 'bg-red-100 text-red-700 font-bold' : ''}`}>
                    {row.nilai}
                  </td>
                  <td className="border p-1 text-center">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}