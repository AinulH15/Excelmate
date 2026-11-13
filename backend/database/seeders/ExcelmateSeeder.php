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

        // 3. Materi: Fungsi SUM
        $lesson = Lesson::create([
            'category_id' => $catDasar->id,
            'learning_level_id' => $lvl1->id,
            'title' => 'Fungsi SUM',
            'slug' => 'fungsi-sum',
            'intro' => 'SUM menjumlahkan semua angka dalam rentang.',
            'order' => 1,
            'content' => [
                'why' => 'SUM adalah fungsi paling dasar dan paling sering dipakai untuk menghitung total.',
                'when' => 'Gunakan saat perlu menjumlahkan banyak sel tanpa menulis + berulang.',
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