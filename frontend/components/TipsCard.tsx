'use client';

import { useState } from 'react';
import { Lightbulb, ChevronDown, ChevronUp, Keyboard, Zap } from 'lucide-react';

export default function TipsCard({ tips }: { tips: any[] }) {
  const [openTip, setOpenTip] = useState<number | null>(null);

  if (!tips || tips.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-black text-ink flex items-center gap-2">
        <Zap size={28} className="text-yellow-600" /> Tips Cepat Excel
      </h3>
      
      {tips.map((tip, index) => (
        <div 
          key={tip.id} 
          className="bg-yellow-50 border-2 border-ink rounded-xl shadow-neo overflow-hidden"
        >
          <button 
            onClick={() => setOpenTip(openTip === index ? null : index)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-yellow-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="bg-yellow border-2 border-ink rounded-lg p-2">
                <Lightbulb size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase">{tip.category}</p>
                <h4 className="font-black text-lg">{tip.title}</h4>
              </div>
            </div>
            {openTip === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>

          {openTip === index && (
            <div className="p-4 pt-0 border-t-2 border-dashed border-yellow-300 space-y-4">
              <p className="text-gray-700">{tip.short_description}</p>
              
              {tip.shortcut && (
                <div className="bg-white border-2 border-ink rounded-lg p-3 flex items-center gap-2">
                  <Keyboard size={18} className="text-gray-600" />
                  <span className="text-xs font-bold text-gray-500">SHORTCUT WINDOWS:</span>
                  <code className="bg-gray-800 text-mint px-3 py-1 rounded font-mono font-bold">
                    {tip.shortcut}
                  </code>
                </div>
              )}

              <div>
                <p className="font-bold mb-2 text-sm">Cara menggunakannya:</p>
                <ol className="list-decimal list-inside space-y-1 text-sm bg-white p-3 rounded-lg border border-gray-300">
                  {tip.steps?.map((step: string, i: number) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>

              {tip.example && (
                <div className="bg-white border border-gray-300 rounded-lg p-3">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-1">Contoh:</p>
                  <p className="font-mono text-sm">{tip.example}</p>
                </div>
              )}

              {tip.result && (
                <div className="bg-mint border-2 border-ink rounded-lg p-3">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-1">Hasil:</p>
                  <p className="font-bold">{tip.result}</p>
                </div>
              )}
              
              <p className="text-[10px] text-gray-500 italic">*Shortcut untuk Excel Desktop Windows.</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}