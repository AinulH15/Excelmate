<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Formula extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'parameters' => 'array',
        'case_table_before' => 'array',
        'case_table_after' => 'array',
    ];
}