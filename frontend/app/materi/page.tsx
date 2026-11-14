'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Search, ChevronRight, BookOpen } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const api = axios.create({ baseURL: 'http://127.0.0.1:8000/api' });

export default function MateriPage() {
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/lessons')
      .then(res => {
        setLessons(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredLessons = lessons.filter(l => 
    l.title.toLowerCase().includes(search.toLowerCase())
  );

  // Kelompokkan materi berdasarkan kategori
  const groupedLessons: Record<string, any[]> = {};
  filteredLessons.forEach(lesson => {
    const catName = lesson.category?.name || 'Lainnya';
    if (!groupedLessons[catName]) groupedLessons[catName] = [];
    groupedLessons[catName].push(lesson);
  });

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="bg-lavender border-2 border-ink rounded-2xl shadow-neo p-10 text-center">
        <h1 className="text-4xl font-black mb-2">Kurikulum ExcelMate</h1>
        <p className="text-lg">18 Materi terstruktur dari pemula hingga mahir.</p>
      </div>

      {/* Search Bar */}
      <div className="flex items-center bg-white border-2 border-ink rounded-xl px-4 py-3 shadow-neo max-w-2xl mx-auto">
        <Search className="text-gray-500 mr-2" />
        <input 
          type="text" 
          placeholder="Cari materi (misal: SUM)..." 
          className="w-full outline-none bg-transparent font-bold text-ink"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* List Materi per Kategori */}
      {loading ? (
        <div className="text-center font-bold py-10 animate-pulse">Memuat kurikulum...</div>
      ) : (
        <div className="space-y-12">
          {Object.entries(groupedLessons).map(([categoryName, catLessons]) => (
            <section key={categoryName}>
              <div className="flex items-center gap-2 mb-6 border-b-2 border-ink/10 pb-2">
                <BookOpen className="text-ink" />
                <h2 className="text-2xl font-black text-ink">{categoryName}</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {catLessons.map((lesson) => (
                  <Card key={lesson.id} className="flex flex-col justify-between hover:-translate-y-1 transition-transform">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="bg-yellow border-2 border-ink rounded-lg px-2 py-0.5 text-xs font-bold shadow-neo-sm">
                          Materi #{lesson.order}
                        </span>
                        <span className="bg-mint border-2 border-ink rounded-lg px-2 py-0.5 text-xs font-bold shadow-neo-sm">
                          {lesson.level?.name}
                        </span>
                      </div>
                      <h3 className="text-xl font-black mb-2">{lesson.title}</h3>
                      <p className="text-gray-700 text-sm mb-4 line-clamp-2">{lesson.intro}</p>
                    </div>
                    <Link href={`/materi/${lesson.slug}`}>
                      <Button variant="blue" className="w-full flex justify-center items-center gap-2 py-2">
                        Mulai Belajar <ChevronRight size={16} />
                      </Button>
                    </Link>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {!loading && filteredLessons.length === 0 && (
        <div className="text-center bg-pink border-2 border-ink rounded-xl shadow-neo p-10">
          <p className="text-xl font-bold">Materi tidak ditemukan.</p>
        </div>
      )}
    </div>
  );
}