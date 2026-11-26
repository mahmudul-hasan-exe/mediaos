<?php $__env->startSection('title', $isEdit ? 'Edit Story' : 'Compose New Story'); ?>

<?php $__env->startSection('content'); ?>
<div x-data="{
    title: '<?php echo e(addslashes(old('title', $article->title ?? ''))); ?>',
    subtitle: '<?php echo e(addslashes(old('subtitle', $article->subtitle ?? ''))); ?>',
    content: '<?php echo e(addslashes(old('content', $article->content ?? ''))); ?>',
    imageUrl: '<?php echo e(addslashes(old('featured_image', $article->featured_image ?? ''))); ?>',
    metaTitle: '<?php echo e(addslashes(old('meta_title', $article->seo['metaTitle'] ?? ''))); ?>',
    metaDescription: '<?php echo e(addslashes(old('meta_description', $article->seo['metaDescription'] ?? ''))); ?>',
    status: '<?php echo e(old('status', $article->status ?? 'draft')); ?>',
    get wordCount() {
        const text = this.content ? this.content.replace(/<[^>]*>?/gm, '').trim() : '';
        return text ? text.split(/\s+/).filter(Boolean).length : 0;
    },
    get charCount() {
        return this.content ? this.content.length : 0;
    },
    insertFormat(tag) {
        const textarea = document.getElementById('storyContentArea');
        if (!textarea) return;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const sel = textarea.value.substring(start, end);
        let replacement = '';
        if (tag === 'b') replacement = `**${sel || 'bold text'}**`;
        else if (tag === 'i') replacement = `*${sel || 'italic text'}*`;
        else if (tag === 'h2') replacement = `\n## ${sel || 'Section Heading'}\n`;
        else if (tag === 'h3') replacement = `\n### ${sel || 'Subheading'}\n`;
        else if (tag === 'quote') replacement = `\n> ${sel || 'Key quote or statement'}\n`;
        else if (tag === 'ul') replacement = `\n- ${sel || 'List item'}\n`;
        else if (tag === 'link') replacement = `[${sel || 'Link text'}](https://example.com)`;

        textarea.setRangeText(replacement, start, end, 'end');
        this.content = textarea.value;
        textarea.focus();
    }
}" class="space-y-6">

    <!-- Top Sticky Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div class="flex items-center gap-3">
            <a href="<?php echo e(route('admin.articles.index')); ?>" class="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            </a>
            <div>
                <div class="flex items-center gap-2">
                    <h1 class="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        <?php echo e($isEdit ? 'Edit Story' : 'Compose New Story'); ?>

                    </h1>
                    <span class="text-xs font-mono capitalize <?php echo e(($article->status ?? 'draft') === 'published' ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-400'); ?>">
                        (<?php echo e($article->status ?? 'Draft'); ?>)
                    </span>
                </div>
                <p class="text-xs text-zinc-400 mt-0.5">Publishing to <?php echo e($tenant->name); ?> (<?php echo e($tenant->domain); ?>)</p>
            </div>
        </div>

        <div class="flex items-center gap-2.5">
            <div class="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-500 font-mono">
                <span>Words: <strong class="text-zinc-800 dark:text-zinc-200" x-text="wordCount"></strong></span>
                <span>·</span>
                <span>Chars: <strong class="text-zinc-800 dark:text-zinc-200" x-text="charCount"></strong></span>
            </div>

            <button type="button" onclick="document.getElementById('articleMainForm').submit();"
                    class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition shadow-sm flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                <span><?php echo e($isEdit ? 'Update Story' : 'Save Story'); ?></span>
            </button>
        </div>
    </div>

    <!-- Main Two-Column Editorial Workspace -->
    <form id="articleMainForm" method="POST" action="<?php echo e($isEdit ? route('admin.articles.update', $article) : route('admin.articles.store')); ?>" class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <?php echo csrf_field(); ?>
        <?php if($isEdit): ?> <?php echo method_field('PUT'); ?> <?php endif; ?>

        <!-- Left Column: Story Canvas (8 cols) -->
        <div class="lg:col-span-8 space-y-6">
            <!-- Headline & Subtitle Card -->
            <div class="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-5 shadow-xs space-y-4">
                <div>
                    <label class="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">Headline *</label>
                    <input type="text" name="title" x-model="title" required
                           placeholder="Type a powerful, engaging story headline..." 
                           class="w-full text-lg sm:text-xl font-bold tracking-tight bg-transparent text-zinc-900 dark:text-zinc-50 border-b border-zinc-200 dark:border-zinc-800 pb-2.5 focus:outline-none focus:border-blue-600 placeholder-zinc-300 dark:placeholder-zinc-600">
                </div>

                <div>
                    <label class="block text-xs font-medium text-zinc-500 mb-1">Deck / Sub-headline</label>
                    <input type="text" name="subtitle" x-model="subtitle"
                           placeholder="Provide context or summary sentence expanding on the headline..."
                           class="w-full text-xs sm:text-sm bg-transparent text-zinc-700 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-800 pb-2 focus:outline-none focus:border-blue-600 placeholder-zinc-400">
                </div>

                <div>
                    <label class="block text-xs font-medium text-zinc-500 mb-1">Story Excerpt (Lead Paragraph)</label>
                    <textarea name="excerpt" rows="2" 
                              placeholder="Brief synopsis for newsfeeds, search results, and newsletter summaries..."
                              class="w-full text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/60 p-3 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500"><?php echo e(old('excerpt', $article->excerpt)); ?></textarea>
                </div>
            </div>

            <!-- Story Body with Rich Formatting Toolbar -->
            <div class="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 shadow-xs overflow-hidden">
                <!-- Formatting Toolbar -->
                <div class="px-4 py-2.5 bg-zinc-50/80 dark:bg-zinc-900/90 border-b border-zinc-200/80 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div class="flex items-center gap-1">
                        <button type="button" @click="insertFormat('b')" class="p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold" title="Bold">B</button>
                        <button type="button" @click="insertFormat('i')" class="p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 italic" title="Italic">I</button>
                        <span class="h-4 w-px bg-zinc-300 dark:bg-zinc-700 mx-1"></span>
                        <button type="button" @click="insertFormat('h2')" class="px-2 py-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold" title="Heading 2">H2</button>
                        <button type="button" @click="insertFormat('h3')" class="px-2 py-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium" title="Heading 3">H3</button>
                        <span class="h-4 w-px bg-zinc-300 dark:bg-zinc-700 mx-1"></span>
                        <button type="button" @click="insertFormat('quote')" class="p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300" title="Quote">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/></svg>
                        </button>
                        <button type="button" @click="insertFormat('ul')" class="p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300" title="Bulleted List">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
                        </button>
                        <button type="button" @click="insertFormat('link')" class="p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300" title="Insert Link">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
                        </button>
                    </div>

                    <div class="text-[11px] text-zinc-400 font-mono">
                        <span>Auto-draft ready</span>
                    </div>
                </div>

                <!-- Textarea Editor -->
                <div class="p-4 sm:p-5">
                    <textarea id="storyContentArea" name="content" x-model="content" required rows="14" 
                              placeholder="Write your comprehensive report, investigation, or analysis here..."
                              class="w-full text-sm leading-relaxed bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none resize-y min-h-[320px] font-sans"><?php echo e(old('content', $article->content)); ?></textarea>
                </div>
            </div>

            <!-- Google Search & Social SEO Preview Card -->
            <div class="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-5 shadow-xs space-y-4">
                <div class="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                    <div class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                        <h2 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">SEO &amp; Search Visibility</h2>
                    </div>
                    <span class="text-[11px] font-mono text-zinc-400">SERP Preview</span>
                </div>

                <!-- Snippet Preview -->
                <div class="rounded-lg border border-zinc-200/70 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/60 p-3.5 space-y-1">
                    <div class="flex items-center gap-1.5 text-[11px] text-zinc-500">
                        <span class="font-medium text-zinc-700 dark:text-zinc-300"><?php echo e($tenant->domain); ?></span>
                        <span>› stories ›</span>
                        <span class="text-zinc-400 truncate max-w-[200px]" x-text="title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'story-slug'"></span>
                    </div>
                    <p class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer truncate" 
                       x-text="metaTitle || title || 'Story headline in Google Search Results'"></p>
                    <p class="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2"
                       x-text="metaDescription || subtitle || 'Story meta description and excerpt snippet explaining the core dispatch to readers on search engines.'"></p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                        <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Custom Meta Title</label>
                        <input type="text" name="meta_title" x-model="metaTitle" value="<?php echo e(old('meta_title', $article->seo['metaTitle'] ?? '')); ?>"
                               placeholder="Leave blank to use story headline"
                               class="w-full text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Custom Meta Description</label>
                        <input type="text" name="meta_description" x-model="metaDescription" value="<?php echo e(old('meta_description', $article->seo['metaDescription'] ?? '')); ?>"
                               placeholder="Target 150-160 characters..."
                               class="w-full text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    </div>
                </div>
            </div>
        </div>

        <!-- Right Column: Editorial Sidebar (4 cols) -->
        <div class="lg:col-span-4 space-y-6">
            <!-- 1. Publishing & Workflow Card -->
            <div class="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-5 shadow-xs space-y-4">
                <div class="pb-3 border-b border-zinc-100 dark:border-zinc-800">
                    <h2 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Publishing Status</h2>
                </div>

                <div>
                    <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Editorial Workflow State</label>
                    <select name="status" x-model="status" class="w-full text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <option value="draft">Draft (Private to Author)</option>
                        <option value="pending">Submit to Review Queue</option>
                        <option value="approved">Approved by Desk</option>
                        <option value="scheduled">Scheduled for Release</option>
                        <option value="published">Publish Immediately</option>
                    </select>
                </div>

                <!-- Toggles -->
                <div class="space-y-2.5 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                    <label class="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer transition">
                        <span class="text-xs font-medium text-zinc-800 dark:text-zinc-200">Breaking Alert</span>
                        <input type="checkbox" name="is_breaking" value="1" <?php echo e(old('is_breaking', $article->is_breaking ?? false) ? 'checked' : ''); ?> class="rounded text-blue-600 focus:ring-blue-500">
                    </label>

                    <label class="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer transition">
                        <span class="text-xs font-medium text-zinc-800 dark:text-zinc-200">Featured Hero Story</span>
                        <input type="checkbox" name="is_featured" value="1" <?php echo e(old('is_featured', $article->is_featured ?? false) ? 'checked' : ''); ?> class="rounded text-blue-600 focus:ring-blue-500">
                    </label>

                    <label class="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer transition">
                        <span class="text-xs font-medium text-zinc-800 dark:text-zinc-200">Editor's Pick</span>
                        <input type="checkbox" name="is_editor_pick" value="1" <?php echo e(old('is_editor_pick', $article->is_editor_pick ?? false) ? 'checked' : ''); ?> class="rounded text-blue-600 focus:ring-blue-500">
                    </label>
                </div>

                <div class="pt-2">
                    <button type="submit" class="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition shadow-sm cursor-pointer">
                        <?php echo e($isEdit ? 'Save Changes' : 'Confirm & Publish Story'); ?>

                    </button>
                </div>
            </div>

            <!-- 2. Organization & Taxonomy Card -->
            <div class="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-5 shadow-xs space-y-4">
                <div class="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                    <h2 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Desk &amp; Organization</h2>
                    <span class="text-[11px] font-mono text-zinc-400">Taxonomy</span>
                </div>

                <div>
                    <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Category Desk</label>
                    <select name="category_id" class="w-full text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <option value="">Select Category</option>
                        <?php $__currentLoopData = $categories; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $cat): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                            <option value="<?php echo e($cat->id); ?>" <?php echo e(old('category_id', $article->category_id ?? '') == $cat->id ? 'selected' : ''); ?>>
                                <?php echo e($cat->name); ?>

                            </option>
                        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                    </select>
                </div>

                <div>
                    <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Edition Language</label>
                    <select name="language" class="w-full text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <option value="en" <?php echo e(old('language', $article->language ?? 'en') === 'en' ? 'selected' : ''); ?>>English (en)</option>
                        <option value="bn" <?php echo e(old('language', $article->language ?? '') === 'bn' ? 'selected' : ''); ?>>বাংলা (bn)</option>
                        <option value="ar" <?php echo e(old('language', $article->language ?? '') === 'ar' ? 'selected' : ''); ?>>العربية (ar)</option>
                    </select>
                </div>

                <div>
                    <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Topic Tags (comma-separated)</label>
                    <input type="text" name="tags" value="<?php echo e(old('tags', is_array($article->tags ?? null) ? implode(', ', $article->tags) : '')); ?>"
                           placeholder="Economy, AI, Diplomatic Summit"
                           class="w-full text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500">
                </div>
            </div>

            <!-- 3. Featured Media Card -->
            <div class="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-5 shadow-xs space-y-4">
                <div class="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                    <h2 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Featured Media</h2>
                    <span class="text-[11px] font-mono text-zinc-400">Cover</span>
                </div>

                <div>
                    <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Featured Image URL</label>
                    <input type="text" name="featured_image" x-model="imageUrl"
                           placeholder="https://images.unsplash.com/..."
                           class="w-full text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500">
                </div>

                <!-- Live Image Preview -->
                <div class="h-36 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950/60 overflow-hidden flex items-center justify-center relative">
                    <template x-if="imageUrl">
                        <img :src="imageUrl" alt="Cover Preview" class="w-full h-full object-cover">
                    </template>
                    <template x-if="!imageUrl">
                        <div class="text-center p-3 text-zinc-400">
                            <svg class="w-8 h-8 mx-auto text-zinc-300 dark:text-zinc-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                            <span class="text-[11px]">Enter URL above to preview image</span>
                        </div>
                    </template>
                </div>

                <div>
                    <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Image Caption / Photo Credit</label>
                    <input type="text" name="image_caption" value="<?php echo e(old('image_caption', $article->image_caption ?? '')); ?>"
                           placeholder="Photo by Reuters / AFP"
                           class="w-full text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500">
                </div>
            </div>
        </div>
    </form>
</div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.admin', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
