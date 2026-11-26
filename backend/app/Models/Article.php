<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Article extends Model
{
    protected $fillable = [
        'tenant_id',
        'title',
        'slug',
        'subtitle',
        'excerpt',
        'content',
        'featured_image',
        'image_caption',
        'gallery',
        'video_url',
        'category_id',
        'subcategory_id',
        'tags',
        'author_id',
        'reporter_id',
        'status',
        'rejection_feedback',
        'is_breaking',
        'is_featured',
        'is_editor_pick',
        'views',
        'shares',
        'language',
        'published_at',
        'scheduled_at',
        'seo',
    ];

    protected function casts(): array
    {
        return [
            'gallery' => 'array',
            'tags' => 'array',
            'seo' => 'array',
            'is_breaking' => 'boolean',
            'is_featured' => 'boolean',
            'is_editor_pick' => 'boolean',
            'views' => 'integer',
            'shares' => 'integer',
            'published_at' => 'datetime',
            'scheduled_at' => 'datetime',
        ];
    }

    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function subcategory(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'subcategory_id');
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function reporter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reporter_id');
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}

