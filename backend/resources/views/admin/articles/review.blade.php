<?php $__env->startSection('title', 'Editorial Review Queue'); ?>

<?php $__env->startSection('content'); ?>
<div class="space-y-6">
    <div>
        <h1 class="text-xl font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">Editorial Review Queue</h1>
        <p class="text-xs text-zinc-500 mt-0.5">Fact-check submitted dispatches, approve for publishing, or return with revision notes.</p>
    </div>

    <div class="space-y-4">
        <?php $__empty_1 = true; $__currentLoopData = $articles; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $article): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); $__empty_1 = false; ?>
            <div class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 p-5 space-y-4">
                <div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div class="space-y-1.5 flex-1">
                        <div class="flex items-center gap-2 text-xs">
                            <span class="px-2 py-0.5 rounded-full text-[11px] font-medium
                                <?php echo e($article->status === 'pending' ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400' : ''); ?>

                                <?php echo e($article->status === 'approved' ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400' : ''); ?>

                                <?php echo e($article->status === 'rejected' ? 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-400' : ''); ?>">
                                <?php echo e(ucfirst($article->status)); ?>

                            </span>
                            <span class="text-zinc-400"><?php echo e($article->category?->name ?? 'General'); ?></span>
                            <span class="text-zinc-300">·</span>
                            <span class="text-zinc-500">By <?php echo e($article->author?->name ?? 'Correspondent'); ?></span>
                        </div>

                        <h3 class="text-base font-semibold text-zinc-900 dark:text-zinc-100"><?php echo e($article->title); ?></h3>
                        <p class="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed"><?php echo e($article->excerpt); ?></p>

                        <?php if($article->rejection_feedback): ?>
                            <div class="mt-2 rounded-xl bg-red-50/70 dark:bg-red-950/30 border border-red-200/60 dark:border-red-900/60 px-3 py-2 text-xs text-red-700 dark:text-red-300">
                                <strong>Reviewer Note:</strong> <?php echo e($article->rejection_feedback); ?>

                            </div>
                        <?php endif; ?>
                    </div>

                    <div class="flex flex-wrap items-center gap-2 shrink-0">
                        <a href="<?php echo e(route('admin.articles.edit', $article)); ?>" class="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50">
                            Inspect
                        </a>

                        <form method="POST" action="<?php echo e(route('admin.articles.status', $article)); ?>" class="inline" onsubmit="return confirmDelete(event, 'Approve and publish story &quot;<?php echo e(addslashes($article->title)); ?>&quot; immediately?')">
                            <?php echo csrf_field(); ?> <?php echo method_field('PATCH'); ?>
                            <input type="hidden" name="status" value="published">
                            <button type="submit" class="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium cursor-pointer">
                                Approve & Publish
                            </button>
                        </form>

                        <form method="POST" action="<?php echo e(route('admin.articles.status', $article)); ?>" class="inline flex items-center gap-1.5" onsubmit="return confirmDelete(event, 'Reject story &quot;<?php echo e(addslashes($article->title)); ?>&quot; and return with revision note?')">
                            <?php echo csrf_field(); ?> <?php echo method_field('PATCH'); ?>
                            <input type="hidden" name="status" value="rejected">
                            <input type="text" name="rejection_feedback" placeholder="Revision note..." required
                                   class="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent px-2.5 py-1 text-xs w-40">
                            <button type="submit" class="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 text-xs font-medium cursor-pointer">
                                Reject
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); if ($__empty_1): ?>
            <div class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 p-10 text-center text-xs text-zinc-400">
                The editorial review queue is empty. All submitted dispatches have been processed.
            </div>
        <?php endif; ?>
    </div>
</div>
<?php $__env->stopSection(); ?>


<?php echo $__env->make('layouts.admin', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
