<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tip;
use App\Models\Lesson;

class TipsSeeder extends Seeder
{
    public function run(): void
    {
        // Mapping slug materi ke ID
        $lessons = Lesson::pluck('id', 'slug')->toArray();

        $tipsData = [
            // LEVEL 1
            'pengenalan-antarmuka-excel' => [
                ['title' => 'Buat Workbook Baru', 'shortcut' => 'Ctrl + N', 'desc' => 'Membuat file Excel baru dengan cepat.', 'steps' => ['Tekan Ctrl + N', 'Workbook baru akan terbuka.'], 'example' => 'Membuka file baru', 'result' => 'Workbook kosong siap digunakan.'],
                ['title' => 'Buka File', 'shortcut' => 'Ctrl + O', 'desc' => 'Membuka file yang sudah ada.', 'steps' => ['Tekan Ctrl + O', 'Pilih file dari folder.'], 'example' => 'Membuka file laporan.xlsx', 'result' => 'File terbuka.'],
                ['title' => 'Simpan File', 'shortcut' => 'Ctrl + S', 'desc' => 'Menyimpan perubahan pada file.', 'steps' => ['Tekan Ctrl + S', 'File akan tersimpan.'], 'example' => 'Menyimpan pekerjaan', 'result' => 'Perubahan tersimpan.'],
            ],
            'workbook-worksheet-cell' => [
                ['title' => 'Ke Cell A1', 'shortcut' => 'Ctrl + Home', 'desc' => 'Langsung menuju cell paling awal.', 'steps' => ['Tekan Ctrl + Home', 'Kursor pindah ke A1.'], 'example' => 'Navigasi cepat', 'result' => 'Kursor di A1.'],
                ['title' => 'Ke Cell Terakhir', 'shortcut' => 'Ctrl + End', 'desc' => 'Menuju cell terakhir yang digunakan.', 'steps' => ['Tekan Ctrl + End', 'Kursor pindah ke ujung data.'], 'example' => 'Menemukan data terakhir', 'result' => 'Kursor di ujung data.'],
                ['title' => 'Pindah Worksheet', 'shortcut' => 'Ctrl + Page Up/Down', 'desc' => 'Berpindah antar sheet dengan cepat.', 'steps' => ['Tekan Ctrl + Page Down', 'Pindah ke sheet berikutnya.'], 'example' => 'Navigasi antar sheet', 'result' => 'Berpindah sheet.'],
            ],
            'input-edit-hapus-data' => [
                ['title' => 'Edit Cell', 'shortcut' => 'F2', 'desc' => 'Mengedit isi cell tanpa klik ganda.', 'steps' => ['Pilih cell', 'Tekan F2', 'Edit isinya.'], 'example' => 'Memperbaiki data', 'result' => 'Cell dalam mode edit.'],
                ['title' => 'Baris Baru dalam Cell', 'shortcut' => 'Alt + Enter', 'desc' => 'Membuat baris baru di dalam satu cell.', 'steps' => ['Ketik teks', 'Tekan Alt + Enter', 'Lanjutkan mengetik.'], 'example' => 'Alamat lengkap multi-baris', 'result' => 'Teks dalam 2 baris.'],
                ['title' => 'Isi Semua Cell Terpilih', 'shortcut' => 'Ctrl + Enter', 'desc' => 'Mengisi semua cell yang diblok dengan data yang sama.', 'steps' => ['Blok cell', 'Ketik data', 'Tekan Ctrl + Enter.'], 'example' => 'Mengisi seragam', 'result' => 'Semua cell terisi.'],
            ],
            'mengatur-workbook-worksheet' => [
                ['title' => 'Pilih Kolom', 'shortcut' => 'Ctrl + Space', 'desc' => 'Memilih satu kolom penuh.', 'steps' => ['Klik cell di kolom', 'Tekan Ctrl + Space.'], 'example' => 'Format kolom', 'result' => 'Kolom terpilih.'],
                ['title' => 'Pilih Baris', 'shortcut' => 'Shift + Space', 'desc' => 'Memilih satu baris penuh.', 'steps' => ['Klik cell di baris', 'Tekan Shift + Space.'], 'example' => 'Format baris', 'result' => 'Baris terpilih.'],
                ['title' => 'Sisipkan Baris/Kolom', 'shortcut' => 'Ctrl + +', 'desc' => 'Menyisipkan baris atau kolom baru.', 'steps' => ['Pilih baris/kolom', 'Tekan Ctrl + +.'], 'example' => 'Menambah data', 'result' => 'Baris/kolom baru muncul.'],
            ],
            'format-cell' => [
                ['title' => 'Format Cells', 'shortcut' => 'Ctrl + 1', 'desc' => 'Membuka dialog format lengkap.', 'steps' => ['Pilih cell', 'Tekan Ctrl + 1', 'Pilih format.'], 'example' => 'Format angka detail', 'result' => 'Dialog format terbuka.'],
                ['title' => 'Format Mata Uang', 'shortcut' => 'Ctrl + Shift + 4', 'desc' => 'Mengubah ke format Rp.', 'steps' => ['Pilih cell', 'Tekan Ctrl + Shift + 4.'], 'example' => '1000 -> Rp1.000', 'result' => 'Format Rupiah.'],
                ['title' => 'Format Persen', 'shortcut' => 'Ctrl + Shift + 5', 'desc' => 'Mengubah ke format persentase.', 'steps' => ['Pilih cell', 'Tekan Ctrl + Shift + 5.'], 'example' => '0.5 -> 50%', 'result' => 'Format %.'],
                ['title' => 'Tanggal Hari Ini', 'shortcut' => 'Ctrl + ;', 'desc' => 'Memasukkan tanggal hari ini.', 'steps' => ['Pilih cell', 'Tekan Ctrl + ;.'], 'example' => 'Tanggal otomatis', 'result' => 'Tanggal muncul.'],
            ],
            'operasi-matematika' => [
                ['title' => 'Urutan Perhitungan', 'shortcut' => '()', 'desc' => 'Gunakan tanda kurung untuk prioritas.', 'steps' => ['Ketik =(', 'Masukkan rumus', 'Tutup ).'], 'example' => '=(2+3)*4', 'result' => 'Hasil 20.'],
                ['title' => 'Pangkat', 'shortcut' => '^', 'desc' => 'Menghitung pangkat.', 'steps' => ['Ketik =angka^pangkat.'], 'example' => '=2^3', 'result' => 'Hasil 8.'],
            ],
            'fungsi-sum' => [
                ['title' => 'Hitung Otomatis dengan AutoSum', 'shortcut' => 'Alt + =', 'desc' => 'Tidak perlu mengetik rumus SUM dari awal.', 'steps' => ['Masukkan angka di B2:B4', 'Klik cell B5', 'Tekan Alt + =', 'Periksa range yang dipilih', 'Tekan Enter.'], 'example' => 'B2=10.000, B3=15.000, B4=20.000', 'result' => 'B5 = 45.000'],
                ['title' => 'Gunakan Range', 'shortcut' => '=SUM(...)', 'desc' => 'Menjumlahkan satu rentang sekaligus.', 'steps' => ['Ketik =SUM(B2:B10)'], 'example' => '=SUM(B2:B10)', 'result' => 'Total seluruh B2 sampai B10.'],
            ],
            'fungsi-average' => [
                ['title' => 'Rata-rata Cepat', 'shortcut' => 'AutoSum -> Average', 'desc' => 'Gunakan dropdown AutoSum.', 'steps' => ['Klik cell hasil', 'Klik panah AutoSum', 'Pilih Average.'], 'example' => 'Rata-rata nilai', 'result' => 'Rata-rata muncul.'],
                ['title' => 'Hindari Cell Kosong', 'shortcut' => '-', 'desc' => 'Pastikan tidak ada teks yang dianggap nol.', 'steps' => ['Periksa data', 'Hapus teks dari range.'], 'example' => 'Data bersih', 'result' => 'Rata-rata akurat.'],
            ],
            'fungsi-max-min' => [
                ['title' => 'Nilai Tertinggi', 'shortcut' => '=MAX(...)', 'desc' => 'Mencari nilai terbesar.', 'steps' => ['Ketik =MAX(B2:B10)'], 'example' => '=MAX(B2:B10)', 'result' => 'Nilai tertinggi.'],
                ['title' => 'Nilai Terendah', 'shortcut' => '=MIN(...)', 'desc' => 'Mencari nilai terkecil.', 'steps' => ['Ketik =MIN(B2:B10)'], 'example' => '=MIN(B2:B10)', 'result' => 'Nilai terendah.'],
            ],
            'fungsi-count' => [
                ['title' => 'Hitung Angka', 'shortcut' => '=COUNT(...)', 'desc' => 'Menghitung cell berisi angka.', 'steps' => ['Ketik =COUNT(A1:A10)'], 'example' => '=COUNT(A1:A10)', 'result' => 'Jumlah angka.'],
                ['title' => 'Hitung Non-Kosong', 'shortcut' => '=COUNTA(...)', 'desc' => 'Menghitung cell yang terisi.', 'steps' => ['Ketik =COUNTA(A1:A10)'], 'example' => '=COUNTA(A1:A10)', 'result' => 'Jumlah data terisi.'],
                ['title' => 'Hitung Kosong', 'shortcut' => '=COUNTBLANK(...)', 'desc' => 'Menghitung cell kosong.', 'steps' => ['Ketik =COUNTBLANK(A1:A10)'], 'example' => '=COUNTBLANK(A1:A10)', 'result' => 'Jumlah cell kosong.'],
            ],
            'fungsi-if' => [
                ['title' => 'Salin Rumus Cepat', 'shortcut' => 'Ctrl + D', 'desc' => 'Menyalin rumus ke bawah.', 'steps' => ['Pilih cell rumus dan cell di bawahnya', 'Tekan Ctrl + D.'], 'example' => '=IF(A1>=75,"Lulus","Gagal")', 'result' => 'Rumus tersalin.'],
                ['title' => 'Kunci Referensi', 'shortcut' => 'F4', 'desc' => 'Mengubah A1 menjadi $A$1.', 'steps' => ['Saat mengetik rumus, tekan F4 pada referensi cell.'], 'example' => '=$A$1+1', 'result' => 'Referensi absolut.'],
            ],
            'fungsi-and-or' => [
                ['title' => 'AND vs OR', 'shortcut' => '-', 'desc' => 'AND butuh semua benar, OR butuh salah satu benar.', 'steps' => ['Gunakan AND untuk syarat ketat', 'OR untuk syarat longgar.'], 'example' => '=IF(AND(A1>5,B1<10),"Ya","Tidak")', 'result' => 'Logika kompleks.'],
            ],
            'fungsi-sumif-sumifs' => [
                ['title' => 'SUMIF Satu Kriteria', 'shortcut' => '=SUMIF(...)', 'desc' => 'Menjumlahkan berdasarkan 1 syarat.', 'steps' => ['Ketik =SUMIF(A1:A10,"Apel",B1:B10)'], 'example' => '=SUMIF(A1:A10,"Apel",B1:B10)', 'result' => 'Total Apel.'],
                ['title' => 'Kunci Range Kriteria', 'shortcut' => 'F4', 'desc' => 'Gunakan $ agar range tidak bergeser.', 'steps' => ['Tekan F4 pada range.'], 'example' => '=SUMIF($A$1:$A$10,...)', 'result' => 'Range terkunci.'],
            ],
            'fungsi-countif' => [
                ['title' => 'Wildcard Pencarian', 'shortcut' => '*', 'desc' => 'Cari teks yang mengandung kata tertentu.', 'steps' => ['Gunakan *Buku* di kriteria.'], 'example' => '=COUNTIF(A1:A10,"*Buku*")', 'result' => 'Hitung semua yang ada kata Buku.'],
            ],
            'fungsi-averageif' => [
                ['title' => 'Rata-rata Bersyarat', 'shortcut' => '=AVERAGEIF(...)', 'desc' => 'Rata-rata berdasarkan 1 kriteria.', 'steps' => ['Ketik =AVERAGEIF(A1:A10,"Apel",B1:B10)'], 'example' => '=AVERAGEIF(A1:A10,"Apel",B1:B10)', 'result' => 'Rata-rata Apel.'],
            ],
            'fungsi-teks' => [
                ['title' => 'Flash Fill', 'shortcut' => 'Ctrl + E', 'desc' => 'Otomatis mengisi pola teks.', 'steps' => ['Ketik contoh di cell sebelah', 'Tekan Ctrl + E.'], 'example' => 'Memisahkan nama depan', 'result' => 'Data terisi otomatis.'],
                ['title' => 'Hapus Spasi Berlebih', 'shortcut' => '=TRIM(...)', 'desc' => 'Membersihkan spasi ganda.', 'steps' => ['Ketik =TRIM(A1)'], 'example' => '=TRIM(A1)', 'result' => 'Teks bersih.'],
            ],
            // LEVEL 3
            'cell-reference' => [
                ['title' => 'Ganti Tipe Referensi', 'shortcut' => 'F4', 'desc' => 'Memutar antara A1, $A$1, A$1, $A1.', 'steps' => ['Saat mengetik rumus, tekan F4 pada referensi.'], 'example' => 'A1 -> $A$1', 'result' => 'Referensi berubah.'],
            ],
            'fungsi-tanggal-waktu' => [
                ['title' => 'Tanggal Sekarang', 'shortcut' => 'Ctrl + ;', 'desc' => 'Memasukkan tanggal hari ini.', 'steps' => ['Tekan Ctrl + ;.'], 'example' => 'Tanggal otomatis', 'result' => 'Tanggal muncul.'],
                ['title' => 'Waktu Sekarang', 'shortcut' => 'Ctrl + Shift + ;', 'desc' => 'Memasukkan jam saat ini.', 'steps' => ['Tekan Ctrl + Shift + ;.'], 'example' => 'Jam otomatis', 'result' => 'Waktu muncul.'],
                ['title' => 'TODAY & NOW', 'shortcut' => '=TODAY() / =NOW()', 'desc' => 'Fungsi tanggal & waktu dinamis.', 'steps' => ['Ketik =TODAY() atau =NOW().'], 'example' => '=TODAY()', 'result' => 'Tanggal hari ini.'],
            ],
            'fungsi-lookup' => [
                ['title' => 'Kunci Tabel Referensi', 'shortcut' => 'F4', 'desc' => 'Gunakan $ pada tabel agar tidak bergeser.', 'steps' => ['Tekan F4 pada range tabel.'], 'example' => '=VLOOKUP(D1,$A$1:$B$3,2,FALSE)', 'result' => 'Tabel terkunci.'],
                ['title' => 'Exact Match', 'shortcut' => 'FALSE', 'desc' => 'Gunakan FALSE untuk pencarian persis.', 'steps' => ['Tambahkan FALSE di akhir rumus.'], 'example' => '=VLOOKUP(...,FALSE)', 'result' => 'Pencarian akurat.'],
            ],
            'fungsi-iferror' => [
                ['title' => 'Tangani Error', 'shortcut' => '=IFERROR(...)', 'desc' => 'Menampilkan nilai alternatif saat error.', 'steps' => ['Bungkus rumus dengan IFERROR.'], 'example' => '=IFERROR(VLOOKUP(...),"Tidak ada")', 'result' => 'Error diganti teks.'],
                ['title' => 'Tampilkan Rumus', 'shortcut' => 'Ctrl + `', 'desc' => 'Menampilkan semua rumus di sheet.', 'steps' => ['Tekan Ctrl + `.'], 'example' => 'Lihat rumus asli', 'result' => 'Semua rumus terlihat.'],
            ],
            // LEVEL 4
            'excel-table' => [
                ['title' => 'Buat Tabel Cepat', 'shortcut' => 'Ctrl + T', 'desc' => 'Mengubah data menjadi Table.', 'steps' => ['Pilih data', 'Tekan Ctrl + T', 'Centang My table has headers.'], 'example' => 'Data penjualan', 'result' => 'Tabel terformat.'],
            ],
            'sorting-filtering' => [
                ['title' => 'Aktifkan Filter', 'shortcut' => 'Ctrl + Shift + L', 'desc' => 'Menambah tombol filter di header.', 'steps' => ['Pilih header tabel', 'Tekan Ctrl + Shift + L.'], 'example' => 'Filter data', 'result' => 'Tombol filter muncul.'],
            ],
            'conditional-formatting' => [
                ['title' => 'Sorot Nilai', 'shortcut' => 'Home > CF', 'desc' => 'Mewarnai cell berdasarkan aturan.', 'steps' => ['Pilih data', 'Home > Conditional Formatting', 'Pilih Highlight Cells Rules.'], 'example' => 'Nilai < 70 merah', 'result' => 'Cell berwarna.'],
            ],
            'data-validation' => [
                ['title' => 'Buat Dropdown', 'shortcut' => 'Data > Validation', 'desc' => 'Membuat pilihan dropdown di cell.', 'steps' => ['Pilih cell', 'Data > Data Validation', 'Pilih List', 'Isi sumber.'], 'example' => 'Dropdown Laki-laki/Perempuan', 'result' => 'Cell ada dropdown.'],
            ],
            'data-cleaning' => [
                ['title' => 'Hapus Duplikat', 'shortcut' => 'Data > Remove Duplicates', 'desc' => 'Menghapus data ganda.', 'steps' => ['Pilih data', 'Data > Remove Duplicates.'], 'example' => 'Data pelanggan', 'result' => 'Duplikat hilang.'],
                ['title' => 'Find & Replace', 'shortcut' => 'Ctrl + H', 'desc' => 'Mencari dan mengganti teks.', 'steps' => ['Tekan Ctrl + H', 'Isi Find & Replace.'], 'example' => 'Ganti "PT" jadi "CV"', 'result' => 'Teks berubah.'],
                ['title' => 'Text to Columns', 'shortcut' => 'Data > Text to Columns', 'desc' => 'Memisahkan teks ke beberapa kolom.', 'steps' => ['Pilih kolom', 'Data > Text to Columns', 'Pilih Delimited.'], 'example' => 'Pisah Nama & Alamat', 'result' => 'Data terpisah.'],
                ['title' => 'Flash Fill', 'shortcut' => 'Ctrl + E', 'desc' => 'Mengisi data mengikuti pola.', 'steps' => ['Ketik pola', 'Tekan Ctrl + E.'], 'example' => 'Ambil inisial nama', 'result' => 'Data terisi.'],
            ],
            // LEVEL 5
            'membuat-chart' => [
                ['title' => 'Chart Cepat di Sheet', 'shortcut' => 'Alt + F1', 'desc' => 'Membuat chart di sheet yang sama.', 'steps' => ['Pilih data', 'Tekan Alt + F1.'], 'example' => 'Grafik penjualan', 'result' => 'Chart muncul.'],
                ['title' => 'Chart di Sheet Baru', 'shortcut' => 'F11', 'desc' => 'Membuat chart di sheet terpisah.', 'steps' => ['Pilih data', 'Tekan F11.'], 'example' => 'Grafik penuh', 'result' => 'Sheet chart baru.'],
            ],
            'pivottable-dashboard' => [
                ['title' => 'Buat Pivot Cepat', 'shortcut' => 'Insert > PivotTable', 'desc' => 'Merangkum data besar.', 'steps' => ['Pilih data', 'Insert > PivotTable', 'Klik OK.'], 'example' => 'Ringkasan penjualan', 'result' => 'PivotTable muncul.'],
                ['title' => 'Slicer Interaktif', 'shortcut' => 'Insert > Slicer', 'desc' => 'Filter data PivotTable secara visual.', 'steps' => ['Klik PivotTable', 'Insert > Slicer', 'Pilih field.'], 'example' => 'Filter per produk', 'result' => 'Slicer interaktif.'],
            ],
            'membuat-dashboard' => [
                ['title' => 'Slicer untuk Dashboard', 'shortcut' => 'Insert > Slicer', 'desc' => 'Membuat filter interaktif untuk dashboard.', 'steps' => ['Buat PivotTable', 'Insert > Slicer.'], 'example' => 'Filter dashboard', 'result' => 'Dashboard interaktif.'],
            ],
            'page-layout-print' => [
                ['title' => 'Cetak Cepat', 'shortcut' => 'Ctrl + P', 'desc' => 'Membuka preview cetak.', 'steps' => ['Tekan Ctrl + P.'], 'example' => 'Print preview', 'result' => 'Dialog print muncul.'],
                ['title' => 'Atur Print Area', 'shortcut' => 'Page Layout > Print Area', 'desc' => 'Menentukan area yang dicetak.', 'steps' => ['Pilih range', 'Page Layout > Print Area > Set Print Area.'], 'example' => 'Cetak area tertentu', 'result' => 'Hanya area itu tercetak.'],
            ],
        ];

        // Loop untuk memasukkan tips
        foreach ($tipsData as $slug => $tips) {
            if (!isset($lessons[$slug])) continue;
            $lessonId = $lessons[$slug];
            foreach ($tips as $index => $tip) {
                Tip::updateOrCreate(
                    ['lesson_id' => $lessonId, 'title' => $tip['title']],
                    [
                        'short_description' => $tip['desc'],
                        'category' => 'Hemat Waktu',
                        'shortcut' => $tip['shortcut'] ?? null,
                        'steps' => $tip['steps'] ?? null,
                        'example' => $tip['example'] ?? null,
                        'result' => $tip['result'] ?? null,
                        'difficulty' => 'Pemula',
                        'platform' => 'Windows',
                        'sort_order' => $index + 1,
                        'is_active' => true,
                    ]
                );
            }
        }
    }
}