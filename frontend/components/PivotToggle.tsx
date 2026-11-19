'use client';

import { useState } from 'react';
import PivotTutorial from './PivotTutorial';
import PivotChartVisual from './PivotChartVisual';

export default function PivotToggle() {
  const [activeTab, setActiveTab] = useState<'table' | 'chart'>('table');

  return (
    <div className="space-y-6">
      {/* TOMBOL TOGGLE UTAMA */}
      <div className="flex justify-center">
        <div className="inline-flex bg-gray-200 border-2 border-ink rounded-xl p-1 shadow-neo">
          <button
            onClick={() => setActiveTab('table')}
            className={`px-6 py-2 rounded-lg font-bold transition-all ${activeTab === 'table' ? 'bg-white shadow-sm text-ink' : 'text-gray-500 hover:text-ink'}`}
          >
            PivotTable
          </button>
          <button
            onClick={() => setActiveTab('chart')}
            className={`px-6 py-2 rounded-lg font-bold transition-all ${activeTab === 'chart' ? 'bg-white shadow-sm text-ink' : 'text-gray-500 hover:text-ink'}`}
          >
            PivotChart
          </button>
        </div>
      </div>

      {/* KONTEN */}
      <div>
        {activeTab === 'table' ? (
          // PivotTable: sama persis seperti sebelumnya
          <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6 md:p-8">
            <PivotTutorial />
          </div>
        ) : (
          // PivotChart: tutorial bergambar (pivot1.png - pivot4.png)
          <PivotChartVisual />
        )}
      </div>
    </div>
  );
}