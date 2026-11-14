export const tutorialData: Record<string, any[]> = {
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
      hint: "Klik cell A2, ketik Excel, lalu Enter.",
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
      title: "Memahami Tujuan",
      instruction: "Hari ini kita akan belajar menghitung total penjualan menggunakan rumus SUM.",
      targetCell: null,
      expectedValue: null,
      hint: "Baca penjelasan di atas, lalu klik 'Selanjutnya'.",
    },
    {
      id: 2,
      title: "Memasukkan Judul",
      instruction: "Klik cell **A1**, ketik `Nama Barang` dan tekan Enter.",
      targetCell: "A1",
      expectedValue: "Nama Barang",
      hint: "Klik A1, ketik Nama Barang, lalu Enter.",
    },
    {
      id: 3,
      title: "Memasukkan Angka",
      instruction: "Klik cell **B1**, ketik `10000` dan tekan Enter.",
      targetCell: "B1",
      expectedValue: "10000",
      hint: "Klik B1, ketik 10000, lalu Enter.",
    },
    {
      id: 4,
      title: "Menulis Rumus",
      instruction: "Klik cell **B2**, ketik `=SUM(B1:B1)` lalu tekan Enter. Amati hasilnya.",
      targetCell: "B2",
      expectedValue: "=SUM(B1:B1)",
      hint: "Ketik =SUM(B1:B1) di cell B2.",
    },
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
  ],

  // ==========================================
  // LEVEL 4: ANALISIS & PENGOLAHAN LANJUTAN
  // ==========================================
  'fungsi-lookup': [
    {
      id: 1,
      title: "Membuat Tabel Referensi",
      instruction: "Isi **A1**=`Apel`, **B1**=`5000`. Lalu **A2**=`Jeruk`, **B2**=`7000`.",
      targetCell: "A1",
      expectedValue: "Apel",
      hint: "Buat tabel daftar harga.",
    },
    {
      id: 2,
      title: "Mencari Data (VLOOKUP)",
      instruction: "Klik **D1** ketik `Jeruk`. Lalu klik **E1**, ketik `=VLOOKUP(D1, A1:B2, 2, FALSE)` lalu Enter. (Mencari harga Jeruk).",
      targetCell: "E1",
      expectedValue: "=VLOOKUP(D1, A1:B2, 2, FALSE)",
      hint: "Ketik rumus VLOOKUP di E1.",
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
  ],

  'pivottable-dashboard': [
    {
      id: 1,
      title: "Menyiapkan Data Mentah",
      instruction: "PivotTable butuh data. Ketik `Sales` di **A1**, dan `100` di **B1**.",
      targetCell: "A1",
      expectedValue: "Sales",
      hint: "Ketik Sales di A1.",
    },
    {
      id: 2,
      title: "Membayangkan Pivot",
      instruction: "Di Excel asli, kamu akan memilih data ini dan mengklik 'Insert > PivotTable'. Untuk saat ini, ketik `Selesai` di **C1**.",
      targetCell: "C1",
      expectedValue: "Selesai",
      hint: "Ketik Selesai di C1.",
    }
  ]
};