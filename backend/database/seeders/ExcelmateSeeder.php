<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\LearningLevel;
use App\Models\Lesson;
use App\Models\LessonExample;
use App\Models\Exercise;
use App\Models\ExerciseOption;
use App\Models\Formula;

class ExcelmateSeeder extends Seeder
{
    public function run(): void
    {
        // 1. LEVELS
        $lvl1 = LearningLevel::create(['name' => 'Pemula', 'slug' => 'pemula', 'order' => 1]);
        $lvl2 = LearningLevel::create(['name' => 'Dasar', 'slug' => 'dasar', 'order' => 2]);
        $lvl3 = LearningLevel::create(['name' => 'Menengah', 'slug' => 'menengah', 'order' => 3]);
        $lvl4 = LearningLevel::create(['name' => 'Lanjutan', 'slug' => 'lanjutan', 'order' => 4]);

        // 2. CATEGORIES
        $catL1 = Category::create(['name' => 'Pengenalan Excel', 'slug' => 'pengenalan-excel', 'color' => 'mint', 'icon' => 'BookOpen']);
        $catL2 = Category::create(['name' => 'Rumus & Fungsi Dasar', 'slug' => 'rumus-dasar', 'color' => 'blue', 'icon' => 'Calculator']);
        $catL3 = Category::create(['name' => 'Rumus & Referensi Lanjutan', 'slug' => 'rumus-lanjutan', 'color' => 'lavender', 'icon' => 'GitBranch']);
        $catL4 = Category::create(['name' => 'Pengolahan & Pembersihan Data', 'slug' => 'pengolahan-data', 'color' => 'pink', 'icon' => 'BarChart']);
        $catL5 = Category::create(['name' => 'Analisis & Penyajian Data', 'slug' => 'analisis-data', 'color' => 'yellow', 'icon' => 'PieChart']);

        // 3. LESSONS DATA (29 Materi)
        $lessonsData = [
            // LEVEL 1
            [
                'category_id' => $catL1->id, 'learning_level_id' => $lvl1->id, 'order' => 1,
                'title' => 'Pengenalan Microsoft Excel dan Antarmuka', 'slug' => 'pengenalan-antarmuka-excel',
                'intro' => 'Kenali tampilan dasar Microsoft Excel dan bagian-bagiannya.',
                'content' => [
                    'apa_itu' => 'Microsoft Excel adalah aplikasi lembar kerja (spreadsheet) berbentuk tabel. Tampilannya terdiri dari kotak-kotak kecil yang disebut Cell.',
                    'mengapa' => 'Sebelum bisa membuat rumus, kamu wajib tahu cara membaca posisi sebuah cell dan bagian-bagian antarmuka Excel.',
                    'sintaks' => "Bagian penting antarmuka:\n1. Ribbon: Menu di bagian atas (Home, Insert, dll).\n2. Formula Bar: Tempat melihat/menulis isi cell.\n3. Grid: Area kotak-kotak berisi Kolom (A, B, C) dan Baris (1, 2, 3)."
                ],
            ],
            [
                'category_id' => $catL1->id, 'learning_level_id' => $lvl1->id, 'order' => 2,
                'title' => 'Workbook, Worksheet, Row, Column, Cell, dan Range', 'slug' => 'workbook-worksheet-cell',
                'intro' => 'Pahami istilah dasar seperti Workbook, Worksheet, Row, Column, Cell, dan Range.',
                'content' => [
                    'apa_itu' => 'Workbook adalah satu file Excel utuh. Di dalamnya terdapat beberapa Worksheet (lembar kerja). Setiap pertemuan Kolom dan Baris disebut Cell (contoh: A1). Kumpulan cell disebut Range (contoh: A1:B5).',
                    'mengapa' => 'Memahami istilah ini penting agar kamu tidak bingung saat membaca tutorial Excel.',
                    'sintaks' => "Contoh Penulisan:\n- Cell tunggal: A1\n- Range vertikal: A1:A10\n- Range horizontal: A1:J1"
                ],
            ],
            [
                'category_id' => $catL1->id, 'learning_level_id' => $lvl1->id, 'order' => 3,
                'title' => 'Memasukkan, Mengedit, dan Menghapus Data', 'slug' => 'input-edit-hapus-data',
                'intro' => 'Belajar cara mengetik, memperbaiki, dan menghapus data di Excel.',
                'content' => [
                    'apa_itu' => 'Untuk memasukkan data, klik cell lalu ketik. Untuk mengedit, tekan F2 atau klik dua kali. Untuk menghapus, tekan tombol Delete (menghapus isi) atau klik kanan > Delete (menghapus baris/kolom).',
                    'mengapa' => 'Ini adalah operasi paling dasar yang akan kamu lakukan setiap hari di Excel.',
                    'sintaks' => "Tips:\n- Tekan Enter untuk menyimpan dan pindah ke bawah.\n- Tekan Tab untuk menyimpan dan pindah ke kanan."
                ],
            ],
            [
                'category_id' => $catL1->id, 'learning_level_id' => $lvl1->id, 'order' => 4,
                'title' => 'Mengatur Workbook, Worksheet, Baris, dan Kolom', 'slug' => 'mengatur-workbook-worksheet',
                'intro' => 'Cara menambah, menghapus, mengganti nama sheet, dan mengatur lebar kolom/baris.',
                'content' => [
                    'apa_itu' => 'Workbook bisa berisi banyak Worksheet. Kamu bisa menambah sheet baru dengan klik ikon +, mengganti nama dengan klik kanan tab sheet, dan mengatur lebar kolom dengan drag garis di antara header kolom.',
                    'mengapa' => 'Mengatur workbook yang rapi memudahkan navigasi dan pencarian data.',
                    'sintaks' => "Cara:\n- Tambah Sheet: Klik + di tab sheet.\n- Ganti Nama: Klik kanan tab > Rename.\n- Lebar Kolom: Drag garis di header kolom."
                ],
            ],
            [
                'category_id' => $catL1->id, 'learning_level_id' => $lvl1->id, 'order' => 5,
                'title' => 'Format Cell: Angka, Tanggal, Mata Uang, dan Persentase', 'slug' => 'format-cell',
                'intro' => 'Mengatur format angka, mata uang, tanggal, dan persentase.',
                'content' => [
                    'apa_itu' => 'Excel bisa mengubah tampilan angka menjadi Rupiah, persentase, atau tanggal tanpa mengubah nilai aslinya. Caranya ada di menu Home > Number Format.',
                    'mengapa' => 'Laporan keuangan akan terlihat lebih profesional jika angka ditampilkan sebagai mata uang (Rp) dan rapi.',
                    'sintaks' => "Contoh:\n- 1000 diubah ke format Rupiah menjadi Rp1.000\n- 0.5 diubah ke format Persentase menjadi 50%"
                ],
            ],
            [
                'category_id' => $catL1->id, 'learning_level_id' => $lvl1->id, 'order' => 6,
                'title' => 'Operasi Matematika dan Operator Excel', 'slug' => 'operasi-matematika',
                'intro' => 'Melakukan perhitungan dasar (+, -, *, /, ^) di Excel.',
                'content' => [
                    'apa_itu' => 'Excel bisa digunakan seperti kalkulator. Kamu cukup mengetikkan tanda sama dengan (=) di awal, lalu masukkan angka dan operator matematika.',
                    'mengapa' => 'Lebih efisien daripada memakai kalkulator terpisah, karena hasilnya bisa langsung masuk ke dalam tabel.',
                    'sintaks' => "Operator Excel:\n+ (Tambah)\n- (Kurang)\n* (Kali)\n/ (Bagi)\n^ (Pangkat)\n\nContoh: =10 + 5 * 2"
                ],
            ],

            // LEVEL 2
            [
                'category_id' => $catL2->id, 'learning_level_id' => $lvl2->id, 'order' => 7,
                'title' => 'SUM — Menjumlahkan Data', 'slug' => 'fungsi-sum',
                'intro' => 'Menjumlahkan banyak angka sekaligus dengan cepat.',
                'content' => [
                    'apa_itu' => 'SUM adalah fungsi untuk menjumlahkan seluruh angka dalam sebuah rentang.',
                    'mengapa' => 'Menghemat waktu dan mengurangi kesalahan hitung manual.',
                    'sintaks' => "=SUM(number1, [number2], ...)\nContoh: =SUM(A1:A10)"
                ],
            ],
            [
                'category_id' => $catL2->id, 'learning_level_id' => $lvl2->id, 'order' => 8,
                'title' => 'AVERAGE — Menghitung Rata-rata', 'slug' => 'fungsi-average',
                'intro' => 'Menghitung nilai rata-rata dari sekumpulan data.',
                'content' => [
                    'apa_itu' => 'AVERAGE menjumlahkan semua angka lalu membaginya dengan jumlah data.',
                    'mengapa' => 'Memberikan gambaran umum tentang performa data tanpa harus menghitung manual.',
                    'sintaks' => "=AVERAGE(number1, [number2], ...)\nContoh: =AVERAGE(B2:B10)"
                ],
            ],
            [
                'category_id' => $catL2->id, 'learning_level_id' => $lvl2->id, 'order' => 9,
                'title' => 'MAX dan MIN — Mencari Nilai Tertinggi dan Terendah', 'slug' => 'fungsi-max-min',
                'intro' => 'Mencari nilai tertinggi (MAX) dan terendah (MIN).',
                'content' => [
                    'apa_itu' => 'MAX mencari angka paling besar, MIN mencari angka paling kecil dari sebuah rentang data.',
                    'mengapa' => 'Berguna untuk mencari siapa siswa dengan nilai tertinggi, atau produk dengan penjualan terendah.',
                    'sintaks' => "=MAX(range) / =MIN(range)\nContoh: =MAX(C1:C10)"
                ],
            ],
            [
                'category_id' => $catL2->id, 'learning_level_id' => $lvl2->id, 'order' => 10,
                'title' => 'COUNT, COUNTA, dan COUNTBLANK', 'slug' => 'fungsi-count',
                'intro' => 'Menghitung jumlah cell yang berisi angka, teks, atau kosong.',
                'content' => [
                    'apa_itu' => 'COUNT menghitung jumlah cell berisi angka. COUNTA menghitung cell yang tidak kosong (termasuk teks). COUNTBLANK menghitung cell yang kosong.',
                    'mengapa' => 'Sangat membantu saat kita ingin tahu ada berapa banyak data yang sudah terisi dalam sebuah tabel.',
                    'sintaks' => "=COUNT(range) / =COUNTA(range) / =COUNTBLANK(range)"
                ],
            ],
            [
                'category_id' => $catL2->id, 'learning_level_id' => $lvl2->id, 'order' => 11,
                'title' => 'IF — Membuat Kondisi Logika', 'slug' => 'fungsi-if',
                'intro' => 'Membuat keputusan otomatis berdasarkan kondisi tertentu.',
                'content' => [
                    'apa_itu' => 'Fungsi IF mengecek apakah suatu kondisi BENAR atau SALAH. Jika benar, hasil A muncul. Jika salah, hasil B muncul.',
                    'mengapa' => 'Sangat penting untuk membuat laporan otomatis, seperti menentukan status kelulusan (Lulus/Tidak Lulus).',
                    'sintaks' => "=IF(logical_test, value_if_true, value_if_false)\nContoh: =IF(A1>=75, \"Lulus\", \"Gagal\")"
                ],
            ],
            [
                'category_id' => $catL2->id, 'learning_level_id' => $lvl2->id, 'order' => 12,
                'title' => 'AND, OR, dan IF Bertingkat', 'slug' => 'fungsi-and-or',
                'intro' => 'Menggabungkan beberapa kondisi logika.',
                'content' => [
                    'apa_itu' => 'AND bernilai BENAR jika semua kondisi terpenuhi. OR bernilai BENAR jika salah satu kondisi terpenuhi. IF bertingkat artinya IF di dalam IF.',
                    'mengapa' => 'Membuat logika yang lebih kompleks, seperti diskon jika belanja > 100rb DAN member VIP.',
                    'sintaks' => "=IF(AND(A1>10, B1<5), \"Ya\", \"Tidak\")"
                ],
            ],
            [
                'category_id' => $catL2->id, 'learning_level_id' => $lvl2->id, 'order' => 13,
                'title' => 'SUMIF dan SUMIFS', 'slug' => 'fungsi-sumif-sumifs',
                'intro' => 'Menjumlahkan data berdasarkan kriteria tertentu.',
                'content' => [
                    'apa_itu' => 'SUMIF menjumlahkan data hanya jika memenuhi satu kriteria. SUMIFS bisa digunakan untuk banyak kriteria sekaligus.',
                    'mengapa' => 'Sangat berguna saat ingin menghitung total penjualan khusus untuk produk tertentu saja.',
                    'sintaks' => "=SUMIF(range_kriteria, kriteria, range_jumlah)\nContoh: =SUMIF(A1:A10, \"Apel\", B1:B10)"
                ],
            ],
            [
                'category_id' => $catL2->id, 'learning_level_id' => $lvl2->id, 'order' => 14,
                'title' => 'COUNTIF dan COUNTIFS', 'slug' => 'fungsi-countif',
                'intro' => 'Menghitung jumlah data berdasarkan kriteria tertentu.',
                'content' => [
                    'apa_itu' => 'COUNTIF menghitung berapa banyak data yang cocok dengan kriteria tertentu.',
                    'mengapa' => 'Misalnya, ingin menghitung ada berapa banyak siswa laki-laki di kelas.',
                    'sintaks' => "=COUNTIF(range, kriteria)\nContoh: =COUNTIF(B2:B100, \"Laki-laki\")"
                ],
            ],
            [
                'category_id' => $catL2->id, 'learning_level_id' => $lvl2->id, 'order' => 15,
                'title' => 'AVERAGEIF dan AVERAGEIFS', 'slug' => 'fungsi-averageif',
                'intro' => 'Menghitung rata-rata data berdasarkan kriteria tertentu.',
                'content' => [
                    'apa_itu' => 'AVERAGEIF mencari rata-rata hanya untuk data yang memenuhi kriteria.',
                    'mengapa' => 'Berguna untuk mencari rata-rata nilai khusus untuk siswa perempuan saja, misalnya.',
                    'sintaks' => "=AVERAGEIF(range_kriteria, kriteria, range_rata-rata)"
                ],
            ],
            [
                'category_id' => $catL2->id, 'learning_level_id' => $lvl2->id, 'order' => 16,
                'title' => 'Fungsi Teks: LEFT, RIGHT, MID, LEN, TRIM, dan CONCAT', 'slug' => 'fungsi-teks',
                'intro' => 'Mengolah data teks seperti memotong dan menggabungkan.',
                'content' => [
                    'apa_itu' => 'LEFT mengambil teks dari kiri, RIGHT dari kanan, MID dari tengah, LEN menghitung panjang teks, TRIM menghapus spasi berlebih, CONCAT menggabungkan teks.',
                    'mengapa' => 'Sangat penting saat mengolah data nama, alamat, atau kode barang.',
                    'sintaks' => "=LEFT(A1, 3) // Ambil 3 huruf dari kiri\n=CONCAT(A1, B1) // Gabungkan isi A1 dan B1"
                ],
            ],

            // LEVEL 3
            [
                'category_id' => $catL3->id, 'learning_level_id' => $lvl3->id, 'order' => 17,
                'title' => 'Relative, Absolute, dan Mixed Cell Reference', 'slug' => 'cell-reference',
                'intro' => 'Memahami perbedaan referensi sel relatif (A1), absolut ($A$1), dan campuran ($A1 / A$1).',
                'content' => [
                    'apa_itu' => 'Relative (A1): Berubah saat copy-paste. Absolut (\$A\$1): Tetap saat copy-paste. Mixed (\$A1 atau A\$1): Hanya baris atau kolom yang tetap.',
                    'mengapa' => 'Kunci untuk membuat rumus yang bisa di-copy ke seluruh tabel tanpa harus mengetik ulang.',
                    'sintaks' => "Relative: =A1\nAbsolut: =\$A\$1\nMixed: =\$A1 atau =A\$1"
                ],
            ],
            [
                'category_id' => $catL3->id, 'learning_level_id' => $lvl3->id, 'order' => 18,
                'title' => 'Fungsi Tanggal dan Waktu', 'slug' => 'fungsi-tanggal-waktu',
                'intro' => 'Mengolah data tanggal dan waktu dengan TODAY, NOW, DAY, MONTH, YEAR, dll.',
                'content' => [
                    'apa_itu' => 'Excel menyimpan tanggal sebagai angka serial. Fungsi seperti TODAY(), NOW(), DAY(), MONTH(), YEAR() membantu mengekstrak informasi dari tanggal.',
                    'mengapa' => 'Sangat penting untuk laporan keuangan, absensi, atau jadwal proyek.',
                    'sintaks' => "=TODAY() // Tanggal hari ini\n=MONTH(A1) // Mengambil bulan dari tanggal di A1"
                ],
            ],
            [
                'category_id' => $catL3->id, 'learning_level_id' => $lvl3->id, 'order' => 19,
                'title' => 'VLOOKUP, HLOOKUP, dan XLOOKUP', 'slug' => 'fungsi-lookup',
                'intro' => 'Mencari data dari tabel referensi. Sangat berguna untuk menggabungkan data dari dua tabel berbeda.',
                'content' => [
                    'apa_itu' => 'VLOOKUP mencari nilai di kolom paling kiri sebuah tabel, lalu mengembalikan nilai dari kolom lain. HLOOKUP secara horizontal. XLOOKUP versi modern yang lebih fleksibel.',
                    'mengapa' => 'Sangat sering dipakai di dunia kerja untuk menggabungkan dua tabel data yang berbeda.',
                    'sintaks' => "=VLOOKUP(nilai_dicari, tabel_referensi, nomor_kolom, FALSE)\n=VLOOKUP(D2, A2:B10, 2, FALSE)"
                ],
            ],
            [
                'category_id' => $catL3->id, 'learning_level_id' => $lvl3->id, 'order' => 20,
                'title' => 'IFERROR dan Penanganan Kesalahan Formula', 'slug' => 'fungsi-iferror',
                'intro' => 'Menangani error seperti #N/A, #DIV/0!, atau #VALUE! agar laporan tetap rapi.',
                'content' => [
                    'apa_itu' => 'IFERROR membungkus rumus. Jika rumus menghasilkan error, ia akan menampilkan nilai alternatif (misal: "Data tidak ditemukan" atau 0) alih-alih pesan error.',
                    'mengapa' => 'Membuat laporan terlihat profesional dan mudah dibaca, tanpa pesan error yang menakutkan.',
                    'sintaks' => "=IFERROR(rumus, nilai_jika_error)\nContoh: =IFERROR(VLOOKUP(...), \"Tidak ada\")"
                ],
            ],

            // LEVEL 4
            [
                'category_id' => $catL4->id, 'learning_level_id' => $lvl3->id, 'order' => 21,
                'title' => 'Excel Table', 'slug' => 'excel-table',
                'intro' => 'Mengubah data menjadi Table agar otomatis terformat dan mudah difilter.',
                'content' => [
                    'apa_itu' => 'Excel Table adalah fitur untuk mengonversi range data menjadi tabel terstruktur. Rumus dan format akan otomatis mengikuti saat data ditambah.',
                    'mengapa' => 'Sangat memudahkan pengelolaan data yang terus bertambah.',
                    'sintaks' => "Pilih data > Insert > Table (Ctrl+T)."
                ],
            ],
            [
                'category_id' => $catL4->id, 'learning_level_id' => $lvl3->id, 'order' => 22,
                'title' => 'Sorting dan Filtering Data', 'slug' => 'sorting-filtering',
                'intro' => 'Mengurutkan data dan menyaring data berdasarkan kriteria.',
                'content' => [
                    'apa_itu' => 'Sorting mengurutkan data (A-Z atau Z-A). Filter menyembunyikan baris yang tidak sesuai kriteria.',
                    'mengapa' => 'Membantu menemukan data spesifik dengan cepat.',
                    'sintaks' => "Sort: Tab Data > Sort.\nFilter: Tab Data > Filter (Ctrl+Shift+L)."
                ],
            ],
            [
                'category_id' => $catL4->id, 'learning_level_id' => $lvl3->id, 'order' => 23,
                'title' => 'Conditional Formatting', 'slug' => 'conditional-formatting',
                'intro' => 'Mewarnai cell otomatis berdasarkan aturan tertentu.',
                'content' => [
                    'apa_itu' => 'Conditional Formatting memberi warna atau ikon pada cell yang memenuhi kondisi. Contoh: nilai di bawah 70 berwarna merah.',
                    'mengapa' => 'Membuat data penting langsung terlihat secara visual.',
                    'sintaks' => "Tab Home > Conditional Formatting > Pilih aturan."
                ],
            ],
            [
                'category_id' => $catL4->id, 'learning_level_id' => $lvl3->id, 'order' => 24,
                'title' => 'Data Validation dan Dropdown', 'slug' => 'data-validation',
                'intro' => 'Membatasi input data dan membuat dropdown list.',
                'content' => [
                    'apa_itu' => 'Data Validation membatasi jenis data yang boleh dimasukkan (misal hanya 1-100). Bisa juga digunakan untuk membuat dropdown list.',
                    'mengapa' => 'Mencegah kesalahan input data.',
                    'sintaks' => "Tab Data > Data Validation."
                ],
            ],
            [
                'category_id' => $catL4->id, 'learning_level_id' => $lvl3->id, 'order' => 25,
                'title' => 'Data Cleaning: Remove Duplicates, Find & Replace, Text to Columns, dan Flash Fill', 'slug' => 'data-cleaning',
                'intro' => 'Membersihkan data kotor agar siap dianalisis.',
                'content' => [
                    'apa_itu' => 'Kumpulan fitur untuk membersihkan data: menghapus duplikat, mencari & mengganti, memisahkan teks ke kolom, dan mengisi data otomatis dengan pola.',
                    'mengapa' => 'Data kotor menghasilkan analisis yang salah. Pembersihan adalah langkah wajib.',
                    'sintaks' => "Tab Data > Remove Duplicates / Text to Columns.\nTab Home > Find & Select > Replace."
                ],
            ],

            // LEVEL 5
            [
                'category_id' => $catL5->id, 'learning_level_id' => $lvl4->id, 'order' => 26,
                'title' => 'Membuat Chart dan Grafik', 'slug' => 'membuat-chart',
                'intro' => 'Mengubah data menjadi grafik visual (Column, Line, Pie, dll).',
                'content' => [
                    'apa_itu' => 'Chart adalah representasi visual dari data. Excel menyediakan berbagai jenis chart seperti Column, Line, Pie, Bar, dan Scatter.',
                    'mengapa' => 'Grafik memudahkan pembaca memahami tren dan pola data.',
                    'sintaks' => "Pilih data > Insert > Chart."
                ],
            ],
            [
                'category_id' => $catL5->id, 'learning_level_id' => $lvl4->id, 'order' => 27,
                'title' => 'PivotTable dan PivotChart', 'slug' => 'pivottable-dashboard',
                'intro' => 'Merangkum ribuan data menjadi tabel ringkas dan grafik interaktif.',
                'content' => [
                    'apa_itu' => 'PivotTable merangkum data besar menjadi tabel ringkas. PivotChart adalah versi grafik dari PivotTable.',
                    'mengapa' => 'Dibutuhkan oleh manajer atau analis untuk mengambil keputusan bisnis.',
                    'sintaks' => "Pilih data > Insert > PivotTable."
                ],
            ],
            [
                'category_id' => $catL5->id, 'learning_level_id' => $lvl4->id, 'order' => 28,
                'title' => 'Membuat Dashboard Sederhana', 'slug' => 'membuat-dashboard',
                'intro' => 'Menggabungkan beberapa chart dan PivotTable menjadi satu layar dashboard.',
                'content' => [
                    'apa_itu' => 'Dashboard adalah kumpulan grafik dan ringkasan data yang diletakkan dalam satu worksheet, memberikan gambaran menyeluruh tentang data.',
                    'mengapa' => 'Memudahkan pengambilan keputusan karena semua informasi penting terlihat sekaligus.',
                    'sintaks' => "Buat beberapa chart, atur layout, lalu gabungkan dengan slicer."
                ],
            ],
            [
                'category_id' => $catL5->id, 'learning_level_id' => $lvl4->id, 'order' => 29,
                'title' => 'Page Layout, Print Area, dan Pengaturan Cetak', 'slug' => 'page-layout-print',
                'intro' => 'Mengatur tampilan halaman dan area yang akan dicetak.',
                'content' => [
                    'apa_itu' => 'Page Layout mengatur orientasi kertas, margin, dan ukuran. Print Area menentukan bagian mana yang akan dicetak.',
                    'mengapa' => 'Memastikan hasil cetak rapi dan tidak terpotong.',
                    'sintaks' => "Tab Page Layout > Print Area > Set Print Area."
                ],
            ],
        ];

        foreach ($lessonsData as $data) {
            $lesson = Lesson::create($data);
            LessonExample::create([
                'lesson_id' => $lesson->id, 'title' => 'Contoh Penerapan ' . $lesson->title,
                'case_description' => 'Perhatikan contoh penggunaan fungsi ini.',
                'data_table' => [['Data 1', '100'], ['Data 2', '200']],
                'question' => 'Bagaimana cara mengaplikasikannya?', 'formula_used' => 'Lihat sintaks.',
                'steps' => ['Langkah 1', 'Langkah 2'], 'final_result' => 'Selesai.',
            ]);
            for ($i = 1; $i <= 5; $i++) {
                $ex = Exercise::create(['lesson_id' => $lesson->id, 'question' => 'Soal ' . $i, 'type' => 'multiple_choice', 'order' => $i]);
                ExerciseOption::create(['exercise_id' => $ex->id, 'label' => 'A', 'text' => 'Benar', 'is_correct' => true]);
                ExerciseOption::create(['exercise_id' => $ex->id, 'label' => 'B', 'text' => 'Salah', 'is_correct' => false]);
            }
        }

        // 5. KAMUS RUMUS
        $formulas = [
            ['name' => 'SUM', 'slug' => 'sum', 'cat' => 'Matematika', 'desc' => 'Menjumlahkan angka.', 'syntax' => '=SUM(number1, ...)', 'ex' => '=SUM(B1:B3)', 'case' => 'Menjumlahkan total belanja.', 'res' => 'Total belanja Rp45.000.', 'before' => [['Beras', '15000'], ['Minyak', '20000'], ['Gula', '10000'], ['Total', '=SUM(B1:B3)']], 'after' => [['Beras', '15000'], ['Minyak', '20000'], ['Gula', '10000'], ['Total', '45000']], 'hl_before' => ['B4'], 'hl_after' => ['B4']],
            ['name' => 'AVERAGE', 'slug' => 'average', 'cat' => 'Statistik', 'desc' => 'Rata-rata.', 'syntax' => '=AVERAGE(number1, ...)', 'ex' => '=AVERAGE(B1:B3)', 'case' => 'Rata-rata nilai ujian.', 'res' => 'Rata-rata 80.', 'before' => [['Siswa A', '80'], ['Siswa B', '90'], ['Siswa C', '70'], ['Rata-rata', '=AVERAGE(B1:B3)']], 'after' => [['Siswa A', '80'], ['Siswa B', '90'], ['Siswa C', '70'], ['Rata-rata', '80']], 'hl_before' => ['B4'], 'hl_after' => ['B4']],
            ['name' => 'VLOOKUP', 'slug' => 'vlookup', 'cat' => 'Lookup', 'desc' => 'Mencari data.', 'syntax' => '=VLOOKUP(...)', 'ex' => '=VLOOKUP(D1, A1:B3, 2, FALSE)', 'case' => 'Mencari harga Jeruk.', 'res' => 'Harga 7000.', 'before' => [['Apel', '5000', '', 'Jeruk', '=VLOOKUP(D1, A1:B3, 2, FALSE)'], ['Jeruk', '7000', '', '', ''], ['Mangga', '8000', '', '', '']], 'after' => [['Apel', '5000', '', 'Jeruk', '7000'], ['Jeruk', '7000', '', '', ''], ['Mangga', '8000', '', '', '']], 'hl_before' => ['E1'], 'hl_after' => ['E1']],
        ];

        foreach ($formulas as $f) {
            Formula::create([
                'name' => $f['name'], 'slug' => $f['slug'], 'category' => $f['cat'],
                'description' => $f['desc'], 'syntax' => $f['syntax'], 'example' => $f['ex'],
                'study_case' => $f['case'] ?? null, 'study_result' => $f['res'] ?? null,
                'case_table_before' => $f['before'] ?? null, 'case_table_after' => $f['after'] ?? null,
                'result' => 'Hasil perhitungan', 'excel_versions' => 'Semua versi',
            ]);
        }
    }
}