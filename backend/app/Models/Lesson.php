<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    protected $guarded = ['id'];
    
    // Casting JSON dari database menjadi array di PHP
    protected $casts = [
        'content' => 'array',
        'is_published' => 'boolean',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function level()
    {
        return $this->belongsTo(LearningLevel::class, 'learning_level_id');
    }

    public function examples()
    {
        return $this->hasMany(LessonExample::class)->orderBy('order');
    }

    public function exercises()
    {
        return $this->hasMany(Exercise::class)->orderBy('order');
    }
}