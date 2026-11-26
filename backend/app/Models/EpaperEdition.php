<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EpaperEdition extends Model
{
    protected $fillable = [
        'tenant_id',
        'title',
        'edition_date',
        'cover_image',
        'total_pages',
        'pages',
        'status',
        'download_url',
    ];

    protected function casts(): array
    {
        return [
            'edition_date' => 'date',
            'pages' => 'array',
            'total_pages' => 'integer',
        ];
    }

    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }
}

