<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Advertisement extends Model
{
    protected $fillable = [
        'tenant_id',
        'title',
        'zone',
        'client_name',
        'image_url',
        'destination_url',
        'start_date',
        'end_date',
        'status',
        'impressions',
        'clicks',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
            'impressions' => 'integer',
            'clicks' => 'integer',
        ];
    }

    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }
}

