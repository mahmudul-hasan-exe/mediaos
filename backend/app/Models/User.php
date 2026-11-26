<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'tenant_id',
        'name',
        'email',
        'email_verified_at',
        'verification_code',
        'verification_token',
        'verification_expires_at',
        'password',
        'role',
        'auth_provider',
        'avatar',
        'designation',
        'bio',
        'phone',
        'status',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'verification_expires_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }

    public function articles(): HasMany
    {
        return $this->hasMany(Article::class, 'author_id');
    }

    public function isStaff(): bool
    {
        return in_array($this->role, [
            'super-admin',
            'newspaper-owner',
            'admin',
            'editor-in-chief',
            'editor',
            'reporter',
            'author',
            'moderator',
        ], true);
    }

    public function isSuperAdmin(): bool
    {
        return $this->role === 'super-admin';
    }

    public function canReviewArticles(): bool
    {
        return in_array($this->role, [
            'super-admin',
            'newspaper-owner',
            'admin',
            'editor-in-chief',
            'editor',
        ], true);
    }
}
