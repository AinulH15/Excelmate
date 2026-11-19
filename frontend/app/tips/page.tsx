'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, Zap, Lightbulb, Keyboard } from 'lucide-react';
import Card from '@/components/ui/Card';

import api from "@/lib/api";

export default function TipsPage() {
  const [tips, setTips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Ambil tips dari semua materi
    api.get('/lessons').then(res => {
      const lessons = res.data.data;
      const allTips: any[] = [];
      
      Promise.all(lessons.map((l: any) => 
        api.get(`/lessons/${l.slug}/tips`).then(r => {
          r.data.data.forEach((tip: any) => {
            allTips.push({ ...tip, lessonTitle: l.title, lessonSlug: l.slug });
          });
        })
      )).then(() => {
        setTips(allTips);
        setLoading(false);
      });
    }).catch(() => setLoading(false));
  }, []);

  const filteredTips = tips.filter(t => 
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.short_description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-20">
      <div className="bg-yellow border-2 border-ink rounded-2xl shadow-neo p-10 text-center">
        <h1 className="text-4xl font-black mb-2 flex items-center justify-center gap-2">
          <Zap size={40} /> Tips & Trik Cepat Excel
        </h1>
        <p className="text-lg">Kumpulan trik hemat waktu untuk bekerja lebih cepat di Excel.</p>
      </div>

      <div className="flex items-center bg-white border-2 border-ink rounded-xl px-4 py-3 shadow-neo max-w-2xl mx-auto">
        <Search className="text-gray-500 mr-2" />
        <input 
          type="text" 
          placeholder="Cari tips (misal: AutoSum, Ctrl+T)..." 
          className="w-full outline-none bg-transparent font-bold text-ink"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center font-bold py-10 animate-pulse">Memuat tips...</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredTips.map((tip) => (
            <Card key={tip.id} className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-yellow border-2 border-ink rounded-lg px-2 py-0.5 text-xs font-bold">
                  {tip.category}
                </span>
                <span className="text-xs text-gray-500">{tip.lessonTitle}</span>
              </div>
              <h3 className="text-xl font-black mb-2">{tip.title}</h3>
              <p className="text-sm text-gray-700 mb-4">{tip.short_description}</p>
              
              {tip.shortcut && (
                <div className="bg-gray-800 text-mint rounded-lg p-2 mb-4 flex items-center gap-2">
                  <Keyboard size={16} />
                  <code className="font-mono font-bold">{tip.shortcut}</code>
                </div>
              )}

              <div className="mt-auto">
                <p className="text-xs font-bold text-gray-500 mb-2">Langkah:</p>
                <ol className="list-decimal list-inside text-sm space-y-1">
                  {tip.steps?.slice(0, 3).map((step: string, i: number) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
            </Card>
          ))}
        </div>
      )}

      {!loading && filteredTips.length === 0 && (
        <div className="text-center bg-pink border-2 border-ink rounded-xl shadow-neo p-10 max-w-2xl mx-auto">
          <p className="text-xl font-bold">Tips tidak ditemukan.</p>
        </div>
      )}
    </div>
  );
}