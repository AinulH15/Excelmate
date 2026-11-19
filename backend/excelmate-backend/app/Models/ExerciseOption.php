<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExerciseOption extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'is_correct' => 'boolean',
    ];

    public function exercise()
    {
        return $this->belongsTo(Exercise::class);
    }
}