<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AiProvider extends Model
{
    protected $fillable = [
        'name',
        'provider',
        'status',
        'api_key',
        'base_url',
        'models',
        'total_tokens_used',
        'estimated_cost',
        'rpm_limit',
    ];

    protected $hidden = [
        'api_key',
    ];

    protected function casts(): array
    {
        return [
            'models' => 'array',
            'total_tokens_used' => 'integer',
            'estimated_cost' => 'float',
            'rpm_limit' => 'integer',
        ];
    }
}

