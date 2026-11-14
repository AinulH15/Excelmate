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
        // 2. CATEGORIES (Berdasarkan Level)
        // ==========================================
        $catL1 = Category::create(['name' => 'Dasar Excel', 'slug' => 'dasar-excel', 'color' => 'mint', 'icon' => 'BookOpen']);
        $catL2 = Category::create(['name' => 'Rumus & Fungsi Dasar', 'slug' => 'rumus-dasar', 'color' => 'blue', 'icon' => 'Calculator']);
        $catL3 = Category::create(['name' => 'Pengolahan Data', 'slug' => 'pengolahan-data', 'color' => 'lavender', 'icon' => 'BarChart']);
        $catL4 = Category::create(['name' => 'Analisis Lanjutan', 'slug' => 'analisis-lanjutan', 'color' => 'pink', 'icon' => 'GitBranch']);

        // ==========================================
        // 3. LESSONS DATA
        // ==========================================
        $lessonsData = [
            // --- LEVEL 1 ---
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
                'intro' => 'Melakukan perhitungan dasar (+, -, *, /) di Excel.',
                'content' => [
                    'apa_itu' => "Excel bisa digunakan sebagai kalkulator. Kamu tinggal mengetik tanda = lalu angka dan operator matematika.",
                    'mengapa' => "Lebih efisien daripada memakai kalkulator terpisah, karena hasilnya bisa langsung masuk ke dalam tabel.",
                    'sintaks' => "Operator Excel:\n+ (Tambah)\n- (Kurang)\n* (Kali)\n/ (Bagi)\n^ (Pangkat)\n\nContoh: =10 + 5 * 2"
                ],
            ],

            // --- LEVEL 2 ---
            [
                'category_id' => $catL2->id, 'learning_level_id' => $lvlDasar->id, 'order' => 6,
                'title' => 'Fungsi SUM', 'slug' => 'fungsi-sum',
                'intro' => 'Menjumlahkan banyak angka sekaligus dengan cepat.',
                'content' => [
                    'apa_itu' => "SUM adalah fungsi untuk menjumlahkan seluruh angka dalam sebuah rentang. Bayangkan kamu punya 100 baris data, SUM akan menjumlahkannya dalam sekejap.",
                    'mengapa' => "Menghemat waktu dan mengurangi kesalahan hitung manual.",
                    'sintaks' => "=SUM(number1, [number2], ...)\nContoh: =SUM(A1:A10)"
                ],
            ],
            [
                'category_id' => $catL2->id, 'learning_level_id' => $lvlDasar->id, 'order' => 7,
                'title' => 'Fungsi AVERAGE', 'slug' => 'fungsi-average',
                'intro' => 'Menghitung nilai rata-rata dari sekumpulan data.',
                'content' => [
                    'apa_itu' => "AVERAGE menjumlahkan semua angka lalu membaginya dengan jumlah data. Berguna untuk mencari rata-rata nilai ujian atau penjualan.",
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

            // --- LEVEL 3 ---
            [
                'category_id' => $catL3->id, 'learning_level_id' => $lvlMenengah->id, 'order' => 11,
                'title' => 'SUMIF dan SUMIFS', 'slug' => 'fungsi-sumif-sumifs',
                'intro' => 'Menjumlahkan data berdasarkan kriteria tertentu.',
                'content' => [
                    'apa_itu' => "SUMIF menjumlahkan data hanya jika memenuhi satu kriteria. SUMIFS bisa digunakan untuk banyak kriteria sekaligus.",
                    'mengapa' => "Sangat berguna saat ingin menghitung total penjualan khusus untuk produk tertentu saja.",
                    'sintaks' => "=SUMIF(range_kriteria, kriteria, range_jumlah)\nContoh: =SUMIF(A1:A10, \"Apel\", B1:B10)"
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

            // --- LEVEL 4 ---
            [
                'category_id' => $catL4->id, 'learning_level_id' => $lvlLanjutan->id, 'order' => 16,
                'title' => 'VLOOKUP, HLOOKUP, XLOOKUP', 'slug' => 'fungsi-lookup',
                'intro' => 'Mencari data dari tabel lain (seperti mencari harga dari daftar barang).',
                'content' => [
                    'apa_itu' => "Fungsi Lookup mencari sebuah nilai di tabel referensi dan mengembalikan nilai lain yang berpasangan dengannya.",
                    'mengapa' => "Sangat sering dipakai di dunia kerja untuk menggabungkan dua tabel data yang berbeda.",
                    'sintaks' => "=VLOOKUP(nilai_dicari, tabel_referensi, nomor_kolom, FALSE)"
                ],
            ],
            [
                'category_id' => $catL4->id, 'learning_level_id' => $lvlLanjutan->id, 'order' => 17,
                'title' => 'Data Tools Dasar', 'slug' => 'data-tools',
                'intro' => 'Menggunakan Sorting, Filter, Conditional Formatting, dan Data Validation.',
                'content' => [
                    'apa_itu' => "Sorting mengurutkan data. Filter menyaring data yang ingin dilihat. Conditional Formatting mewarnai cell otomatis. Data Validation membatasi isi cell.",
                    'mengapa' => "Membuat analisis data menjadi jauh lebih cepat dan visual.",
                    'sintaks' => "Semua fitur ini ada di Tab Home dan Data pada Ribbon Excel."
                ],
            ],
            [
                'category_id' => $catL4->id, 'learning_level_id' => $lvlLanjutan->id, 'order' => 18,
                'title' => 'PivotTable & Dashboard', 'slug' => 'pivottable-dashboard',
                'intro' => 'Merangkum ribuan data menjadi tabel ringkas dan grafik interaktif.',
                'content' => [
                    'apa_itu' => "PivotTable adalah fitur sakti untuk merangkum data (misal: total penjualan per kota). Chart adalah grafik visual. Dashboard adalah kumpulan grafik yang diletakkan dalam satu layar.",
                    'mengapa' => "Dibutuhkan oleh manajer atau analis untuk mengambil keputusan bisnis.",
                    'sintaks' => "Pilih data > Insert > PivotTable > Pilih field yang ingin dianalisis."
                ],
            ],
        ];

        // ==========================================
        // 4. LOOPING UNTUK INSERT DATA & EXERCISES
        // ==========================================
        foreach ($lessonsData as $data) {
            $lesson = Lesson::create($data);

            // Contoh Soal
            LessonExample::create([
                'lesson_id' => $lesson->id,
                'title' => 'Contoh Penerapan ' . $lesson->title,
                'case_description' => 'Perhatikan contoh penggunaan fungsi ini dalam kehidupan sehari-hari.',
                'data_table' => [['Data 1', '100'], ['Data 2', '200'], ['Data 3', '300']],
                'question' => 'Bagaimana cara mengaplikasikannya?',
                'formula_used' => 'Lihat bagian sintaks.',
                'steps' => ['Pilih cell hasil.', 'Ketik tanda =.', 'Ketik nama fungsi.', 'Blok rentang data.', 'Tekan Enter.'],
                'final_result' => 'Data berhasil diolah.',
            ]);

            // 5 Soal Latihan
            for ($i = 1; $i <= 5; $i++) {
                $ex = Exercise::create([
                    'lesson_id' => $lesson->id,
                    'question' => 'Soal ' . $i . ': Terkait materi ' . $lesson->title,
                    'type' => 'multiple_choice',
                    'order' => $i,
                ]);
                ExerciseOption::create(['exercise_id' => $ex->id, 'label' => 'A', 'text' => 'Jawaban Benar', 'is_correct' => true]);
                ExerciseOption::create(['exercise_id' => $ex->id, 'label' => 'B', 'text' => 'Jawaban Salah', 'is_correct' => false]);
            }
        }

        // ==========================================
        // 5. KAMUS RUMUS (FORMULAS)
        // ==========================================
        $formulas = [
            ['name' => 'SUM', 'slug' => 'sum', 'cat' => 'Matematika', 'desc' => 'Menjumlahkan angka.', 'syntax' => '=SUM(number1)', 'ex' => '=SUM(A1:A10)'],
            ['name' => 'AVERAGE', 'slug' => 'average', 'cat' => 'Statistik', 'desc' => 'Mencari rata-rata.', 'syntax' => '=AVERAGE(number1)', 'ex' => '=AVERAGE(B1:B10)'],
            ['name' => 'IF', 'slug' => 'if', 'cat' => 'Logika', 'desc' => 'Membuat kondisi logika.', 'syntax' => '=IF(test, true, false)', 'ex' => '=IF(A1>75, "Lulus", "Gagal")'],
            ['name' => 'VLOOKUP', 'slug' => 'vlookup', 'cat' => 'Lookup', 'desc' => 'Mencari data di tabel referensi.', 'syntax' => '=VLOOKUP(lookup, table, col, FALSE)', 'ex' => '=VLOOKUP(D2, A1:B10, 2, FALSE)'],
        ];

        foreach ($formulas as $f) {
            Formula::create([
                'name' => $f['name'], 'slug' => $f['slug'], 'category' => $f['cat'],
                'description' => $f['desc'], 'syntax' => $f['syntax'], 'example' => $f['ex'],
                'result' => 'Hasil perhitungan', 'excel_versions' => 'Semua versi',
            ]);
        }
    }
}