<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tip extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'steps' => 'array',
        'is_active' => 'boolean',
    ];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }
}