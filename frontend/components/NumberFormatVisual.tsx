'use client';

import ExcelRibbonVisual from './ExcelRibbonVisual';
import { Info } from 'lucide-react';

export default function NumberFormatVisual() {
  return (
    <div className="space-y-6">
      {/* Visual Excel Tiruan */}
      <ExcelRibbonVisual />

      {/* Penjelasan Tambahan */}
      <div className="bg-blue border-2 border-ink rounded-xl p-4 shadow-neo-sm flex gap-3 items-start">
        <Info size={24} className="shrink-0 text-blue-800 mt-1" />
        <div className="text-sm">
          <p className="font-black text-lg mb-1">Coba Sendiri!</p>
          <p>Klik kotak dropdown yang bertuliskan <strong>General</strong> di bagian <strong>Number</strong> pada visual di atas, lalu pilih format lain (Currency, Percentage, atau Short Date). Lihat bagaimana angka di cell A1 berubah tampilannya tanpa mengubah nilai aslinya (1000).</p>
        </div>
      </div>
    </div>
  );
}