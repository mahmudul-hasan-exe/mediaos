<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Tenants (Multi-Tenant Publications)
        Schema::create('tenants', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique(); // e.g. ten-01
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('domain')->unique();
            $table->string('logo')->nullable();
            $table->string('favicon')->nullable();
            $table->string('primary_color')->default('#2563EB');
            $table->json('supported_languages')->nullable();
            $table->string('default_language', 10)->default('en');
            $table->string('plan')->default('Enterprise'); // Starter, Professional, Enterprise
            $table->string('status')->default('active'); // active, suspended, pending
            $table->unsignedBigInteger('ai_limit')->default(5000000);
            $table->unsignedBigInteger('ai_usage')->default(0);
            $table->string('contact_email')->nullable();
            $table->string('owner_name')->nullable();
            $table->json('website_config')->nullable();
            $table->timestamps();
        });

        // 2. Extend Users for MediaOS Multi-Tenant & Roles
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('tenant_id')->nullable()->after('id')->constrained('tenants')->nullOnDelete();
            $table->string('role')->default('reader')->after('email'); // super-admin, newspaper-owner, admin, editor-in-chief, editor, reporter, author, moderator, reader
            $table->string('avatar')->nullable()->after('role');
            $table->string('designation')->nullable()->after('avatar');
            $table->text('bio')->nullable()->after('designation');
            $table->string('phone')->nullable()->after('bio');
            $table->string('status')->default('active')->after('phone'); // active, inactive, suspended
        });

        // 3. Categories & Subcategories
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained('tenants')->cascadeOnDelete();
            $table->foreignId('parent_id')->nullable()->constrained('categories')->cascadeOnDelete();
            $table->string('name');
            $table->string('slug');
            $table->text('description')->nullable();
            $table->string('icon')->nullable();
            $table->string('color')->default('#2563EB');
            $table->unsignedInteger('order')->default(0);
            $table->string('language', 10)->default('en');
            $table->timestamps();

            $table->unique(['tenant_id', 'slug']);
        });

        // 4. News Articles
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained('tenants')->cascadeOnDelete();
            $table->string('title');
            $table->string('slug');
            $table->string('subtitle')->nullable();
            $table->text('excerpt')->nullable();
            $table->longText('content');
            $table->string('featured_image')->nullable();
            $table->string('image_caption')->nullable();
            $table->json('gallery')->nullable();
            $table->string('video_url')->nullable();
            $table->foreignId('category_id')->nullable()->constrained('categories')->nullOnDelete();
            $table->foreignId('subcategory_id')->nullable()->constrained('categories')->nullOnDelete();
            $table->json('tags')->nullable();
            $table->foreignId('author_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('reporter_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('status')->default('draft'); // draft, pending, approved, scheduled, published, rejected, archived
            $table->text('rejection_feedback')->nullable();
            $table->boolean('is_breaking')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_editor_pick')->default(false);
            $table->unsignedBigInteger('views')->default(0);
            $table->unsignedBigInteger('shares')->default(0);
            $table->string('language', 10)->default('en');
            $table->timestamp('published_at')->nullable();
            $table->timestamp('scheduled_at')->nullable();
            $table->json('seo')->nullable();
            $table->timestamps();

            $table->unique(['tenant_id', 'slug']);
            $table->index(['tenant_id', 'status']);
        });

        // 5. Media Items
        Schema::create('media_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained('tenants')->cascadeOnDelete();
            $table->string('title');
            $table->string('file_name');
            $table->string('url');
            $table->string('file_type')->default('image'); // image, video, document, audio
            $table->string('file_size')->default('0 KB');
            $table->string('dimensions')->nullable();
            $table->string('folder')->default('General');
            $table->foreignId('uploaded_by_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('uploaded_by_name')->nullable();
            $table->timestamps();
        });

        // 6. Reader Comments
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained('tenants')->cascadeOnDelete();
            $table->foreignId('article_id')->constrained('articles')->cascadeOnDelete();
            $table->string('author_name');
            $table->string('author_email')->nullable();
            $table->text('content');
            $table->string('status')->default('pending'); // approved, pending, spam, trash
            $table->unsignedInteger('likes')->default(0);
            $table->timestamps();
        });

        // 7. Advertisements
        Schema::create('advertisements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained('tenants')->cascadeOnDelete();
            $table->string('title');
            $table->string('zone'); // header_leaderboard, sidebar_square, in_article, sticky_footer, homepage_middle
            $table->string('client_name');
            $table->string('image_url')->nullable();
            $table->string('destination_url')->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->string('status')->default('active'); // active, scheduled, expired, paused
            $table->unsignedBigInteger('impressions')->default(0);
            $table->unsignedBigInteger('clicks')->default(0);
            $table->timestamps();
        });

        // 8. Digital E-Paper Editions
        Schema::create('epaper_editions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained('tenants')->cascadeOnDelete();
            $table->string('title');
            $table->date('edition_date');
            $table->string('cover_image')->nullable();
            $table->unsignedInteger('total_pages')->default(1);
            $table->json('pages')->nullable();
            $table->string('status')->default('draft'); // published, draft
            $table->string('download_url')->nullable();
            $table->timestamps();
        });

        // 9. AI Providers (Platform-wide Gateway)
        Schema::create('ai_providers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('provider'); // openai, gemini, anthropic, custom
            $table->string('status')->default('active'); // active, inactive
            $table->text('api_key')->nullable();
            $table->string('base_url')->nullable();
            $table->json('models')->nullable();
            $table->unsignedBigInteger('total_tokens_used')->default(0);
            $table->decimal('estimated_cost', 10, 4)->default(0);
            $table->unsignedInteger('rpm_limit')->default(500);
            $table->timestamps();
        });

        // 10. AI Usage Logs
        Schema::create('ai_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->nullable()->constrained('tenants')->nullOnDelete();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('tool');
            $table->string('provider');
            $table->string('model');
            $table->unsignedInteger('tokens_used')->default(0);
            $table->string('status')->default('success');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ai_logs');
        Schema::dropIfExists('ai_providers');
        Schema::dropIfExists('epaper_editions');
        Schema::dropIfExists('advertisements');
        Schema::dropIfExists('comments');
        Schema::dropIfExists('media_items');
        Schema::dropIfExists('articles');
        Schema::dropIfExists('categories');

        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['tenant_id']);
            $table->dropColumn(['tenant_id', 'role', 'avatar', 'designation', 'bio', 'phone', 'status']);
        });

        Schema::dropIfExists('tenants');
    }
};

