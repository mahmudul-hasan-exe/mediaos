<?php $__env->startSection('title', 'Website Users'); ?>

<?php $__env->startSection('content'); ?>
<div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h1 class="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Website Users</h1>
            <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Directory of registered public readers and subscribers from the website frontend</p>
        </div>
    </div>

    <!-- 4 KPI Metrics Summary Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <!-- 1. Total Registered Readers -->
        <div class="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-4 sm:p-5 shadow-xs transition hover:border-zinc-300 dark:hover:border-zinc-700">
            <div class="flex items-center justify-between">
                <p class="text-xs font-medium text-zinc-500 dark:text-zinc-400">Total Users</p>
                <i class="ri-user-line text-lg text-zinc-400"></i>
            </div>
            <p class="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-2"><?php echo e($stats['total']); ?></p>
            <p class="text-[11px] text-zinc-400 mt-1">Website registered accounts</p>
        </div>

        <!-- 2. Active Readers -->
        <div class="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-4 sm:p-5 shadow-xs transition hover:border-zinc-300 dark:hover:border-zinc-700">
            <div class="flex items-center justify-between">
                <p class="text-xs font-medium text-zinc-500 dark:text-zinc-400">Active Users</p>
                <i class="ri-user-follow-line text-lg text-zinc-400"></i>
            </div>
            <p class="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-2"><?php echo e($stats['active']); ?></p>
            <p class="text-[11px] text-zinc-400 mt-1">Authorized readers</p>
        </div>

        <!-- 3. Suspended Readers -->
        <div class="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-4 sm:p-5 shadow-xs transition hover:border-zinc-300 dark:hover:border-zinc-700">
            <div class="flex items-center justify-between">
                <p class="text-xs font-medium text-zinc-500 dark:text-zinc-400">Suspended Users</p>
                <i class="ri-user-forbid-line text-lg text-zinc-400"></i>
            </div>
            <p class="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-2"><?php echo e($stats['suspended']); ?></p>
            <p class="text-[11px] text-zinc-400 mt-1">Restricted accounts</p>
        </div>

        <!-- 4. Verified Emails -->
        <div class="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-4 sm:p-5 shadow-xs transition hover:border-zinc-300 dark:hover:border-zinc-700">
            <div class="flex items-center justify-between">
                <p class="text-xs font-medium text-zinc-500 dark:text-zinc-400">Verified Emails</p>
                <i class="ri-mail-check-line text-lg text-zinc-400"></i>
            </div>
            <p class="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-2"><?php echo e($stats['verified']); ?></p>
            <p class="text-[11px] text-zinc-400 mt-1">Email confirmed users</p>
        </div>
    </div>

    <!-- Filters & Table Card -->
    <div class="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 overflow-hidden shadow-xs">
        <!-- Search Toolbar -->
        <div class="p-4 sm:p-5 border-b border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <form method="GET" action="<?php echo e(route('admin.users.index')); ?>" class="flex-1 flex flex-col sm:flex-row sm:items-center gap-2.5">
                <div class="relative flex-1 max-w-md">
                    <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    <input type="text" 
                           name="search" 
                           value="<?php echo e(request('search')); ?>" 
                           placeholder="Search users by name or email..." 
                           class="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/60 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-blue-500">
                </div>

                <!-- Status Filter -->
                <div class="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                    <select name="status" onchange="this.form.submit()" class="text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 px-3 py-1.5 focus:outline-none">
                        <option value="all" <?php echo e(request('status') == 'all' || !request('status') ? 'selected' : ''); ?>>All Status</option>
                        <option value="active" <?php echo e(request('status') == 'active' ? 'selected' : ''); ?>>Active</option>
                        <option value="suspended" <?php echo e(request('status') == 'suspended' ? 'selected' : ''); ?>>Suspended</option>
                    </select>

                    <?php if(request('search') || (request('status') && request('status') !== 'all')): ?>
                        <a href="<?php echo e(route('admin.users.index')); ?>" class="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 px-2 py-1">Reset</a>
                    <?php endif; ?>
                </div>
            </form>
        </div>

        <!-- Users Table -->
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
                <thead>
                    <tr class="border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/80 text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-wider text-[11px]">
                        <th class="py-3 px-5">Registered User</th>
                        <th class="py-3 px-4">Account Type</th>
                        <th class="py-3 px-4 text-center">Status</th>
                        <th class="py-3 px-4">Email Verification</th>
                        <th class="py-3 px-4">Registered Date</th>
                        <th class="py-3 px-5 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                    <?php $__empty_1 = true; $__currentLoopData = $users; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $user): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); $__empty_1 = false; ?>
                        <tr class="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition">
                            <!-- User Identity -->
                            <td class="py-3.5 px-5 whitespace-nowrap">
                                <div class="flex items-center gap-3">
                                    <?php if($user->avatar): ?>
                                        <img src="<?php echo e($user->avatar); ?>" alt="<?php echo e($user->name); ?>" class="w-8 h-8 rounded-full object-cover ring-1 ring-zinc-200 dark:ring-zinc-800 shrink-0">
                                    <?php else: ?>
                                        <div class="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold text-xs flex items-center justify-center shrink-0 border border-zinc-200 dark:border-zinc-700">
                                            <?php echo e(strtoupper(substr($user->name, 0, 1))); ?>

                                        </div>
                                    <?php endif; ?>
                                    <div class="min-w-0">
                                        <span class="font-medium text-zinc-900 dark:text-zinc-100 block truncate"><?php echo e($user->name); ?></span>
                                        <span class="text-[11px] font-mono text-zinc-400 block truncate"><?php echo e($user->email); ?></span>
                                    </div>
                                </div>
                            </td>

                            <!-- Account Type (Email vs Google) -->
                            <td class="py-3.5 px-4 whitespace-nowrap">
                                <?php if(($user->auth_provider ?? 'email') === 'google'): ?>
                                    <span class="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-800 dark:text-zinc-200">
                                        <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"/>
                                            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24Z"/>
                                            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.97 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"/>
                                            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"/>
                                        </svg>
                                        <span>Google</span>
                                    </span>
                                <?php else: ?>
                                    <span class="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-800 dark:text-zinc-200">
                                        <i class="ri-mail-line text-blue-500 text-sm"></i>
                                        <span>Email</span>
                                    </span>
                                <?php endif; ?>
                            </td>

                            <!-- Status -->
                            <td class="py-3.5 px-4 text-center whitespace-nowrap text-xs font-medium">
                                <?php if($user->status === 'active'): ?>
                                    <span class="text-emerald-600 dark:text-emerald-400">Active</span>
                                <?php else: ?>
                                    <span class="text-zinc-400 dark:text-zinc-500">Suspended</span>
                                <?php endif; ?>
                            </td>

                            <!-- Email Verification -->
                            <td class="py-3.5 px-4 whitespace-nowrap text-xs">
                                <?php if($user->email_verified_at): ?>
                                    <span class="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                                        <i class="ri-checkbox-circle-line text-sm"></i>
                                        <span>Verified</span>
                                    </span>
                                <?php else: ?>
                                    <span class="inline-flex items-center gap-1 text-zinc-400 font-medium">
                                        <i class="ri-time-line text-sm"></i>
                                        <span>Unverified</span>
                                    </span>
                                <?php endif; ?>
                            </td>

                            <!-- Registered Date -->
                            <td class="py-3.5 px-4 font-mono text-[11px] text-zinc-400 whitespace-nowrap">
                                <?php echo e($user->created_at ? $user->created_at->format('M d, Y') : now()->format('M d, Y')); ?>

                            </td>

                            <!-- Actions -->
                            <td class="py-3.5 px-5 text-right whitespace-nowrap">
                                <div class="inline-flex items-center gap-1 justify-end">
                                    <!-- Toggle Status Button -->
                                    <form method="POST" action="<?php echo e(route('admin.users.toggle', $user)); ?>" class="inline-block" onsubmit="return confirmAction(event, 'Change reader account status for &quot;<?php echo e(addslashes($user->name)); ?>&quot; to <?php echo e($user->status === 'active' ? 'suspended' : 'active'); ?>?')">
                                        <?php echo csrf_field(); ?> 
                                        <?php echo method_field('PATCH'); ?>
                                        <button type="submit" 
                                                class="inline-flex items-center justify-center h-8 w-8 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
                                                title="<?php echo e($user->status === 'active' ? 'Suspend User' : 'Activate User'); ?>">
                                            <i class="<?php echo e($user->status === 'active' ? 'ri-user-forbid-line hover:text-rose-600' : 'ri-user-follow-line hover:text-emerald-600'); ?> text-base"></i>
                                        </button>
                                    </form>

                                    <!-- Delete Button with SweetAlert2 Confirm Dialog -->
                                    <form method="POST" action="<?php echo e(route('admin.users.destroy', $user)); ?>" class="inline-block" onsubmit="return confirmDelete(event, 'Delete website reader account (<?php echo e($user->name); ?>)?')">
                                        <?php echo csrf_field(); ?>
                                        <?php echo method_field('DELETE'); ?>
                                        <button type="submit" 
                                                class="inline-flex items-center justify-center h-8 w-8 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
                                                title="Delete User">
                                            <i class="ri-delete-bin-line text-base"></i>
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); if ($__empty_1): ?>
                        <tr>
                            <td colspan="6" class="py-12 text-center text-zinc-400 text-xs">
                                <i class="ri-user-unfollow-line text-2xl text-zinc-300 dark:text-zinc-600 block mb-2"></i>
                                No registered website users yet.
                            </td>
                        </tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>

        <?php if($users->hasPages() || $users->total() > 0): ?>
            <div class="px-5 py-3.5 border-t border-zinc-100 dark:border-zinc-800/80">
                <?php echo e($users->links()); ?>

            </div>
        <?php endif; ?>
    </div>
</div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.admin', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
