<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Category;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class MediaDeskDashboardSeeder extends Seeder
{
    public function run(): void
    {
        $tenant = Tenant::first();
        if (!$tenant) {
            return;
        }

        $author = User::where('tenant_id', $tenant->id)->first() ?? User::first();

        // 1. Ensure categories exist
        $categoriesMap = [
            'Health' => ['color' => '#10B981', 'order' => 7],
            'Lifestyle' => ['color' => '#EC4899', 'order' => 8],
            'Environment' => ['color' => '#059669', 'order' => 9],
            'Opinion' => ['color' => '#8B5CF6', 'order' => 10],
            'Entertainment' => ['color' => '#F59E0B', 'order' => 11],
            'Sports' => ['color' => '#3B82F6', 'order' => 6],
        ];

        $categoryModels = [];
        foreach ($categoriesMap as $name => $meta) {
            $categoryModels[$name] = Category::updateOrCreate(
                ['tenant_id' => $tenant->id, 'slug' => Str::slug($name)],
                [
                    'name' => $name,
                    'color' => $meta['color'],
                    'order' => $meta['order'],
                    'language' => 'en',
                    'description' => "Editorial desk for {$name}",
                ]
            );
        }

        // 2. Ensure top 8 showcase articles exist
        $topArticles = [
            [
                'title' => "Video: A doctor's advice on daily habits that protect the heart",
                'category' => 'Health',
                'type' => 'video',
                'views' => 59288,
                'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            ],
            [
                'title' => "Experts' simple tips for skincare as the seasons change",
                'category' => 'Lifestyle',
                'type' => 'news',
                'views' => 58291,
                'video_url' => null,
            ],
            [
                'title' => "Tiger census begins in the Sundarbans using camera traps",
                'category' => 'Environment',
                'type' => 'news',
                'views' => 57292,
                'video_url' => null,
            ],
            [
                'title' => "Decentralisation is needed to revive the rural economy",
                'category' => 'Opinion',
                'type' => 'opinion',
                'views' => 55417,
                'video_url' => null,
            ],
            [
                'title' => "Video: Popular band electrifies concert stage before thousands",
                'category' => 'Entertainment',
                'type' => 'video',
                'views' => 54418,
                'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            ],
            [
                'title' => "Where is the green space in urban planning?",
                'category' => 'Opinion',
                'type' => 'opinion',
                'views' => 53423,
                'video_url' => null,
            ],
            [
                'title' => "A slate of new dramas on the way for Eid",
                'category' => 'Entertainment',
                'type' => 'news',
                'views' => 52424,
                'video_url' => null,
            ],
            [
                'title' => "Tigers clinch the series; young pacer named player of the match",
                'category' => 'Sports',
                'type' => 'video',
                'views' => 51429,
                'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            ],
        ];

        foreach ($topArticles as $item) {
            $cat = $categoryModels[$item['category']] ?? null;
            Article::updateOrCreate(
                [
                    'tenant_id' => $tenant->id,
                    'slug' => Str::slug($item['title']),
                ],
                [
                    'title' => $item['title'],
                    'category_id' => $cat?->id,
                    'author_id' => $author?->id,
                    'status' => 'published',
                    'views' => $item['views'],
                    'shares' => (int) round($item['views'] * 0.05),
                    'video_url' => $item['video_url'],
                    'excerpt' => $item['title'] . ' — comprehensive editorial dispatch and analysis.',
                    'content' => '<p>' . $item['title'] . '</p><p>Detailed reporting and multimedia analysis by the editorial desk.</p>',
                    'featured_image' => 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&auto=format&fit=crop&q=80',
                    'published_at' => now()->subDays(rand(1, 10)),
                ]
            );
        }

        // 3. Ensure full 18-member newsroom team exists
        $staffMembers = [
            ['name' => 'Elena Rostova', 'email' => 'elena.rostova@mediaos.io', 'role' => 'editor', 'designation' => 'Executive Editor & Head of Desks', 'avatar' => 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'],
            ['name' => 'Tariq Mansoor', 'email' => 'tariq.mansoor@mediaos.io', 'role' => 'editor', 'designation' => 'Economics & Trade Desk Editor', 'avatar' => 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80'],
            ['name' => 'Ayesha Siddiqua', 'email' => 'ayesha.s@mediaos.io', 'role' => 'reporter', 'designation' => 'Senior Investigative Journalist', 'avatar' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'],
            ['name' => 'Jonathan Price', 'email' => 'jonathan.p@mediaos.io', 'role' => 'reporter', 'designation' => 'AI & Frontier Tech Correspondent', 'avatar' => 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'],
            ['name' => 'Farhan Chowdhury', 'email' => 'farhan.c@mediaos.io', 'role' => 'editor', 'designation' => 'Chief Sports Editor', 'avatar' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'],
            ['name' => 'Nadia Petrova', 'email' => 'nadia.p@mediaos.io', 'role' => 'author', 'designation' => 'Culture, Arts & Lifestyle Critic', 'avatar' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'],
            ['name' => 'Samuel K. Vance', 'email' => 'samuel.vance@mediaos.io', 'role' => 'reporter', 'designation' => 'Parliament & Diplomatic Bureau', 'avatar' => 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'],
            ['name' => 'Michael Chang', 'email' => 'michael.c@mediaos.io', 'role' => 'editor', 'designation' => 'Data Journalism & Visuals Editor', 'avatar' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'],
            ['name' => 'Layla Al-Hassan', 'email' => 'layla.h@mediaos.io', 'role' => 'reporter', 'designation' => 'Middle East Bureau Chief', 'avatar' => 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'],
            ['name' => 'Kevin Miller', 'email' => 'kevin.m@mediaos.io', 'role' => 'reporter', 'designation' => 'Photojournalist & Multimedia Producer', 'avatar' => 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&auto=format&fit=crop&q=80'],
            ['name' => 'Sofia Morales', 'email' => 'sofia.m@mediaos.io', 'role' => 'reporter', 'designation' => 'Environment & Climate Correspondent', 'avatar' => 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80'],
            ['name' => 'Tanvir Hasan', 'email' => 'tanvir.h@mediaos.io', 'role' => 'reporter', 'designation' => 'Urban Affairs & Transportation Desk', 'avatar' => 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80'],
            ['name' => 'Rachel Green', 'email' => 'rachel.g@mediaos.io', 'role' => 'author', 'designation' => 'Op-Ed Columnist & Policy Analyst', 'avatar' => 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80'],
        ];

        foreach ($staffMembers as $staff) {
            User::updateOrCreate(
                ['email' => $staff['email']],
                [
                    'tenant_id' => $tenant->id,
                    'name' => $staff['name'],
                    'password' => \Illuminate\Support\Facades\Hash::make('password'),
                    'role' => $staff['role'],
                    'designation' => $staff['designation'],
                    'avatar' => $staff['avatar'],
                    'status' => 'active',
                ]
            );
        }
    }
}
