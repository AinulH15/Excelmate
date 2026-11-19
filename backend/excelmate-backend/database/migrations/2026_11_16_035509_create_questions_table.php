<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lesson_id')->constrained()->cascadeOnDelete();
            $table->text('question');
            $table->string('question_type')->default('multiple_choice'); // multiple_choice, formula, visual
            $table->string('difficulty')->default('Mudah'); // Mudah, Menengah, Sulit
            $table->json('visual_data')->nullable(); // Data tabel untuk visual
            $table->json('options')->nullable();     // Pilihan jawaban
            $table->string('correct_answer')->nullable(); // Jawaban benar
            $table->json('accepted_answers')->nullable(); // Variasi jawaban yang diterima
            $table->text('explanation')->nullable(); // Pembahasan
            $table->json('wrong_answer_explanations')->nullable(); // Penjelasan per jawaban salah
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};