<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LessonController;
use App\Http\Controllers\Api\FormulaController;
use App\Http\Controllers\Api\ExerciseController;
use App\Http\Controllers\Api\ProgressController;

// Test route
Route::get('/ping', fn() => response()->json(['status' => 'ok', 'message' => 'Backend jalan!']));

// Rute Materi
Route::get('/lessons', [LessonController::class, 'index']);
Route::get('/lessons/{slug}', [LessonController::class, 'show']);

// Rute Kamus Rumus
Route::get('/formulas', [FormulaController::class, 'index']);
Route::get('/formulas/{slug}', [FormulaController::class, 'show']);

// Rute Latihan (Exercises)
Route::post('/exercises/start', [ExerciseController::class, 'start']);
Route::post('/exercises/{id}/submit', [ExerciseController::class, 'submit']);
Route::post('/exercises/finish', [ExerciseController::class, 'finish']);

// Rute Progress Belajar
Route::get('/progress', [ProgressController::class, 'show']);

Route::get('/lessons/{slug}/tips', [LessonController::class, 'tips']);

Route::get('/lessons/{slug}/questions', [LessonController::class, 'questions']);