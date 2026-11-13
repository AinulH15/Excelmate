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
        // 1. Level
        $lvl1 = LearningLevel::create(['name' => 'Beginner', 'slug' => 'beginner', 'order' => 1]);
        $lvl2 = LearningLevel::create(['name' => 'Intermediate', 'slug' => 'intermediate', 'order' => 2]);
        $lvl3 = LearningLevel::create(['name' => 'Advanced', 'slug' => 'advanced', 'order' => 3]);

        // 2. Kategori
        $catDasar = Category::create(['name' => 'Fungsi Dasar', 'slug' => 'fungsi-dasar', 'color' => 'mint', 'icon' => 'Calculator']);
        $catLogika = Category::create(['name' => 'Fungsi Logika', 'slug' => 'fungsi-logika', 'color' => 'pink', 'icon' => 'GitBranch']);

        // 3. Materi: Fungsi SUM (Materi Lengkap)
        $lesson = Lesson::create([
            'category_id' => $catDasar->id,
            'learning_level_id' => $lvl1->id,
            'title' => 'Fungsi SUM',
            'slug' => 'fungsi-sum',
            'intro' => 'SUM adalah salah satu fungsi bawaan Microsoft Excel yang digunakan untuk menjumlahkan dua atau lebih angka.',
            'order' => 1,
            'content' => [
                'apa_itu' => "Misalnya kamu memiliki sebuah toko alat tulis. Dalam satu hari, toko tersebut menjual:\n\nBuku: Rp50.000\nPulpen: Rp30.000\nPensil: Rp20.000\nPenghapus: Rp10.000\n\nKamu ingin mengetahui berapa total pendapatan dari seluruh barang tersebut.\n\nCara pertama: menghitung secara manual\n50.000 + 30.000 + 20.000 + 10.000 = 110.000\n\nCara kedua: menggunakan Excel\nKamu cukup menuliskan rumus =SUM(B2:B5). Excel akan menjumlahkan seluruh angka pada cell B2 sampai B5. Hasilnya adalah Rp110.000.",
                'mengapa' => "Bayangkan kamu mempunyai 500 baris data penjualan. Jika dihitung satu per satu, tentu akan membutuhkan waktu lama. Dengan SUM, Excel bisa menjumlahkan seluruh data hanya menggunakan satu rumus.\n\nKeuntungan menggunakan SUM:\n- Menghemat waktu perhitungan.\n- Mengurangi kesalahan menghitung manual.\n- Hasil otomatis berubah ketika data sumber berubah.\n- Dapat digunakan untuk data sedikit maupun banyak.\n- Dapat menjumlahkan data dari beberapa cell atau range.",
                'sintaks' => "Bentuk penulisan fungsi SUM adalah:\n\n=SUM(number1, [number2], ...)\n\nPenjelasannya:\n- Tanda = : Menandakan bahwa kita akan menuliskan rumus.\n- SUM : Nama fungsi penjumlahan.\n- Tanda ( : Awal argumen fungsi.\n- number1 : Angka atau cell pertama.\n- number2 : Angka atau cell berikutnya, opsional.\n- Tanda ) : Akhir fungsi.\n\nContoh:\n=SUM(A1:A5)\n\nArtinya, jumlahkan seluruh angka dari cell A1 sampai A5. Tanda titik dua (:) menunjukkan rentang cell. Jadi, A1:A5 berarti A1, A2, A3, A4, dan A5."
            ],
        ]);

        // Contoh Soal di Materi
        LessonExample::create([
            'lesson_id' => $lesson->id,
            'title' => 'Menjumlahkan nilai penjualan',
            'case_description' => 'Andi punya data penjualan harian dan ingin tahu total seminggu.',
            'data_table' => [
                ['hari' => 'Sen', 'nilai' => 100000],
                ['hari' => 'Sel', 'nilai' => 150000],
                ['hari' => 'Rab', 'nilai' => 200000],
                ['hari' => 'Kam', 'nilai' => 120000],
                ['hari' => 'Jum', 'nilai' => 180000],
            ],
            'question' => 'Berapa total penjualan Senin–Jumat?',
            'formula_used' => '=SUM(B2:B6)',
            'steps' => [
                'Letakkan kursor di sel hasil, misal B7.',
                'Ketik =SUM(',
                'Blok rentang B2 sampai B6.',
                'Tutup kurung dan tekan Enter.',
            ],
            'final_result' => '750000',
        ]);

        // 4. 5 Soal Latihan untuk Fungsi SUM
        $exercises = [
            [
                'question' => 'Fungsi yang tepat untuk menjumlahkan seluruh nilai di A1:A10 adalah…',
                'options' => [
                    ['A', '=TOTAL(A1:A10)', false],
                    ['B', '=SUM(A1:A10)', true],
                    ['C', '=PLUS(A1:A10)', false],
                    ['D', '=ADD(A1:A10)', false],
                ],
            ],
            [
                'question' => 'Hasil dari =SUM(5,10,15) adalah…',
                'options' => [
                    ['A', '15', false], ['B', '20', false], ['C', '30', true], ['D', '25', false],
                ],
            ],
            [
                'question' => 'Data: A1=10, A2=20, A3=30. Rumus =SUM(A1:A3) menghasilkan…',
                'options' => [
                    ['A', '30', false], ['B', '50', false], ['C', '60', true], ['D', '40', false],
                ],
            ],
            [
                'question' => 'Penulisan SUM yang benar adalah…',
                'options' => [
                    ['A', 'SUM(A1,A2)', true],
                    ['B', 'SUM[A1:A2]', false],
                    ['C', 'SUM{A1,A2}', false],
                    ['D', 'SUM<A1:A2>', false],
                ],
            ],
            [
                'question' => '=SUM(2, 3, 4) + 1 = …',
                'options' => [
                    ['A', '9', false], ['B', '10', true], ['C', '11', false], ['D', '8', false],
                ],
            ],
        ];

        foreach ($exercises as $i => $ex) {
            $e = Exercise::create([
                'lesson_id' => $lesson->id,
                'question' => $ex['question'],
                'type' => 'multiple_choice',
                'order' => $i + 1,
            ]);
            foreach ($ex['options'] as [$label, $text, $ok]) {
                ExerciseOption::create([
                    'exercise_id' => $e->id, 
                    'label' => $label, 
                    'text' => $text, 
                    'is_correct' => $ok,
                ]);
            }
        }

        // 5. Kamus Rumus
        Formula::create([
            'name' => 'SUM', 'slug' => 'sum',
            'category' => 'Fungsi Dasar',
            'description' => 'Menjumlahkan semua angka dalam satu atau lebih rentang.',
            'syntax' => '=SUM(number1, [number2], ...)',
            'example' => '=SUM(A1:A10)',
            'result' => 'Total nilai A1 sampai A10',
            'parameters' => [
                ['name' => 'number1', 'desc' => 'Rentang atau angka pertama.'],
                ['name' => 'number2', 'desc' => 'Opsional, angka/rentang berikutnya.'],
            ],
            'excel_versions' => 'Semua versi Excel',
        ]);
        
        Formula::create([
            'name' => 'VLOOKUP', 'slug' => 'vlookup', 'category' => 'Lookup',
            'description' => 'Mencari nilai di kolom pertama rentang dan mengembalikan nilai dari kolom lain di baris yang sama.',
            'syntax' => '=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])',
            'example' => '=VLOOKUP(D2, A2:B10, 2, FALSE)',
            'result' => 'Nilai kolom B yang cocok dengan data D2',
            'excel_versions' => 'Semua versi Excel',
        ]);
    }
}