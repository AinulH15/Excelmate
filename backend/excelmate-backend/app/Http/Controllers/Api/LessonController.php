<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    public function index(Request $request)
    {
        $query = Lesson::with(['category:id,name,slug,color,icon', 'level:id,name,slug'])
            ->where('is_published', true);

        // Fitur pencarian
        if ($search = $request->query('search')) {
            $query->where('title', 'like', "%{$search}%");
        }

        // Filter kategori
        if ($category = $request->query('category')) {
            $query->whereHas('category', fn($q) => $q->where('slug', $category));
        }

        return response()->json([
            'data' => $query->orderBy('order')->orderBy('id')->get(),
        ]);
    }

    public function show($slug)
    {
        $lesson = Lesson::with([
            'category',
            'level',
            'examples',
            // Mengambil exercises dan options, TAPI jangan kirim is_correct ke frontend
            'exercises.options' => function ($q) {
                $q->select('id', 'exercise_id', 'label', 'text');
            },
        ])
            ->where('is_published', true)
            ->where('slug', $slug)
            ->firstOrFail();

        // Navigasi Prev/Next — GLOBAL lintas kategori & level
        // Basis urutan disamakan dengan index(): order ASC, lalu id sebagai tie-breaker
        $prev = Lesson::where('is_published', true)
            ->where(function ($q) use ($lesson) {
                $q->where('order', '<', $lesson->order)
                  ->orWhere(function ($q2) use ($lesson) {
                      $q2->where('order', $lesson->order)
                         ->where('id', '<', $lesson->id);
                  });
            })
            ->orderByDesc('order')
            ->orderByDesc('id')
            ->first(['slug', 'title']);

        $next = Lesson::where('is_published', true)
            ->where(function ($q) use ($lesson) {
                $q->where('order', '>', $lesson->order)
                  ->orWhere(function ($q2) use ($lesson) {
                      $q2->where('order', $lesson->order)
                         ->where('id', '>', $lesson->id);
                  });
            })
            ->orderBy('order')
            ->orderBy('id')
            ->first(['slug', 'title']);

        return response()->json([
            'data' => $lesson,
            'prev' => $prev,
            'next' => $next,
        ]);
    }

    public function tips($slug)
    {
        $lesson = Lesson::where('is_published', true)
            ->where('slug', $slug)
            ->firstOrFail();

        $tips = $lesson->tips()->where('is_active', true)->get();

        return response()->json(['data' => $tips]);
    }

    public function questions($slug)
    {
        $lesson = Lesson::where('is_published', true)
            ->where('slug', $slug)
            ->firstOrFail();

        $questions = $lesson->questions()->where('is_active', true)->get();

        return response()->json(['data' => $questions]);
    }
}