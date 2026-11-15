<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tips', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lesson_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->text('short_description');
            $table->string('category')->nullable(); // Misal: 'Hemat Waktu', 'Data'
            $table->string('shortcut')->nullable(); // Contoh: 'Alt + ='
            $table->json('steps')->nullable();      // Array langkah-langkah
            $table->text('example')->nullable();    // Contoh penggunaan
            $table->text('result')->nullable();     // Hasil yang diharapkan
            $table->string('difficulty')->default('Pemula'); // Pemula, Menengah, Lanjutan
            $table->string('platform')->default('Windows');  // Windows, Mac, Web
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tips');
    }
};