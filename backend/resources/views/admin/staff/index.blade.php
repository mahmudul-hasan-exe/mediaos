<?php $__env->startSection('title', 'Staff & Authors'); ?>

<?php $__env->startSection('content'); ?>
<div class="space-y-6" x-data="{ modalOpen: false }">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h1 class="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Staff &amp; Authors</h1>
            <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Newsroom directory, editorial desk editors, field correspondents, and opinion columnists for <?php echo e($tenant->name); ?></p>
        </div>
        <div class="flex items-center gap-2.5">
            <button @click="modalOpen = true" 
                    type="button"
                    class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-black text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 text-xs font-medium shadow-xs hover:shadow-sm transition-all active:scale-[0.98] cursor-pointer">
                <i class="ri-user-add-line text-sm"></i>
                <span>Add Member</span>
            </button>
        </div>
    </div>

    <!-- 4 KPI Metrics Summary Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <!-- 1. Total Staff -->
        <div class="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-4 sm:p-5 shadow-xs transition hover:border-zinc-300 dark:hover:border-zinc-700">
            <div class="flex items-center justify-between">
                <p class="text-xs font-medium text-zinc-500 dark:text-zinc-400">Total Directory</p>
                <i class="ri-team-line text-lg text-zinc-400"></i>
            </div>
            <p class="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-2"><?php echo e($stats['total']); ?></p>
            <p class="text-[11px] text-zinc-400 mt-1">Registered staff &amp; contributors</p>
        </div>

        <!-- 2. Desk Editors -->
        <div class="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-4 sm:p-5 shadow-xs transition hover:border-zinc-300 dark:hover:border-zinc-700">
            <div class="flex items-center justify-between">
                <p class="text-xs font-medium text-zinc-500 dark:text-zinc-400">Desk Editors</p>
                <i class="ri-edit-2-line text-lg text-zinc-400"></i>
            </div>
            <p class="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-2"><?php echo e($stats['editors']); ?></p>
            <p class="text-[11px] text-zinc-400 mt-1">Review &amp; publication leads</p>
        </div>

        <!-- 3. Reporters & Columnists -->
        <div class="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-4 sm:p-5 shadow-xs transition hover:border-zinc-300 dark:hover:border-zinc-700">
            <div class="flex items-center justify-between">
                <p class="text-xs font-medium text-zinc-500 dark:text-zinc-400">Reporters &amp; Columnists</p>
                <i class="ri-mic-line text-lg text-zinc-400"></i>
            </div>
            <p class="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-2"><?php echo e($stats['reporters']); ?></p>
            <p class="text-[11px] text-zinc-400 mt-1">Active byline authors</p>
        </div>

        <!-- 4. Active Directory -->
        <div class="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-4 sm:p-5 shadow-xs transition hover:border-zinc-300 dark:hover:border-zinc-700">
            <div class="flex items-center justify-between">
                <p class="text-xs font-medium text-zinc-500 dark:text-zinc-400">Active Staff</p>
                <i class="ri-checkbox-circle-line text-lg text-zinc-400"></i>
            </div>
            <p class="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-2"><?php echo e($stats['active']); ?></p>
            <p class="text-[11px] text-zinc-400 mt-1">Enabled editorial accounts</p>
        </div>
    </div>

    <!-- Filters & Table Card -->
    <div class="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 overflow-hidden shadow-xs">
        <!-- Search Toolbar -->
        <div class="p-4 sm:p-5 border-b border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <form method="GET" action="<?php echo e(route('admin.staff.index')); ?>" class="flex-1 flex flex-col sm:flex-row sm:items-center gap-2.5">
                <div class="relative flex-1 max-w-md">
                    <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    <input type="text" 
                           name="search" 
                           value="<?php echo e(request('search')); ?>" 
                           placeholder="Search staff by name, email, or designation..." 
                           class="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/60 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-blue-500">
                </div>

                <!-- Role & Status Filter -->
                <div class="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                    <select name="role" onchange="this.form.submit()" class="text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 px-3 py-1.5 focus:outline-none">
                        <option value="all" <?php echo e(request('role') == 'all' || !request('role') ? 'selected' : ''); ?>>All Roles</option>
                        <option value="super-admin" <?php echo e(request('role') == 'super-admin' ? 'selected' : ''); ?>>Super Admin</option>
                        <option value="admin" <?php echo e(request('role') == 'admin' ? 'selected' : ''); ?>>Admin</option>
                        <option value="editor" <?php echo e(request('role') == 'editor' ? 'selected' : ''); ?>>Editor</option>
                        <option value="reporter" <?php echo e(request('role') == 'reporter' ? 'selected' : ''); ?>>Reporter</option>
                        <option value="author" <?php echo e(request('role') == 'author' ? 'selected' : ''); ?>>Author</option>
                    </select>

                    <select name="status" onchange="this.form.submit()" class="text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 px-3 py-1.5 focus:outline-none">
                        <option value="all" <?php echo e(request('status') == 'all' || !request('status') ? 'selected' : ''); ?>>All Status</option>
                        <option value="active" <?php echo e(request('status') == 'active' ? 'selected' : ''); ?>>Active</option>
                        <option value="suspended" <?php echo e(request('status') == 'suspended' ? 'selected' : ''); ?>>Suspended</option>
                    </select>

                    <?php if(request('search') || (request('role') && request('role') !== 'all') || (request('status') && request('status') !== 'all')): ?>
                        <a href="<?php echo e(route('admin.staff.index')); ?>" class="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 px-2 py-1">Reset</a>
                    <?php endif; ?>
                </div>
            </form>
        </div>

        <!-- Directory Table -->
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
                <thead>
                    <tr class="border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/80 text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-wider text-[11px]">
                        <th class="py-3 px-5">Staff Member</th>
                        <th class="py-3 px-4">Designation</th>
                        <th class="py-3 px-4">Role</th>
                        <th class="py-3 px-4 text-center">Stories</th>
                        <th class="py-3 px-4 text-center">Status</th>
                        <th class="py-3 px-4">Joined</th>
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

                            <!-- Designation -->
                            <td class="py-3.5 px-4 text-zinc-600 dark:text-zinc-300">
                                <span class="truncate block max-w-[200px]"><?php echo e($user->designation ?? 'Newsroom Contributor'); ?></span>
                            </td>

                            <!-- Role -->
                            <td class="py-3.5 px-4 whitespace-nowrap">
                                <?php if($user->role === 'super-admin'): ?>
                                    <span class="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-800 dark:text-zinc-200">
                                        <i class="ri-vip-crown-line text-zinc-400 text-sm"></i>
                                        Super Admin
                                    </span>
                                <?php elseif($user->role === 'admin'): ?>
                                    <span class="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-800 dark:text-zinc-200">
                                        <i class="ri-shield-check-line text-zinc-400 text-sm"></i>
                                        Admin
                                    </span>
                                <?php elseif(in_array($user->role, ['editor', 'editor-in-chief'])): ?>
                                    <span class="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-800 dark:text-zinc-200">
                                        <i class="ri-edit-2-line text-zinc-400 text-sm"></i>
                                        Editor
                                    </span>
                                <?php elseif($user->role === 'reporter'): ?>
                                    <span class="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-800 dark:text-zinc-200">
                                        <i class="ri-mic-line text-zinc-400 text-sm"></i>
                                        Reporter
                                    </span>
                                <?php elseif($user->role === 'author'): ?>
                                    <span class="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-800 dark:text-zinc-200">
                                        <i class="ri-quill-pen-line text-zinc-400 text-sm"></i>
                                        Author
                                    </span>
                                <?php else: ?>
                                    <span class="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-800 dark:text-zinc-200">
                                        <i class="ri-user-line text-zinc-400 text-sm"></i>
                                        <?php echo e(ucfirst($user->role)); ?>

                                    </span>
                                <?php endif; ?>
                            </td>

                            <!-- Byline Stories Count -->
                            <td class="py-3.5 px-4 text-center whitespace-nowrap">
                                <span class="inline-flex items-center gap-1 font-mono text-xs text-zinc-600 dark:text-zinc-400">
                                    <i class="ri-article-line text-zinc-400"></i>
                                    <?php echo e($user->articles_count ?? 0); ?>

                                </span>
                            </td>

                            <!-- Status -->
                            <td class="py-3.5 px-4 text-center whitespace-nowrap text-xs font-medium">
                                <?php if($user->status === 'active'): ?>
                                    <span class="text-emerald-600 dark:text-emerald-400">Active</span>
                                <?php else: ?>
                                    <span class="text-zinc-400 dark:text-zinc-500">Suspended</span>
                                <?php endif; ?>
                            </td>

                            <!-- Joined Date -->
                            <td class="py-3.5 px-4 font-mono text-[11px] text-zinc-400 whitespace-nowrap">
                                <?php echo e($user->created_at ? $user->created_at->format('M d, Y') : now()->format('M d, Y')); ?>

                            </td>

                            <!-- Actions -->
                            <td class="py-3.5 px-5 text-right whitespace-nowrap">
                                <form method="POST" action="<?php echo e(route('admin.staff.toggle', $user)); ?>" class="inline-block" onsubmit="return confirmDelete(event, 'Change status of newsroom member &quot;<?php echo e(addslashes($user->name)); ?>&quot; to <?php echo e($user->status === 'active' ? 'suspended' : 'active'); ?>?')">
                                    <?php echo csrf_field(); ?> 
                                    <?php echo method_field('PATCH'); ?>
                                    <button type="submit" 
                                            class="inline-flex items-center justify-center h-8 w-8 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
                                            title="<?php echo e($user->status === 'active' ? 'Suspend Member' : 'Activate Member'); ?>">
                                        <i class="<?php echo e($user->status === 'active' ? 'ri-user-forbid-line hover:text-rose-600' : 'ri-user-follow-line hover:text-emerald-600'); ?> text-base"></i>
                                    </button>
                                </form>
                            </td>
                        </tr>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); if ($__empty_1): ?>
                        <tr>
                            <td colspan="7" class="py-12 text-center text-zinc-400 text-xs">
                                <svg class="w-8 h-8 mx-auto text-zinc-300 dark:text-zinc-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                                No staff or authors match your query.
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

    <!-- Modal: Add Member (Alpine.js) -->
    <div x-show="modalOpen" 
         x-cloak 
         @keydown.escape.window="modalOpen = false"
         class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" @click="modalOpen = false"></div>

        <!-- Modal Box -->
        <div class="relative bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 max-w-lg w-full p-6 shadow-2xl z-10 transition-all">
            <div class="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
                <div>
                    <h3 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Add New Member</h3>
                    <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Register a new newsroom staff member, desk editor, or author</p>
                </div>
                <button @click="modalOpen = false" class="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1 rounded-lg">
                    <i class="ri-close-line text-lg"></i>
                </button>
            </div>

            <form method="POST" action="<?php echo e(route('admin.staff.store')); ?>" class="space-y-4 pt-4">
                <?php echo csrf_field(); ?>
                <div>
                    <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Full Name *</label>
                    <input type="text" name="name" required placeholder="e.g. Elena Rostova" class="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500">
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Email Address *</label>
                        <input type="email" name="email" required placeholder="name@mediaos.io" class="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Temporary Password *</label>
                        <input type="password" name="password" value="password" required class="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Editorial Role *</label>
                        <select name="role" class="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500">
                            <option value="editor">Desk Editor</option>
                            <option value="reporter">Field Reporter</option>
                            <option value="author">Author / Columnist</option>
                            <option value="admin">Newspaper Admin</option>
                            <option value="moderator">Moderator</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Official Designation</label>
                        <input type="text" name="designation" placeholder="e.g. Senior Tech Correspondent" class="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Author Bio / Profile Note</label>
                    <textarea name="bio" rows="2" placeholder="Brief journalistic background and beat coverage..." class="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500"></textarea>
                </div>

                <div class="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-end gap-2.5">
                    <button type="button" @click="modalOpen = false" class="px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition">
                        Cancel
                    </button>
                    <button type="submit" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-black text-white text-xs font-medium transition shadow-xs hover:shadow-sm cursor-pointer active:scale-[0.98]">
                        <i class="ri-check-line text-sm"></i>
                        <span>Save Member</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.admin', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
