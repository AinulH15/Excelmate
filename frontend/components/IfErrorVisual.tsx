'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function IfErrorVisual() {
  const [showError, setShowError] = useState(true);

  return (
    <div className="space-y-6">
      <div className="bg-white border-2 border-ink rounded-2xl shadow-neo p-6">
        <h3 className="text-xl font-black mb-4 text-center">Visualisasi IFERROR</h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <button 
            onClick={() => setShowError(true)}
            className={`p-4 border-2 border-ink rounded-xl font-bold text-left transition-all ${showError ? 'bg-red-100 shadow-neo' : 'bg-white'}`}
          >
            <AlertCircle className="mb-2" />
            <p className="font-bold">Tanpa IFERROR</p>
            <p className="text-sm">Menampilkan pesan error</p>
          </button>
          <button 
            onClick={() => setShowError(false)}
            className={`p-4 border-2 border-ink rounded-xl font-bold text-left transition-all ${!showError ? 'bg-green-100 shadow-neo' : 'bg-white'}`}
          >
            <CheckCircle2 className="mb-2" />
            <p className="font-bold">Dengan IFERROR</p>
            <p className="text-sm">Menampilkan nilai alternatif</p>
          </button>
        </div>

        <div className="border-2 border-ink rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Nama</th>
                <th className="border p-2">Nilai</th>
                <th className="border p-2">Hasil</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">Budi</td>
                <td className="border p-2 text-center">80</td>
                <td className="border p-2 text-center">{showError ? <span className="text-red-600 font-bold">#N/A</span> : <span className="text-green-600 font-bold">Lulus</span>}</td>
              </tr>
              <tr>
                <td className="border p-2">Andi</td>
                <td className="border p-2 text-center">0</td>
                <td className="border p-2 text-center">{showError ? <span className="text-red-600 font-bold">#DIV/0!</span> : <span className="text-green-600 font-bold">Tidak Ada</span>}</td>
              </tr>
              <tr>
                <td className="border p-2">Siti</td>
                <td className="border p-2 text-center">Teks</td>
                <td className="border p-2 text-center">{showError ? <span className="text-red-600 font-bold">#VALUE!</span> : <span className="text-green-600 font-bold">Data Salah</span>}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 bg-yellow border-2 border-ink rounded-xl p-3">
          <p className="text-sm font-bold">💡 IFERROR(rumus, "Nilai Alternatif")</p>
        </div>
      </div>
    </div>
  );
}