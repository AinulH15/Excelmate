'use client';

import { useState } from 'react';
import { ChevronDown, X, HelpCircle, Info, CheckCircle2 } from 'lucide-react';
import Button from './ui/Button';
import Card from './ui/Card';

// Data Mentah Toko ATK
const initialData: Record<string, string> = {
  'A1': 'No', 'B1': 'Tanggal', 'C1': 'Nama Produk', 'D1': 'Kategori', 'E1': 'Jumlah', 'F1': 'Harga Satuan', 'G1': 'Metode Pembayaran', 'H1': 'Status',
  'A2': '1', 'B2': '01/11/2026', 'C2': 'Pulpen', 'D2': 'Alat Tulis', 'E2': '5', 'F2': '3000', 'G2': 'Transfer', 'H2': 'Lunas',
  'A3': '2', 'B3': '02/11/2026', 'C3': 'Buku Tulis', 'D3': 'Buku', 'E3': '10', 'F3': '5000', 'G3': 'Tunai', 'H3': 'Lunas',
  'A4': '3', 'B4': '03/11/2026', 'C4': 'Penghapus', 'D4': 'Alat Tulis', 'E4': '3', 'F4': '2000', 'G4': 'QRIS', 'H4': 'Belum Lunas',
  'A5': '4', 'B5': '04/11/2026', 'C5': 'Pensil', 'D5': 'Alat Tulis', 'E5': '8', 'F5': '2500', 'G5': 'Tunai', 'H5': 'Lunas',
  'A6': '5', 'B6': '05/11/2026', 'C6': 'Map Plastik', 'D6': 'Perlengkapan', 'E6': '4', 'F6': '4000', 'G6': 'Transfer', 'H6': 'Lunas',
};

const productOptions = ['Pulpen', 'Buku Tulis', 'Penghapus', 'Pensil', 'Map Plastik'];

