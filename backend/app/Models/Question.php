<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'visual_data' => 'array',
        'options' => 'array',
        'accepted_answers' => 'array',
        'wrong_answer_explanations' => 'array',
        'is_active' => 'boolean',
    ];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }
}