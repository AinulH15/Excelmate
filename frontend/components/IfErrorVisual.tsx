'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

const errorDetails: Record<string, { title: string; desc: string }> = {
  '#N/A': {
    title: 'Error #N/A (Not Available)',
    desc: 'Excel tidak bisa menemukan nilai yang kamu cari. Sering terjadi saat memakai VLOOKUP/HLOOKUP karena data tidak ada di tabel referensi.',
  },
  '#DIV/0!': {
    title: 'Error #DIV/0! (Division by Zero)',
    desc: 'Kamu mencoba membagi angka dengan nol atau dengan cell kosong. Pastikan penyebut tidak berisi 0 atau kosong.',
  },
  '#VALUE!': {
    title: 'Error #VALUE! (Wrong Value Type)',
    desc: 'Tipe datanya salah. Contoh: menjumlahkan teks dengan angka, atau menggunakan operator matematika pada data teks.',
  },
};

export default function IfErrorVisual() {
  const [showError, setShowError] = useState(true);
  const [selectedError, setSelectedError] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
        <h3 className="text-xl font-black mb-4 text-center">Visualisasi IFERROR</h3>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => { setShowError(true); setSelectedError(null); }}
            className={`p-4 border-2 border-ink rounded-xl font-bold text-left transition-all ${showError ? 'bg-red-100 shadow-neo' : 'bg-white'}`}
          >
            <AlertCircle className="mb-2" />
            <p className="font-bold">Tanpa IFERROR</p>
            <p className="text-sm">Menampilkan pesan error</p>
          </button>
          <button
            onClick={() => { setShowError(false); setSelectedError(null); }}
            className={`p-4 border-2 border-ink rounded-xl font-bold text-left transition-all ${!showError ? 'bg-green-100 shadow-neo' : 'bg-white'}`}
          >
            <CheckCircle2 className="mb-2" />
            <p className="font-bold">Dengan IFERROR</p>
            <p className="text-sm">Menampilkan nilai alternatif</p>
          </button>
        </div>

        <div className="border-2 border-ink rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-200 border-b-2 border-ink font-bold">
              <tr>
                <th className="p-3 border-r-2 border-ink text-center">Nama</th>
                <th className="p-3 border-r-2 border-ink text-center">Nilai</th>
                <th className="p-3 text-center">Hasil</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b-2 border-ink bg-white hover:bg-gray-50 transition-colors">
                <td className="p-3 border-r-2 border-ink text-center">Budi</td>
                <td className="p-3 border-r-2 border-ink text-center">80</td>
                <td className="p-3 text-center">
                  {showError ? (
                    <button
                      onClick={() => setSelectedError('#N/A')}
                      className={`font-mono font-bold px-3 py-1 rounded border-2 transition-all ${
                        selectedError === '#N/A' ? 'bg-red-200 border-ink' : 'border-transparent text-red-600 hover:border-ink'
                      }`}
                    >
                      #N/A
                    </button>
                  ) : (
                    <span className="text-green-600 font-bold">Lulus</span>
                  )}
                </td>
              </tr>
              <tr className="border-b-2 border-ink bg-white hover:bg-gray-50 transition-colors">
                <td className="p-3 border-r-2 border-ink text-center">Andi</td>
                <td className="p-3 border-r-2 border-ink text-center">0</td>
                <td className="p-3 text-center">
                  {showError ? (
                    <button
                      onClick={() => setSelectedError('#DIV/0!')}
                      className={`font-mono font-bold px-3 py-1 rounded border-2 transition-all ${
                        selectedError === '#DIV/0!' ? 'bg-red-200 border-ink' : 'border-transparent text-red-600 hover:border-ink'
                      }`}
                    >
                      #DIV/0!
                    </button>
                  ) : (
                    <span className="text-green-600 font-bold">Tidak Ada</span>
                  )}
                </td>
              </tr>
              <tr className="bg-white hover:bg-gray-50 transition-colors">
                <td className="p-3 border-r-2 border-ink text-center">Siti</td>
                <td className="p-3 border-r-2 border-ink text-center">Teks</td>
                <td className="p-3 text-center">
                  {showError ? (
                    <button
                      onClick={() => setSelectedError('#VALUE!')}
                      className={`font-mono font-bold px-3 py-1 rounded border-2 transition-all ${
                        selectedError === '#VALUE!' ? 'bg-red-200 border-ink' : 'border-transparent text-red-600 hover:border-ink'
                      }`}
                    >
                      #VALUE!
                    </button>
                  ) : (
                    <span className="text-green-600 font-bold">Data Salah</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="min-h-[100px] mt-4">
          {selectedError && showError ? (
            <div className="bg-yellow border-2 border-ink rounded-xl p-4 shadow-neo animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-start gap-3">
                <Info className="shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-lg">{errorDetails[selectedError].title}</h4>
                  <p className="text-sm mt-1">{errorDetails[selectedError].desc}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-4 text-center text-gray-500 font-bold flex items-center justify-center h-full">
              {showError
                ? 'Klik salah satu kode error (merah) di atas untuk melihat penjelasannya.'
                : 'Dengan IFERROR, pesan error diganti dengan nilai alternatif.'}
            </div>
          )}
        </div>

        <div className="mt-4 bg-yellow border-2 border-ink rounded-xl p-3">
          <p className="text-sm font-bold">💡 IFERROR(rumus, "Nilai Alternatif")</p>
        </div>
      </div>
    </div>
  );
}