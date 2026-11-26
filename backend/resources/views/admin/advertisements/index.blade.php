<?php $__env->startSection('title', 'Advertisements'); ?>

<?php $__env->startSection('content'); ?>
<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
    <div class="lg:col-span-8 space-y-4">
        <div>
            <h1 class="text-xl font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">Ad Zones & Sponsors</h1>
            <p class="text-xs text-zinc-500 mt-0.5">Monetization banners across broadsheet placements.</p>
        </div>

        <div class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 divide-y divide-zinc-100 dark:divide-zinc-800/60">
            <?php $__empty_1 = true; $__currentLoopData = $ads; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $ad): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); $__empty_1 = false; ?>
                <div class="p-4 flex items-center justify-between gap-4">
                    <div>
                        <div class="flex items-center gap-2">
                            <h3 class="text-sm font-medium text-zinc-900 dark:text-zinc-100"><?php echo e($ad->title); ?></h3>
                            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"><?php echo e($ad->zone); ?></span>
                        </div>
                        <p class="text-xs text-zinc-500 mt-0.5">
                            <?php echo e($ad->client_name); ?> · <?php echo e(number_format($ad->impressions)); ?> impressions · <?php echo e(number_format($ad->clicks)); ?> clicks
                        </p>
                    </div>
                    <div class="flex items-center gap-2 text-xs">
                        <form method="POST" action="<?php echo e(route('admin.advertisements.toggle', $ad)); ?>">
                            <?php echo csrf_field(); ?> <?php echo method_field('PATCH'); ?>
                            <button type="submit" class="px-2.5 py-1 rounded-full text-[11px] font-medium cursor-pointer <?php echo e($ad->status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-zinc-100 text-zinc-500'); ?>">
                                <?php echo e(ucfirst($ad->status)); ?>

                            </button>
                        </form>
                        <form method="POST" action="<?php echo e(route('admin.advertisements.destroy', $ad)); ?>" onsubmit="return confirmDelete(event, 'Remove advertisement campaign &quot;<?php echo e(addslashes($ad->title)); ?>&quot;?')">
                            <?php echo csrf_field(); ?> <?php echo method_field('DELETE'); ?>
                            <button type="submit" class="text-zinc-400 hover:text-red-600 cursor-pointer">Delete</button>
                        </form>
                    </div>
                </div>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); if ($__empty_1): ?>
                <p class="p-6 text-xs text-zinc-400 text-center">No campaigns configured.</p>
            <?php endif; ?>
        </div>
    </div>

    <div class="lg:col-span-4">
        <form method="POST" action="<?php echo e(route('admin.advertisements.store')); ?>"
              class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 p-5 space-y-4">
            <?php echo csrf_field(); ?>
            <h2 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">New Ad Campaign</h2>

            <div>
                <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Campaign Title *</label>
                <input type="text" name="title" required class="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-xs">
            </div>
            <div>
                <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Client / Sponsor *</label>
                <input type="text" name="client_name" required class="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-xs">
            </div>
            <div>
                <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Placement Zone</label>
                <select name="zone" class="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-xs">
                    <option value="header_leaderboard">Header Leaderboard</option>
                    <option value="sidebar_square">Sidebar Square</option>
                    <option value="in_article">In-Article</option>
                    <option value="homepage_middle">Homepage Middle</option>
                </select>
            </div>
            <div>
                <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Destination URL</label>
                <input type="url" name="destination_url" placeholder="https://..." class="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-xs">
            </div>
            <button type="submit" class="w-full py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-medium cursor-pointer">
                Launch Campaign
            </button>
        </form>
    </div>
</div>
<?php $__env->stopSection(); ?>


<?php echo $__env->make('layouts.admin', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
