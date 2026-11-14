'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, BookA } from 'lucide-react';
import Card from '@/components/ui/Card';

const api = axios.create({ baseURL: 'http://127.0.0.1:8000/api' });

export default function KamusPage() {
  const [formulas, setFormulas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/formulas')
      .then(res => {
        setFormulas(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Gagal mengambil data kamus:", err);
        setLoading(false);
      });
  }, []);

  const filteredFormulas = formulas.filter(f => 
    f.name.toLowerCase().includes(search.toLowerCase()) || 
    f.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-20">
      <div className="bg-blue border-2 border-ink rounded-2xl shadow-neo p-10 text-center">
        <h1 className="text-4xl font-black mb-2 flex items-center justify-center gap-2">
          <BookA size={40} /> Kamus Rumus Excel
        </h1>
        <p className="text-lg">Cari dan pelajari rumus Excel dengan cepat.</p>
      </div>

      <div className="flex items-center bg-white border-2 border-ink rounded-xl px-4 py-3 shadow-neo max-w-2xl mx-auto">
        <Search className="text-gray-500 mr-2" />
        <input 
          type="text" 
          placeholder="Cari rumus (misal: SUM, IF, VLOOKUP)..." 
          className="w-full outline-none bg-transparent font-bold text-ink"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center font-bold py-10 animate-pulse">Memuat kamus rumus...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFormulas.map((formula) => (
            <Card key={formula.id} className="flex flex-col justify-between hover:-translate-y-1 transition-transform">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-yellow border-2 border-ink rounded-lg px-3 py-1 text-sm font-black shadow-neo-sm">
                    {formula.name}
                  </span>
                  <span className="bg-lavender border-2 border-ink rounded-lg px-2 py-0.5 text-xs font-bold shadow-neo-sm">
                    {formula.category}
                  </span>
                </div>
                <p className="text-gray-700 text-sm mb-4 mt-2">{formula.description}</p>
                <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-2 font-mono text-xs text-blue-700 mb-4 overflow-x-auto">
                  {formula.syntax}
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                <strong>Versi:</strong> {formula.excel_versions || 'Semua versi'}
              </div>
            </Card>
          ))}
        </div>
      )}

      {!loading && filteredFormulas.length === 0 && (
        <div className="text-center bg-pink border-2 border-ink rounded-xl shadow-neo p-10 max-w-2xl mx-auto">
          <p className="text-xl font-bold">Rumus tidak ditemukan.</p>
        </div>
      )}
    </div>
  );
}