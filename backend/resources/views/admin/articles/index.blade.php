<?php $__env->startSection('title', 'Articles'); ?>

<?php $__env->startSection('content'); ?>
<div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h1 class="text-xl font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">Articles</h1>
            <p class="text-xs text-zinc-500 mt-0.5">Manage drafts, pending dispatches, and published stories.</p>
        </div>
        <a href="<?php echo e(route('admin.articles.create')); ?>" class="px-3.5 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-medium self-start">
            + Compose Story
        </a>
    </div>

    <!-- Filter Bar -->
    <form method="GET" action="<?php echo e(route('admin.articles.index')); ?>" class="flex flex-wrap items-center gap-3">
        <input type="text" name="search" value="<?php echo e(request('search')); ?>" placeholder="Search headlines..."
               class="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs w-full sm:w-64 focus:outline-none">

        <select name="status" class="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs">
            <option value="all">All statuses</option>
            <?php $__currentLoopData = ['published', 'pending', 'draft', 'approved', 'scheduled', 'rejected']; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $st): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <option value="<?php echo e($st); ?>" <?php echo e(request('status') === $st ? 'selected' : ''); ?>><?php echo e(ucfirst($st)); ?></option>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
        </select>

        <select name="category_id" class="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs">
            <option value="">All categories</option>
            <?php $__currentLoopData = $categories; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $cat): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <option value="<?php echo e($cat->id); ?>" <?php echo e(request('category_id') == $cat->id ? 'selected' : ''); ?>><?php echo e($cat->name); ?></option>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
        </select>

        <button type="submit" class="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium hover:bg-zinc-50 cursor-pointer">
            Filter
        </button>
    </form>

    <!-- Articles Table -->
    <div class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
                <thead class="border-b border-zinc-100 dark:border-zinc-800/80 text-zinc-400 font-medium">
                    <tr>
                        <th class="px-5 py-3">Story</th>
                        <th class="px-4 py-3">Category</th>
                        <th class="px-4 py-3">Author</th>
                        <th class="px-4 py-3">Status</th>
                        <th class="px-4 py-3">Views</th>
                        <th class="px-5 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                    <?php $__empty_1 = true; $__currentLoopData = $articles; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $article): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); $__empty_1 = false; ?>
                        <tr class="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition">
                            <td class="px-5 py-3.5 max-w-md">
                                <div class="flex items-center gap-3">
                                    <?php if($article->featured_image): ?>
                                        <img src="<?php echo e($article->featured_image); ?>" alt="" class="h-10 w-14 rounded-lg object-cover bg-zinc-100 shrink-0">
                                    <?php endif; ?>
                                    <div class="min-w-0">
                                        <a href="<?php echo e(route('admin.articles.edit', $article)); ?>" class="font-medium text-zinc-900 dark:text-zinc-100 hover:text-blue-600 line-clamp-1">
                                            <?php echo e($article->title); ?>

                                        </a>
                                        <div class="flex items-center gap-2 text-[11px] text-zinc-400 mt-0.5">
                                            <span><?php echo e(strtoupper($article->language)); ?></span>
                                            <?php if($article->is_breaking): ?>
                                                <span class="text-red-500 font-medium">· Breaking</span>
                                            <?php endif; ?>
                                            <?php if($article->is_featured): ?>
                                                <span class="text-blue-500 font-medium">· Featured</span>
                                            <?php endif; ?>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-4 py-3.5 text-zinc-600 dark:text-zinc-400"><?php echo e($article->category?->name ?? '—'); ?></td>
                            <td class="px-4 py-3.5 text-zinc-600 dark:text-zinc-400"><?php echo e($article->author?->name ?? 'Editorial'); ?></td>
                            <td class="px-4 py-3.5 whitespace-nowrap text-xs font-medium">
                                <?php if($article->status === 'published'): ?>
                                    <span class="text-emerald-600 dark:text-emerald-400">Published</span>
                                <?php elseif($article->status === 'pending'): ?>
                                    <span class="text-amber-600 dark:text-amber-400">Pending</span>
                                <?php elseif($article->status === 'approved'): ?>
                                    <span class="text-blue-600 dark:text-blue-400">Approved</span>
                                <?php elseif($article->status === 'rejected'): ?>
                                    <span class="text-rose-600 dark:text-rose-400">Rejected</span>
                                <?php else: ?>
                                    <span class="text-zinc-500 dark:text-zinc-400">Draft</span>
                                <?php endif; ?>
                            </td>
                            <td class="px-4 py-3.5 font-mono text-zinc-500"><?php echo e(number_format($article->views)); ?></td>
                            <td class="px-5 py-3.5 text-right whitespace-nowrap">
                                <div class="inline-flex items-center gap-1.5 justify-end">
                                    <a href="<?php echo e(route('admin.articles.edit', $article)); ?>" 
                                       class="inline-flex items-center justify-center h-8 w-8 rounded-lg text-zinc-400 hover:text-blue-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                                       title="Edit Article">
                                        <i class="ri-edit-line text-base"></i>
                                    </a>
                                    <form method="POST" action="<?php echo e(route('admin.articles.destroy', $article)); ?>" class="inline" onsubmit="return confirmDelete(event, 'Delete article &quot;<?php echo e(addslashes($article->title)); ?>&quot;?')">
                                        <?php echo csrf_field(); ?> <?php echo method_field('DELETE'); ?>
                                        <button type="submit" 
                                                class="inline-flex items-center justify-center h-8 w-8 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
                                                title="Delete Article">
                                            <i class="ri-delete-bin-line text-base"></i>
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); if ($__empty_1): ?>
                        <tr>
                            <td colspan="6" class="px-5 py-8 text-center text-zinc-400">No articles found.</td>
                        </tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
        <?php if($articles->hasPages()): ?>
            <div class="px-5 py-3 border-t border-zinc-100 dark:border-zinc-800/80">
                <?php echo e($articles->links()); ?>

            </div>
        <?php endif; ?>
    </div>
</div>
<?php $__env->stopSection(); ?>


<?php echo $__env->make('layouts.admin', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
