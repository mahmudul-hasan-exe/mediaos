<?php $__env->startSection('title', 'E-Paper Editions'); ?>

<?php $__env->startSection('content'); ?>
<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
    <div class="lg:col-span-8 space-y-4">
        <div>
            <h1 class="text-xl font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">E-Paper Editions</h1>
            <p class="text-xs text-zinc-500 mt-0.5">Manage digital print-replica broadsheet issues.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <?php $__empty_1 = true; $__currentLoopData = $editions; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $edition): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); $__empty_1 = false; ?>
                <div class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 overflow-hidden">
                    <div class="aspect-[16/9] bg-zinc-100 dark:bg-zinc-800">
                        <img src="<?php echo e($edition->cover_image); ?>" alt="<?php echo e($edition->title); ?>" class="h-full w-full object-cover">
                    </div>
                    <div class="p-4 space-y-2">
                        <div class="flex items-center justify-between text-[11px] text-zinc-400">
                            <span><?php echo e($edition->edition_date?->format('M d, Y')); ?></span>
                            <span><?php echo e($edition->total_pages); ?> pages</span>
                        </div>
                        <h3 class="text-sm font-medium text-zinc-900 dark:text-zinc-100"><?php echo e($edition->title); ?></h3>
                        <div class="pt-2 flex items-center justify-between">
                            <form method="POST" action="<?php echo e(route('admin.epapers.toggle', $edition)); ?>">
                                <?php echo csrf_field(); ?> <?php echo method_field('PATCH'); ?>
                                <button type="submit" class="px-2.5 py-0.5 rounded-full text-[11px] font-medium cursor-pointer <?php echo e($edition->status === 'published' ? 'bg-emerald-50 text-emerald-700' : 'bg-zinc-100 text-zinc-600'); ?>">
                                    <?php echo e(ucfirst($edition->status)); ?>

                                </button>
                            </form>
                            <form method="POST" action="<?php echo e(route('admin.epapers.destroy', $edition)); ?>" onsubmit="return confirmDelete(event, 'Delete E-Paper edition &quot;<?php echo e(addslashes($edition->title)); ?>&quot;?')">
                                <?php echo csrf_field(); ?> <?php echo method_field('DELETE'); ?>
                                <button type="submit" class="text-xs text-zinc-400 hover:text-red-600 cursor-pointer">Delete</button>
                            </form>
                        </div>
                    </div>
                </div>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); if ($__empty_1): ?>
                <div class="col-span-full p-8 text-center text-xs text-zinc-400">No E-Paper editions created yet.</div>
            <?php endif; ?>
        </div>
    </div>

    <div class="lg:col-span-4">
        <form method="POST" action="<?php echo e(route('admin.epapers.store')); ?>"
              class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 p-5 space-y-4">
            <?php echo csrf_field(); ?>
            <h2 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Publish New Edition</h2>
            <div>
                <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Edition Title *</label>
                <input type="text" name="title" required placeholder="Morning Broadsheet Edition" class="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-xs">
            </div>
            <div class="grid grid-cols-2 gap-3">
                <div>
                    <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Date</label>
                    <input type="date" name="edition_date" value="<?php echo e(now()->toDateString()); ?>" required class="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-xs">
                </div>
                <div>
                    <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Pages</label>
                    <input type="number" name="total_pages" value="16" min="1" max="64" class="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-xs">
                </div>
            </div>
            <div>
                <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Status</label>
                <select name="status" class="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-xs">
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                </select>
            </div>
            <button type="submit" class="w-full py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-medium cursor-pointer">
                Create Edition
            </button>
        </form>
    </div>
</div>
<?php $__env->stopSection(); ?>


<?php echo $__env->make('layouts.admin', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
