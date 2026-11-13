<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ExerciseAttempt;
use App\Models\Lesson;
use Illuminate\Http\Request;

class ProgressController extends Controller
{
    public function show(Request $request)
    {
        $sessionId = $request->query('session_id');
        if (!$sessionId) {
            return response()->json(['message' => 'Session ID required'], 400);
        }

        // Ambil riwayat latihan berdasarkan session_id
        $attempts = ExerciseAttempt::where('session_id', $sessionId)
            ->where('status', '!=', 'in_progress')
            ->with('lesson:id,title,slug')
            ->latest()->get();

        $totalLessons = Lesson::where('is_published', true)->count();
        $completed = $attempts->pluck('lesson_id')->unique()->count();
        $avg = $attempts->count() ? round($attempts->avg('score'), 1) : 0;

        return response()->json([
            'total_lessons' => $totalLessons,
            'completed_lessons' => $completed,
            'percentage' => $totalLessons ? round(($completed / $totalLessons) * 100) : 0,
            'average_score' => $avg,
            'attempts' => $attempts,
        ]);
    }
}