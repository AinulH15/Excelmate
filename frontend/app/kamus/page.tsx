'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Search, BookA, ChevronRight, X, BookOpen } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import SpreadsheetVisual from '@/components/SpreadsheetVisual';
import { formulaToLessonSlug } from '@/lib/formulaMapping';

const api = axios.create({ baseURL: 'http://127.0.0.1:8000/api' });

export default function KamusPage() {
  const [formulas, setFormulas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedFormula, setSelectedFormula] = useState<any>(null);

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

  useEffect(() => {
    if (selectedFormula) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedFormula]);

  return (
    <div className="space-y-8 pb-20 relative">
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
            <div key={formula.id} onClick={() => setSelectedFormula(formula)} className="cursor-pointer">
              <Card className="flex flex-col justify-between hover:-translate-y-1 transition-all h-full border-b-4 border-r-4 border-b-ink border-r-ink active:border-b-0 active:border-r-0 active:translate-y-1 active:translate-x-1">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-yellow border-2 border-ink rounded-lg px-3 py-1 text-sm font-black shadow-neo-sm">
                      {formula.name}
                    </span>
                    <span className="bg-lavender border-2 border-ink rounded-lg px-2 py-0.5 text-xs font-bold shadow-neo-sm">
                      {formula.category}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm mb-4 mt-2 line-clamp-2">{formula.description}</p>
                  <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-2 font-mono text-xs text-blue-700 mb-4 overflow-hidden text-ellipsis whitespace-nowrap">
                    {formula.syntax}
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2 flex justify-between items-center">
                  <span><strong>Versi:</strong> {formula.excel_versions || 'Semua'}</span>
                  <span className="text-blue-600 font-bold flex items-center gap-1">Detail <ChevronRight size={14}/></span>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}

      {/* MODAL DETAIL */}
      {selectedFormula && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedFormula(null)}>
          <div className="bg-white border-2 border-ink rounded-2xl shadow-neo w-full max-w-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
            
            {/* Header Modal */}
            <div className="bg-yellow border-b-2 border-ink p-6 flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-black">{selectedFormula.name}</h2>
                <span className="bg-white border-2 border-ink rounded-md px-2 py-0.5 text-xs font-bold mt-2 inline-block shadow-sm">
                  {selectedFormula.category}
                </span>
              </div>
              <button onClick={() => setSelectedFormula(null)} className="bg-white border-2 border-ink rounded-full p-1 shadow-neo-sm hover:bg-pink active:shadow-none active:translate-y-0.5">
                <X size={20} />
              </button>
            </div>

            {/* Isi Modal */}
            <div className="p-6 space-y-4 overflow-y-auto max-h-[65vh]">
              <div>
                <h3 className="font-bold text-gray-500 text-sm mb-1 uppercase tracking-wide">Deskripsi</h3>
                <p className="text-lg">{selectedFormula.description}</p>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-500 text-sm mb-1 uppercase tracking-wide">Sintaks</h3>
                <div className="bg-gray-800 text-mint font-mono p-3 rounded-lg text-sm overflow-x-auto">
                  {selectedFormula.syntax}
                </div>
              </div>

              {selectedFormula.study_case && (
                <div>
                  <h3 className="font-bold text-gray-500 text-sm mb-2 uppercase tracking-wide">Studi Kasus</h3>
                  <p className="whitespace-pre-line text-sm mb-4">{selectedFormula.study_case}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Tabel Sebelum */}
                    {selectedFormula.case_table_before && (
                      <div>
                        <p className="text-xs font-bold text-gray-500 mb-1 flex items-center gap-1">
                          <span className="bg-gray-200 px-1 rounded">1</span> Data & Rumus
                        </p>
                        <SpreadsheetVisual 
                          data={selectedFormula.case_table_before}
                          highlightCells={selectedFormula.highlight_before || []}
                        />
                      </div>
                    )}

                    {/* Tabel Sesudah */}
                    {selectedFormula.case_table_after && (
                      <div>
                        <p className="text-xs font-bold text-gray-500 mb-1 flex items-center gap-1">
                          <span className="bg-green-200 px-1 rounded">2</span> Hasil Akhir
                        </p>
                        <SpreadsheetVisual 
                          data={selectedFormula.case_table_after}
                          highlightCells={selectedFormula.highlight_after || []}
                          showResult={selectedFormula.study_result}
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 bg-mint border-2 border-ink rounded-lg p-3 text-sm font-bold shadow-neo-sm">
                    💡 Kesimpulan: {selectedFormula.study_result}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Modal */}
            <div className="border-t-2 border-ink p-4 bg-cream flex justify-end gap-3">
              <Button variant="cream" onClick={() => setSelectedFormula(null)}>Tutup</Button>
              {formulaToLessonSlug[selectedFormula.name] ? (
                <Link href={`/materi/${formulaToLessonSlug[selectedFormula.name]}`}>
                  <Button variant="mint" className="flex items-center gap-2">
                    <BookOpen size={18} /> Pelajari Lebih Lanjut
                  </Button>
                </Link>
              ) : (
                <Button variant="cream" disabled className="flex items-center gap-2">
                  Materi belum tersedia
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}