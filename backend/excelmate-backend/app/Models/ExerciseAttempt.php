<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExerciseAttempt extends Model
{
    protected $guarded = ['id'];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function answers()
    {
        return $this->hasMany(ExerciseAnswer::class, 'attempt_id');
    }
}