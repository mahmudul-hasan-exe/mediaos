<?php

namespace App\Services;

use App\Models\Category;
use App\Models\MenuItem;
use App\Models\Tenant;

class DefaultMenuService
{
    /**
     * Ensure default header, sections, more, and slide-over drawer menus exist for a tenant.
     */
    public function ensureSeededForTenant(Tenant $tenant, bool $forceReset = false): void
    {
        if ($forceReset) {
            MenuItem::where('tenant_id', $tenant->id)->delete();
        } elseif (MenuItem::where('tenant_id', $tenant->id)->exists()) {
            return;
        }

        $categoriesBySlug = Category::where('tenant_id', $tenant->id)
            ->get()
            ->keyBy('slug');

        $findCatId = fn (string $url): ?int => str_starts_with($url, '/category/')
            ? $categoriesBySlug->get(substr($url, strlen('/category/')))?->id
            : null;

        // 1. Header Bar
        $headerItems = [
            ['label' => 'National', 'url' => '/category/national'],
            ['label' => 'World', 'url' => '/category/world'],
            ['label' => 'Politics', 'url' => '/category/politics'],
            ['label' => 'Economy', 'url' => '/category/business'],
            ['label' => 'Sports', 'url' => '/category/sports'],
            ['label' => 'Entertainment', 'url' => '/category/entertainment'],
            ['label' => 'Technology', 'url' => '/category/technology'],
            ['label' => 'Opinion', 'url' => '/category/culture-opinion'],
            ['label' => 'Health', 'url' => '/category/health'],
        ];

        foreach ($headerItems as $idx => $item) {
            MenuItem::create([
                'tenant_id' => $tenant->id,
                'category_id' => $findCatId($item['url']),
                'location' => 'header',
                'label' => $item['label'],
                'url' => $item['url'],
                'sort_order' => $idx + 1,
                'is_active' => true,
            ]);
        }

        // 2. Sections Dropdown
        $megaItems = [
            ['label' => 'National', 'url' => '/category/national'],
            ['label' => 'World', 'url' => '/category/world'],
            ['label' => 'Politics', 'url' => '/category/politics'],
            ['label' => 'Economy', 'url' => '/category/business'],
            ['label' => 'Sports', 'url' => '/category/sports'],
            ['label' => 'Entertainment', 'url' => '/category/entertainment'],
            ['label' => 'Technology', 'url' => '/category/technology'],
            ['label' => 'Opinion', 'url' => '/category/culture-opinion'],
            ['label' => 'Health', 'url' => '/category/health'],
            ['label' => 'Education', 'url' => '/category/education'],
            ['label' => 'Lifestyle', 'url' => '/category/lifestyle'],
            ['label' => 'Environment', 'url' => '/category/climate-science'],
        ];

        foreach ($megaItems as $idx => $item) {
            MenuItem::create([
                'tenant_id' => $tenant->id,
                'category_id' => $findCatId($item['url']),
                'location' => 'mega',
                'label' => $item['label'],
                'url' => $item['url'],
                'sort_order' => $idx + 1,
                'is_active' => true,
            ]);
        }

        // 3. More Dropdown
        $moreItems = [
            ['label' => 'Live Coverage', 'url' => '/#live'],
            ['label' => 'Shorts & Reels', 'url' => '/#shorts'],
            ['label' => 'Audio Podcasts', 'url' => '/#podcasts'],
            ['label' => 'E-Paper Edition', 'url' => '/epaper'],
            ['label' => 'Editorial Authors', 'url' => '/author/sarah-jenkins'],
            ['label' => 'Trending Topics', 'url' => '/trending'],
            ['label' => 'Dispatch Archive', 'url' => '/search'],
            ['label' => 'Support Journalism', 'url' => '/contact'],
        ];

        foreach ($moreItems as $idx => $item) {
            MenuItem::create([
                'tenant_id' => $tenant->id,
                'location' => 'more',
                'label' => $item['label'],
                'url' => $item['url'],
                'sort_order' => $idx + 1,
                'is_active' => true,
            ]);
        }

        // 4. Slide-over Menu (Drawer with nested subtopics)
        $drawerItems = [
            ['label' => 'Home', 'url' => '/'],
            [
                'label' => 'World Affairs',
                'url' => '/category/world',
                'children' => [
                    ['label' => 'World Affairs', 'url' => '/category/world'],
                    ['label' => 'Diplomacy & Treaties', 'url' => '/category/world'],
                    ['label' => 'Global Geopolitics', 'url' => '/category/world'],
                    ['label' => 'International Security', 'url' => '/category/world'],
                ],
            ],
            [
                'label' => 'Business',
                'url' => '/category/business',
                'children' => [
                    ['label' => 'Business', 'url' => '/category/business'],
                    ['label' => 'Technology of Business', 'url' => '/category/business'],
                    ['label' => 'Capital Markets & Banking', 'url' => '/category/business'],
                ],
            ],
            [
                'label' => 'Technology',
                'url' => '/category/technology',
                'children' => [
                    ['label' => 'Technology', 'url' => '/category/technology'],
                    ['label' => 'Artificial Intelligence', 'url' => '/category/technology'],
                    ['label' => 'Quantum Computing', 'url' => '/category/technology'],
                    ['label' => 'Cybersecurity', 'url' => '/category/technology'],
                ],
            ],
            [
                'label' => 'Climate & Science',
                'url' => '/category/climate-science',
                'children' => [
                    ['label' => 'Climate & Science', 'url' => '/category/climate-science'],
                    ['label' => 'Clean Energy Transition', 'url' => '/category/climate-science'],
                    ['label' => 'Space Exploration', 'url' => '/category/climate-science'],
                ],
            ],
            [
                'label' => 'Investigations',
                'url' => '/category/investigations',
                'children' => [
                    ['label' => 'Investigative Desk', 'url' => '/category/investigations'],
                    ['label' => 'Public Accountability', 'url' => '/category/investigations'],
                ],
            ],
            [
                'label' => 'Culture & Opinion',
                'url' => '/category/culture-opinion',
                'children' => [
                    ['label' => 'Culture & Life', 'url' => '/category/culture-opinion'],
                    ['label' => 'Literature & Criticism', 'url' => '/category/culture-opinion'],
                ],
            ],
            ['label' => 'Trending Wire', 'url' => '/trending'],
            ['label' => 'Digital e-Paper', 'url' => '/epaper'],
        ];

        foreach ($drawerItems as $idx => $item) {
            $parent = MenuItem::create([
                'tenant_id' => $tenant->id,
                'category_id' => $findCatId($item['url']),
                'location' => 'drawer',
                'label' => $item['label'],
                'url' => $item['url'],
                'sort_order' => $idx + 1,
                'is_active' => true,
            ]);

            foreach ($item['children'] ?? [] as $cIdx => $child) {
                MenuItem::create([
                    'tenant_id' => $tenant->id,
                    'parent_id' => $parent->id,
                    'category_id' => $findCatId($child['url']),
                    'location' => 'drawer',
                    'label' => $child['label'],
                    'url' => $child['url'],
                    'sort_order' => $cIdx + 1,
                    'is_active' => true,
                ]);
            }
        }
    }
}
