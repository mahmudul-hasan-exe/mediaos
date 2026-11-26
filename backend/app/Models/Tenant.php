<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tenant extends Model
{
    protected $fillable = [
        'code',
        'name',
        'slug',
        'domain',
        'logo',
        'favicon',
        'primary_color',
        'supported_languages',
        'default_language',
        'plan',
        'status',
        'ai_limit',
        'ai_usage',
        'contact_email',
        'owner_name',
        'website_config',
    ];

    protected function casts(): array
    {
        return [
            'supported_languages' => 'array',
            'website_config' => 'array',
            'ai_limit' => 'integer',
            'ai_usage' => 'integer',
        ];
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function categories(): HasMany
    {
        return $this->hasMany(Category::class);
    }

    public function articles(): HasMany
    {
        return $this->hasMany(Article::class);
    }

    public function mediaItems(): HasMany
    {
        return $this->hasMany(MediaItem::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function advertisements(): HasMany
    {
        return $this->hasMany(Advertisement::class);
    }

    public function epaperEditions(): HasMany
    {
        return $this->hasMany(EpaperEdition::class);
    }

    public function menuItems(): HasMany
    {
        return $this->hasMany(MenuItem::class);
    }
}

