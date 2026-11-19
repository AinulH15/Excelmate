<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LessonExample extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'data_table' => 'array',
        'steps' => 'array',
    ];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }
}