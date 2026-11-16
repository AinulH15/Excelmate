<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Lesson;
use App\Models\Question;

class QuestionSeeder extends Seeder
{
    public function run(): void
    {
        $lessons = Lesson::pluck('id', 'slug')->toArray();

        $questions = [
            // Materi 1: Pengenalan Antarmuka
            'pengenalan-antarmuka-excel' => [
                ['q' => 'Bagian Excel yang berisi menu Home, Insert, Formulas, dll disebut...', 'opts' => ['Ribbon', 'Formula Bar', 'Grid', 'Name Box'], 'ans' => 'Ribbon', 'exp' => 'Ribbon adalah menu utama Excel yang terletak di bagian atas.'],
                ['q' => 'Kotak kecil di Excel tempat mengetik data disebut...', 'opts' => ['Sheet', 'Cell', 'Row', 'Column'], 'ans' => 'Cell', 'exp' => 'Cell adalah pertemuan antara baris dan kolom.'],
                ['q' => 'Tempat untuk melihat dan mengedit isi cell adalah...', 'opts' => ['Ribbon', 'Name Box', 'Formula Bar', 'Grid'], 'ans' => 'Formula Bar', 'exp' => 'Formula Bar terletak di atas grid dan menunjukkan isi cell.'],
                ['q' => 'Untuk pindah ke cell A1 dengan cepat, gunakan...', 'opts' => ['Ctrl + Home', 'Ctrl + End', 'Ctrl + Page Down', 'F5'], 'ans' => 'Ctrl + Home', 'exp' => 'Ctrl + Home membawa kursor ke cell A1.'],
                ['q' => 'Shortcut untuk menyimpan file adalah...', 'opts' => ['Ctrl + S', 'Ctrl + O', 'Ctrl + N', 'Ctrl + P'], 'ans' => 'Ctrl + S', 'exp' => 'Ctrl + S menyimpan perubahan pada file.'],
                ['q' => 'Untuk membuat workbook baru, tekan...', 'opts' => ['Ctrl + N', 'Ctrl + B', 'Ctrl + M', 'Ctrl + W'], 'ans' => 'Ctrl + N', 'exp' => 'Ctrl + N membuka workbook kosong baru.'],
            ],
            // Materi 2: Workbook Worksheet Cell
            'workbook-worksheet-cell' => [
                ['q' => 'Kumpulan cell disebut...', 'opts' => ['Range', 'Cell', 'Sheet', 'Row'], 'ans' => 'Range', 'exp' => 'Range adalah kumpulan beberapa cell.'],
                ['q' => 'Alamat cell B3 berarti...', 'opts' => ['Kolom B, Baris 3', 'Kolom 3, Baris B', 'Cell ke-3', 'Cell ke-B'], 'ans' => 'Kolom B, Baris 3', 'exp' => 'Alamat cell dibaca dari Kolom (huruf) lalu Baris (angka).'],
                ['q' => 'Range A1:A5 mencakup...', 'opts' => ['5 cell di kolom A', '5 cell di baris 1', '2 cell', '5 cell acak'], 'ans' => '5 cell di kolom A', 'exp' => 'A1:A5 adalah range vertikal dari A1 sampai A5.'],
                ['q' => 'Ctrl + Page Down berfungsi untuk...', 'opts' => ['Pindah ke sheet berikutnya', 'Pindah ke baris berikutnya', 'Pindah ke kolom berikutnya', 'Pindah ke cell berikutnya'], 'ans' => 'Pindah ke sheet berikutnya', 'exp' => 'Ctrl + Page Down berpindah worksheet.'],
                ['q' => 'Untuk memilih seluruh kolom, tekan...', 'opts' => ['Ctrl + Space', 'Shift + Space', 'Alt + Space', 'Ctrl + A'], 'ans' => 'Ctrl + Space', 'exp' => 'Ctrl + Space memilih seluruh kolom.'],
                ['q' => 'Untuk memilih seluruh baris, tekan...', 'opts' => ['Shift + Space', 'Ctrl + Space', 'Alt + Space', 'Ctrl + A'], 'ans' => 'Shift + Space', 'exp' => 'Shift + Space memilih seluruh baris.'],
            ],
            // Materi 7: SUM
            'fungsi-sum' => [
                ['q' => 'Rumus untuk menjumlahkan A1 sampai A5 adalah...', 'opts' => ['=SUM(A1:A5)', '=AVERAGE(A1:A5)', '=MAX(A1:A5)', '=COUNT(A1:A5)'], 'ans' => '=SUM(A1:A5)', 'exp' => 'SUM menjumlahkan seluruh angka dalam range.'],
                ['q' => 'Hasil dari =SUM(10, 20, 30) adalah...', 'opts' => ['60', '50', '40', '30'], 'ans' => '60', 'exp' => '10 + 20 + 30 = 60.'],
                ['q' => 'Shortcut untuk AutoSum adalah...', 'opts' => ['Alt + =', 'Ctrl + =', 'Shift + =', 'Alt + S'], 'ans' => 'Alt + =', 'exp' => 'Alt + = menjumlahkan data di atas secara otomatis.'],
                ['q' => 'Jika A1=5, A2=10, =SUM(A1:A2) menghasilkan...', 'opts' => ['15', '5', '10', '20'], 'ans' => '15', 'exp' => 'SUM menjumlahkan 5 + 10 = 15.'],
                ['q' => 'Rumus SUM yang salah adalah...', 'opts' => ['=SUM(A1,A2)', '=SUM(A1:A2)', '=SUM(5,10)', 'SUM(A1:A2)'], 'ans' => 'SUM(A1:A2)', 'exp' => 'Rumus Excel harus diawali dengan tanda sama dengan (=).'],
                ['q' => 'Untuk menjumlahkan seluruh kolom C dari baris 2 sampai 10, gunakan...', 'opts' => ['=SUM(C2:C10)', '=SUM(C1:C10)', '=SUM(C2:C9)', '=SUM(C:C)'], 'ans' => '=SUM(C2:C10)', 'exp' => 'Range C2:C10 menjumlahkan data dari C2 sampai C10.'],
            ],
            // Materi 13: SUMIF
            'fungsi-sumif-sumifs' => [
                ['q' => 'Untuk menjumlahkan penjualan Apel saja, gunakan...', 'opts' => ['=SUMIF(A1:A10,"Apel",B1:B10)', '=SUM(A1:A10)', '=COUNTIF(A1:A10,"Apel")', '=SUMIFS(A1:A10,B1:B10)'], 'ans' => '=SUMIF(A1:A10,"Apel",B1:B10)', 'exp' => 'SUMIF menjumlahkan berdasarkan kriteria tertentu.'],
                ['q' => 'Fungsi SUMIFS digunakan untuk...', 'opts' => ['Banyak kriteria', 'Satu kriteria', 'Menghitung rata-rata', 'Mencari data'], 'ans' => 'Banyak kriteria', 'exp' => 'SUMIFS mendukung lebih dari satu kriteria.'],
                ['q' => 'Argumen pertama SUMIF adalah...', 'opts' => ['Range kriteria', 'Kriteria', 'Range jumlah', 'Operator'], 'ans' => 'Range kriteria', 'exp' => 'SUMIF(range_kriteria, kriteria, range_jumlah).'],
                ['q' => '=SUMIF(A1:A5,"Buku",B1:B5) akan...', 'opts' => ['Menjumlahkan B1:B5 yang A1:A5 berisi "Buku"', 'Menjumlahkan semua B', 'Menghitung jumlah Buku', 'Mencari Buku'], 'ans' => 'Menjumlahkan B1:B5 yang A1:A5 berisi "Buku"', 'exp' => 'SUMIF menjumlahkan nilai yang memenuhi kriteria.'],
                ['q' => 'Untuk mengunci range kriteria agar tidak bergeser, gunakan...', 'opts' => ['$A$1:$A$10', 'A1:A10', '#A1:A10', '@A1:A10'], 'ans' => '$A$1:$A$10', 'exp' => 'Tanda $ mengunci referensi absolut.'],
                ['q' => 'SUMIFS adalah versi lanjutan dari...', 'opts' => ['SUMIF', 'SUM', 'AVERAGE', 'COUNT'], 'ans' => 'SUMIF', 'exp' => 'SUMIFS mendukung banyak kriteria, SUMIF satu kriteria.'],
            ],
            // Materi 19: VLOOKUP
            'fungsi-lookup' => [
                ['q' => 'VLOOKUP mencari data secara...', 'opts' => ['Vertikal (kolom)', 'Horizontal (baris)', 'Diagonal', 'Acak'], 'ans' => 'Vertikal (kolom)', 'exp' => 'VLOOKUP mencari di kolom pertama.'],
                ['q' => 'Argumen ke-3 VLOOKUP adalah...', 'opts' => ['Nomor kolom hasil', 'Nilai yang dicari', 'Tabel referensi', 'Mode pencarian'], 'ans' => 'Nomor kolom hasil', 'exp' => 'VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup]).'],
                ['q' => 'Untuk exact match, gunakan argumen terakhir...', 'opts' => ['FALSE', 'TRUE', '1', '0.5'], 'ans' => 'FALSE', 'exp' => 'FALSE berarti pencarian persis.'],
                ['q' => 'Jika VLOOKUP mengembalikan #N/A, artinya...', 'opts' => ['Data tidak ditemukan', 'Rumus salah', 'Tabel kosong', 'Kolom tidak ada'], 'ans' => 'Data tidak ditemukan', 'exp' => '#N/A berarti nilai yang dicari tidak ada di tabel.'],
                ['q' => 'Untuk mengunci tabel referensi, gunakan...', 'opts' => ['$A$1:$B$10', 'A1:B10', '#A1:B10', '@A1:B10'], 'ans' => '$A$1:$B$10', 'exp' => 'Tanda $ mengunci tabel agar tidak bergeser saat disalin.'],
                ['q' => 'XLOOKUP adalah versi modern dari...', 'opts' => ['VLOOKUP', 'SUM', 'IF', 'COUNT'], 'ans' => 'VLOOKUP', 'exp' => 'XLOOKUP lebih fleksibel dari VLOOKUP.'],
            ],
            // Materi 23: Conditional Formatting
            'conditional-formatting' => [
                ['q' => 'Conditional Formatting digunakan untuk...', 'opts' => ['Mewarnai cell otomatis berdasarkan aturan', 'Menghitung rata-rata', 'Mencari data', 'Mengurutkan data'], 'ans' => 'Mewarnai cell otomatis berdasarkan aturan', 'exp' => 'CF memberi warna otomatis sesuai kondisi.'],
                ['q' => 'Untuk menyorot nilai di bawah 75, gunakan...', 'opts' => ['Highlight Cells Rules > Less Than', 'Highlight Cells Rules > Greater Than', 'Data Bars', 'Icon Sets'], 'ans' => 'Highlight Cells Rules > Less Than', 'exp' => 'Less Than menyorot nilai di bawah batas.'],
                ['q' => 'Fitur CF yang menampilkan batang visual adalah...', 'opts' => ['Data Bars', 'Color Scales', 'Icon Sets', 'Highlight Rules'], 'ans' => 'Data Bars', 'exp' => 'Data Bars menampilkan batang panjang sesuai nilai.'],
                ['q' => 'Gradasi warna pada CF disebut...', 'opts' => ['Color Scales', 'Data Bars', 'Icon Sets', 'Highlight Rules'], 'ans' => 'Color Scales', 'exp' => 'Color Scales menggunakan gradasi warna.'],
                ['q' => 'Ikon panah/lampu pada CF disebut...', 'opts' => ['Icon Sets', 'Data Bars', 'Color Scales', 'Highlight Rules'], 'ans' => 'Icon Sets', 'exp' => 'Icon Sets menampilkan ikon sesuai kategori nilai.'],
                ['q' => 'Untuk membuat aturan CF sendiri, gunakan...', 'opts' => ['New Rule', 'Clear Rules', 'Manage Rules', 'Edit Rules'], 'ans' => 'New Rule', 'exp' => 'New Rule membuka dialog pembuatan aturan kustom.'],
            ],
        ];

        foreach ($questions as $slug => $items) {
            if (!isset($lessons[$slug])) continue;
            $lessonId = $lessons[$slug];
            foreach ($items as $index => $item) {
                Question::updateOrCreate(
                    ['lesson_id' => $lessonId, 'question' => $item['q']],
                    [
                        'question_type' => 'multiple_choice',
                        'difficulty' => 'Mudah',
                        'options' => $item['opts'],
                        'correct_answer' => $item['ans'],
                        'explanation' => $item['exp'],
                        'sort_order' => $index + 1,
                        'is_active' => true,
                    ]
                );
            }
        }
    }
}