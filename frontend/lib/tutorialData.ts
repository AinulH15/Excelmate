export const tutorialData: Record<string, any[]> = {

  // ==========================================
  // TUTORIAL DEFAULT (HALAMAN UTAMA)
  // ==========================================
  'dasar': [
    {
      id: 1,
      title: "Selamat Datang di ExcelMate!",
      instruction: "Ini adalah Spreadsheet Interaktif. Kamu bisa mengetik angka atau teks di sini. Coba klik cell **A1**, ketik `Halo`, lalu tekan Enter.",
      targetCell: "A1",
      expectedValue: "Halo",
      hint: "Klik kotak paling kiri atas (A1), ketik Halo, lalu Enter.",
    },
    {
      id: 2,
      title: "Mencoba Rumus Sederhana",
      instruction: "Sekarang klik cell **B1**, ketik `=10+20` lalu tekan Enter. Excel akan otomatis menghitungnya menjadi 30.",
      targetCell: "B1",
      expectedValue: "=10+20",
      hint: "Ketik =10+20 di cell B1.",
    }
  ],

  // ==========================================
  // LEVEL 1: DASAR EXCEL
  // ==========================================
  'pengenalan-antarmuka-excel': [
    {
      id: 1,
      title: "Mengenal Grid Excel",
      instruction: "Excel terdiri dari kotak-kotak yang disebut Cell. Mari kita coba. Klik cell **A1**, ketik `Halo`, lalu tekan Enter.",
      targetCell: "A1",
      expectedValue: "Halo",
      hint: "Klik kotak paling kiri atas (A1), ketik Halo, lalu Enter.",
    },
    {
      id: 2,
      title: "Mengisi Baris Bawahnya",
      instruction: "Sekarang klik cell **A2**, ketik `Excel`, lalu tekan Enter.",
      targetCell: "A2",
      expectedValue: "Excel",
      hint: "Klik cell A2, ketik Excel, lalu tekan Enter.",
    }
  ],

  'workbook-worksheet-cell': [
    {
      id: 1,
      title: "Mengenal Cell",
      instruction: "Setiap pertemuan kolom dan baris disebut Cell. Klik **B2**, ketik `Tengah`, lalu Enter.",
      targetCell: "B2",
      expectedValue: "Tengah",
      hint: "Klik B2, ketik Tengah, lalu Enter.",
    },
    {
      id: 2,
      title: "Mengenal Range",
      instruction: "Range adalah kumpulan cell. Ketik `100` di **C1**, `200` di **C2**, dan `300` di **C3**.",
      targetCell: "C1",
      expectedValue: "100",
      hint: "Isi C1, C2, C3 dengan angka.",
    }
  ],

  'input-edit-hapus-data': [
    {
      id: 1,
      title: "Memasukkan Data",
      instruction: "Klik **A1**, ketik `Data Baru`, lalu Enter.",
      targetCell: "A1",
      expectedValue: "Data Baru",
      hint: "Ketik Data Baru di A1.",
    },
    {
      id: 2,
      title: "Mengedit Data",
      instruction: "Klik **A2**, ketik `Data Lama`, lalu Enter. Lalu klik A2 lagi, ketik `Sudah Diedit`, Enter.",
      targetCell: "A2",
      expectedValue: "Sudah Diedit",
      hint: "Timpa isi A2 menjadi Sudah Diedit.",
    }
  ],

  'format-cell': [
    {
      id: 1,
      title: "Format Angka",
      instruction: "Ketik angka `1000` di **A1**, lalu Enter.",
      targetCell: "A1",
      expectedValue: "1000",
      hint: "Ketik 1000 di A1.",
    },
    {
      id: 2,
      title: "Format Persentase",
      instruction: "Ketik `0.5` di **B1**, lalu Enter. (Di Excel asli, kamu bisa mengubahnya menjadi 50% dari menu Format).",
      targetCell: "B1",
      expectedValue: "0.5",
      hint: "Ketik 0.5 di B1.",
    }
  ],

  'operasi-matematika': [
    {
      id: 1,
      title: "Penjumlahan",
      instruction: "Klik **A1**, ketik rumus `=5+5` lalu Enter.",
      targetCell: "A1",
      expectedValue: "=5+5",
      hint: "Ketik =5+5 di A1.",
    },
    {
      id: 2,
      title: "Perkalian",
      instruction: "Klik **B1**, ketik rumus `=10*3` lalu Enter.",
      targetCell: "B1",
      expectedValue: "=10*3",
      hint: "Ketik =10*3 di B1.",
    }
  ],

  // ==========================================
  // LEVEL 2: RUMUS & FUNGSI DASAR
  // ==========================================
  'fungsi-sum': [
    {
      id: 1,
      title: "Isi Data Angka",
      instruction: "Ketik angka bebas secara berurutan di sel **A1** sampai **A5**. (Contoh: ketik 1 di A1, tekan Enter, ketik 2 di A2, tekan Enter, sampai A5).",
      targetCell: "A5",
      expectedValue: "",
      hint: "Setelah mengetik angka di A5, pastikan kamu menekan Enter agar tombol 'Lanjut' muncul."
    },
    {
      id: 2,
      title: "Gunakan Rumus SUM",
      instruction: "Sekarang, **klik sel A7** (sel kosong di bawahnya). Setelah kursor di A7, ketik rumus: `=SUM(A1:A5)` lalu tekan Enter.",
      targetCell: "A7",
      expectedValue: "=SUM(A1:A5)",
      hint: "Jangan ketik rumus di A5 ya. Klik dulu A7, baru ketik =SUM(A1:A5)."
    }
  ],

  'fungsi-average': [
    {
      id: 1,
      title: "Memahami Tujuan",
      instruction: "Kita akan mencari nilai rata-rata dari beberapa data.",
      targetCell: null,
      expectedValue: null,
      hint: "Baca penjelasan, lalu klik 'Selanjutnya'.",
    },
    {
      id: 2,
      title: "Memasukkan Data",
      instruction: "Klik cell **A1**, ketik `80` dan tekan Enter. Lanjutkan ke **A2** ketik `90`, dan **A3** ketik `100`.",
      targetCell: "A1",
      expectedValue: "80",
      hint: "Ketik 80 di A1.",
    },
    {
      id: 3,
      title: "Menulis Rumus AVERAGE",
      instruction: "Klik cell **B1**, ketik `=AVERAGE(A1:A3)` lalu tekan Enter.",
      targetCell: "B1",
      expectedValue: "=AVERAGE(A1:A3)",
      hint: "Ketik =AVERAGE(A1:A3) di cell B1.",
    },
  ],

  'fungsi-max-min': [
    {
      id: 1,
      title: "Menyiapkan Data",
      instruction: "Ketik `50` di **A1**, `100` di **A2**, dan `75` di **A3**.",
      targetCell: "A1",
      expectedValue: "50",
      hint: "Isi data di kolom A.",
    },
    {
      id: 2,
      title: "Mencari Nilai Tertinggi (MAX)",
      instruction: "Klik **B1**, ketik `=MAX(A1:A3)` lalu Enter.",
      targetCell: "B1",
      expectedValue: "=MAX(A1:A3)",
      hint: "Ketik =MAX(A1:A3) di B1.",
    },
    {
      id: 3,
      title: "Mencari Nilai Terendah (MIN)",
      instruction: "Klik **B2**, ketik `=MIN(A1:A3)` lalu Enter.",
      targetCell: "B2",
      expectedValue: "=MIN(A1:A3)",
      hint: "Ketik =MIN(A1:A3) di B2.",
    }
  ],

  'fungsi-count': [
    {
      id: 1,
      title: "Menyiapkan Data",
      instruction: "Ketik `10` di **A1**, `Teks` di **A2**, dan `20` di **A3**.",
      targetCell: "A1",
      expectedValue: "10",
      hint: "Isi data campuran di kolom A.",
    },
    {
      id: 2,
      title: "Menghitung Angka (COUNT)",
      instruction: "Klik **B1**, ketik `=COUNT(A1:A3)` lalu Enter. (Hasilnya 2, karena hanya A1 dan A3 yang angka).",
      targetCell: "B1",
      expectedValue: "=COUNT(A1:A3)",
      hint: "Ketik =COUNT(A1:A3) di B1.",
    },
    {
      id: 3,
      title: "Menghitung Semua Data (COUNTA)",
      instruction: "Klik **B2**, ketik `=COUNTA(A1:A3)` lalu Enter. (Hasilnya 3, karena semua cell terisi).",
      targetCell: "B2",
      expectedValue: "=COUNTA(A1:A3)",
      hint: "Ketik =COUNTA(A1:A3) di B2.",
    }
  ],

  'fungsi-if': [
    {
      id: 1,
      title: "Menyiapkan Nilai",
      instruction: "Ketik nilai `80` di **A1**.",
      targetCell: "A1",
      expectedValue: "80",
      hint: "Ketik 80 di A1.",
    },
    {
      id: 2,
      title: "Membuat Logika IF",
      instruction: "Klik **B1**, ketik `=IF(A1>=75,\"Lulus\",\"Gagal\")` lalu Enter. (Karena 80 >= 75, hasilnya Lulus).",
      targetCell: "B1",
      expectedValue: "=IF(A1>=75,\"Lulus\",\"Gagal\")",
      hint: "Ketik rumus IF di B1.",
    }
  ],

  // ==========================================
  // LEVEL 3: PENGOLAHAN DATA
  // ==========================================
  'fungsi-sumif-sumifs': [
    {
      id: 1,
      title: "Menyiapkan Data",
      instruction: "Isi **A1**=`Apel`, **B1**=`100`. Lalu **A2**=`Jeruk`, **B2**=`200`. Lalu **A3**=`Apel`, **B3**=`150`.",
      targetCell: "A1",
      expectedValue: "Apel",
      hint: "Isi data buah dan harganya.",
    },
    {
      id: 2,
      title: "Rumus SUMIF",
      instruction: "Klik **C1**, ketik `=SUMIF(A1:A3,\"Apel\",B1:B3)` lalu Enter. (Menjumlahkan harga khusus Apel saja).",
      targetCell: "C1",
      expectedValue: "=SUMIF(A1:A3,\"Apel\",B1:B3)",
      hint: "Ketik rumus SUMIF di C1.",
    }
  ],

  'fungsi-countif': [
    {
      id: 1,
      title: "Menyiapkan Data",
      instruction: "Isi **A1**=`Laki-laki`, **A2**=`Perempuan`, **A3**=`Laki-laki`.",
      targetCell: "A1",
      expectedValue: "Laki-laki",
      hint: "Isi jenis kelamin di kolom A.",
    },
    {
      id: 2,
      title: "Rumus COUNTIF",
      instruction: "Klik **B1**, ketik `=COUNTIF(A1:A3,\"Laki-laki\")` lalu Enter. (Hasilnya 2).",
      targetCell: "B1",
      expectedValue: "=COUNTIF(A1:A3,\"Laki-laki\")",
      hint: "Ketik rumus COUNTIF di B1.",
    }
  ],

  'fungsi-averageif': [
    {
      id: 1,
      title: "Menyiapkan Data",
      instruction: "Isi **A1**=`Apel`, **B1**=`10`. Lalu **A2**=`Jeruk`, **B2**=`20`. Lalu **A3**=`Apel`, **B3**=`30`.",
      targetCell: "A1",
      expectedValue: "Apel",
      hint: "Isi data buah dan nilainya.",
    },
    {
      id: 2,
      title: "Rumus AVERAGEIF",
      instruction: "Klik **C1**, ketik `=AVERAGEIF(A1:A3,\"Apel\",B1:B3)` lalu Enter. (Mencari rata-rata nilai Apel saja).",
      targetCell: "C1",
      expectedValue: "=AVERAGEIF(A1:A3,\"Apel\",B1:B3)",
      hint: "Ketik rumus AVERAGEIF di C1.",
    }
  ],

  'fungsi-and-or': [
    {
      id: 1,
      title: "Menyiapkan Data",
      instruction: "Isi **A1**=`10`, **B1**=`5`.",
      targetCell: "A1",
      expectedValue: "10",
      hint: "Isi angka di A1 dan B1.",
    },
    {
      id: 2,
      title: "Rumus AND",
      instruction: "Klik **C1**, ketik `=IF(AND(A1>5, B1<10),\"Ya\",\"Tidak\")` lalu Enter. (Hasilnya Ya, karena kedua kondisi benar).",
      targetCell: "C1",
      expectedValue: "=IF(AND(A1>5, B1<10),\"Ya\",\"Tidak\")",
      hint: "Ketik rumus AND di C1.",
    }
  ],

  'fungsi-teks': [
    {
      id: 1,
      title: "Menyiapkan Teks",
      instruction: "Ketik `ExcelMate` di **A1**.",
      targetCell: "A1",
      expectedValue: "ExcelMate",
      hint: "Ketik ExcelMate di A1.",
    },
    {
      id: 2,
      title: "Mengambil Teks Kiri (LEFT)",
      instruction: "Klik **B1**, ketik `=LEFT(A1, 5)` lalu Enter. (Mengambil 5 huruf pertama: Excel).",
      targetCell: "B1",
      expectedValue: "=LEFT(A1, 5)",
      hint: "Ketik =LEFT(A1, 5) di B1.",
    }
  ],  // ==========================================
  // FUNGSI IFERROR
  // ==========================================
  'fungsi-iferror': [
    {
      id: 1,
      title: "Mengatasi Error #N/A",
      instruction: "Error **#N/A** muncul saat data tidak ditemukan. Ketik `=IFERROR(VLOOKUP(\"Andi\",A1:B2,2,FALSE),\"Tidak Ditemukan\")` di cell **D1** lalu Enter.",
      targetCell: "D1",
      expectedValue: "=IFERROR(VLOOKUP(\"Andi\",A1:B2,2,FALSE),\"Tidak Ditemukan\")",
      hint: "Ketik rumus VLOOKUP yang dibungkus IFERROR di D1.",
    },
    {
      id: 2,
      title: "Mengatasi Error #DIV/0!",
      instruction: "Error **#DIV/0!** muncul saat membagi dengan nol. Ketik `=IFERROR(10/0,\"Error Pembagian\")` di cell **D2** lalu Enter.",
      targetCell: "D2",
      expectedValue: "=IFERROR(10/0,\"Error Pembagian\")",
      hint: "Ketik rumus pembagian yang dibungkus IFERROR di D2.",
    },
    {
      id: 3,
      title: "Mengatasi Error #VALUE!",
      instruction: "Error **#VALUE!** muncul saat tipe data salah. Ketik `=IFERROR(\"Teks\"*2,\"Tipe Data Salah\")` di cell **D3** lalu Enter.",
      targetCell: "D3",
      expectedValue: "=IFERROR(\"Teks\"*2,\"Tipe Data Salah\")",
      hint: "Ketik rumus perkalian teks yang dibungkus IFERROR di D3.",
    }
  ],

  // ==========================================
  // SORTING & FILTERING
  // ==========================================
  'sorting-filtering': [
    {
      id: 1,
      title: "Menyiapkan Data Mentah",
      instruction: "Sebelum bisa melakukan *Sorting* atau *Filtering*, kita butuh data. Ketik `Nama` di **A1**, lalu `Andi` di **A2**, `Budi` di **A3**, dan `Citra` di **A4**.",
      targetCell: "A4",
      expectedValue: "Citra",
      hint: "Isi kolom A dari baris 1 sampai 4 dengan teks tersebut.",
    },
    {
      id: 2,
      title: "Mengisi Data Angka",
      instruction: "Sekarang kita isi nilainya. Ketik `Nilai` di **B1**, lalu `80` di **B2**, `95` di **B3**, dan `70` di **B4**.",
      targetCell: "B4",
      expectedValue: "70",
      hint: "Isi kolom B dari baris 1 sampai 4.",
    },
    {
      id: 3,
      title: "Simulasi Sorting (Mengurutkan)",
      instruction: "Di Excel asli, untuk mengurutkan nilai dari terkecil ke terbesar, kamu harus memblok area **B2:B4**, lalu klik tab **Data** > **Sort Smallest to Largest**. Klik tombol di bawah untuk mensimulasikan blok area tersebut.",
      targetCell: null,
      expectedValue: null,
      highlightRange: "B2:B4",
      hint: "Klik tombol 'Blok Area B2:B4' di bawah instruksi ini.",
    },
    {
      id: 4,
      title: "Simulasi Filtering (Menyaring)",
      instruction: "Untuk menyaring data (misal hanya menampilkan nilai di atas 80), di Excel asli kamu bisa memblok judul tabel **A1:B4**, klik **Data** > **Filter** (atau Ctrl+Shift+L), lalu klik panah di kolom Nilai dan pilih *Number Filters* > *Greater Than...*.",
      targetCell: null,
      expectedValue: null,
      highlightRange: "A1:B4",
      hint: "Klik tombol 'Blok Tabel A1:B4' di bawah instruksi ini.",
    }
  ],

  // ==========================================
  // DATA VALIDATION
  // ==========================================
  'data-validation': [
    {
      id: 1,
      title: "Persiapan Latihan",
      instruction: "Kita akan mencoba membuat *Dropdown List* pada kolom **Nama Produk**. Perhatikan tabel di sebelah kanan, sudah ada data penjualan toko ATK.",
      targetCell: null,
      expectedValue: null,
      hint: "Klik 'Lanjut' untuk mulai.",
    },
    {
      id: 2,
      title: "Pilih Cell Target",
      instruction: "Klik cell **C17** (baris paling bawah, kolom Nama Produk). Ini adalah cell kosong yang akan kita beri aturan *Data Validation*.",
      targetCell: "C17",
      expectedValue: "",
      hint: "Klik cell C17.",
    },
    {
      id: 3,
      title: "Buka Data Validation",
      instruction: "Di Excel asli, buka tab **Data** > **Data Validation**. Di simulasi ini, kita akan mensimulasikan fitur tersebut.",
      targetCell: null,
      expectedValue: null,
      hint: "Klik Lanjut.",
    },
    {
      id: 4,
      title: "Atur List Dropdown",
      instruction: "Pada jendela Data Validation, pilih **Allow: List**. Lalu isi kolom **Source** dengan: `Pulpen;Buku Tulis;Penghapus;Pensil;Map`. Klik OK.",
      targetCell: null,
      expectedValue: null,
      hint: "Ini akan membuat pilihan dropdown di cell C17.",
    },
    {
      id: 5,
      title: "Uji Coba Dropdown",
      instruction: "Sekarang klik cell **C17**. Akan muncul panah kecil di sebelah kanan. Klik panah tersebut dan pilih **Pensil**.",
      targetCell: "C17",
      expectedValue: "Pensil",
      hint: "Pilih Pensil dari daftar dropdown.",
    },
  ],

  // ==========================================
  // LEVEL 4: ANALISIS & PENGOLAHAN LANJUTAN
  // ==========================================
  'fungsi-lookup': [
    {
      id: 1,
      title: "Menyiapkan Data",
      instruction: "Isi tabel berikut:\n**A1**=`ID`, **B1**=`Nama`, **C1**=`Nilai`.\n**A2**=`1`, **B2**=`Andi`, **C2**=`80`.\n**A3**=`2`, **B3**=`Budi`, **C3**=`90`.",
      targetCell: "C3",
      expectedValue: "90",
      hint: "Isi tabel di A1 sampai C3.",
    },
    {
      id: 2,
      title: "Mencari Data (VLOOKUP)",
      instruction: "Sekarang kita cari nama dari ID 2. Ketik di **E1**=`Cari ID:`, **F1**=`2`.\nLalu klik **E2**, ketik rumus `=VLOOKUP(F1;A1:C3;2;FALSE)` lalu Enter.",
      targetCell: "E2",
      expectedValue: "=VLOOKUP(F1;A1:C3;2;FALSE)",
      hint: "Ketik =VLOOKUP(F1;A1:C3;2;FALSE) di E2.",
    },
    {
      id: 3,
      title: "Mencari Data (HLOOKUP)",
      instruction: "Sekarang kita coba HLOOKUP. Ketik di **A5**=`1`, **B5**=`2`, **C5**=`3`.\nLalu di **A6**=`Apel`, **B6**=`Jeruk`, **C6**=`Mangga`.\n\nLalu klik **E5**, ketik `=HLOOKUP(3;A5:C6;2;FALSE)` lalu Enter.",
      targetCell: "E5",
      expectedValue: "=HLOOKUP(3;A5:C6;2;FALSE)",
      hint: "Ketik =HLOOKUP(3;A5:C6;2;FALSE) di E5.",
    },
    {
      id: 4,
      title: "Mencari Data (XLOOKUP)",
      instruction: "Terakhir, kita coba XLOOKUP. Klik **E7**, ketik `=XLOOKUP(2;A2:A3;B2:B3)` lalu Enter. (Mencari nama dari ID 2 di tabel atas).",
      targetCell: "E7",
      expectedValue: "=XLOOKUP(2;A2:A3;B2:B3)",
      hint: "Ketik =XLOOKUP(2;A2:A3;B2:B3) di E7.",
    }
  ],

  'data-tools': [
    {
      id: 1,
      title: "Memahami Filter",
      instruction: "Di Excel asli, kamu bisa menekan Ctrl+Shift+L untuk mengaktifkan Filter pada tabel. Untuk sekarang, ketik `Data A` di **A1** dan `Data B` di **A2**.",
      targetCell: "A1",
      expectedValue: "Data A",
      hint: "Ketik Data A di A1.",
    },
    {
      id: 2,
      title: "Memahami Conditional Formatting",
      instruction: "Ini fitur untuk mewarnai cell otomatis. Ketik `100` di **B1**.",
      targetCell: "B1",
      expectedValue: "100",
      hint: "Ketik 100 di B1.",
    }
  ],  // ==========================================
  // PIVOT TABLE DASHBOARD
  // ==========================================
  'pivottable-dashboard': [
    {
      id: 1,
      title: "Memilih Data Mentah",
      instruction: "Pertama, blok seluruh data mentah dari **A1** sampai **G31**. (Di simulasi ini, kamu hanya perlu klik cell A1 lalu klik Lanjut).",
      targetCell: "A1",
      expectedValue: "Tanggal",
      hint: "Klik cell A1 di spreadsheet.",
    },
    {
      id: 2,
      title: "Membuat PivotChart",
      instruction: "Setelah data diblok, bayangkan kamu mengklik **Insert > PivotChart**. Lalu klik **OK** pada pop-up yang muncul.",
      targetCell: "B1",
      expectedValue: "No Transaksi",
      hint: "Klik Lanjut untuk masuk ke area kerja PivotChart.",
    },
    {
      id: 3,
      title: "Memasukkan Field",
      instruction: "Di PivotTable Field List sebelah kanan, centang **Nama Produk** dan **Total Penjualan** untuk membuat Chart-nya.",
      targetCell: "C1",
      expectedValue: "Nama Produk",
      hint: "Di Excel asli, kamu akan menyeret field ke area Axis dan Values.",
    }
  ],

  // ==========================================
  // PIVOT CHART SIMULATION (MENGGUNAKAN SPREADSHEET)
  // ==========================================
  'pivotchart-simulation': [
    {
      id: 1,
      title: "1. Insert PivotChart",
      instruction: `
        <div class="space-y-4">
          <p>Pertama, blok seluruh data mentahmu, misalnya dari <strong>A1</strong> sampai <strong>G31</strong>.</p>
          <p>Lalu buka tab <strong>Insert</strong> di Ribbon dan klik tombol <strong>PivotChart</strong>.</p>
          <img src="/pivot1.png" alt="Insert PivotChart" class="w-full rounded-lg border-2 border-ink mt-4" />
        </div>
      `,
      targetCell: "A1",
      expectedValue: "Tanggal",
      hint: "Klik cell A1 di spreadsheet."
    },
    {
      id: 2,
      title: "2. Pop-up Create PivotChart",
      instruction: `
        <div class="space-y-4">
          <p>Setelah memilih PivotChart, akan muncul kotak dialog <strong>Create PivotChart</strong>.</p>
          <p>Perhatikan bagian <strong>Table/Range</strong>. Contoh <code>Sheet1!$A$1:$G$31</code> menunjukkan lokasi data yang akan digunakan.</p>
          <p>Pastikan rentang data sudah benar, pilih worksheet baru jika diperlukan, lalu klik <strong>OK</strong>.</p>
          <img src="/pivot2.png" alt="Pop-up Create PivotChart" class="w-full rounded-lg border-2 border-ink mt-4" />
        </div>
      `,
      targetCell: "B1",
      expectedValue: "No Transaksi",
      hint: "Pastikan data pada spreadsheet sesuai, lalu klik Lanjut."
    },
    {
      id: 3,
      title: "3. Mengenal Area Kerja",
      instruction: `
        <div class="space-y-4">
          <p>Setelah klik OK, Excel akan menampilkan area kerja PivotChart. Kenali dua bagian utamanya:</p>
          <ul class="list-disc pl-5 space-y-2">
            <li><strong>Area Chart:</strong> tempat grafik ditampilkan setelah field dipilih.</li>
            <li><strong>PivotTable Field List:</strong> daftar kolom yang berasal dari data mentah.</li>
          </ul>
          <img src="/pivot3.png" alt="Area kerja PivotChart" class="w-full rounded-lg border-2 border-ink mt-4" />
        </div>
      `,
      targetCell: null,
      expectedValue: null,
      hint: "Perhatikan bagian-bagian area kerja PivotChart, lalu klik Lanjut."
    },
    {
      id: 4,
      title: "4. Memilih Field untuk Grafik",
      instruction: `
        <div class="space-y-4">
          <p>Pilih data yang ingin ditampilkan melalui <strong>PivotTable Field List</strong>.</p>
          <ul class="list-disc pl-5 space-y-2">
            <li><strong>Nama Produk:</strong> menjadi kategori pada sumbu horizontal (<em>Axis / Categories</em>).</li>
            <li><strong>Total Penjualan:</strong> menjadi nilai yang dihitung dan ditampilkan (<em>Values</em>).</li>
          </ul>
          <p>Centang kedua field tersebut atau seret ke area Axis dan Values.</p>
          <img src="/pivot4.png" alt="Memilih field PivotChart" class="w-full rounded-lg border-2 border-ink mt-4" />
          <p>Grafik akan terbentuk berdasarkan total penjualan setiap produk.</p>
        </div>
      `,
      targetCell: null,
      expectedValue: null,
      hint: "Pelajari pemilihan field Nama Produk dan Total Penjualan, lalu klik Lanjut."
    }
  ],

  // ==========================================
  // MEMBUAT CHART
  // ==========================================
  'membuat-chart': [
    {
      id: 1,
      title: "Menyiapkan Data",
      instruction: "Ketik data singkat ini untuk membuat grafik: **A1**=`Produk`, **B1**=`Penjualan`. Lalu **A2**=`Apel`, **B2**=`100`. **A3**=`Jeruk`, **B3**=`200`. **A4**=`Mangga`, **B4**=`150`.",
      targetCell: "B4",
      expectedValue: "150",
      hint: "Isi tabel dari A1 sampai B4.",
    },
    {
      id: 2,
      title: "Membuat Grafik",
      instruction: "Di Excel asli, blok area **A1:B4**, lalu klik tab **Insert** dan pilih **Clustered Column**. Grafik akan langsung muncul di worksheet.",
      targetCell: null,
      expectedValue: null,
      hint: "Klik 'Lanjut' untuk menyelesaikan latihan.",
    }
  ],

};