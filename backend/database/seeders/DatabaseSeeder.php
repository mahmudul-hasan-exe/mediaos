<?php

namespace Database\Seeders;

use App\Models\Advertisement;
use App\Models\AiProvider;
use App\Models\Article;
use App\Models\Category;
use App\Models\Comment;
use App\Models\EpaperEdition;
use App\Models\MediaItem;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Seed Tenants
        $mediaos = Tenant::updateOrCreate(
            ['code' => 'ten-01'],
            [
                'name' => 'MediaOS',
                'slug' => 'mediaos',
                'domain' => 'mediaos.com',
                'logo' => 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=100&auto=format&fit=crop&q=80',
                'primary_color' => '#2563EB',
                'supported_languages' => ['en', 'bn', 'ar'],
                'default_language' => 'en',
                'plan' => 'Enterprise',
                'status' => 'active',
                'ai_limit' => 5000000,
                'ai_usage' => 1420500,
                'contact_email' => 'press@mediaos.com',
                'owner_name' => 'Arthur Sterling',
                'website_config' => [
                    'siteTitle' => 'MediaOS — AI-Powered Multi-Tenant Digital Publishing Platform',
                    'tagline' => 'Unbiased reporting, fearless investigations, in-depth analysis.',
                    'breakingNewsEnabled' => true,
                    'ePaperEnabled' => true,
                    'commentsModeration' => true,
                    'advertisementsEnabled' => true,
                    'facebookUrl' => 'https://facebook.com/mediaos',
                    'twitterUrl' => 'https://twitter.com/mediaos',
                    'youtubeUrl' => 'https://youtube.com/@mediaos',
                ],
            ]
        );

        $dhaka = Tenant::updateOrCreate(
            ['code' => 'ten-02'],
            [
                'name' => 'The Dhaka Standard',
                'slug' => 'dhaka-standard',
                'domain' => 'dhakastandard.com',
                'logo' => 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=100&auto=format&fit=crop&q=80',
                'primary_color' => '#059669',
                'supported_languages' => ['bn', 'en'],
                'default_language' => 'bn',
                'plan' => 'Professional',
                'status' => 'active',
                'ai_limit' => 2500000,
                'ai_usage' => 890400,
                'contact_email' => 'editor@dhakastandard.com',
                'owner_name' => 'Tanvir Ahmed',
                'website_config' => [
                    'siteTitle' => 'ঢাকা স্ট্যান্ডার্ড — নির্ভীক ও নিরপেক্ষ সংবাদপত্র',
                    'tagline' => 'সত্য প্রকাশে আপসহীন প্রতিদিন।',
                    'breakingNewsEnabled' => true,
                    'ePaperEnabled' => true,
                    'commentsModeration' => true,
                    'advertisementsEnabled' => true,
                ],
            ]
        );

        Tenant::updateOrCreate(
            ['code' => 'ten-03'],
            [
                'name' => 'Al-Sharq Tribune',
                'slug' => 'alsharq-tribune',
                'domain' => 'alsharqtribune.ae',
                'logo' => 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=100&auto=format&fit=crop&q=80',
                'primary_color' => '#D97706',
                'supported_languages' => ['ar', 'en'],
                'default_language' => 'ar',
                'plan' => 'Enterprise',
                'status' => 'active',
                'ai_limit' => 4000000,
                'ai_usage' => 1200300,
                'contact_email' => 'desk@alsharqtribune.ae',
                'owner_name' => 'Sheikh Tariq Mansoor',
                'website_config' => [
                    'siteTitle' => 'الشرق تريبيون — صوت الشرق الأوسط والعالم',
                    'tagline' => 'تغطية شاملة وموثوقة على مدار الساعة.',
                    'breakingNewsEnabled' => true,
                    'ePaperEnabled' => true,
                    'commentsModeration' => true,
                    'advertisementsEnabled' => true,
                ],
            ]
        );

        Tenant::updateOrCreate(
            ['code' => 'ten-04'],
            [
                'name' => 'Pacific Tech Herald',
                'slug' => 'pacific-tech',
                'domain' => 'techherald.io',
                'logo' => 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&auto=format&fit=crop&q=80',
                'primary_color' => '#7C3AED',
                'supported_languages' => ['en'],
                'default_language' => 'en',
                'plan' => 'Starter',
                'status' => 'suspended',
                'ai_limit' => 500000,
                'ai_usage' => 512000,
                'contact_email' => 'contact@techherald.io',
                'owner_name' => 'Elena Rostova',
                'website_config' => [
                    'siteTitle' => 'Pacific Tech Herald — Frontier Technologies & AI',
                    'tagline' => 'The definitive source for deep tech insights.',
                    'breakingNewsEnabled' => false,
                    'ePaperEnabled' => false,
                    'commentsModeration' => true,
                    'advertisementsEnabled' => false,
                ],
            ]
        );

        // 2. Seed Users
        $superAdmin = User::updateOrCreate(
            ['email' => 'superadmin@mediaos.io'],
            [
                'tenant_id' => $mediaos->id,
                'name' => 'Marcus Vance',
                'password' => Hash::make('password'),
                'role' => 'super-admin',
                'designation' => 'Platform Super Administrator',
                'avatar' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                'bio' => 'Global operations and multi-tenant SaaS infrastructure architect.',
                'status' => 'active',
            ]
        );

        $admin = User::updateOrCreate(
            ['email' => 'admin@mediaos.io'],
            [
                'tenant_id' => $mediaos->id,
                'name' => 'Sarah Jenkins',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'designation' => 'Managing Director & Chief Admin',
                'avatar' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
                'bio' => 'Oversees newsroom strategy, editorial governance, and publication revenue.',
                'status' => 'active',
            ]
        );

        $editor = User::updateOrCreate(
            ['email' => 'editor@mediaos.io'],
            [
                'tenant_id' => $mediaos->id,
                'name' => 'Dr. Marcus Wei',
                'password' => Hash::make('password'),
                'role' => 'editor',
                'designation' => 'Senior Desk Editor',
                'avatar' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
                'bio' => 'Fact-checking lead for Science, Tech, and World Affairs.',
                'status' => 'active',
            ]
        );

        $reporter = User::updateOrCreate(
            ['email' => 'reporter@mediaos.io'],
            [
                'tenant_id' => $mediaos->id,
                'name' => "David O'Connor",
                'password' => Hash::make('password'),
                'role' => 'reporter',
                'designation' => 'Special Correspondent',
                'avatar' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
                'bio' => 'Field reporter covering diplomacy, parliament, and investigative leads.',
                'status' => 'active',
            ]
        );

        User::updateOrCreate(
            ['email' => 'reader@mediaos.io'],
            [
                'tenant_id' => $mediaos->id,
                'name' => 'Rafiqul Islam',
                'password' => Hash::make('password'),
                'role' => 'reader',
                'designation' => 'Verified Subscriber',
                'status' => 'active',
            ]
        );

        // 3. Seed Categories & Subcategories for MediaOS
        $catNational = Category::updateOrCreate(
            ['tenant_id' => $mediaos->id, 'slug' => 'national'],
            ['name' => 'National', 'description' => 'Domestic affairs, urban transit, infrastructure & policy.', 'color' => '#2563EB', 'order' => 1, 'language' => 'en']
        );
        $subDhaka = Category::updateOrCreate(
            ['tenant_id' => $mediaos->id, 'slug' => 'dhaka-city'],
            ['parent_id' => $catNational->id, 'name' => 'Dhaka city', 'color' => '#2563EB', 'order' => 1, 'language' => 'en']
        );

        $catWorld = Category::updateOrCreate(
            ['tenant_id' => $mediaos->id, 'slug' => 'world'],
            ['name' => 'World Affairs', 'description' => 'Global diplomacy, geopolitics & multilateral summits.', 'color' => '#4F46E5', 'order' => 2, 'language' => 'en']
        );
        $subDiplomacy = Category::updateOrCreate(
            ['tenant_id' => $mediaos->id, 'slug' => 'diplomacy'],
            ['parent_id' => $catWorld->id, 'name' => 'Diplomacy', 'color' => '#4F46E5', 'order' => 1, 'language' => 'en']
        );

        $catTech = Category::updateOrCreate(
            ['tenant_id' => $mediaos->id, 'slug' => 'technology'],
            ['name' => 'Technology & AI', 'description' => 'Frontier computing, AI breakthroughs, cybersecurity.', 'color' => '#0891B2', 'order' => 3, 'language' => 'en']
        );
        $subQuantum = Category::updateOrCreate(
            ['tenant_id' => $mediaos->id, 'slug' => 'quantum'],
            ['parent_id' => $catTech->id, 'name' => 'Quantum Computing', 'color' => '#0891B2', 'order' => 1, 'language' => 'en']
        );

        $catBusiness = Category::updateOrCreate(
            ['tenant_id' => $mediaos->id, 'slug' => 'business'],
            ['name' => 'Business & Economy', 'description' => 'Macroeconomics, central banks, trade & markets.', 'color' => '#059669', 'order' => 4, 'language' => 'en']
        );
        $subBanking = Category::updateOrCreate(
            ['tenant_id' => $mediaos->id, 'slug' => 'banking'],
            ['parent_id' => $catBusiness->id, 'name' => 'Banking & Finance', 'color' => '#059669', 'order' => 1, 'language' => 'en']
        );

        $catPolitics = Category::updateOrCreate(
            ['tenant_id' => $mediaos->id, 'slug' => 'politics'],
            ['name' => 'Politics', 'description' => 'Parliament, governance, legislation and elections.', 'color' => '#DC2626', 'order' => 5, 'language' => 'en']
        );

        $catSports = Category::updateOrCreate(
            ['tenant_id' => $mediaos->id, 'slug' => 'sports'],
            ['name' => 'Sports', 'description' => 'Cricket, football, Formula 1 and international arenas.', 'color' => '#7C3AED', 'order' => 6, 'language' => 'en']
        );

        // 4. Seed Articles
        $art1 = Article::updateOrCreate(
            ['tenant_id' => $mediaos->id, 'slug' => 'global-leaders-historic-accord-autonomous-ai-governance'],
            [
                'title' => 'Global Leaders Reach Historic Accord on Autonomous AI Governance Frameworks',
                'subtitle' => 'Delegates from 68 nations finalize ethical guidelines, safety audits, and liability standards in Geneva.',
                'excerpt' => 'In a groundbreaking summit concluding today, international negotiators codified landmark treaties governing high-capability autonomous systems, mandating verifiable provenance and safety certifications.',
                'content' => '<p>In what diplomatic observers are calling the most consequential multilateral digital pact of the decade, representatives from sixty-eight countries signed the Geneva Convention on Autonomous Computation this afternoon.</p><p>The framework establishes strict legal liability protocols for advanced autonomous intelligence clusters, requiring independent cryptographic auditing before models exceeding specified inference thresholds can interface with critical civil infrastructure.</p>',
                'featured_image' => 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
                'image_caption' => 'Plenary hall at the International Conference Center in Geneva during the closing vote.',
                'category_id' => $catWorld->id,
                'subcategory_id' => $subDiplomacy->id,
                'tags' => ['Artificial Intelligence', 'Geopolitics', 'Geneva', 'Policy'],
                'author_id' => $admin->id,
                'reporter_id' => $reporter->id,
                'status' => 'published',
                'is_breaking' => true,
                'is_featured' => true,
                'is_editor_pick' => true,
                'views' => 48920,
                'shares' => 3410,
                'language' => 'en',
                'published_at' => now()->subHours(4),
                'seo' => [
                    'metaTitle' => 'Global Leaders Sign Milestone AI Governance Accord in Geneva',
                    'metaDescription' => '68 nations ratify sweeping autonomous AI governance treaties.',
                    'keywords' => ['AI Treaty', 'Geneva Accord', 'Global Tech Governance'],
                ],
            ]
        );

        $art2 = Article::updateOrCreate(
            ['tenant_id' => $mediaos->id, 'slug' => 'quantum-chip-architecture-breaks-logical-qubit-threshold'],
            [
                'title' => 'Quantum Chip Architecture Breaks 10,000 Logical Qubit Threshold',
                'subtitle' => 'Breakthrough error correction algorithms eliminate thermal decoherence roadblocks in silicon lattice trials.',
                'excerpt' => 'Engineers at the Quantum Dynamics Institute have demonstrated fault-tolerant quantum calculation at room temperature.',
                'content' => '<p>A profound breakthrough in topological condensed matter physics was disclosed this morning in Nature Physics, announcing the world\'s first sustained 10,000 logical qubit lattice operating with 99.998% gate fidelity.</p>',
                'featured_image' => 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&auto=format&fit=crop&q=80',
                'image_caption' => 'Cryogenic vacuum testbed housing the topological quantum processor.',
                'category_id' => $catTech->id,
                'subcategory_id' => $subQuantum->id,
                'tags' => ['Quantum', 'Physics', 'Semiconductors'],
                'author_id' => $editor->id,
                'status' => 'published',
                'is_breaking' => false,
                'is_featured' => true,
                'is_editor_pick' => true,
                'views' => 31200,
                'shares' => 2150,
                'language' => 'en',
                'published_at' => now()->subDays(1),
                'seo' => [
                    'metaTitle' => 'Breakthrough 10,000 Qubit Quantum Processor Revealed',
                    'metaDescription' => 'Engineers achieve fault-tolerant room-temperature quantum computing milestone.',
                    'keywords' => ['Quantum Chip', 'Qubits', 'Computing'],
                ],
            ]
        );

        Article::updateOrCreate(
            ['tenant_id' => $mediaos->id, 'slug' => 'central-banks-accelerate-cbdc-trials-trade-shifts'],
            [
                'title' => 'Central Banks Accelerate Interoperable Digital Currency Trials Amid Cross-Border Trade Shifts',
                'subtitle' => 'Wholesale settlement pilots reduce transaction friction by 84% across transatlantic corridors.',
                'excerpt' => 'Wholesale Central Bank Digital Currencies completed a trillion-dollar multi-currency liquidity simulation.',
                'content' => '<p>Central banking authorities representing fourteen monetary zones concluded Project Nexus today, verifying atomic gross settlement over permissioned distributed ledgers.</p>',
                'featured_image' => 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80',
                'category_id' => $catBusiness->id,
                'subcategory_id' => $subBanking->id,
                'tags' => ['Economy', 'CBDC', 'Banking', 'Fintech'],
                'author_id' => $admin->id,
                'status' => 'published',
                'is_breaking' => false,
                'is_featured' => false,
                'views' => 18400,
                'shares' => 890,
                'language' => 'en',
                'published_at' => now()->subDays(2),
            ]
        );

        Article::updateOrCreate(
            ['tenant_id' => $mediaos->id, 'slug' => 'schedule-announced-for-capital-new-metro-line'],
            [
                'title' => "Schedule announced for the capital's new metro line",
                'excerpt' => 'Services on the new metro line will begin in phases to ease commuter congestion across the central business district.',
                'content' => '<p>Transit authorities unveiled the phased operational timetable for the expanded elevated rail corridor connecting northern suburbs to the downtown financial core.</p>',
                'featured_image' => 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&auto=format&fit=crop&q=80',
                'category_id' => $catNational->id,
                'subcategory_id' => $subDhaka->id,
                'tags' => ['Metro', 'Transit', 'Urban'],
                'author_id' => $reporter->id,
                'status' => 'published',
                'is_breaking' => true,
                'views' => 14200,
                'shares' => 530,
                'language' => 'en',
                'published_at' => now()->subHours(8),
            ]
        );

        // Pending Review story for Editorial Review Queue
        Article::updateOrCreate(
            ['tenant_id' => $mediaos->id, 'slug' => 'parliament-prepares-annual-digital-infrastructure-bill'],
            [
                'title' => 'Parliament Prepares Landmark Annual Digital Infrastructure & Open Data Bill',
                'subtitle' => 'Bipartisan committee submits final draft covering municipal broadband rights and public datasets.',
                'excerpt' => 'Lawmakers are set to vote next week on sweeping legislation defining public internet access as a regulated essential utility.',
                'content' => '<p>Following eight months of stakeholder hearings, the Joint Parliamentary Committee on Technology submitted its final legislative draft today.</p>',
                'featured_image' => 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&auto=format&fit=crop&q=80',
                'category_id' => $catPolitics->id,
                'tags' => ['Parliament', 'Legislation', 'Broadband'],
                'author_id' => $reporter->id,
                'reporter_id' => $reporter->id,
                'status' => 'pending',
                'views' => 0,
                'shares' => 0,
                'language' => 'en',
            ]
        );

        // Draft story
        Article::updateOrCreate(
            ['tenant_id' => $mediaos->id, 'slug' => 'cricket-world-series-squad-selection-analysis'],
            [
                'title' => 'Selectors Weigh Pace Attack Options Ahead of Upcoming Continental Series',
                'excerpt' => 'Training camp metrics highlight two emerging fast bowlers competing for the final squad slot.',
                'content' => '<p>National team selectors concluded a three-day fitness and speed telemetry assessment at the academy nets.</p>',
                'featured_image' => 'https://images.unsplash.com/photo-1531415074868-036b107e7742?w=1200&auto=format&fit=crop&q=80',
                'category_id' => $catSports->id,
                'tags' => ['Cricket', 'Selection'],
                'author_id' => $reporter->id,
                'status' => 'draft',
                'language' => 'en',
            ]
        );

        // Also seed 1 sample article for The Dhaka Standard (Tenant 2)
        $dhakaNational = Category::updateOrCreate(
            ['tenant_id' => $dhaka->id, 'slug' => 'national'],
            ['name' => 'জাতীয়', 'color' => '#059669', 'order' => 1, 'language' => 'bn']
        );
        Article::updateOrCreate(
            ['tenant_id' => $dhaka->id, 'slug' => 'dhaka-metro-expansion-phase-two'],
            [
                'title' => 'মেট্রোরেলের নতুন রুটের সময়সূচি ঘোষণা, কমবে নগরীর যানজট',
                'excerpt' => 'রাজধানীর ব্যস্ততম বাণিজ্যিক এলাকাগুলোতে যাত্রীদের যাতায়াত সহজ করতে পর্যায়ক্রমে নতুন স্টেশন চালু করা হবে।',
                'content' => '<p>নগর পরিবহন কর্তৃপক্ষ আজ এক সংবাদ সম্মেলনে মেট্রোরেলের দ্বিতীয় পর্যায়ের সময়সূচি প্রকাশ করেছে।</p>',
                'featured_image' => 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&auto=format&fit=crop&q=80',
                'category_id' => $dhakaNational->id,
                'author_id' => $admin->id,
                'status' => 'published',
                'is_breaking' => true,
                'is_featured' => true,
                'views' => 22100,
                'language' => 'bn',
                'published_at' => now()->subHours(3),
            ]
        );

        // 5. Seed Media Library
        MediaItem::updateOrCreate(
            ['tenant_id' => $mediaos->id, 'file_name' => 'geneva-summit-plenary-2025.jpg'],
            [
                'title' => 'Geneva Diplomatic Summit Plenary',
                'url' => 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
                'file_type' => 'image',
                'file_size' => '2.4 MB',
                'dimensions' => '3840 x 2160',
                'folder' => 'World Affairs',
                'uploaded_by_id' => $admin->id,
                'uploaded_by_name' => $admin->name,
            ]
        );
        MediaItem::updateOrCreate(
            ['tenant_id' => $mediaos->id, 'file_name' => 'quantum-processor-core.jpg'],
            [
                'title' => 'Quantum Processor Laboratory',
                'url' => 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&auto=format&fit=crop&q=80',
                'file_type' => 'image',
                'file_size' => '1.8 MB',
                'dimensions' => '2560 x 1440',
                'folder' => 'Technology',
                'uploaded_by_id' => $editor->id,
                'uploaded_by_name' => $editor->name,
            ]
        );
        MediaItem::updateOrCreate(
            ['tenant_id' => $mediaos->id, 'file_name' => 'trading-floor-monitors.jpg'],
            [
                'title' => 'Stock Exchange Market Desks',
                'url' => 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80',
                'file_type' => 'image',
                'file_size' => '3.1 MB',
                'dimensions' => '4000 x 2667',
                'folder' => 'Business',
                'uploaded_by_id' => $admin->id,
                'uploaded_by_name' => $admin->name,
            ]
        );

        // 6. Seed Reader Comments
        Comment::updateOrCreate(
            ['tenant_id' => $mediaos->id, 'article_id' => $art1->id, 'author_email' => 'reader1@example.com'],
            [
                'author_name' => 'Elena Vance',
                'content' => 'Crucial step forward for international algorithmic accountability. Glad to see cryptographic provenance included.',
                'status' => 'approved',
                'likes' => 24,
            ]
        );
        Comment::updateOrCreate(
            ['tenant_id' => $mediaos->id, 'article_id' => $art2->id, 'author_email' => 'physicist@example.com'],
            [
                'author_name' => 'Prof. Ariful Haque',
                'content' => 'Is there a link to the peer-reviewed topological braiding paper referenced in the second paragraph?',
                'status' => 'pending',
                'likes' => 5,
            ]
        );

        // 7. Seed Advertisements
        Advertisement::updateOrCreate(
            ['tenant_id' => $mediaos->id, 'zone' => 'header_leaderboard'],
            [
                'title' => 'MediaOS Enterprise Cloud Leaderboard',
                'client_name' => 'MediaOS Cloud Infrastructure',
                'image_url' => 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
                'destination_url' => 'https://mediaos.com/cloud',
                'start_date' => now()->subDays(10)->toDateString(),
                'end_date' => now()->addDays(60)->toDateString(),
                'status' => 'active',
                'impressions' => 142500,
                'clicks' => 3840,
            ]
        );
        Advertisement::updateOrCreate(
            ['tenant_id' => $mediaos->id, 'zone' => 'sidebar_square'],
            [
                'title' => 'Apex Global CDN Partner Spotlight',
                'client_name' => 'Apex Edge Systems',
                'image_url' => 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
                'destination_url' => 'https://apexcdn.io',
                'start_date' => now()->subDays(5)->toDateString(),
                'end_date' => now()->addDays(45)->toDateString(),
                'status' => 'active',
                'impressions' => 89200,
                'clicks' => 1920,
            ]
        );

        // 8. Seed E-Paper Edition
        EpaperEdition::updateOrCreate(
            ['tenant_id' => $mediaos->id, 'edition_date' => now()->toDateString()],
            [
                'title' => 'MediaOS Daily Broadsheet — Morning Edition',
                'cover_image' => 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80',
                'total_pages' => 12,
                'status' => 'published',
                'pages' => [
                    [
                        'pageNumber' => 1,
                        'imageUrl' => 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&auto=format&fit=crop&q=80',
                        'thumbnailUrl' => 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&auto=format&fit=crop&q=80',
                        'hotspots' => [
                            [
                                'id' => 'hs-1',
                                'x' => 10,
                                'y' => 15,
                                'width' => 45,
                                'height' => 30,
                                'articleTitle' => 'Global Leaders Reach Historic Accord on AI Governance',
                                'articleExcerpt' => 'Delegates from 68 nations finalize ethical guidelines and safety audits in Geneva.',
                            ],
                        ],
                    ],
                ],
            ]
        );

        // 9. Seed AI Providers
        AiProvider::updateOrCreate(
            ['provider' => 'gemini'],
            [
                'name' => 'Google Gemini Suite',
                'status' => 'active',
                'models' => [
                    ['id' => 'gemini-1.5-pro', 'name' => 'Gemini 1.5 Pro (Editorial Long-form)', 'isDefault' => true, 'costPer1kTokens' => 0.00125],
                    ['id' => 'gemini-1.5-flash', 'name' => 'Gemini 1.5 Flash (Instant Speed)', 'costPer1kTokens' => 0.000075],
                ],
                'total_tokens_used' => 3840000,
                'estimated_cost' => 3.84,
                'rpm_limit' => 1000,
            ]
        );
        AiProvider::updateOrCreate(
            ['provider' => 'openai'],
            [
                'name' => 'OpenAI Platform',
                'status' => 'active',
                'models' => [
                    ['id' => 'gpt-4o', 'name' => 'GPT-4o (Multimodal Omni)', 'costPer1kTokens' => 0.005],
                    ['id' => 'gpt-4o-mini', 'name' => 'GPT-4o Mini (Cost Optimized)', 'costPer1kTokens' => 0.00015],
                ],
                'total_tokens_used' => 5210000,
                'estimated_cost' => 18.20,
                'rpm_limit' => 500,
            ]
        );
        AiProvider::updateOrCreate(
            ['provider' => 'anthropic'],
            [
                'name' => 'Anthropic Claude',
                'status' => 'active',
                'models' => [
                    ['id' => 'claude-3-5-sonnet', 'name' => 'Claude 3.5 Sonnet (Nuanced Prose)', 'costPer1kTokens' => 0.003],
                ],
                'total_tokens_used' => 1980000,
                'estimated_cost' => 5.94,
                'rpm_limit' => 300,
            ]
        );

        // Seed Default Navigation Menus for all Tenants
        $menuService = app(\App\Services\DefaultMenuService::class);
        foreach (Tenant::all() as $tenantItem) {
            $menuService->ensureSeededForTenant($tenantItem);
        }
    }
}
