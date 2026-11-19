// Data mentah + langkah praktik untuk materi "Mengatur Workbook, Worksheet, Baris, dan Kolom"
// slug: 'mengatur-workbook-worksheet'
//
// Pemakaian:
//   <Spreadsheet lessonSlug="mengatur-workbook-worksheet" initialData={workbookInitialData} />
//   lalu di lib/tutorialData.ts:  'mengatur-workbook-worksheet': workbookSteps

// Sengaja dibuat "berantakan": nama barang & keterangan panjang, jadi
// kolom B dan F terpotong dan baris perlu AutoFit.
export const workbookInitialData: Record<string, string> = {
    // Header
    A1: 'No', B1: 'Nama Barang', C1: 'Kategori', D1: 'Harga Satuan', E1: 'Stok', F1: 'Keterangan',
  
    A2: '1', B2: 'Beras Premium Pandan Wangi Kemasan 5 Kg', C2: 'Sembako', D2: '78000', E2: '24',
    F2: 'Stok baru datang minggu lalu, simpan di rak paling bawah dekat pintu gudang',
  
    A3: '2', B3: 'Minyak Goreng Kemasan Pouch 2 Liter', C3: 'Sembako', D3: '38500', E3: '40',
    F3: 'Harga naik sejak awal bulan, cek harga distributor sebelum pesan ulang',
  
    A4: '3', B4: 'Gula Pasir Kristal Putih 1 Kg', C4: 'Sembako', D4: '17500', E4: '30',
    F4: 'Aman',
  
    A5: '4', B5: 'Telur Ayam Negeri Grade A (per Tray)', C5: 'Sembako', D5: '52000', E5: '12',
    F5: 'Cepat habis di akhir pekan, usahakan stok minimal 15 tray',
  
    A6: '5', B6: 'Kopi Bubuk Robusta Kapal Api 165 Gram', C6: 'Minuman', D6: '14000', E6: '48',
    F6: 'Aman',
  
    A7: '6', B7: 'Teh Celup Sariwangi Isi 25 Kantong', C7: 'Minuman', D7: '6500', E7: '60',
    F7: 'Masa kedaluwarsa masih panjang, boleh dipajang di etalase depan',
  
    A8: '8', B8: 'Air Mineral Botol 600 ml (Dus isi 24)', C8: 'Minuman', D8: '45000', E8: '18',
    F8: 'Dus bagian bawah agak penyok, tawarkan diskon kecil kepada pembeli',
  
    A9: '9', B9: 'Mi Instan Goreng Spesial Rasa Ayam Bawang', C9: 'Makanan', D9: '3200', E9: '120',
    F9: 'Terlaris bulan ini',
  
    A10: '10', B10: 'Biskuit Kelapa Kaleng Besar (Kemasan Hari Raya)', C10: 'Makanan', D10: '68000', E10: '6',
    F10: 'Stok menipis, segera hubungi sales untuk pemesanan ulang sebelum musim ramai tiba',
  
    A11: '11', B11: 'Sabun Mandi Cair Refill 450 ml', C11: 'Kebersihan', D11: '21500', E11: '35',
    F11: 'Aman',
  
    A12: '12', B12: 'Deterjen Bubuk Anti Noda 1,8 Kg', C12: 'Kebersihan', D12: '36000', E12: '22',
    F12: 'Promo beli 2 gratis 1 plastik belanja, tempel label promo di rak',
  };
  
  // Catatan: A8 sengaja diberi nomor 8 (bukan 7) untuk latihan Insert Row + perbaiki nomor urut.
  
  // ----------------------------------------------------------------------
  // Langkah praktik.
  // PENTING: sesuaikan nama field (id/title/instruction/hint/isDone) dengan
  // tipe langkah yang dipakai materi lain di tutorialData.ts.
  // `progress` berisi token dari Spreadsheet.tsx, mis:
  //   range:B1:B20 | autofit-col:B | col-resized:F | autofit-row:2 | row-resized:3
  //   row-inserted | row-deleted | col-inserted | col-deleted
  //   sheet-added | sheet-renamed | sheet-deleted | sheet-count:N | sheet-active:Nama
  //   new-workbook
  // ----------------------------------------------------------------------
  type Ctx = { data: Record<string, string>; progress: string[] };
  
  export const workbookSteps = [
    {
      id: 'lihat-data',
      title: '1. Kenali Data Mentah',
      instruction:
        'Perhatikan tabel stok barang di sheet. Kolom B (Nama Barang) dan kolom F (Keterangan) isinya terpotong. Ini yang akan kita rapikan. Klik header kolom B untuk memilih seluruh kolom.',
      hint: 'Header kolom adalah huruf A, B, C... di bagian atas tabel.',
      isDone: ({ progress }: Ctx) => progress.includes('range:B1:B20'),
    },
    {
      id: 'autofit-lebar-b',
      title: '2. AutoFit Lebar Kolom (Autowidth)',
      instruction:
        'Dengan kolom B terpilih, klik tombol "AutoFit Width" di tab Home. Cara cepat lain: klik 2x garis pembatas di antara header B dan C. Lebar kolom otomatis menyesuaikan teks terpanjang.',
      hint: 'Garis pembatas ada di sisi kanan huruf B pada header.',
      isDone: ({ progress }: Ctx) => progress.includes('autofit-col:B'),
    },
    {
      id: 'autofit-lebar-c',
      title: '3. AutoFit Kolom Lain',
      instruction:
        'Ulangi untuk kolom C (Kategori) dan D (Harga Satuan): klik header kolomnya, lalu klik 2x pembatas kanan header atau tombol AutoFit Width.',
      isDone: ({ progress }: Ctx) => progress.includes('autofit-col:C') && progress.includes('autofit-col:D'),
    },
    {
      id: 'ubah-lebar-manual',
      title: '4. Ubah Lebar Kolom Manual',
      instruction:
        'Kolom F (Keterangan) terlalu panjang jika di-AutoFit. Geser pembatas kanan header F ke kiri/kanan sampai lebarnya sekitar 200 px, supaya teks akan turun ke baris berikutnya.',
      hint: 'Tahan dan geser garis pembatas kanan header F.',
      isDone: ({ progress }: Ctx) => progress.includes('col-resized:F'),
    },
    {
      id: 'autofit-tinggi',
      title: '5. AutoFit Tinggi Baris (Autoheight)',
      instruction:
        'Sekarang teks di kolom F tertumpuk dan terpotong karena tinggi barisnya kurang. Blok area A2:F12 (geser dari A2 sampai F12), lalu klik "AutoFit Height" di tab Home. Tinggi tiap baris menyesuaikan isi sel.',
      hint: 'Alternatif: klik 2x pembatas bawah nomor baris.',
      isDone: ({ progress }: Ctx) => progress.includes('autofit-row:2') && progress.includes('autofit-row:12'),
    },
    {
      id: 'ubah-tinggi-manual',
      title: '6. Ubah Tinggi Baris Manual',
      instruction:
        'Baris 1 adalah judul tabel. Geser pembatas bawah nomor baris 1 ke bawah agar lebih tinggi dari baris lain.',
      isDone: ({ progress }: Ctx) => progress.includes('row-resized:1'),
    },
    {
      id: 'insert-baris',
      title: '7. Sisipkan Baris',
      instruction:
        'Nomor urut di kolom A melompat dari 6 ke 8, ada barang yang terlewat. Klik sel A8, lalu klik "Insert Row" di tab Home. Isi baris baru dengan: No 7, Nama Barang: Susu Kental Manis Kaleng 370 g, Kategori Minuman, Harga 12500, Stok 36.',
      isDone: ({ progress, data }: Ctx) => progress.includes('row-inserted') && !!data['B8'],
    },
    {
      id: 'hapus-baris',
      title: '8. Hapus Baris',
      instruction:
        'Barang "Biskuit Kelapa Kaleng Besar" sudah tidak dijual lagi. Klik salah satu sel pada barisnya, lalu klik "Delete Row".',
      isDone: ({ progress }: Ctx) => progress.includes('row-deleted'),
    },
    {
      id: 'insert-kolom',
      title: '9. Sisipkan Kolom',
      instruction:
        'Tambahkan kolom Satuan di antara Kategori dan Harga. Klik sel D1, lalu klik "Insert Col". Ketik "Satuan" di D1.',
      isDone: ({ progress, data }: Ctx) => progress.includes('col-inserted') && (data['D1'] ?? '').toLowerCase() === 'satuan',
    },
    {
      id: 'sheet',
      title: '10. Tambah dan Ganti Nama Worksheet',
      instruction:
        'Klik tombol + di samping tab sheet untuk menambah worksheet. Lalu klik 2x tab sheet baru dan ganti namanya menjadi "Stok Barang".',
      isDone: ({ progress }: Ctx) => progress.includes('sheet-added') && progress.includes('sheet-renamed'),
    },
    {
      id: 'hapus-sheet',
      title: '11. Hapus Worksheet',
      instruction:
        'Pilih tab Sheet3, arahkan kursor ke tab-nya, lalu klik ikon tempat sampah merah di pojok kanan atas tab.',
      isDone: ({ progress }: Ctx) => progress.includes('sheet-deleted'),
    },
    {
      id: 'dokumen-baru',
      title: '12. Buat Dokumen (Workbook) Baru',
      instruction:
        'Klik "New Workbook" di tab Home. Kamu akan mendapat workbook kosong (Book2) dengan satu sheet. Ini sama seperti Ctrl + N di Excel. Ketik data apa saja untuk latihan, lalu coba AutoFit Width lagi.',
      isDone: ({ progress }: Ctx) => progress.includes('new-workbook'),
    },
  ];
  