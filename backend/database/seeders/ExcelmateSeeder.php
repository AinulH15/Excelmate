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
        // ==========================================
        // 1. LEVELS
        // ==========================================
        $lvlPemula = LearningLevel::create(['name' => 'Pemula', 'slug' => 'pemula', 'order' => 1]);
        $lvlDasar = LearningLevel::create(['name' => 'Dasar', 'slug' => 'dasar', 'order' => 2]);
        $lvlMenengah = LearningLevel::create(['name' => 'Menengah', 'slug' => 'menengah', 'order' => 3]);
        $lvlLanjutan = LearningLevel::create(['name' => 'Lanjutan', 'slug' => 'lanjutan', 'order' => 4]);

        // ==========================================
        // 2. CATEGORIES
        // ==========================================
        $catL1 = Category::create(['name' => 'Dasar Excel', 'slug' => 'dasar-excel', 'color' => 'mint', 'icon' => 'BookOpen']);
        $catL2 = Category::create(['name' => 'Rumus & Fungsi Dasar', 'slug' => 'rumus-dasar', 'color' => 'blue', 'icon' => 'Calculator']);
        $catL3 = Category::create(['name' => 'Pengolahan Data', 'slug' => 'pengolahan-data', 'color' => 'lavender', 'icon' => 'BarChart']);
        $catL4 = Category::create(['name' => 'Analisis Lanjutan', 'slug' => 'analisis-lanjutan', 'color' => 'pink', 'icon' => 'GitBranch']);

        // ==========================================
        // 3. LESSONS DATA (18 Materi Lengkap)
        // ==========================================
        $lessonsData = [
            // LEVEL 1
            [
                'category_id' => $catL1->id, 'learning_level_id' => $lvlPemula->id, 'order' => 1,
                'title' => 'Pengenalan Antarmuka Excel', 'slug' => 'pengenalan-antarmuka-excel',
                'intro' => 'Kenali tampilan dasar Microsoft Excel dan bagian-bagiannya.',
                'content' => [
                    'apa_itu' => "Microsoft Excel adalah aplikasi lembar kerja (spreadsheet) berbentuk tabel. Tampilannya terdiri dari kotak-kotak kecil yang disebut **Cell**.",
                    'mengapa' => "Sebelum bisa membuat rumus, kamu wajib tahu cara membaca posisi sebuah cell dan bagian-bagian antarmuka Excel.",
                    'sintaks' => "Bagian penting antarmuka:\n1. Ribbon: Menu di bagian atas (Home, Insert, dll).\n2. Formula Bar: Tempat melihat/menulis isi cell.\n3. Grid: Area kotak-kotak berisi Kolom (A, B, C) dan Baris (1, 2, 3)."
                ],
            ],
            [
                'category_id' => $catL1->id, 'learning_level_id' => $lvlPemula->id, 'order' => 2,
                'title' => 'Workbook, Worksheet, Cell & Range', 'slug' => 'workbook-worksheet-cell',
                'intro' => 'Pahami istilah dasar seperti Workbook, Worksheet, Cell, dan Range.',
                'content' => [
                    'apa_itu' => "Workbook adalah satu file Excel utuh. Di dalamnya terdapat beberapa Worksheet (lembar kerja). Setiap pertemuan Kolom dan Baris disebut Cell (contoh: A1). Kumpulan cell disebut Range (contoh: A1:B5).",
                    'mengapa' => "Memahami istilah ini penting agar kamu tidak bingung saat membaca tutorial Excel.",
                    'sintaks' => "Contoh Penulisan:\n- Cell tunggal: A1\n- Range vertikal: A1:A10\n- Range horizontal: A1:J1"
                ],
            ],
            [
                'category_id' => $catL1->id, 'learning_level_id' => $lvlPemula->id, 'order' => 3,
                'title' => 'Memasukkan, Mengedit & Menghapus', 'slug' => 'input-edit-hapus-data',
                'intro' => 'Belajar cara mengetik, memperbaiki, dan menghapus data di Excel.',
                'content' => [
                    'apa_itu' => "Untuk memasukkan data, klik cell lalu ketik. Untuk mengedit, tekan F2 atau klik dua kali. Untuk menghapus, tekan tombol Delete (menghapus isi) atau klik kanan > Delete (menghapus baris/kolom).",
                    'mengapa' => "Ini adalah operasi paling dasar yang akan kamu lakukan setiap hari di Excel.",
                    'sintaks' => "Tips:\n- Tekan Enter untuk menyimpan dan pindah ke bawah.\n- Tekan Tab untuk menyimpan dan pindah ke kanan."
                ],
            ],
            [
                'category_id' => $catL1->id, 'learning_level_id' => $lvlPemula->id, 'order' => 4,
                'title' => 'Format Cell & Angka', 'slug' => 'format-cell',
                'intro' => 'Mengatur format angka, mata uang, tanggal, dan persentase.',
                'content' => [
                    'apa_itu' => "Excel bisa mengubah tampilan angka menjadi Rupiah, persentase, atau tanggal tanpa mengubah nilai aslinya. Caranya ada di menu Home > Number Format.",
                    'mengapa' => "Laporan keuangan akan terlihat lebih profesional jika angka ditampilkan sebagai mata uang (Rp) dan rapi.",
                    'sintaks' => "Contoh:\n- 1000 diubah ke format Rupiah menjadi Rp1.000\n- 0.5 diubah ke format Persentase menjadi 50%"
                ],
            ],
            [
                'category_id' => $catL1->id, 'learning_level_id' => $lvlPemula->id, 'order' => 5,
                'title' => 'Operasi Matematika Dasar', 'slug' => 'operasi-matematika',
                'intro' => 'Pelajari cara menggunakan Excel sebagai kalkulator untuk penjumlahan, pengurangan, perkalian, dan pembagian.',
                'content' => [
                    'apa_itu' => "Microsoft Excel bisa digunakan seperti kalkulator. Kamu cukup mengetikkan tanda sama dengan (=) di awal, lalu masukkan angka dan operator matematika.\n\nAda 4 operator dasar yang harus kamu hafal:\n- Tanda + untuk penjumlahan\n- Tanda - untuk pengurangan\n- Tanda * (bintang) untuk perkalian\n- Tanda / (garis miring) untuk pembagian\n\nSelalu awali dengan tanda = agar Excel tahu bahwa yang kamu ketik adalah rumus, bukan teks biasa.",
                    'mengapa' => "Menggunakan Excel sebagai kalkulator jauh lebih praktis karena hasil perhitungan bisa langsung masuk ke dalam tabel data. Jika data aslinya diubah, hasilnya juga otomatis berubah tanpa perlu menghitung ulang manual.",
                    'sintaks' => "Contoh Penulisan Rumus:\n\n=10 + 5 (Hasil: 15)\n=20 - 8 (Hasil: 12)\n=4 * 5 (Hasil: 20)\n=100 / 4 (Hasil: 25)\n\nBisa juga menggunakan alamat cell:\n=A1 + B1 (Menjumlahkan isi cell A1 dan B1)"
                ],
            ],
            // LEVEL 2
            [
                'category_id' => $catL2->id, 'learning_level_id' => $lvlDasar->id, 'order' => 6,
                'title' => 'Fungsi SUM', 'slug' => 'fungsi-sum',
                'intro' => 'Menjumlahkan banyak angka sekaligus dengan cepat.',
                'content' => [
                    'apa_itu' => "SUM adalah fungsi untuk menjumlahkan seluruh angka dalam sebuah rentang.",
                    'mengapa' => "Menghemat waktu dan mengurangi kesalahan hitung manual.",
                    'sintaks' => "=SUM(number1, [number2], ...)\nContoh: =SUM(A1:A10)"
                ],
            ],
            [
                'category_id' => $catL2->id, 'learning_level_id' => $lvlDasar->id, 'order' => 7,
                'title' => 'Fungsi AVERAGE', 'slug' => 'fungsi-average',
                'intro' => 'Menghitung nilai rata-rata dari sekumpulan data.',
                'content' => [
                    'apa_itu' => "AVERAGE menjumlahkan semua angka lalu membaginya dengan jumlah data.",
                    'mengapa' => "Memberikan gambaran umum tentang performa data tanpa harus menghitung manual.",
                    'sintaks' => "=AVERAGE(number1, [number2], ...)\nContoh: =AVERAGE(B2:B10)"
                ],
            ],
            [
                'category_id' => $catL2->id, 'learning_level_id' => $lvlDasar->id, 'order' => 8,
                'title' => 'Fungsi MAX dan MIN', 'slug' => 'fungsi-max-min',
                'intro' => 'Mencari nilai tertinggi (MAX) dan terendah (MIN).',
                'content' => [
                    'apa_itu' => "MAX mencari angka paling besar, MIN mencari angka paling kecil dari sebuah rentang data.",
                    'mengapa' => "Berguna untuk mencari siapa siswa dengan nilai tertinggi, atau produk dengan penjualan terendah.",
                    'sintaks' => "=MAX(range) / =MIN(range)\nContoh: =MAX(C1:C10)"
                ],
            ],
            [
                'category_id' => $catL2->id, 'learning_level_id' => $lvlDasar->id, 'order' => 9,
                'title' => 'COUNT, COUNTA, COUNTBLANK', 'slug' => 'fungsi-count',
                'intro' => 'Menghitung jumlah cell yang berisi angka, teks, atau kosong.',
                'content' => [
                    'apa_itu' => "COUNT menghitung jumlah cell berisi angka. COUNTA menghitung cell yang tidak kosong (termasuk teks). COUNTBLANK menghitung cell yang kosong.",
                    'mengapa' => "Sangat membantu saat kita ingin tahu ada berapa banyak data yang sudah terisi dalam sebuah tabel.",
                    'sintaks' => "=COUNT(range) / =COUNTA(range) / =COUNTBLANK(range)"
                ],
            ],
            [
                'category_id' => $catL2->id, 'learning_level_id' => $lvlDasar->id, 'order' => 10,
                'title' => 'Fungsi IF (Logika)', 'slug' => 'fungsi-if',
                'intro' => 'Membuat keputusan otomatis berdasarkan kondisi tertentu.',
                'content' => [
                    'apa_itu' => "Fungsi IF mengecek apakah suatu kondisi BENAR atau SALAH. Jika benar, hasil A muncul. Jika salah, hasil B muncul.",
                    'mengapa' => "Sangat penting untuk membuat laporan otomatis, seperti menentukan status kelulusan (Lulus/Tidak Lulus).",
                    'sintaks' => "=IF(logical_test, value_if_true, value_if_false)\nContoh: =IF(A1>=75, \"Lulus\", \"Gagal\")"
                ],
            ],
            // LEVEL 3
            [
                'category_id' => $catL3->id, 'learning_level_id' => $lvlMenengah->id, 'order' => 11,
                'title' => 'SUMIF dan SUMIFS', 'slug' => 'fungsi-sumif-sumifs',
                'intro' => 'Menjumlahkan data berdasarkan kriteria tertentu.',
                'content' => [
                    'apa_itu' => "SUMIF digunakan untuk menjumlahkan data hanya pada baris yang memenuhi syarat (kriteria) tertentu. Bayangkan kamu punya data penjualan berbagai buah, dan kamu hanya ingin menghitung total harga khusus untuk buah 'Apel' saja.\n\nSUMIFS adalah versi lebih canggih dari SUMIF, di mana kamu bisa memberikan lebih dari satu kriteria.",
                    'mengapa' => "SUM biasa akan menjumlahkan semua angka. Jika kamu perlu laporan spesifik (misal: total gaji hanya untuk departemen HR), SUMIF/SUMIFS adalah cara tercepat.",
                    'sintaks' => "SUMIF (Satu Kriteria):\n=SUMIF(range_kriteria, kriteria, range_jumlah)\n\nSUMIFS (Banyak Kriteria):\n=SUMIFS(range_jumlah, range_kriteria1, kriteria1, range_kriteria2, kriteria2, ...)\n\nContoh SUMIF:\n=SUMIF(A1:A10, \"Apel\", B1:B10)"
                ],
            ],
            [
                'category_id' => $catL3->id, 'learning_level_id' => $lvlMenengah->id, 'order' => 12,
                'title' => 'COUNTIF dan COUNTIFS', 'slug' => 'fungsi-countif',
                'intro' => 'Menghitung jumlah data berdasarkan kriteria tertentu.',
                'content' => [
                    'apa_itu' => "COUNTIF menghitung berapa banyak data yang cocok dengan kriteria tertentu.",
                    'mengapa' => "Misalnya, ingin menghitung ada berapa banyak siswa laki-laki di kelas.",
                    'sintaks' => "=COUNTIF(range, kriteria)\nContoh: =COUNTIF(B2:B100, \"Laki-laki\")"
                ],
            ],
            [
                'category_id' => $catL3->id, 'learning_level_id' => $lvlMenengah->id, 'order' => 13,
                'title' => 'AVERAGEIF dan AVERAGEIFS', 'slug' => 'fungsi-averageif',
                'intro' => 'Menghitung rata-rata data berdasarkan kriteria tertentu.',
                'content' => [
                    'apa_itu' => "AVERAGEIF mencari rata-rata hanya untuk data yang memenuhi kriteria.",
                    'mengapa' => "Berguna untuk mencari rata-rata nilai khusus untuk siswa perempuan saja, misalnya.",
                    'sintaks' => "=AVERAGEIF(range_kriteria, kriteria, range_rata-rata)"
                ],
            ],
            [
                'category_id' => $catL3->id, 'learning_level_id' => $lvlMenengah->id, 'order' => 14,
                'title' => 'AND, OR, dan IF Bertingkat', 'slug' => 'fungsi-and-or',
                'intro' => 'Menggabungkan beberapa kondisi logika.',
                'content' => [
                    'apa_itu' => "AND bernilai BENAR jika semua kondisi terpenuhi. OR bernilai BENAR jika salah satu kondisi terpenuhi. IF bertingkat artinya IF di dalam IF.",
                    'mengapa' => "Membuat logika yang lebih kompleks, seperti diskon jika belanja > 100rb DAN member VIP.",
                    'sintaks' => "=IF(AND(A1>10, B1<5), \"Ya\", \"Tidak\")"
                ],
            ],
            [
                'category_id' => $catL3->id, 'learning_level_id' => $lvlMenengah->id, 'order' => 15,
                'title' => 'Fungsi Teks Dasar', 'slug' => 'fungsi-teks',
                'intro' => 'Mengolah data teks seperti memotong dan menggabungkan.',
                'content' => [
                    'apa_itu' => "LEFT mengambil teks dari kiri, RIGHT dari kanan, MID dari tengah, LEN menghitung panjang teks, TRIM menghapus spasi berlebih, CONCAT menggabungkan teks.",
                    'mengapa' => "Sangat penting saat mengolah data nama, alamat, atau kode barang.",
                    'sintaks' => "=LEFT(A1, 3) // Ambil 3 huruf dari kiri\n=CONCAT(A1, B1) // Gabungkan isi A1 dan B1"
                ],
            ],
            // LEVEL 4
            [
                'category_id' => $catL4->id, 'learning_level_id' => $lvlLanjutan->id, 'order' => 16,
                'title' => 'VLOOKUP, HLOOKUP, XLOOKUP', 'slug' => 'fungsi-lookup',
                'intro' => 'Mencari data dari tabel referensi. Sangat berguna untuk menggabungkan data dari dua tabel berbeda.',
                'content' => [
                    'apa_itu' => "VLOOKUP (Vertical Lookup) mencari nilai di kolom paling kiri sebuah tabel, lalu mengembalikan nilai dari kolom lain di baris yang sama. Bayangkan kamu punya daftar harga barang di tabel referensi, dan kamu ingin mencari harga sebuah barang hanya dengan mengetik namanya.\n\nHLOOKUP melakukan hal yang sama, tapi secara horizontal (baris).\n\nXLOOKUP adalah versi modern yang lebih fleksibel (Excel 365).",
                    'mengapa' => "Sangat sering dipakai di dunia kerja untuk menggabungkan dua tabel data yang berbeda, seperti menggabungkan data penjualan dengan data master produk.",
                    'sintaks' => "VLOOKUP:\n=VLOOKUP(nilai_dicari, tabel_referensi, nomor_kolom, FALSE)\n\nHLOOKUP:\n=HLOOKUP(nilai_dicari, tabel_referensi, nomor_baris, FALSE)\n\nContoh:\n=VLOOKUP(D2, A2:B10, 2, FALSE)\nArtinya: Cari nilai di D2, di kolom pertama tabel A2:B10, lalu ambil nilai dari kolom ke-2."
                ],
            ],
            [
                'category_id' => $catL4->id, 'learning_level_id' => $lvlLanjutan->id, 'order' => 17,
                'title' => 'Data Tools Dasar', 'slug' => 'data-tools',
                'intro' => 'Menggunakan Sorting, Filter, Conditional Formatting, dan Data Validation.',
                'content' => [
                    'apa_itu' => "Data Tools adalah fitur-fitur di Excel untuk mengelola dan menganalisis data:\n\n1. Sorting: Mengurutkan data (A-Z atau Z-A, terkecil-terbesar).\n2. Filter: Menyaring data agar hanya menampilkan baris yang memenuhi kriteria tertentu.\n3. Conditional Formatting: Mewarnai cell secara otomatis berdasarkan aturan (misal: nilai < 70 jadi merah).\n4. Data Validation: Membatasi jenis data yang boleh dimasukkan ke dalam cell.",
                    'mengapa' => "Membuat analisis data menjadi jauh lebih cepat dan visual. Kamu bisa menemukan data penting dalam hitungan detik.",
                    'sintaks' => "Semua fitur ini ada di Tab Home dan Data pada Ribbon Excel.\n\n- Sorting: Tab Data > Sort\n- Filter: Tab Data > Filter (Ctrl+Shift+L)\n- Conditional Formatting: Tab Home > Conditional Formatting\n- Data Validation: Tab Data > Data Validation"
                ],
            ],
            [
                'category_id' => $catL4->id, 'learning_level_id' => $lvlLanjutan->id, 'order' => 18,
                'title' => 'PivotTable & Dashboard', 'slug' => 'pivottable-dashboard',
                'intro' => 'Merangkum ribuan data menjadi tabel ringkas dan grafik interaktif.',
                'content' => [
                    'apa_itu' => "PivotTable adalah fitur sakti Excel untuk merangkum data dalam jumlah besar menjadi tabel ringkas. Kamu bisa mengelompokkan data berdasarkan kategori, menjumlahkan, mencari rata-rata, dan sebagainya hanya dengan drag-and-drop.\n\nDashboard adalah kumpulan grafik (Chart) yang diletakkan dalam satu layar untuk memberikan gambaran menyeluruh tentang data.",
                    'mengapa' => "Dibutuhkan oleh manajer atau analis untuk mengambil keputusan bisnis berdasarkan data (Data-Driven Decision Making).",
                    'sintaks' => "Langkah membuat PivotTable:\n1. Pilih seluruh data.\n2. Klik Insert > PivotTable.\n3. Pilih lokasi (New Worksheet).\n4. Drag field ke area Rows, Columns, Values, atau Filters."
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

        // 5. KAMUS RUMUS (23 Rumus)
        $formulas = [
            ['name' => 'SUM', 'slug' => 'sum', 'cat' => 'Matematika', 'desc' => 'Menjumlahkan semua angka.', 'syntax' => '=SUM(number1, [number2], ...)', 'ex' => '=SUM(B1:B3)', 'case' => "Kamu memiliki daftar belanja. Kamu ingin tahu total uang yang harus dibayar dengan menjumlahkan B1 sampai B3.", 'res' => "Total belanja adalah Rp45.000.", 'before' => [['Beras', '15000'], ['Minyak', '20000'], ['Gula', '10000'], ['Total', '=SUM(B1:B3)']], 'after' => [['Beras', '15000'], ['Minyak', '20000'], ['Gula', '10000'], ['Total', '45000']], 'hl_before' => ['B4'], 'hl_after' => ['B4']],
            ['name' => 'AVERAGE', 'slug' => 'average', 'cat' => 'Statistik', 'desc' => 'Menghitung rata-rata.', 'syntax' => '=AVERAGE(number1, [number2], ...)', 'ex' => '=AVERAGE(B1:B3)', 'case' => "Nilai ujian 3 siswa: 80, 90, dan 70. Kamu ingin mencari nilai rata-ratanya.", 'res' => "Rata-rata nilai adalah 80.", 'before' => [['Siswa A', '80'], ['Siswa B', '90'], ['Siswa C', '70'], ['Rata-rata', '=AVERAGE(B1:B3)']], 'after' => [['Siswa A', '80'], ['Siswa B', '90'], ['Siswa C', '70'], ['Rata-rata', '80']], 'hl_before' => ['B4'], 'hl_after' => ['B4']],
            ['name' => 'MAX', 'slug' => 'max', 'cat' => 'Statistik', 'desc' => 'Mencari nilai tertinggi.', 'syntax' => '=MAX(number1, [number2], ...)', 'ex' => '=MAX(B1:B3)', 'case' => "Mencari penjualan tertinggi dari data 3 hari.", 'res' => "Nilai tertinggi adalah 200000.", 'before' => [['Senin', '100000'], ['Selasa', '200000'], ['Rabu', '150000'], ['Max', '=MAX(B1:B3)']], 'after' => [['Senin', '100000'], ['Selasa', '200000'], ['Rabu', '150000'], ['Max', '200000']], 'hl_before' => ['B4'], 'hl_after' => ['B4']],
            ['name' => 'MIN', 'slug' => 'min', 'cat' => 'Statistik', 'desc' => 'Mencari nilai terendah.', 'syntax' => '=MIN(number1, [number2], ...)', 'ex' => '=MIN(B1:B3)', 'case' => "Mencari penjualan terendah dari data 3 hari.", 'res' => "Nilai terendah adalah 100000.", 'before' => [['Senin', '100000'], ['Selasa', '200000'], ['Rabu', '150000'], ['Min', '=MIN(B1:B3)']], 'after' => [['Senin', '100000'], ['Selasa', '200000'], ['Rabu', '150000'], ['Min', '100000']], 'hl_before' => ['B4'], 'hl_after' => ['B4']],
            ['name' => 'COUNT', 'slug' => 'count', 'cat' => 'Statistik', 'desc' => 'Menghitung jumlah cell berisi angka.', 'syntax' => '=COUNT(value1, [value2], ...)', 'ex' => '=COUNT(B1:B4)', 'case' => "Menghitung berapa banyak siswa yang sudah mengumpulkan nilai.", 'res' => "Ada 3 siswa yang sudah dinilai.", 'before' => [['Budi', '80'], ['Andi', '90'], ['Siti', '(kosong)'], ['Ani', '70'], ['Jumlah', '=COUNT(B1:B4)']], 'after' => [['Budi', '80'], ['Andi', '90'], ['Siti', '(kosong)'], ['Ani', '70'], ['Jumlah', '3']], 'hl_before' => ['B5'], 'hl_after' => ['B5']],
            ['name' => 'COUNTA', 'slug' => 'counta', 'cat' => 'Statistik', 'desc' => 'Menghitung cell tidak kosong.', 'syntax' => '=COUNTA(value1, [value2], ...)', 'ex' => '=COUNTA(A1:A4)', 'case' => "Menghitung berapa banyak nama siswa yang sudah diisi.", 'res' => "Ada 4 nama yang terisi.", 'before' => [['Budi', ''], ['Andi', ''], ['Siti', ''], ['Ani', ''], ['Total Nama', '=COUNTA(A1:A4)']], 'after' => [['Budi', ''], ['Andi', ''], ['Siti', ''], ['Ani', ''], ['Total Nama', '4']], 'hl_before' => ['B5'], 'hl_after' => ['B5']],
            ['name' => 'IF', 'slug' => 'if', 'cat' => 'Logika', 'desc' => 'Mengecek kondisi.', 'syntax' => '=IF(logical_test, value_if_true, value_if_false)', 'ex' => '=IF(B2>=75, "Lulus", "Gagal")', 'case' => "Nilai Andi ada di sel B2 (80). Tampilkan 'Lulus' jika >= 75.", 'res' => "Karena B2 berisi 80, maka hasilnya 'Lulus'.", 'before' => [['Nama', 'Nilai', 'Status'], ['Andi', '80', '=IF(B2>=75, "Lulus", "Gagal")']], 'after' => [['Nama', 'Nilai', 'Status'], ['Andi', '80', 'Lulus']], 'hl_before' => ['C2'], 'hl_after' => ['C2']],
            ['name' => 'SUMIF', 'slug' => 'sumif', 'cat' => 'Matematika', 'desc' => 'Menjumlahkan dengan kriteria.', 'syntax' => '=SUMIF(range, criteria, [sum_range])', 'ex' => '=SUMIF(A1:A3, "Apel", B1:B3)', 'case' => "Kamu hanya ingin menjumlahkan total harga untuk buah 'Apel' saja.", 'res' => "Total harga Apel adalah 15000.", 'before' => [['Apel', '5000'], ['Jeruk', '7000'], ['Apel', '10000'], ['Total Apel', '=SUMIF(A1:A3, "Apel", B1:B3)']], 'after' => [['Apel', '5000'], ['Jeruk', '7000'], ['Apel', '10000'], ['Total Apel', '15000']], 'hl_before' => ['B4'], 'hl_after' => ['B4']],
            ['name' => 'SUMIFS', 'slug' => 'sumifs', 'cat' => 'Matematika', 'desc' => 'Menjumlahkan dengan banyak kriteria.', 'syntax' => '=SUMIFS(sum_range, criteria_range1, criteria1, ...)', 'ex' => '=SUMIFS(C1:C3, A1:A3, "Apel", B1:B3, ">50")', 'case' => "Menjumlahkan penjualan Apel yang harganya di atas 50rb.", 'res' => "Total penjualan Apel > 50rb adalah 60000.", 'before' => [['Apel', '50000', '50000'], ['Jeruk', '70000', '70000'], ['Apel', '10000', '10000'], ['Total Spesifik', '=SUMIFS(C1:C3, A1:A3, "Apel", C1:C3, ">50")']], 'after' => [['Apel', '50000', '50000'], ['Jeruk', '70000', '70000'], ['Apel', '10000', '10000'], ['Total Spesifik', '50000']], 'hl_before' => ['B4'], 'hl_after' => ['B4']],
            ['name' => 'COUNTIF', 'slug' => 'countif', 'cat' => 'Statistik', 'desc' => 'Menghitung data dengan kriteria.', 'syntax' => '=COUNTIF(range, criteria)', 'ex' => '=COUNTIF(B1:B3, "Laki-laki")', 'case' => "Menghitung ada berapa banyak siswa laki-laki di daftar.", 'res' => "Ada 2 siswa laki-laki.", 'before' => [['Nama', 'JK'], ['Budi', 'Laki-laki'], ['Siti', 'Perempuan'], ['Andi', 'Laki-laki'], ['Total L', '=COUNTIF(B1:B3, "Laki-laki")']], 'after' => [['Nama', 'JK'], ['Budi', 'Laki-laki'], ['Siti', 'Perempuan'], ['Andi', 'Laki-laki'], ['Total L', '2']], 'hl_before' => ['B4'], 'hl_after' => ['B4']],
            ['name' => 'COUNTIFS', 'slug' => 'countifs', 'cat' => 'Statistik', 'desc' => 'Menghitung data dengan banyak kriteria.', 'syntax' => '=COUNTIFS(criteria_range1, criteria1, ...)', 'ex' => '=COUNTIFS(A1:A3, "Apel", B1:B3, ">50")', 'case' => "Menghitung penjualan Apel yang harganya di atas 50rb.", 'res' => "Ada 1 transaksi.", 'before' => [['Apel', '50000', '50000'], ['Jeruk', '70000', '70000'], ['Apel', '10000', '10000'], ['Jumlah Transaksi', '=COUNTIFS(A1:A3, "Apel", C1:C3, ">50")']], 'after' => [['Apel', '50000', '50000'], ['Jeruk', '70000', '70000'], ['Apel', '10000', '10000'], ['Jumlah Transaksi', '1']], 'hl_before' => ['B4'], 'hl_after' => ['B4']],
            ['name' => 'AVERAGEIF', 'slug' => 'averageif', 'cat' => 'Statistik', 'desc' => 'Menghitung rata-rata dengan kriteria.', 'syntax' => '=AVERAGEIF(range, criteria, [average_range])', 'ex' => '=AVERAGEIF(A1:A3, "Apel", B1:B3)', 'case' => "Mencari rata-rata harga dari buah 'Apel' saja.", 'res' => "Rata-rata harga Apel adalah 7500.", 'before' => [['Apel', '5000'], ['Jeruk', '7000'], ['Apel', '10000'], ['Rata Apel', '=AVERAGEIF(A1:A3, "Apel", B1:B3)']], 'after' => [['Apel', '5000'], ['Jeruk', '7000'], ['Apel', '10000'], ['Rata Apel', '7500']], 'hl_before' => ['B4'], 'hl_after' => ['B4']],
            ['name' => 'AND', 'slug' => 'and', 'cat' => 'Logika', 'desc' => 'Mengembalikan TRUE jika semua kondisi benar.', 'syntax' => '=AND(logical1, [logical2], ...)', 'ex' => '=AND(A2>10, B2=TRUE)', 'case' => "Toko memberi diskon jika belanja > 10rb (A2) DAN member aktif (B2 = TRUE).", 'res' => "Karena kedua kondisi benar, hasilnya TRUE (Dapat Diskon).", 'before' => [['Belanja', 'Member', 'Status'], ['15000', 'TRUE', '=AND(A2>10, B2=TRUE)']], 'after' => [['Belanja', 'Member', 'Status'], ['15000', 'TRUE', 'TRUE']], 'hl_before' => ['C2'], 'hl_after' => ['C2']],
            ['name' => 'OR', 'slug' => 'or', 'cat' => 'Logika', 'desc' => 'Mengembalikan TRUE jika salah satu kondisi benar.', 'syntax' => '=OR(logical1, [logical2], ...)', 'ex' => '=OR(A2>50, B2="VIP")', 'case' => "Dapat hadiah jika belanja > 50rb ATAU status VIP.", 'res' => "Karena belanja 60000 (>50rb), hasilnya TRUE.", 'before' => [['Belanja', 'Status', 'Hadiah'], ['60000', 'Biasa', '=OR(A2>50, B2="VIP")']], 'after' => [['Belanja', 'Status', 'Hadiah'], ['60000', 'Biasa', 'TRUE']], 'hl_before' => ['C2'], 'hl_after' => ['C2']],
            ['name' => 'LEFT', 'slug' => 'left', 'cat' => 'Teks', 'desc' => 'Mengambil karakter dari kiri.', 'syntax' => '=LEFT(text, [num_chars])', 'ex' => '=LEFT(A2, 3)', 'case' => "Mengambil 3 huruf pertama dari kode barang 'EXCEL-001'.", 'res' => "Hasilnya 'EXC'.", 'before' => [['Kode Barang', 'Hasil'], ['EXCEL-001', '=LEFT(A2, 3)']], 'after' => [['Kode Barang', 'Hasil'], ['EXCEL-001', 'EXC']], 'hl_before' => ['B2'], 'hl_after' => ['B2']],
            ['name' => 'RIGHT', 'slug' => 'right', 'cat' => 'Teks', 'desc' => 'Mengambil karakter dari kanan.', 'syntax' => '=RIGHT(text, [num_chars])', 'ex' => '=RIGHT(A2, 3)', 'case' => "Mengambil 3 karakter terakhir dari kode 'EXCEL-001'.", 'res' => "Hasilnya '001'.", 'before' => [['Kode Barang', 'Hasil'], ['EXCEL-001', '=RIGHT(A2, 3)']], 'after' => [['Kode Barang', 'Hasil'], ['EXCEL-001', '001']], 'hl_before' => ['B2'], 'hl_after' => ['B2']],
            ['name' => 'MID', 'slug' => 'mid', 'cat' => 'Teks', 'desc' => 'Mengambil karakter dari tengah.', 'syntax' => '=MID(text, start_num, num_chars)', 'ex' => '=MID(A2, 2, 4)', 'case' => "Mengambil 4 huruf dari tengah kata 'Indonesia' mulai huruf ke-3.", 'res' => "Hasilnya 'done'.", 'before' => [['Kata', 'Hasil'], ['Indonesia', '=MID(A2, 3, 4)']], 'after' => [['Kata', 'Hasil'], ['Indonesia', 'done']], 'hl_before' => ['B2'], 'hl_after' => ['B2']],
            ['name' => 'LEN', 'slug' => 'len', 'cat' => 'Teks', 'desc' => 'Menghitung jumlah karakter.', 'syntax' => '=LEN(text)', 'ex' => '=LEN(A2)', 'case' => "Mengecek jumlah karakter kata 'ExcelMate'.", 'res' => "Hasilnya 9.", 'before' => [['Kata', 'Jumlah Karakter'], ['ExcelMate', '=LEN(A2)']], 'after' => [['Kata', 'Jumlah Karakter'], ['ExcelMate', '9']], 'hl_before' => ['B2'], 'hl_after' => ['B2']],
            ['name' => 'CONCAT', 'slug' => 'concat', 'cat' => 'Teks', 'desc' => 'Menggabungkan teks.', 'syntax' => '=CONCAT(text1, [text2], ...)', 'ex' => '=CONCAT(A2, " ", B2)', 'case' => "Menggabungkan nama depan dan belakang dengan spasi.", 'res' => "Hasilnya 'Budi Santoso'.", 'before' => [['Nama Depan', 'Nama Belakang', 'Nama Lengkap'], ['Budi', 'Santoso', '=CONCAT(A2, " ", B2)']], 'after' => [['Nama Depan', 'Nama Belakang', 'Nama Lengkap'], ['Budi', 'Santoso', 'Budi Santoso']], 'hl_before' => ['C2'], 'hl_after' => ['C2']],
            ['name' => 'VLOOKUP', 'slug' => 'vlookup', 'cat' => 'Lookup', 'desc' => 'Mencari data di tabel referensi.', 'syntax' => '=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])', 'ex' => '=VLOOKUP(D1, A1:B3, 2, FALSE)', 'case' => "Mencari harga buah 'Jeruk' dari tabel daftar harga.", 'res' => "Hasilnya 7000.", 'before' => [['Apel', '5000', '', 'Jeruk', '=VLOOKUP(D1, A1:B3, 2, FALSE)'], ['Jeruk', '7000', '', '', ''], ['Mangga', '8000', '', '', '']], 'after' => [['Apel', '5000', '', 'Jeruk', '7000'], ['Jeruk', '7000', '', '', ''], ['Mangga', '8000', '', '', '']], 'hl_before' => ['E1'], 'hl_after' => ['E1']],
            ['name' => 'HLOOKUP', 'slug' => 'hlookup', 'cat' => 'Lookup', 'desc' => 'Mencari data secara horizontal.', 'syntax' => '=HLOOKUP(lookup_value, table_array, row_index_num, [range_lookup])', 'ex' => '=HLOOKUP(A1, A1:D5, 3, FALSE)', 'case' => "Mencari target bulan 'Maret' dari tabel horizontal.", 'res' => "Hasilnya 800.", 'before' => [['Bulan', 'Jan', 'Feb', 'Maret'], ['Target', '100', '200', '=HLOOKUP("Maret", A1:D2, 2, FALSE)']], 'after' => [['Bulan', 'Jan', 'Feb', 'Maret'], ['Target', '100', '200', '800']], 'hl_before' => ['D2'], 'hl_after' => ['D2']],
            ['name' => 'XLOOKUP', 'slug' => 'xlookup', 'cat' => 'Lookup', 'desc' => 'Versi modern VLOOKUP.', 'syntax' => '=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found])', 'ex' => '=XLOOKUP(D1, A1:A3, B1:B3)', 'case' => "Mencari harga 'Jeruk' dengan XLOOKUP (lebih aman).", 'res' => "Hasilnya 7000.", 'before' => [['Apel', '5000', '', 'Jeruk', '=XLOOKUP(D1, A1:A3, B1:B3)'], ['Jeruk', '7000', '', '', ''], ['Mangga', '8000', '', '', '']], 'after' => [['Apel', '5000', '', 'Jeruk', '7000'], ['Jeruk', '7000', '', '', ''], ['Mangga', '8000', '', '', '']], 'hl_before' => ['E1'], 'hl_after' => ['E1']],
            ['name' => 'INDEX', 'slug' => 'index', 'cat' => 'Lookup', 'desc' => 'Mengembalikan nilai dari posisi tertentu.', 'syntax' => '=INDEX(array, row_num, [column_num])', 'ex' => '=INDEX(B1:B3, 2)', 'case' => "Mengambil nilai pada baris ke-2 dari kolom B (harga Jeruk).", 'res' => "Hasilnya 7000.", 'before' => [['Apel', '5000'], ['Jeruk', '7000'], ['Mangga', '8000'], ['Hasil', '=INDEX(B1:B3, 2)']], 'after' => [['Apel', '5000'], ['Jeruk', '7000'], ['Mangga', '8000'], ['Hasil', '7000']], 'hl_before' => ['B4'], 'hl_after' => ['B4']],
            ['name' => 'MATCH', 'slug' => 'match', 'cat' => 'Lookup', 'desc' => 'Mencari posisi suatu nilai.', 'syntax' => '=MATCH(lookup_value, lookup_array, [match_type])', 'ex' => '=MATCH("Jeruk", A1:A3, 0)', 'case' => "Mencari di urutan ke berapa kata 'Jeruk' berada.", 'res' => "Hasilnya 2 (karena Jeruk ada di baris ke-2).", 'before' => [['Buah'], ['Apel'], ['Jeruk'], ['Mangga'], ['Posisi Jeruk', '=MATCH("Jeruk", A1:A3, 0)']], 'after' => [['Buah'], ['Apel'], ['Jeruk'], ['Mangga'], ['Posisi Jeruk', '2']], 'hl_before' => ['B4'], 'hl_after' => ['B4']],
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