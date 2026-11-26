<?php $__env->startSection('title', 'Comments Moderation'); ?>

<?php $__env->startSection('content'); ?>
<div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h1 class="text-xl font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">Reader Comments</h1>
            <p class="text-xs text-zinc-500 mt-0.5">Moderate community responses before or after publication.</p>
        </div>

        <div class="flex items-center gap-1.5 text-xs">
            <?php $__currentLoopData = ['all' => 'All', 'pending' => 'Pending', 'approved' => 'Approved', 'spam' => 'Spam']; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $key => $label): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <a href="<?php echo e(route('admin.comments.index', ['status' => $key])); ?>"
                   class="px-3 py-1 rounded-full <?php echo e(request('status', 'all') === $key ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-medium' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'); ?>">
                    <?php echo e($label); ?>

                </a>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
        </div>
    </div>

    <div class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 divide-y divide-zinc-100 dark:divide-zinc-800/60">
        <?php $__empty_1 = true; $__currentLoopData = $comments; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $comment): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); $__empty_1 = false; ?>
            <div class="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div class="space-y-1 flex-1">
                    <div class="flex items-center gap-2 text-xs">
                        <span class="font-medium text-zinc-900 dark:text-zinc-100"><?php echo e($comment->author_name); ?></span>
                        <span class="text-zinc-400">on</span>
                        <span class="text-zinc-700 dark:text-zinc-300 font-medium truncate max-w-xs"><?php echo e($comment->article?->title ?? 'Article'); ?></span>
                        <span class="text-[11px] font-medium
                            <?php echo e($comment->status === 'approved' ? 'text-emerald-600 dark:text-emerald-400' : ($comment->status === 'pending' ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400')); ?>">
                            <?php echo e(ucfirst($comment->status)); ?>

                        </span>
                    </div>
                    <p class="text-xs text-zinc-600 dark:text-zinc-400"><?php echo e($comment->content); ?></p>
                </div>

                <div class="flex items-center gap-1.5 shrink-0 text-xs">
                    <?php if($comment->status !== 'approved'): ?>
                        <form method="POST" action="<?php echo e(route('admin.comments.status', $comment)); ?>">
                            <?php echo csrf_field(); ?> <?php echo method_field('PATCH'); ?>
                            <input type="hidden" name="status" value="approved">
                            <button type="submit" class="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer transition" title="Approve Comment">
                                <i class="ri-check-line text-sm"></i>
                            </button>
                        </form>
                    <?php endif; ?>
                    <?php if($comment->status !== 'spam'): ?>
                        <form method="POST" action="<?php echo e(route('admin.comments.status', $comment)); ?>">
                            <?php echo csrf_field(); ?> <?php echo method_field('PATCH'); ?>
                            <input type="hidden" name="status" value="spam">
                            <button type="submit" class="inline-flex items-center justify-center h-8 w-8 rounded-lg text-zinc-400 hover:text-amber-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition" title="Mark as Spam">
                                <i class="ri-spam-2-line text-sm"></i>
                            </button>
                        </form>
                    <?php endif; ?>
                    <form method="POST" action="<?php echo e(route('admin.comments.destroy', $comment)); ?>" onsubmit="return confirmDelete(event, 'Delete reader comment?')">
                        <?php echo csrf_field(); ?> <?php echo method_field('DELETE'); ?>
                        <button type="submit" class="inline-flex items-center justify-center h-8 w-8 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition" title="Delete Comment">
                            <i class="ri-delete-bin-line text-sm"></i>
                        </button>
                    </form>
                </div>
            </div>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); if ($__empty_1): ?>
            <p class="p-8 text-center text-xs text-zinc-400">No comments matching this filter.</p>
        <?php endif; ?>
    </div>
</div>
<?php $__env->stopSection(); ?>


<?php echo $__env->make('layouts.admin', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
