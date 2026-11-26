<?php $__env->startSection('title', 'Media Library'); ?>

<?php $__env->startSection('content'); ?>
<div class="space-y-6">
    <div>
        <h1 class="text-xl font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">Media Library</h1>
        <p class="text-xs text-zinc-500 mt-0.5">Upload images, videos, or external CDN assets for your newsroom.</p>
    </div>

    <!-- Upload Bar -->
    <form method="POST" action="<?php echo e(route('admin.media.store')); ?>" enctype="multipart/form-data"
          class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 p-5 grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
        <?php echo csrf_field(); ?>
        <div>
            <label class="block text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mb-1">Asset Title *</label>
            <input type="text" name="title" required placeholder="Press conference photo"
                   class="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-xs">
        </div>
        <div>
            <label class="block text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mb-1">File Upload</label>
            <input type="file" name="file" class="w-full text-xs text-zinc-500">
        </div>
        <div>
            <label class="block text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mb-1">Or External URL</label>
            <input type="url" name="url" placeholder="https://..."
                   class="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-xs">
        </div>
        <div>
            <label class="block text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mb-1">Type / Folder</label>
            <div class="flex gap-2">
                <select name="file_type" class="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-2 py-2 text-xs">
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="audio">Audio</option>
                    <option value="document">Doc</option>
                </select>
                <input type="text" name="folder" value="General" class="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-2.5 py-2 text-xs">
            </div>
        </div>
        <button type="submit" class="py-2 px-4 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-medium cursor-pointer">
            Upload Asset
        </button>
    </form>

    <!-- Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <?php $__empty_1 = true; $__currentLoopData = $items; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $item): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); $__empty_1 = false; ?>
            <div class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 overflow-hidden flex flex-col justify-between">
                <div class="aspect-[16/10] bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                    <img src="<?php echo e($item->url); ?>" alt="<?php echo e($item->title); ?>" class="h-full w-full object-cover">
                </div>
                <div class="p-3.5 space-y-2">
                    <h3 class="text-xs font-medium text-zinc-900 dark:text-zinc-100 truncate"><?php echo e($item->title); ?></h3>
                    <div class="flex items-center justify-between text-[11px] text-zinc-400">
                        <span><?php echo e($item->folder); ?> · <?php echo e($item->file_size); ?></span>
                        <form method="POST" action="<?php echo e(route('admin.media.destroy', $item)); ?>" onsubmit="return confirmDelete(event, 'Delete media asset &quot;<?php echo e(addslashes($item->title)); ?>&quot;?')">
                            <?php echo csrf_field(); ?> <?php echo method_field('DELETE'); ?>
                            <button type="submit" class="text-zinc-400 hover:text-red-600 cursor-pointer">Delete</button>
                        </form>
                    </div>
                </div>
            </div>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); if ($__empty_1): ?>
            <div class="col-span-full py-10 text-center text-xs text-zinc-400">No media items uploaded yet.</div>
        <?php endif; ?>
    </div>

    <div><?php echo e($items->links()); ?></div>
</div>
<?php $__env->stopSection(); ?>


<?php echo $__env->make('layouts.admin', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
