<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Exercise;
use App\Models\ExerciseAttempt;
use App\Models\ExerciseAnswer;
use App\Models\ExerciseOption;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ExerciseController extends Controller
{
    // Memulai sesi latihan
    public function start(Request $request)
    {
        $data = $request->validate([
            'lesson_id' => 'required|integer|exists:lessons,id',
            'session_id' => 'nullable|string|max:64',
        ]);

        $attempt = ExerciseAttempt::create([
            'lesson_id' => $data['lesson_id'],
            'session_id' => $data['session_id'] ?? Str::uuid(),
            'status' => 'in_progress',
        ]);

        return response()->json([
            'attempt_id' => $attempt->id, 
            'session_id' => $attempt->session_id
        ], 201);
    }

    // Validasi jawaban per soal
    public function submit(Request $request, $id)
    {
        $data = $request->validate([
            'option_id' => 'required|integer|exists:exercise_options,id',
            'attempt_id' => 'required|integer|exists:exercise_attempts,id',
        ]);

        $exercise = Exercise::with('options')->findOrFail($id);
        $attempt = ExerciseAttempt::findOrFail($data['attempt_id']);

        if ($attempt->status !== 'in_progress') {
            return response()->json(['message' => 'Sesi latihan sudah selesai.'], 422);
        }

        // Cek jawaban
        $option = ExerciseOption::where('id', $data['option_id'])
            ->where('exercise_id', $exercise->id)->firstOrFail();

        $isCorrect = (bool) $option->is_correct;

        // Simpan jawaban ke database
        ExerciseAnswer::updateOrCreate(
            ['attempt_id' => $attempt->id, 'exercise_id' => $exercise->id],
            ['selected_option_id' => $option->id, 'is_correct' => $isCorrect]
        );

        $correctOption = $exercise->options->firstWhere('is_correct', true);

        return response()->json([
            'is_correct' => $isCorrect,
            'correct_option_id' => $correctOption?->id,
            'explanation' => $exercise->explanation ?? null,
            'message' => $isCorrect
                ? 'Benar! Kerja bagus 🎉'
                : 'Belum tepat. Lihat pembahasan di bawah.',
        ]);
    }

    // Menyelesaikan latihan dan menghitung skor
    public function finish(Request $request)
    {
        $data = $request->validate([
            'attempt_id' => 'required|integer|exists:exercise_attempts,id',
        ]);

        $attempt = ExerciseAttempt::with('answers')->findOrFail($data['attempt_id']);
        
        if ($attempt->status !== 'in_progress') {
            return response()->json(['data' => $attempt], 200);
        }

        $total = Exercise::where('lesson_id', $attempt->lesson_id)->count();
        $correct = $attempt->answers()->where('is_correct', true)->count();
        $score = $total > 0 ? (int) round(($correct / $total) * 100) : 0;

        $attempt->update([
            'correct_count' => $correct,
            'total_count' => $total,
            'score' => $score,
            'status' => $score >= 70 ? 'passed' : 'failed',
        ]);

        return response()->json([
            'data' => $attempt,
            'percentage' => $score,
            'status' => $attempt->status,
        ]);
    }
}