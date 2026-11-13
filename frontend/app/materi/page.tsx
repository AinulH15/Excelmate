'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Search, ChevronRight } from 'lucide-react';
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
        console.error("Gagal mengambil data:", err);
        setLoading(false);
      });
  }, []);

  const filteredLessons = lessons.filter(l => 
    l.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="bg-lavender border-2 border-ink rounded-2xl shadow-neo p-8 text-center">
        <h1 className="text-4xl font-black mb-2">Jelajahi Materi Excel</h1>
        <p className="text-lg">Pilih materi yang ingin kamu pelajari hari ini.</p>
      </div>

      <div className="flex items-center bg-white border-2 border-ink rounded-xl px-4 py-3 shadow-neo">
        <Search className="text-gray-500 mr-2" />
        <input 
          type="text" 
          placeholder="Cari materi (misal: SUM)..." 
          className="w-full outline-none bg-transparent font-bold text-ink"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center font-bold py-10 animate-pulse">Memuat materi dari database...</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredLessons.map((lesson) => (
            <Card key={lesson.id} className="flex flex-col justify-between hover:-translate-y-1 transition-transform">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-blue border-2 border-ink rounded-lg px-3 py-1 text-sm font-bold shadow-neo-sm">
                    {lesson.category?.name || 'Umum'}
                  </span>
                </div>
                <h2 className="text-2xl font-black mb-2">{lesson.title}</h2>
                <p className="text-gray-700 mb-6">{lesson.intro}</p>
              </div>
              <Link href={`/materi/${lesson.slug}`}>
                <Button variant="mint" className="w-full flex justify-center items-center gap-2">
                  Mulai Belajar <ChevronRight size={18} />
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      )}

      {!loading && filteredLessons.length === 0 && (
        <div className="text-center bg-pink border-2 border-ink rounded-xl shadow-neo p-10">
          <p className="text-xl font-bold">Materi tidak ditemukan atau database kosong.</p>
        </div>
      )}
    </div>
  );
}