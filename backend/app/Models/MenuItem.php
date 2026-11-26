<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MenuItem extends Model
{
    public const LOCATIONS = [
        'header' => [
            'label' => 'Header Bar',
            'short_hint' => 'Top bar links (National, World...)',
            'icon' => 'ri-layout-top-line',
            'description' => 'Main horizontal navigation links displayed across the top bar.',
        ],
        'mega' => [
            'label' => 'Sections ⌵',
            'short_hint' => 'Inside "Sections" mega menu',
            'icon' => 'ri-grid-line',
            'description' => 'All sections displayed inside the "Sections ⌵" dropdown panel.',
        ],
        'more' => [
            'label' => 'More ⌵',
            'short_hint' => 'Inside "More" dropdown menu',
            'icon' => 'ri-more-2-fill',
            'description' => 'Extra links displayed when clicking "More ⌵" on the right side of the bar.',
        ],
        'drawer' => [
            'label' => 'Side Menu',
            'short_hint' => 'Left "MENU" drawer & sub-menus',
            'icon' => 'ri-menu-2-line',
            'description' => 'Slide-over "MENU" drawer items and their expandable sub-menus.',
        ],
    ];

    protected $fillable = [
        'tenant_id',
        'parent_id',
        'category_id',
        'location',
        'label',
        'url',
        'target',
        'is_active',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(MenuItem::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(MenuItem::class, 'parent_id')->orderBy('sort_order')->orderBy('id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
