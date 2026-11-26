<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    protected $fillable = [
        'tenant_id',
        'article_id',
        'author_name',
        'author_email',
        'content',
        'status',
        'likes',
    ];

    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }

    public function article(): BelongsTo
    {
        return $this->belongsTo(Article::class);
    }
}

