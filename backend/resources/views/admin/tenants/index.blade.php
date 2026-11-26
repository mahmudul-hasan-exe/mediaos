<?php $__env->startSection('title', 'Publications & Tenants'); ?>

<?php $__env->startSection('content'); ?>
<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
    <div class="lg:col-span-8 space-y-4">
        <div>
            <h1 class="text-xl font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">Publications (Multi-Tenant)</h1>
            <p class="text-xs text-zinc-500 mt-0.5">Manage newspaper organizations, custom domains, and workspace switching.</p>
        </div>

        <div class="space-y-3">
            <?php $__currentLoopData = $tenants; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $t): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <div class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div class="flex items-center gap-3">
                        <span class="h-8 w-8 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0" style="background-color: <?php echo e($t->primary_color); ?>">
                            <?php echo e(substr($t->name, 0, 1)); ?>

                        </span>
                        <div>
                            <div class="flex items-center gap-2">
                                <h3 class="text-sm font-medium text-zinc-900 dark:text-zinc-100"><?php echo e($t->name); ?></h3>
                                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"><?php echo e($t->plan); ?></span>
                                <?php if($tenant->id === $t->id): ?>
                                    <span class="text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400">Active Workspace</span>
                                <?php endif; ?>
                            </div>
                            <p class="text-xs text-zinc-400 mt-0.5">
                                <?php echo e($t->domain); ?> · <?php echo e(strtoupper($t->default_language)); ?> · <?php echo e($t->articles_count); ?> stories · <?php echo e($t->users_count); ?> users
                            </p>
                        </div>
                    </div>

                    <div class="flex items-center gap-2 text-xs">
                        <?php if($tenant->id !== $t->id): ?>
                            <form method="POST" action="<?php echo e(route('admin.tenants.switch', $t)); ?>" onsubmit="return confirmDelete(event, 'Switch active workspace to publication &quot;<?php echo e(addslashes($t->name)); ?>&quot;?')">
                                <?php echo csrf_field(); ?>
                                <button type="submit" class="px-3 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition cursor-pointer">
                                    Switch
                                </button>
                            </form>
                        <?php endif; ?>
                        <form method="POST" action="<?php echo e(route('admin.tenants.toggle', $t)); ?>" onsubmit="return confirmDelete(event, 'Change status of publication &quot;<?php echo e(addslashes($t->name)); ?>&quot; to <?php echo e($t->status === 'active' ? 'suspended' : 'active'); ?>?')">
                            <?php echo csrf_field(); ?> <?php echo method_field('PATCH'); ?>
                            <button type="submit" class="px-2.5 py-1 rounded-full text-[11px] font-medium cursor-pointer transition <?php echo e($t->status === 'active' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400' : 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-400'); ?>">
                                <?php echo e(ucfirst($t->status)); ?>

                            </button>
                        </form>
                    </div>
                </div>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
        </div>
    </div>

    <div class="lg:col-span-4">
        <form method="POST" action="<?php echo e(route('admin.tenants.store')); ?>"
              class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 p-5 space-y-4">
            <?php echo csrf_field(); ?>
            <h2 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Provision New Publication</h2>
            <div>
                <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Publication Name *</label>
                <input type="text" name="name" required placeholder="Daily Horizon" class="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-xs">
            </div>
            <div>
                <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Domain *</label>
                <input type="text" name="domain" required placeholder="dailyhorizon.com" class="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-xs">
            </div>
            <div class="grid grid-cols-2 gap-3">
                <div>
                    <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Plan</label>
                    <select name="plan" class="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-xs">
                        <option value="Starter">Starter</option>
                        <option value="Professional" selected>Professional</option>
                        <option value="Enterprise">Enterprise</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Language</label>
                    <select name="default_language" class="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-xs">
                        <option value="en">English (en)</option>
                        <option value="bn">Bangla (bn)</option>
                        <option value="ar">Arabic (ar)</option>
                    </select>
                </div>
            </div>
            <div>
                <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Brand Color</label>
                <input type="color" name="primary_color" value="#2563EB" class="h-9 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent p-1">
            </div>
            <button type="submit" class="w-full py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-medium cursor-pointer">
                Provision Tenant
            </button>
        </form>
    </div>
</div>
<?php $__env->stopSection(); ?>


<?php echo $__env->make('layouts.admin', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