export default function DataValidationPractice() {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<Record<string, string>>(initialData);
  
  // State Interaksi
  const [activeCell, setActiveCell] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('Home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // State Form Data Validation
  const [allowOption, setAllowOption] = useState('Any Value');
  const [sourceInput, setSourceInput] = useState('');
  const [inCellDropdown, setInCellDropdown] = useState(true);
  const [formError, setFormError] = useState('');

  // State Validasi Langkah
  const [stepCompleted, setStepCompleted] = useState<boolean[]>([
    true,  // Step 1
    false, // Step 2
    false, // Step 3
    false, // Step 4
    false, // Step 5
    false, // Step 6
    false, // Step 7
    false  // Step 8
  ]);
  
  const totalSteps = 8;

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (currentStep === 3 && tab === 'Data') {
      setStepCompleted(prev => { const n = [...prev]; n[2] = true; return n; });
    }
  };

  const handleCellClick = (cellId: string) => {
    if (currentStep === 2 && cellId === 'C7') {
      setActiveCell(cellId);
      setStepCompleted(prev => { const n = [...prev]; n[1] = true; return n; });
    } else if (currentStep === 8 && cellId === 'C7') {
      setActiveCell(cellId);
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      setActiveCell(cellId);
      setIsDropdownOpen(false);
    }
  };

  const handleOpenDataValidation = () => {
    if (currentStep === 4 && activeCell === 'C7' && activeTab === 'Data') {
      setIsModalOpen(true);
      setStepCompleted(prev => { const n = [...prev]; n[3] = true; n[4] = false; return n; });
      setCurrentStep(5);
    }
  };

  const handleAllowChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAllowOption(e.target.value);
    if (currentStep === 5 && e.target.value === 'List') {
      setStepCompleted(prev => { const n = [...prev]; n[4] = true; return n; });
      setCurrentStep(6);
    }
  };

  const handleSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Hanya simpan nilai input, jangan auto-advance step di sini.
    // Step baru maju saat tombol OK diklik dan validasi lolos.
    setSourceInput(e.target.value);
  };

  const handleSaveValidation = () => {
    // Validasi form ketat
    const cleanInput = sourceInput.replace(/\s/g, '').toLowerCase();
    const expectedInput = 'pulpen;bukutulis;penghapus;pensil;mapplastik';

    if (allowOption === 'List' && cleanInput === expectedInput) {
      setIsModalOpen(false);
      setStepCompleted(prev => { const n = [...prev]; n[5] = true; n[6] = true; return n; });
      setCurrentStep(8);
    } else {
      setFormError('Pastikan Allow = List, dan Source diisi dengan benar sesuai instruksi (gunakan titik koma).');
    }
  };

  const handleSelectOption = (option: string) => {
    if (activeCell === 'C7') {
      setData(prev => ({ ...prev, 'C7': option }));
      setIsDropdownOpen(false);
      if (currentStep === 8 && option === 'Pulpen') {
        setStepCompleted(prev => { const n = [...prev]; n[7] = true; return n; });
      }
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderInstruction = () => {
    switch (currentStep) {
      case 1:
        return { title: "Mengenali Data Mentah", desc: "Perhatikan tabel penjualan di samping. Kita akan membuat dropdown pada kolom **Nama Produk**.", hint: "Klik 'Lanjut' untuk mulai memilih cell." };
      case 2:
        return { title: "Memilih Cell Tujuan", desc: "Klik cell **C7** pada kolom Nama Produk (baris kosong paling atas).", hint: "Cell C7 akan kita beri aturan Data Validation." };
      case 3:
        return { title: "Membuka Tab Data", desc: "Karena cell C7 sudah dipilih, sekarang buka tab menu **Data** di bagian atas.", hint: "Klik tulisan 'Data' pada menu tab di atas." };
      case 4:
        return { title: "Membuka Data Validation", desc: "Sekarang klik ikon **Data Validation** (ikon perisai) di menu Ribbon.", hint: "Klik tombol Data Validation yang ada di menu." };
      case 5:
        return { title: "Pilih Allow: List", desc: "Pada jendela Data Validation, ubah bagian **Allow** menjadi **List**.", hint: "Pilih 'List' pada dropdown Allow." };
      case 6:
        return { title: "Isi Source", desc: "Ketik daftar produk di kolom **Source**: `Pulpen;Buku Tulis;Penghapus;Pensil;Map Plastik`", hint: "Pisahkan dengan titik koma (;)." };
      case 7:
        return { title: "Menyelesaikan Pengaturan", desc: "Jika Source sudah terisi, klik tombol **OK** di jendela.", hint: "Klik tombol OK untuk menyimpan." };
      case 8:
        return { title: "Mencoba Dropdown", desc: "Klik cell **C7**, lalu klik panah dropdown dan pilih **Pulpen**.", hint: "Pilih produk dari daftar." };
      default:
        return { title: "", desc: "", hint: "" };
    }
  };

  const info = renderInstruction();
  const isCurrentStepDone = stepCompleted[currentStep - 1];

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* PANEL KIRI: TUTORIAL */}
      <div className="w-full lg:w-1/3">
        <Card bg="bg-white" className="flex flex-col h-full min-h-[500px] sticky top-24">
          <div className="border-b-2 border-ink pb-4 mb-4">
            <span className="bg-yellow border-2 border-ink rounded-full px-3 py-1 text-xs font-black shadow-neo-sm">
              Langkah {currentStep} dari {totalSteps}
            </span>
            <h2 className="text-2xl font-black mt-2">{info.title}</h2>
          </div>
          
          <div className="flex-1">
            <p className="text-base leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: info.desc.replace(/\*\*(.*?)\*\*/g, '<strong class="bg-blue px-1 border border-ink rounded">$1</strong>').replace(/`(.*?)`/g, '<code class="bg-gray-100 border-2 border-ink px-2 py-0.5 rounded text-xs font-mono">$1</code>') }} />
            
            <div className="bg-yellow border-2 border-ink rounded-xl p-3 shadow-neo-sm flex gap-3 items-start">
              <span className="text-xl">💡</span>
              <p className="text-sm font-bold">{info.hint}</p>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-xs font-bold text-gray-500 mb-1">
                <span>Progress</span>
                <span>{Math.round((stepCompleted.filter(Boolean).length / totalSteps) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 border-2 border-ink">
                <div className="bg-green-500 h-full rounded-full transition-all duration-300" style={{ width: `${(stepCompleted.filter(Boolean).length / totalSteps) * 100}%` }}></div>
              </div>
            </div>
          </div>

          {/* FOOTER NAVIGASI */}
          <div className="mt-6 pt-4 border-t-2 border-ink flex items-center justify-between">
            <Button variant="cream" onClick={prevStep} disabled={currentStep === 1}>
              Kembali
            </Button>
            
            {isCurrentStepDone ? (
              <Button variant="mint" onClick={nextStep} className="animate-pulse">
                Lanjut
              </Button>
            ) : (
              <div className="flex items-center gap-2 text-sm font-bold text-gray-400 bg-gray-50 px-4 py-2 rounded-xl border-2 border-dashed border-gray-200 cursor-not-allowed">
                <HelpCircle size={16} /> Menunggu aksi...
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* PANEL KANAN: SPREADSHEET */}
      <div className="w-full lg:w-2/3">
        <div className="bg-white border-2 border-ink rounded-2xl shadow-neo overflow-hidden flex flex-col h-[600px] select-none">
          {/* Title Bar */}
          <div className="bg-green-700 text-white px-3 py-1 text-xs flex justify-between items-center font-bold">
            <span>Book1 - Excel (Simulasi Latihan)</span>
          </div>

          {/* Tabs */}
          <div className="bg-gray-100 border-b-2 border-gray-300 flex text-xs font-bold pt-2 px-2 gap-1 overflow-x-auto">
            {['Home', 'Insert', 'Page Layout', 'Formulas', 'Data', 'Review', 'View'].map(tab => (
              <button 
                key={tab} 
                onClick={() => handleTabClick(tab)}
                className={`px-3 py-1 rounded-t transition-colors whitespace-nowrap ${
                  activeTab === tab 
                    ? 'bg-white border-t-2 border-l-2 border-r-2 border-green-600 text-green-700' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Ribbon */}
          <div className="bg-gray-50 border-b-2 border-gray-300 px-2 py-2 flex gap-4 items-center text-xs text-gray-700 h-16">
            {activeTab === 'Data' ? (
              <>
                <div 
                  onClick={handleOpenDataValidation}
                  className={`flex flex-col items-center px-3 py-1 rounded cursor-pointer transition-all ${currentStep === 4 && activeCell === 'C7' ? 'bg-yellow-100 ring-2 ring-orange-400 animate-pulse' : 'hover:bg-gray-200'}`}
                >
                  <div className="bg-white border border-gray-300 p-1 rounded shadow-sm text-lg">🛡️</div>
                  <span>Data Validation</span>
                </div>
                <div className="flex flex-col items-center border-l border-gray-300 pl-4 opacity-50">
                  <div className="bg-white border border-gray-300 p-1 rounded shadow-sm text-lg">🔽</div>
                  <span>Sort A-Z</span>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center w-full text-gray-400 font-bold">
                Pilih tab Data untuk melanjutkan latihan.
              </div>
            )}
          </div>

          {/* Formula Bar */}
          <div className="flex border-b-2 border-gray-300 text-xs bg-white h-8">
            <div className="w-16 border-r-2 border-gray-300 flex items-center justify-center font-bold">{activeCell || ''}</div>
            <div className="w-8 border-r-2 border-gray-300 flex items-center justify-center font-bold text-gray-500 bg-gray-50">fx</div>
            <div className="flex-1 px-2 flex items-center font-mono">{activeCell ? data[activeCell] || '' : ''}</div>
          </div>

          {/* Grid */}
          <div className="flex-1 overflow-auto relative">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-gray-100 z-20">
                <tr>
                  <th className="w-8 border border-gray-300 p-1 bg-gray-200"></th>
                  {['A','B','C','D','E','F','G','H'].map(col => (
                    <th key={col} className="border border-gray-300 p-1 font-bold text-xs bg-gray-200 text-gray-600">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 15 }).map((_, r) => {
                  const rowNum = r + 1;
                  return (
                    <tr key={rowNum}>
                      <td className="border border-gray-300 p-1 text-center font-bold text-xs bg-gray-200 text-gray-600">{rowNum}</td>
                      {['A','B','C','D','E','F','G','H'].map(col => {
                        const cellId = `${col}${rowNum}`;
                        const isActive = cellId === activeCell;
                        const hasDropdown = (cellId === 'C7' && stepCompleted[5]);
                        
                        return (
                          <td 
                            key={cellId} 
                            onClick={() => handleCellClick(cellId)}
                            className={`border border-gray-300 p-1 text-xs h-7 min-w-[80px] cursor-cell relative
                              ${isActive ? 'bg-blue-50 ring-2 ring-inset ring-green-600 z-10' : 'bg-white'}
                              ${rowNum === 1 ? 'bg-gray-200 font-bold text-center' : ''}
                              ${col === 'C' && currentStep === 1 ? 'bg-yellow-50' : ''}
                            `}
                          >
                            {data[cellId] || ''}
                            
                            {hasDropdown && (
                              <div className="absolute right-0 top-1/2 -translate-y-1/2 h-full flex items-center pr-1">
                                <button onClick={(e) => { e.stopPropagation(); handleCellClick(cellId); }} className="bg-gray-100 border border-gray-400 rounded p-0.5 hover:bg-gray-200">
                                  <ChevronDown size={12} />
                                </button>
                              </div>
                            )}

                            {isActive && isDropdownOpen && hasDropdown && (
                              <div className="absolute top-full left-0 mt-1 w-40 bg-white border-2 border-ink shadow-neo rounded-md z-50 flex flex-col">
                                {productOptions.map(opt => (
                                  <button key={opt} onClick={(e) => { e.stopPropagation(); handleSelectOption(opt); }} className="text-left px-3 py-1.5 text-xs hover:bg-blue-100 font-medium border-b border-gray-100 last:border-0">
                                    {opt}
                                  </button>
                                ))}
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL DATA VALIDATION */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-2 border-ink rounded-xl shadow-neo w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-gray-100 border-b-2 border-gray-300 px-4 py-2 flex justify-between items-center">
              <span className="font-bold text-sm">Data Validation</span>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-red-500"><X size={16} /></button>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="flex border-b border-gray-300 gap-4 text-xs font-bold">
                <div className="pb-2 border-b-2 border-green-600 text-green-700">Settings</div>
                <div className="pb-2 text-gray-400">Input Message</div>
                <div className="pb-2 text-gray-400">Error Alert</div>
              </div>

              {/* INSTRUKSI DI DALAM MODAL */}
              <div className="bg-blue-50 border border-blue-200 rounded p-3 flex gap-3 items-start shadow-sm">
                <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs text-blue-800 font-medium leading-relaxed">
                  {currentStep === 5 && <p>Langkah 1: Ubah dropdown <strong>Allow</strong> menjadi <strong>List</strong>.</p>}
                  {currentStep === 6 && (
                    <>
                      <p className="mb-1">Langkah 1: Allow sudah diatur ke List.</p>
                      <p>Langkah 2: Ketik daftar produk berikut ke dalam kotak <strong>Source</strong>:</p>
                      <code className="bg-white px-1 mt-1 inline-block border border-blue-200 text-blue-900">Pulpen;Buku Tulis;Penghapus;Pensil;Map Plastik</code>
                    </>
                  )}
                  {currentStep === 7 && <p>Langkah 3: Klik tombol <strong>OK</strong> di pojok kanan bawah untuk menyimpan.</p>}
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold mb-1">Allow:</label>
                  <select 
                    value={allowOption} 
                    onChange={handleAllowChange}
                    className={`w-full border-2 rounded p-1.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${
                      currentStep === 5 ? 'border-orange-400 ring-2 ring-orange-200 animate-pulse' : 'border-ink'
                    }`}
                  >
                    <option>Any Value</option>
                    <option>Whole Number</option>
                    <option>Decimal</option>
                    <option>List</option>
                    <option>Date</option>
                    <option>Time</option>
                    <option>Text Length</option>
                    <option>Custom</option>
                  </select>
                </div>

                {allowOption === 'List' && (
                  <div className="animate-in fade-in slide-in-from-top-2">
                    <label className="block font-bold mb-1">Source:</label>
                    <input 
                      type="text" 
                      value={sourceInput}
                      onChange={handleSourceChange}
                      placeholder="Pulpen;Buku Tulis;Penghapus..."
                      className={`w-full border-2 rounded p-1.5 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${
                        currentStep >= 6 && sourceInput === '' ? 'border-orange-400 ring-2 ring-orange-200' : 'border-ink'
                      }`}
                    />
                    <div className="flex items-center gap-2 mt-2">
                      <input type="checkbox" checked={inCellDropdown} onChange={(e) => setInCellDropdown(e.target.checked)} id="incell" />
                      <label htmlFor="incell" className="font-semibold text-gray-700">In-cell dropdown</label>
                    </div>
                  </div>
                )}
              </div>

              {formError && <p className="text-red-500 text-xs font-bold bg-red-50 p-2 rounded border border-red-200">{formError}</p>}

              <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-1.5 border-2 border-gray-300 rounded font-bold text-xs hover:bg-gray-50">Cancel</button>
                <button 
                  onClick={handleSaveValidation}
                  className={`px-4 py-1.5 border-2 border-ink rounded font-bold text-xs shadow-neo-sm transition-all ${
                    allowOption === 'List' && sourceInput.trim() !== '' 
                      ? 'bg-mint hover:bg-green-200 animate-pulse' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300'
                  }`}
                  disabled={allowOption !== 'List' || sourceInput.trim() === ''}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}