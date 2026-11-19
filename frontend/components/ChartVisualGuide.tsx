'use client';

import { useState } from 'react';
import { PieChart, LineChart, ChevronRight, ChevronLeft } from 'lucide-react';

const PIE_STEPS = [
  {
    id: 1,
    title: "Proses Membuat Pie Chart",
    color: "bg-blue",
    content: (
      <div className="space-y-4 animate-in fade-in duration-300">
        <p className="text-gray-700 leading-relaxed">
          Langkah pertama, blok data yang ingin dijadikan grafik. Lalu buka tab <strong>INSERT</strong>. Pada gambar di bawah ini, mouse mengarah ke ikon Pie Chart (grafik lingkaran) untuk membuka pilihan gaya grafik.
        </p>
        <div className="border-2 border-ink rounded-xl overflow-hidden shadow-neo">
          <img src="/chart1.png" alt="Proses Membuat Pie Chart" className="w-full h-auto" />
        </div>
        <div className="bg-yellow border-2 border-ink rounded-xl p-4">
          <p className="font-bold text-sm mb-1">💡 Nama Fitur: Insert Pie Chart</p>
          <p className="text-sm">Fitur ini digunakan untuk menampilkan proporsi data dalam bentuk potongan lingkaran (persentase).</p>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Hasil Pie Chart",
    color: "bg-mint",
    content: (
      <div className="space-y-4 animate-in fade-in duration-300">
        <p className="text-gray-700 leading-relaxed">
          Setelah kamu memilih salah satu gaya pada menu Pie Chart sebelumnya, Excel akan langsung menggambar grafik tersebut di worksheet-mu. Inilah hasilnya.
        </p>
        <div className="border-2 border-ink rounded-xl overflow-hidden shadow-neo">
          <img src="/chart2.png" alt="Hasil Pie Chart" className="w-full h-auto" />
        </div>
        <div className="bg-blue border-2 border-ink rounded-xl p-4">
          <p className="font-bold text-sm mb-1">💡 Hasil:</p>
          <p className="text-sm">Grafik pie akan muncul dengan legenda warna yang mewakili setiap kategori data.</p>
        </div>
      </div>
    )
  }
];

const LINE_STEPS = [
  {
    id: 1,
    title: "Proses Membuat Line Chart",
    color: "bg-pink",
    content: (
      <div className="space-y-4 animate-in fade-in duration-300">
        <p className="text-gray-700 leading-relaxed">
          Jika kamu ingin membuat grafik dengan tipe yang berbeda, kamu tetap menggunakan data yang sama. Buka tab <strong>INSERT</strong>, lalu arahkan mouse ke ikon Line Chart (grafik garis) seperti pada gambar berikut.
        </p>
        <div className="border-2 border-ink rounded-xl overflow-hidden shadow-neo">
          <img src="/grafik1.png" alt="Proses Membuat Line Chart" className="w-full h-auto" />
        </div>
        <div className="bg-yellow border-2 border-ink rounded-xl p-4">
          <p className="font-bold text-sm mb-1">💡 Nama Fitur: Insert Line Chart</p>
          <p className="text-sm">Grafik garis sangat cocok untuk menunjukkan tren data dari waktu ke waktu.</p>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Hasil Line Chart & Pengaturan Data",
    color: "bg-lavender",
    content: (
      <div className="space-y-4 animate-in fade-in duration-300">
        <p className="text-gray-700 leading-relaxed">
          Setelah grafik (Line Chart) jadi, kamu bisa mengatur ulang sumber datanya jika ada yang salah. Caranya, klik pada grafik, buka tab <strong>CHART DESIGN</strong>, lalu pilih <strong>Select Data</strong>.
        </p>
        <div className="border-2 border-ink rounded-xl overflow-hidden shadow-neo">
          <img src="/grafik2.png" alt="Hasil Line Chart dan Select Data" className="w-full h-auto" />
        </div>
        <div className="bg-mint border-2 border-ink rounded-xl p-4">
          <p className="font-bold text-sm mb-1">💡 Fitur Select Data:</p>
          <p className="text-sm">Jendela ini memungkinkanmu menambahkan atau menghapus seri data agar grafik lebih akurat.</p>
        </div>
      </div>
    )
  }
];

export default function ChartVisualGuide() {
  const [activeTab, setActiveTab] = useState<'pie' | 'line'>('pie');
  
  // State untuk navigasi di dalam tab
  const [pieStep, setPieStep] = useState(0);
  const [lineStep, setLineStep] = useState(0);

  const currentSteps = activeTab === 'pie' ? PIE_STEPS : LINE_STEPS;
  const currentStepIndex = activeTab === 'pie' ? pieStep : lineStep;

  const handleNext = () => {
    if (activeTab === 'pie' && pieStep < PIE_STEPS.length - 1) setPieStep(pieStep + 1);
    if (activeTab === 'line' && lineStep < LINE_STEPS.length - 1) setLineStep(lineStep + 1);
  };

  const handlePrev = () => {
    if (activeTab === 'pie' && pieStep > 0) setPieStep(pieStep - 1);
    if (activeTab === 'line' && lineStep > 0) setLineStep(lineStep - 1);
  };

  const stepData = currentSteps[currentStepIndex];
  const isLastStep = currentStepIndex === currentSteps.length - 1;

  return (
    <div className="bg-white border-2 border-ink rounded-2xl shadow-neo overflow-hidden font-sans flex flex-col h-full min-h-[500px]">
      {/* Toggle Tab */}
      <div className="flex border-b-2 border-ink bg-gray-50 shrink-0">
        <button
          onClick={() => setActiveTab('pie')}
          className={`flex-1 flex items-center justify-center gap-2 py-4 font-black transition-colors ${
            activeTab === 'pie' 
              ? 'bg-white text-ink border-b-4 border-green-600' 
              : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          <PieChart size={20} /> Grafik Pie (Lingkaran)
        </button>
        <button
          onClick={() => setActiveTab('line')}
          className={`flex-1 flex items-center justify-center gap-2 py-4 font-black transition-colors ${
            activeTab === 'line' 
              ? 'bg-white text-ink border-b-4 border-pink-500' 
              : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          <LineChart size={20} /> Grafik Line (Garis)
        </button>
      </div>

      {/* Header Step */}
      <div className="p-4 md:p-6 border-b-2 border-ink bg-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <span className={`${stepData.color} border-2 border-ink rounded-lg px-3 py-1 font-black text-lg shadow-neo-sm`}>
            {stepData.id}
          </span>
          <h3 className="text-xl md:text-2xl font-black">{stepData.title}</h3>
        </div>
        <span className="text-sm font-bold text-gray-500 bg-gray-50 border border-gray-300 px-3 py-1 rounded-full">
          Langkah {stepData.id} dari {currentSteps.length}
        </span>
      </div>

      {/* Konten Step */}
      <div className="p-6 md:p-8 flex-1">
        {stepData.content}
      </div>

      {/* Navigasi Bawah */}
      <div className="p-4 border-t-2 border-ink flex items-center justify-between bg-white rounded-b-2xl shrink-0">
        <button 
          onClick={handlePrev} 
          disabled={currentStepIndex === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold border-2 border-ink shadow-neo transition-all
            ${currentStepIndex === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50' : 'bg-white text-ink hover:bg-gray-50'}`}
        >
          <ChevronLeft size={18} /> Kembali
        </button>

        <button 
          onClick={handleNext} 
          disabled={isLastStep}
          className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold border-2 border-ink shadow-neo transition-all
            ${isLastStep ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50' : 'bg-mint text-ink hover:bg-green-200'}`}
        >
          {isLastStep ? 'Selesai' : 'Lanjut'} <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}