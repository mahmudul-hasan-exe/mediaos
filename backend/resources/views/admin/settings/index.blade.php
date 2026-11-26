<?php $__env->startSection('title', 'Publication Settings'); ?>

<?php $__env->startSection('content'); ?>
<div class="max-w-3xl space-y-6">
    <div>
        <h1 class="text-xl font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">Publication Settings</h1>
        <p class="text-xs text-zinc-500 mt-0.5">Configure branding, domain, and public website toggles for <?php echo e($tenant->name); ?></p>
    </div>

    <form method="POST" action="<?php echo e(route('admin.settings.update')); ?>"
          class="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-5 sm:p-6 space-y-5 shadow-xs">
        <?php echo csrf_field(); ?> <?php echo method_field('PUT'); ?>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Publication Name</label>
                <input type="text" name="name" value="<?php echo e(old('name', $tenant->name)); ?>" required
                       class="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-3.5 py-2 text-xs">
            </div>
            <div>
                <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Custom Domain</label>
                <input type="text" name="domain" value="<?php echo e(old('domain', $tenant->domain)); ?>" required
                       class="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-3.5 py-2 text-xs">
            </div>
        </div>

        <div>
            <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Site Title</label>
            <input type="text" name="site_title" value="<?php echo e(old('site_title', $tenant->website_config['siteTitle'] ?? $tenant->name)); ?>" required
                   class="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-3.5 py-2 text-xs">
        </div>

        <div>
            <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Tagline</label>
            <input type="text" name="tagline" value="<?php echo e(old('tagline', $tenant->website_config['tagline'] ?? '')); ?>"
                   class="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-3.5 py-2 text-xs">
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
                <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Primary Color</label>
                <input type="color" name="primary_color" value="<?php echo e(old('primary_color', $tenant->primary_color)); ?>"
                       class="h-9 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent p-1">
            </div>
            <div>
                <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Default Language</label>
                <select name="default_language" class="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-xs">
                    <option value="en" <?php echo e($tenant->default_language === 'en' ? 'selected' : ''); ?>>English (en)</option>
                    <option value="bn" <?php echo e($tenant->default_language === 'bn' ? 'selected' : ''); ?>>Bangla (bn)</option>
                    <option value="ar" <?php echo e($tenant->default_language === 'ar' ? 'selected' : ''); ?>>Arabic (ar)</option>
                </select>
            </div>
            <div>
                <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Contact Email</label>
                <input type="email" name="contact_email" value="<?php echo e(old('contact_email', $tenant->contact_email)); ?>"
                       class="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-3.5 py-2 text-xs">
            </div>
        </div>

        <div class="pt-3 border-t border-zinc-100 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <label class="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 cursor-pointer">
                <input type="checkbox" name="breaking_news_enabled" value="1" <?php echo e(($tenant->website_config['breakingNewsEnabled'] ?? true) ? 'checked' : ''); ?> class="rounded">
                <span>Enable Breaking News Ticker</span>
            </label>
            <label class="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 cursor-pointer">
                <input type="checkbox" name="epaper_enabled" value="1" <?php echo e(($tenant->website_config['ePaperEnabled'] ?? true) ? 'checked' : ''); ?> class="rounded">
                <span>Enable Digital E-Paper</span>
            </label>
            <label class="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 cursor-pointer">
                <input type="checkbox" name="comments_moderation" value="1" <?php echo e(($tenant->website_config['commentsModeration'] ?? true) ? 'checked' : ''); ?> class="rounded">
                <span>Pre-moderate Reader Comments</span>
            </label>
            <label class="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 cursor-pointer">
                <input type="checkbox" name="advertisements_enabled" value="1" <?php echo e(($tenant->website_config['advertisementsEnabled'] ?? true) ? 'checked' : ''); ?> class="rounded">
                <span>Display Advertisement Zones</span>
            </label>
        </div>

        <div class="pt-3 flex justify-end">
            <button type="submit" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-black text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 text-xs font-medium shadow-xs transition active:scale-[0.98] cursor-pointer">
                <i class="ri-save-line text-sm"></i>
                <span>Save Settings</span>
            </button>
        </div>
    </form>
</div>
<?php $__env->stopSection(); ?>


<?php echo $__env->make('layouts.admin', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
