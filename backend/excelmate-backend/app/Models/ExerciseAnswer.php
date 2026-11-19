<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExerciseAnswer extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'is_correct' => 'boolean',
    ];

    public function attempt()
    {
        return $this->belongsTo(ExerciseAttempt::class, 'attempt_id');
    }

    public function exercise()
    {
        return $this->belongsTo(Exercise::class);
    }
}