<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Categories
        Schema::create('categories', function (Blueprint $t) {
            $t->id();
            $t->string('name');
            $t->string('slug')->unique();
            $t->text('description')->nullable();
            $t->string('color', 20)->default('mint');
            $t->string('icon', 50)->default('BookOpen');
            $t->timestamps();
        });

        // 2. Learning Levels
        Schema::create('learning_levels', function (Blueprint $t) {
            $t->id();
            $t->string('name');
            $t->string('slug')->unique();
            $t->integer('order')->default(0);
            $t->text('description')->nullable();
            $t->timestamps();
        });

        // 3. Lessons
        Schema::create('lessons', function (Blueprint $t) {
            $t->id();
            $t->foreignId('category_id')->constrained()->cascadeOnDelete();
            $t->foreignId('learning_level_id')->constrained()->cascadeOnDelete();
            $t->string('title');
            $t->string('slug')->unique();
            $t->text('intro')->nullable();
            $t->json('content')->nullable();
            $t->integer('order')->default(0);
            $t->boolean('is_published')->default(true);
            $t->timestamps();
            $t->index(['category_id', 'learning_level_id']);
        });

        // 4. Formulas (Kamus Rumus)
        Schema::create('formulas', function (Blueprint $t) {
            $t->id();
            $t->string('name')->unique();
            $t->string('slug')->unique();
            $t->string('category', 50)->nullable();
            $t->text('description');
            $t->text('syntax');
            $t->text('example')->nullable();
            $t->text('result')->nullable();
            $t->json('parameters')->nullable();
            $t->text('common_mistakes')->nullable();
            $t->string('excel_versions', 100)->nullable();
            $t->timestamps();
            $t->index('category');
        });

        // 5. Lesson Examples (Contoh Soal di Materi)
        Schema::create('lesson_examples', function (Blueprint $t) {
            $t->id();
            $t->foreignId('lesson_id')->constrained()->cascadeOnDelete();
            $t->string('title');
            $t->text('case_description')->nullable();
            $t->json('data_table')->nullable();
            $t->text('question')->nullable();
            $t->text('formula_used')->nullable();
            $t->json('steps')->nullable();
            $t->text('final_result')->nullable();
            $t->integer('order')->default(0);
            $t->timestamps();
        });

        // 6. Exercises (Latihan)
        Schema::create('exercises', function (Blueprint $t) {
            $t->id();
            $t->foreignId('lesson_id')->constrained()->cascadeOnDelete();
            $t->text('question');
            $t->string('type', 20)->default('multiple_choice');
            $t->json('data_table')->nullable();
            $t->text('explanation')->nullable();
            $t->integer('order')->default(0);
            $t->timestamps();
        });

        // 7. Exercise Options
        Schema::create('exercise_options', function (Blueprint $t) {
            $t->id();
            $t->foreignId('exercise_id')->constrained()->cascadeOnDelete();
            $t->string('label', 10);
            $t->text('text');
            $t->boolean('is_correct')->default(false);
            $t->timestamps();
        });

        // 8. Exercise Attempts (Percobaan latihan per materi)
        Schema::create('exercise_attempts', function (Blueprint $t) {
            $t->id();
            $t->foreignId('lesson_id')->constrained()->cascadeOnDelete();
            $t->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $t->string('session_id', 64)->nullable();
            $t->integer('score')->default(0);
            $t->integer('correct_count')->default(0);
            $t->integer('total_count')->default(0);
            $t->string('status', 20)->default('in_progress');
            $t->timestamps();
            $t->index(['lesson_id', 'session_id']);
            $t->index(['session_id', 'status']);
        });

        // 9. Exercise Answers (Jawaban per soal)
        Schema::create('exercise_answers', function (Blueprint $t) {
            $t->id();
            $t->foreignId('attempt_id')->constrained('exercise_attempts')->cascadeOnDelete();
            $t->foreignId('exercise_id')->constrained()->cascadeOnDelete();
            $t->foreignId('selected_option_id')->nullable()->constrained('exercise_options')->nullOnDelete();
            $t->boolean('is_correct')->default(false);
            $t->timestamps();
            $t->unique(['attempt_id', 'exercise_id']);
        });

        // 10. User Lesson Progress
        Schema::create('user_lesson_progress', function (Blueprint $t) {
            $t->id();
            $t->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $t->string('session_id', 64)->nullable();
            $t->foreignId('lesson_id')->constrained()->cascadeOnDelete();
            $t->boolean('completed')->default(false);
            $t->integer('best_score')->nullable();
            $t->timestamps();
            $t->unique(['session_id', 'lesson_id']);
        });

        // 11. Bookmarks
        Schema::create('bookmarks', function (Blueprint $t) {
            $t->id();
            $t->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $t->string('session_id', 64)->nullable();
            $t->foreignId('lesson_id')->constrained()->cascadeOnDelete();
            $t->timestamps();
            $t->unique(['session_id', 'lesson_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookmarks');
        Schema::dropIfExists('user_lesson_progress');
        Schema::dropIfExists('exercise_answers');
        Schema::dropIfExists('exercise_attempts');
        Schema::dropIfExists('exercise_options');
        Schema::dropIfExists('exercises');
        Schema::dropIfExists('lesson_examples');
        Schema::dropIfExists('formulas');
        Schema::dropIfExists('lessons');
        Schema::dropIfExists('learning_levels');
        Schema::dropIfExists('categories');
    }
};