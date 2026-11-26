<?php $__env->startSection('title', 'Categories'); ?>

<?php $__env->startSection('content'); ?>
<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
    <div class="lg:col-span-8 space-y-4">
        <div>
            <h1 class="text-xl font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">Categories & Desks</h1>
            <p class="text-xs text-zinc-500 mt-0.5">Organize editorial sections and subcategories for <?php echo e($tenant->name); ?></p>
        </div>

        <div class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 divide-y divide-zinc-100 dark:divide-zinc-800/60">
            <?php $__empty_1 = true; $__currentLoopData = $categories; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $cat): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); $__empty_1 = false; ?>
                <div class="p-4 flex items-start justify-between gap-4">
                    <div>
                        <div class="flex items-center gap-2">
                            <h3 class="text-sm font-medium text-zinc-900 dark:text-zinc-100"><?php echo e($cat->name); ?></h3>
                            <span class="text-[11px] font-mono text-zinc-400">/<?php echo e($cat->slug); ?></span>
                            <span class="text-[11px] text-zinc-400">· <?php echo e($cat->articles_count); ?> stories</span>
                        </div>
                        <?php if($cat->description): ?>
                            <p class="text-xs text-zinc-500 mt-1"><?php echo e($cat->description); ?></p>
                        <?php endif; ?>
                        <?php if($cat->subcategories->isNotEmpty()): ?>
                            <div class="flex flex-wrap gap-1.5 mt-2">
                                <?php $__currentLoopData = $cat->subcategories; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $sub): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                    <span class="text-[11px] px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                                        <?php echo e($sub->name); ?>

                                    </span>
                                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                            </div>
                        <?php endif; ?>
                    </div>

                    <form method="POST" action="<?php echo e(route('admin.categories.destroy', $cat)); ?>" onsubmit="return confirmDelete(event, 'Delete category &quot;<?php echo e(addslashes($cat->name)); ?>&quot;?')">
                        <?php echo csrf_field(); ?> <?php echo method_field('DELETE'); ?>
                        <button type="submit" class="text-xs text-zinc-400 hover:text-red-600 cursor-pointer">Delete</button>
                    </form>
                </div>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); if ($__empty_1): ?>
                <p class="p-6 text-xs text-zinc-400 text-center">No categories found.</p>
            <?php endif; ?>
        </div>
    </div>

    <div class="lg:col-span-4">
        <form method="POST" action="<?php echo e(route('admin.categories.store')); ?>"
              class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 p-5 space-y-4">
            <?php echo csrf_field(); ?>
            <h2 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Add Category / Subcategory</h2>

            <div>
                <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Name *</label>
                <input type="text" name="name" required class="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-xs">
            </div>

            <div>
                <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Parent Desk (Optional)</label>
                <select name="parent_id" class="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-xs">
                    <option value="">Top-Level Desk</option>
                    <?php $__currentLoopData = $categories; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $cat): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <option value="<?php echo e($cat->id); ?>"><?php echo e($cat->name); ?></option>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </select>
            </div>

            <div class="grid grid-cols-2 gap-3">
                <div>
                    <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Accent Color</label>
                    <input type="color" name="color" value="#2563EB" class="h-9 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent p-1">
                </div>
                <div>
                    <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Order</label>
                    <input type="number" name="order" value="<?php echo e($categories->count() + 1); ?>" class="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-xs">
                </div>
            </div>

            <div>
                <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Description</label>
                <textarea name="description" rows="2" class="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-xs"></textarea>
            </div>

            <label class="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300 cursor-pointer">
                <input type="checkbox" name="add_to_menu" value="1" checked class="rounded border-zinc-300 dark:border-zinc-700">
                <span>Automatically add to Header & Mega Menu</span>
            </label>

            <button type="submit" class="w-full py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-medium cursor-pointer">
                Create Category
            </button>
        </form>
    </div>
</div>
<?php $__env->stopSection(); ?>


<?php echo $__env->make('layouts.admin', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
