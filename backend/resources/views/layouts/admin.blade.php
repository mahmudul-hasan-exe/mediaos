<!DOCTYPE html>
<html lang="en" class="h-full">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $__env->yieldContent('title', 'Admin'); ?> — MediaOS Laravel CMS</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.8/dist/cdn.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        navy: {
                            950: '#070b14',
                            900: '#0a0f1d',
                            850: '#0f172a',
                            800: '#131e36',
                            700: '#1e293b',
                            600: '#334155'
                        }
                    },
                    fontFamily: {
                        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
                    }
                }
            }
        }
    </script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.css" rel="stylesheet">
    <style>
        [x-cloak] { display: none !important; }
        body { font-family: 'Inter', system-ui, sans-serif; }
        .sidebar-scroll::-webkit-scrollbar { width: 4px; }
        .sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
        .sidebar-scroll::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; }
        .sidebar-scroll::-webkit-scrollbar-thumb:hover { background: #334155; }
    </style>
</head>
<body class="h-full bg-zinc-50/70 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 antialiased">
<?php
    $activeTenant = app(\App\Services\TenantResolver::class)->current() ?? \App\Models\Tenant::first();
    $pendingReviewCount = $activeTenant ? \App\Models\Article::where('tenant_id', $activeTenant->id)->where('status', 'pending')->count() : 0;
    $pendingCommentCount = $activeTenant ? \App\Models\Comment::where('tenant_id', $activeTenant->id)->where('status', 'pending')->count() : 0;
?>

<div class="min-h-full flex" x-data="{ mobileNav: false }">
    <!-- Rich MediaDesk-Style Sidebar -->
    <aside id="sidebar" class="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 border-r border-[#151f32] bg-[#0A0F1D] text-slate-300 z-30 select-none">
        <!-- Brand Header -->
        <div class="h-14 flex items-center justify-between px-4 border-b border-[#141d2e] bg-[#070b14]/70 backdrop-blur">
            <a href="<?php echo e(route('admin.dashboard')); ?>" class="flex items-center gap-2.5">
                <span class="h-7 w-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-md shadow-blue-500/20" style="background-color: <?php echo e($activeTenant?->primary_color ?? '#2563EB'); ?>">
                    M
                </span>
                <div class="flex flex-col leading-tight">
                    <span class="text-sm font-semibold tracking-tight text-white flex items-center gap-1.5">
                        MediaOS
                        <span class="text-[9px] font-mono uppercase bg-blue-500/20 text-blue-400 border border-blue-500/30 px-1 py-0.2 rounded">Desk</span>
                    </span>
                    <span class="text-[10px] text-slate-400 truncate max-w-[130px]"><?php echo e($activeTenant?->name ?? 'Newsroom Platform'); ?></span>
                </div>
            </a>
        </div>

        <!-- Navigation Scrollable -->
        <nav class="flex-1 overflow-y-auto px-2.5 py-3 space-y-1 text-[13px] sidebar-scroll font-normal">
            
            <!-- 1. Dashboard -->
            <a href="<?php echo e(route('admin.dashboard')); ?>" 
               class="flex items-center gap-3 px-3 py-2 rounded-lg transition <?php echo e(request()->routeIs('admin.dashboard') ? 'bg-[#15223e] text-white font-medium shadow-sm' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'); ?>">
                <svg class="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
                <span class="truncate">Dashboard</span>
            </a>

            <!-- 2. Staff (Editorial Team) -->
            <a href="<?php echo e(route('admin.staff.index')); ?>" 
               class="flex items-center gap-3 px-3 py-2 rounded-lg transition <?php echo e(request()->routeIs('admin.staff.*') ? 'bg-[#15223e] text-white font-medium shadow-sm' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'); ?>">
                <i class="ri-team-line text-base text-slate-300 shrink-0"></i>
                <span class="truncate">Staff</span>
            </a>

            <!-- 3. Users (Website Readers) -->
            <a href="<?php echo e(route('admin.users.index')); ?>" 
               class="flex items-center gap-3 px-3 py-2 rounded-lg transition <?php echo e(request()->routeIs('admin.users.*') ? 'bg-[#15223e] text-white font-medium shadow-sm' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'); ?>">
                <i class="ri-user-line text-base text-slate-300 shrink-0"></i>
                <span class="truncate">Users</span>
            </a>

            <!-- 3. Content (Collapsible) -->
            <?php $isContentActive = request()->routeIs('admin.articles.*', 'admin.categories.*'); ?>
            <div x-data="{ open: <?php echo e($isContentActive ? 'true' : 'false'); ?> }" class="space-y-0.5">
                <button type="button" @click="open = !open" 
                        class="w-full flex items-center justify-between px-3 py-2 rounded-lg transition <?php echo e($isContentActive ? 'bg-[#131e36] text-white font-medium' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'); ?>">
                    <div class="flex items-center gap-3 min-w-0">
                        <svg class="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                        <span class="truncate">Content</span>
                    </div>
                    <svg class="w-3.5 h-3.5 text-slate-400 transition-transform duration-200" :class="open ? 'rotate-90' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                </button>
                <div x-show="open" x-cloak class="pl-6 pr-1 space-y-0.5 pt-0.5">
                    <a href="<?php echo e(route('admin.articles.index')); ?>" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] transition <?php echo e(request()->routeIs('admin.articles.index') ? 'bg-[#182645] text-white font-medium' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'); ?>">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/></svg>
                        <span class="truncate">Articles</span>
                    </a>
                    <a href="<?php echo e(route('admin.articles.create')); ?>#bulk" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
                        <span class="truncate">Bulk post upload</span>
                    </a>
                    <a href="<?php echo e(route('admin.categories.index')); ?>" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] transition <?php echo e(request()->routeIs('admin.categories.index') ? 'bg-[#182645] text-white font-medium' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'); ?>">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
                        <span class="truncate">Categories</span>
                    </a>
                    <a href="<?php echo e(route('admin.categories.index')); ?>#subcategories" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 6h16M4 12h10M4 18h7"/></svg>
                        <span class="truncate">Subcategories</span>
                    </a>
                    <a href="<?php echo e(route('admin.categories.index')); ?>#topics" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/></svg>
                        <span class="truncate">Topics</span>
                    </a>
                    <a href="<?php echo e(route('admin.categories.index')); ?>#tags" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>
                        <span class="truncate">Tags</span>
                    </a>
                    <a href="#locations" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        <span class="truncate">Locations</span>
                    </a>
                    <a href="<?php echo e(route('admin.users.index')); ?>" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                        <span class="truncate">Authors</span>
                    </a>
                    <a href="#static-pages" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                        <span class="truncate">Static pages</span>
                    </a>
                    <a href="<?php echo e(route('admin.categories.index')); ?>#taxonomy" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>
                        <span class="truncate">Article taxonomy</span>
                    </a>
                    <a href="<?php echo e(route('admin.articles.index')); ?>#previews" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                        <span class="truncate">Preview links</span>
                    </a>
                </div>
            </div>

            <!-- 4. Media (Collapsible) -->
            <?php $isMediaActive = request()->routeIs('admin.media.*', 'admin.epapers.*'); ?>
            <div x-data="{ open: <?php echo e($isMediaActive ? 'true' : 'false'); ?> }" class="space-y-0.5">
                <button type="button" @click="open = !open" 
                        class="w-full flex items-center justify-between px-3 py-2 rounded-lg transition <?php echo e($isMediaActive ? 'bg-[#131e36] text-white font-medium' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'); ?>">
                    <div class="flex items-center gap-3 min-w-0">
                        <svg class="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                        </svg>
                        <span class="truncate">Media</span>
                    </div>
                    <svg class="w-3.5 h-3.5 text-slate-400 transition-transform duration-200" :class="open ? 'rotate-90' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                </button>
                <div x-show="open" x-cloak class="pl-6 pr-1 space-y-0.5 pt-0.5">
                    <a href="#web-stories" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/></svg>
                        <span class="truncate">Web stories</span>
                    </a>
                    <a href="#podcast-shows" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>
                        <span class="truncate">Podcast shows</span>
                    </a>
                    <a href="#transcripts" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                        <span class="truncate">Episode transcripts</span>
                    </a>
                    <a href="<?php echo e(route('admin.epapers.index')); ?>" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] transition <?php echo e(request()->routeIs('admin.epapers.*') ? 'bg-[#182645] text-white font-medium' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'); ?>">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2"/></svg>
                        <span class="truncate">E-paper editions</span>
                    </a>
                    <a href="#live-events" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z"/></svg>
                        <span class="truncate">Live events</span>
                    </a>
                    <a href="#podcasts" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>
                        <span class="truncate">Podcasts</span>
                    </a>
                    <a href="#breaking-alerts" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                        <span class="truncate">Breaking alerts</span>
                    </a>
                    <a href="<?php echo e(route('admin.media.index')); ?>" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] transition <?php echo e(request()->routeIs('admin.media.*') ? 'bg-[#182645] text-white font-medium' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'); ?>">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
                        <span class="truncate">Media library</span>
                    </a>
                    <a href="#media-help" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        <span class="truncate">Help</span>
                    </a>
                </div>
            </div>

            <!-- 5. Community (Collapsible) -->
            <?php $isCommunityActive = request()->routeIs('admin.comments.*'); ?>
            <div x-data="{ open: <?php echo e($isCommunityActive ? 'true' : 'false'); ?> }" class="space-y-0.5">
                <button type="button" @click="open = !open" 
                        class="w-full flex items-center justify-between px-3 py-2 rounded-lg transition <?php echo e($isCommunityActive ? 'bg-[#131e36] text-white font-medium' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'); ?>">
                    <div class="flex items-center gap-3 min-w-0">
                        <svg class="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                        </svg>
                        <span class="truncate">Community</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                        <?php if($pendingCommentCount > 0): ?>
                            <span class="text-[10px] font-mono bg-blue-500/20 text-blue-400 px-1.5 py-0.2 rounded-full"><?php echo e($pendingCommentCount); ?></span>
                        <?php endif; ?>
                        <svg class="w-3.5 h-3.5 text-slate-400 transition-transform duration-200" :class="open ? 'rotate-90' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                        </svg>
                    </div>
                </button>
                <div x-show="open" x-cloak class="pl-6 pr-1 space-y-0.5 pt-0.5">
                    <a href="<?php echo e(route('admin.comments.index')); ?>" class="flex items-center justify-between px-2.5 py-1.5 rounded-md text-[12.5px] transition <?php echo e(request()->routeIs('admin.comments.*') ? 'bg-[#182645] text-white font-medium' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'); ?>">
                        <div class="flex items-center gap-2.5 truncate">
                            <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                            <span class="truncate">Comments</span>
                        </div>
                        <?php if($pendingCommentCount > 0): ?>
                            <span class="text-[10px] font-mono bg-blue-500/20 text-blue-400 px-1.5 py-0.2 rounded-full"><?php echo e($pendingCommentCount); ?></span>
                        <?php endif; ?>
                    </a>
                    <a href="#contact-inbox" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg>
                        <span class="truncate">Contact inbox</span>
                    </a>
                    <a href="#subscribers" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                        <span class="truncate">Subscribers</span>
                    </a>
                    <a href="#author-applications" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                        <span class="truncate">Author applications</span>
                    </a>
                    <a href="#author-rewards" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        <span class="truncate">Author rewards</span>
                    </a>
                    <a href="#badges" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
                        <span class="truncate">Badges</span>
                    </a>
                    <a href="#polls" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                        <span class="truncate">Polls</span>
                    </a>
                </div>
            </div>

            <!-- 6. Newsroom (Collapsible) -->
            <?php $isNewsroomActive = request()->routeIs('admin.ai.*', 'admin.articles.review'); ?>
            <div x-data="{ open: <?php echo e($isNewsroomActive ? 'true' : 'false'); ?> }" class="space-y-0.5">
                <button type="button" @click="open = !open" 
                        class="w-full flex items-center justify-between px-3 py-2 rounded-lg transition <?php echo e($isNewsroomActive ? 'bg-[#131e36] text-white font-medium' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'); ?>">
                    <div class="flex items-center gap-3 min-w-0">
                        <svg class="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/>
                        </svg>
                        <span class="truncate">Newsroom</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                        <?php if($pendingReviewCount > 0): ?>
                            <span class="text-[10px] font-mono bg-amber-500/20 text-amber-400 px-1.5 py-0.2 rounded-full"><?php echo e($pendingReviewCount); ?></span>
                        <?php endif; ?>
                        <svg class="w-3.5 h-3.5 text-slate-400 transition-transform duration-200" :class="open ? 'rotate-90' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                        </svg>
                    </div>
                </button>
                <div x-show="open" x-cloak class="pl-6 pr-1 space-y-0.5 pt-0.5">
                    <a href="#automation-rules" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                        <span class="truncate">Automation rules</span>
                    </a>
                    <a href="#social-packages" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
                        <span class="truncate">Social packages</span>
                    </a>
                    <a href="#social-calendar" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        <span class="truncate">Social calendar</span>
                    </a>
                    <a href="#social-accounts" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
                        <span class="truncate">Social accounts &amp; ...</span>
                    </a>
                    <a href="<?php echo e(route('admin.ai.index')); ?>" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] transition <?php echo e(request()->routeIs('admin.ai.*') ? 'bg-[#182645] text-white font-medium' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'); ?>">
                        <svg class="w-3.5 h-3.5 shrink-0 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
                        <span class="truncate">AI intake</span>
                    </a>
                    <a href="<?php echo e(route('admin.dashboard')); ?>" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                        <span class="truncate">My Desk</span>
                    </a>
                    <a href="<?php echo e(route('admin.articles.review')); ?>" class="flex items-center justify-between px-2.5 py-1.5 rounded-md text-[12.5px] transition <?php echo e(request()->routeIs('admin.articles.review') ? 'bg-[#182645] text-white font-medium' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'); ?>">
                        <div class="flex items-center gap-2.5 truncate">
                            <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
                            <span class="truncate">Story desk</span>
                        </div>
                        <?php if($pendingReviewCount > 0): ?>
                            <span class="text-[10px] font-mono bg-amber-500/20 text-amber-400 px-1.5 py-0.2 rounded-full"><?php echo e($pendingReviewCount); ?></span>
                        <?php endif; ?>
                    </a>
                    <a href="#news-inbox" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg>
                        <span class="truncate">News inbox</span>
                    </a>
                    <a href="<?php echo e(route('admin.users.index')); ?>" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                        <span class="truncate">Desk team</span>
                    </a>
                    <a href="#newsroom-tasks" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
                        <span class="truncate">Newsroom tasks</span>
                    </a>
                </div>
            </div>

            <!-- 7. Marketing (Collapsible) -->
            <?php $isMarketingActive = request()->routeIs('admin.advertisements.*'); ?>
            <div x-data="{ open: <?php echo e($isMarketingActive ? 'true' : 'false'); ?> }" class="space-y-0.5">
                <button type="button" @click="open = !open" 
                        class="w-full flex items-center justify-between px-3 py-2 rounded-lg transition <?php echo e($isMarketingActive ? 'bg-[#131e36] text-white font-medium' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'); ?>">
                    <div class="flex items-center gap-3 min-w-0">
                        <svg class="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
                        </svg>
                        <span class="truncate">Marketing</span>
                    </div>
                    <svg class="w-3.5 h-3.5 text-slate-400 transition-transform duration-200" :class="open ? 'rotate-90' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                </button>
                <div x-show="open" x-cloak class="pl-6 pr-1 space-y-0.5 pt-0.5">
                    <a href="<?php echo e(route('admin.advertisements.index')); ?>" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] transition <?php echo e(request()->routeIs('admin.advertisements.*') ? 'bg-[#182645] text-white font-medium' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'); ?>">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                        <span class="truncate">Campaigns</span>
                    </a>
                    <a href="#push-alerts" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                        <span class="truncate">Push alerts</span>
                    </a>
                    <a href="#marketing-help" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        <span class="truncate">Help</span>
                    </a>
                </div>
            </div>

            <!-- 8. Revenue (Collapsible) -->
            <div x-data="{ open: false }" class="space-y-0.5">
                <button type="button" @click="open = !open" 
                        class="w-full flex items-center justify-between px-3 py-2 rounded-lg transition text-slate-300 hover:text-white hover:bg-slate-800/50">
                    <div class="flex items-center gap-3 min-w-0">
                        <svg class="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span class="truncate">Revenue</span>
                    </div>
                    <svg class="w-3.5 h-3.5 text-slate-400 transition-transform duration-200" :class="open ? 'rotate-90' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                </button>
                <div x-show="open" x-cloak class="pl-6 pr-1 space-y-0.5 pt-0.5">
                    <a href="<?php echo e(route('admin.advertisements.index')); ?>#advertisers" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                        <span class="truncate">Advertisers</span>
                    </a>
                    <a href="<?php echo e(route('admin.advertisements.index')); ?>" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/></svg>
                        <span class="truncate">Ad campaigns</span>
                    </a>
                    <a href="#ad-invoices" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                        <span class="truncate">Ad invoices</span>
                    </a>
                    <a href="#sponsorships" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
                        <span class="truncate">Sponsorships</span>
                    </a>
                    <a href="#revenue-overview" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
                        <span class="truncate">Revenue</span>
                    </a>
                    <a href="#ledger" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                        <span class="truncate">Ledger</span>
                    </a>
                    <a href="#profit-loss" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
                        <span class="truncate">Profit &amp; loss</span>
                    </a>
                    <a href="#receivables" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                        <span class="truncate">Receivables</span>
                    </a>
                    <a href="#accounts" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
                        <span class="truncate">Accounts</span>
                    </a>
                    <a href="#ad-invoice-pdfs" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                        <span class="truncate">Ad invoice PDFs</span>
                    </a>
                    <a href="#advertiser-portal" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                        <span class="truncate">Advertiser portal</span>
                    </a>
                    <a href="#classifieds" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2"/></svg>
                        <span class="truncate">Classifieds</span>
                    </a>
                    <a href="#donations" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                        <span class="truncate">Donations &amp; slots</span>
                    </a>
                    <a href="#currencies" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/></svg>
                        <span class="truncate">Currencies</span>
                    </a>
                    <a href="#plans" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
                        <span class="truncate">Plans</span>
                    </a>
                </div>
            </div>

            <!-- 9. Analytics (Collapsible) -->
            <div x-data="{ open: false }" class="space-y-0.5">
                <button type="button" @click="open = !open" 
                        class="w-full flex items-center justify-between px-3 py-2 rounded-lg transition text-slate-300 hover:text-white hover:bg-slate-800/50">
                    <div class="flex items-center gap-3 min-w-0">
                        <svg class="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                        </svg>
                        <span class="truncate">Analytics</span>
                    </div>
                    <svg class="w-3.5 h-3.5 text-slate-400 transition-transform duration-200" :class="open ? 'rotate-90' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                </button>
                <div x-show="open" x-cloak class="pl-6 pr-1 space-y-0.5 pt-0.5">
                    <a href="<?php echo e(route('admin.dashboard')); ?>#analytics" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        <span class="truncate">Analytics</span>
                    </a>
                    <a href="#analytics-help" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        <span class="truncate">Help</span>
                    </a>
                </div>
            </div>

            <!-- 10. Site (Collapsible) -->
            <?php $isSiteActive = request()->routeIs('admin.navigation.*', 'admin.settings.*'); ?>
            <div x-data="{ open: <?php echo e($isSiteActive ? 'true' : 'false'); ?> }" class="space-y-0.5">
                <button type="button" @click="open = !open" 
                        class="w-full flex items-center justify-between px-3 py-2 rounded-lg transition <?php echo e($isSiteActive ? 'bg-[#131e36] text-white font-medium' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'); ?>">
                    <div class="flex items-center gap-3 min-w-0">
                        <svg class="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                        </svg>
                        <span class="truncate">Site</span>
                    </div>
                    <svg class="w-3.5 h-3.5 text-slate-400 transition-transform duration-200" :class="open ? 'rotate-90' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                </button>
                <div x-show="open" x-cloak class="pl-6 pr-1 space-y-0.5 pt-0.5">
                    <a href="<?php echo e(route('admin.settings.index')); ?>#theme" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M7 21a4 4 0 01-4-4 5 5 0 015-5c1 0 1 1 2 1s2-1 3-1 2 1 3 1a5 5 0 005 5 4 4 0 01-4 4H7z"/></svg>
                        <span class="truncate">Visual theme</span>
                    </a>
                    <a href="#fonts" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <span class="w-3.5 h-3.5 shrink-0 text-slate-400 font-serif font-bold text-xs flex items-center justify-center">A</span>
                        <span class="truncate">Fonts</span>
                    </a>
                    <a href="#sidebar-widgets" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"/></svg>
                        <span class="truncate">Sidebar widgets</span>
                    </a>
                    <a href="#newsletter-popup" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                        <span class="truncate">Newsletter popup &amp; import</span>
                    </a>
                    <a href="#home-layout" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/></svg>
                        <span class="truncate">Home layout</span>
                    </a>
                    <a href="<?php echo e(route('admin.navigation.index')); ?>" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12.5px] transition <?php echo e(request()->routeIs('admin.navigation.*') ? 'bg-[#182645] text-white font-medium' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'); ?>">
                        <svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 6h16M4 12h16M4 18h16"/></svg>
                        <span class="truncate">Navigation</span>
                    </a>
                </div>
            </div>

            <!-- Standalone Direct Links (Image 9) -->
            <div class="pt-2 border-t border-[#141d2e] space-y-0.5">
                <a href="#todo-list" class="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition">
                    <svg class="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                    </svg>
                    <span class="truncate">Todo List</span>
                </a>

                <a href="#activity-logs" class="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition">
                    <svg class="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                    </svg>
                    <span class="truncate">Activity Logs</span>
                </a>

                <a href="#login-activity" class="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition">
                    <svg class="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                    </svg>
                    <span class="truncate">Login Activity</span>
                </a>

                <a href="#language" class="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition">
                    <svg class="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/>
                    </svg>
                    <span class="truncate">Language</span>
                </a>

                <a href="<?php echo e(route('admin.settings.index')); ?>" 
                   class="flex items-center gap-3 px-3 py-2 rounded-lg transition <?php echo e(request()->routeIs('admin.settings.index') ? 'bg-[#15223e] text-white font-medium' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'); ?>">
                    <svg class="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <span class="truncate">Settings</span>
                </a>

                <!-- Email & OTP Settings -->
                <a href="<?php echo e(route('admin.settings.mail')); ?>" 
                   class="flex items-center gap-3 px-3 py-2 rounded-lg transition <?php echo e(request()->routeIs('admin.settings.mail*') ? 'bg-[#15223e] text-white font-medium' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'); ?>">
                    <i class="ri-mail-send-line text-base text-slate-300 shrink-0"></i>
                    <span class="truncate">Email &amp; OTP</span>
                </a>

                <a href="#security" class="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition">
                    <svg class="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                    <span class="truncate">Security</span>
                </a>

                <a href="#seo" class="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition">
                    <span class="w-4 h-4 shrink-0 text-slate-300 font-mono font-bold text-[10px] flex items-center justify-center">SEO</span>
                    <span class="truncate">SEO</span>
                </a>

                <a href="<?php echo e(route('admin.tenants.index')); ?>" 
                   class="flex items-center gap-3 px-3 py-2 rounded-lg transition <?php echo e(request()->routeIs('admin.tenants.*') ? 'bg-[#15223e] text-white font-medium' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'); ?>">
                    <svg class="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/>
                    </svg>
                    <span class="truncate">System</span>
                </a>

                <a href="#developers" class="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition">
                    <svg class="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                    </svg>
                    <span class="truncate">Developers</span>
                </a>

                <a href="#integrations" class="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition">
                    <svg class="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"/>
                    </svg>
                    <span class="truncate">Integrations</span>
                </a>
            </div>

        </nav>

        <!-- User Profile Footer -->
        <div class="p-3 border-t border-[#141d2e] bg-[#070b14]/90">
            <div class="flex items-center justify-between gap-2 px-2 py-1">
                <div class="min-w-0 flex items-center gap-2">
                    <span class="w-7 h-7 rounded-full bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center justify-center shrink-0">
                        <?php echo e(strtoupper(substr(auth()->user()->name ?? 'A', 0, 1))); ?>

                    </span>
                    <div class="min-w-0">
                        <p class="text-xs font-medium text-white truncate"><?php echo e(auth()->user()->name); ?></p>
                        <p class="text-[10px] text-slate-400 capitalize truncate"><?php echo e(auth()->user()->role); ?></p>
                    </div>
                </div>
                <form method="POST" action="<?php echo e(route('logout')); ?>">
                    <?php echo csrf_field(); ?>
                    <button type="submit" class="text-xs text-slate-400 hover:text-rose-400 transition cursor-pointer p-1 rounded hover:bg-slate-800" title="Sign out">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    </aside>

    <!-- Main Workspace -->
    <div class="flex-1 lg:pl-64 flex flex-col min-w-0">
        <!-- Top Header -->
        <header class="h-14 sticky top-0 z-20 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 px-4 sm:px-6 flex items-center justify-between gap-4">
            <div class="flex items-center gap-3 min-w-0">
                <button @click="mobileNav = !mobileNav" class="lg:hidden p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-300">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </button>
                <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer" 
                   class="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition group py-1"
                   title="View Public Live Website">
                    <i class="ri-global-line text-sm text-zinc-400 group-hover:text-blue-500 transition"></i>
                    <span>Live Website</span>
                    <i class="ri-external-link-line text-[11px] text-zinc-400 group-hover:text-blue-500 transition"></i>
                </a>
            </div>

            <!-- Top Header Right: Notification Only (Admin top profile removed) -->
            <div class="flex items-center gap-2">
                <!-- Notification Bell -->
                <div x-data="{ notifOpen: false }" class="relative">
                    <button @click="notifOpen = !notifOpen" 
                            type="button"
                            title="Notifications"
                            class="flex items-center justify-center w-8 h-8 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition relative cursor-pointer">
                        <i class="ri-notification-3-line text-lg"></i>
                        <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-white dark:ring-zinc-950"></span>
                    </button>

                    <!-- Notifications Dropdown Popover -->
                    <div x-show="notifOpen" 
                         x-cloak 
                         @click.outside="notifOpen = false"
                         class="absolute right-0 mt-2 w-72 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xl py-2 z-50 text-xs">
                        <div class="px-3.5 py-1.5 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                            <span class="font-bold text-zinc-900 dark:text-zinc-100">Notifications</span>
                            <span class="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded">All caught up</span>
                        </div>
                        <div class="px-3.5 py-6 text-center text-zinc-400">
                            <i class="ri-notification-line text-2xl block mb-1.5 text-zinc-300 dark:text-zinc-600"></i>
                            <p class="text-xs font-medium text-zinc-500">No unread notifications</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Mobile Drawer Nav -->
        <div x-show="mobileNav" x-cloak class="lg:hidden bg-[#0A0F1D] text-slate-300 border-b border-slate-800 px-4 py-3 space-y-1 text-xs max-h-[80vh] overflow-y-auto">
            <a href="<?php echo e(route('admin.dashboard')); ?>" class="block py-2 text-white font-medium">Dashboard</a>
            <a href="<?php echo e(route('admin.staff.index')); ?>" class="block py-2 text-slate-300 hover:text-white">Staff</a>
            <a href="<?php echo e(route('admin.users.index')); ?>" class="block py-2 text-slate-300 hover:text-white">Users</a>
            <div class="py-1 border-t border-slate-800">
                <span class="text-[10px] uppercase font-bold text-slate-500">Content</span>
                <a href="<?php echo e(route('admin.articles.index')); ?>" class="block py-1.5 pl-3 text-slate-300 hover:text-white">Articles</a>
                <a href="<?php echo e(route('admin.categories.index')); ?>" class="block py-1.5 pl-3 text-slate-300 hover:text-white">Categories</a>
            </div>
            <div class="py-1 border-t border-slate-800">
                <span class="text-[10px] uppercase font-bold text-slate-500">Media</span>
                <a href="<?php echo e(route('admin.epapers.index')); ?>" class="block py-1.5 pl-3 text-slate-300 hover:text-white">E-Paper Editions</a>
                <a href="<?php echo e(route('admin.media.index')); ?>" class="block py-1.5 pl-3 text-slate-300 hover:text-white">Media Library</a>
            </div>
            <div class="py-1 border-t border-slate-800">
                <span class="text-[10px] uppercase font-bold text-slate-500">Community</span>
                <a href="<?php echo e(route('admin.comments.index')); ?>" class="block py-1.5 pl-3 text-slate-300 hover:text-white">Comments (<?php echo e($pendingCommentCount); ?>)</a>
            </div>
            <div class="py-1 border-t border-slate-800">
                <span class="text-[10px] uppercase font-bold text-slate-500">Newsroom</span>
                <a href="<?php echo e(route('admin.ai.index')); ?>" class="block py-1.5 pl-3 text-slate-300 hover:text-white">AI Intake</a>
                <a href="<?php echo e(route('admin.articles.review')); ?>" class="block py-1.5 pl-3 text-slate-300 hover:text-white">Story Desk (<?php echo e($pendingReviewCount); ?>)</a>
            </div>
            <div class="py-1 border-t border-slate-800">
                <span class="text-[10px] uppercase font-bold text-slate-500">Marketing &amp; Revenue</span>
                <a href="<?php echo e(route('admin.advertisements.index')); ?>" class="block py-1.5 pl-3 text-slate-300 hover:text-white">Advertisements &amp; Campaigns</a>
            </div>
            <div class="py-1 border-t border-slate-800">
                <a href="<?php echo e(route('admin.settings.index')); ?>" class="block py-1.5 text-slate-300 hover:text-white">Publication Settings</a>
                <a href="<?php echo e(route('admin.settings.mail')); ?>" class="block py-1.5 text-slate-300 hover:text-white">Email &amp; OTP Settings</a>
                <a href="<?php echo e(route('admin.tenants.index')); ?>" class="block py-1.5 text-slate-300 hover:text-white">System (Publications)</a>
            </div>
        </div>

    <!-- Page Content -->
    <main class="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
        <?php echo $__env->yieldContent('content'); ?>
    </main>
    </div>
</div>

    <!-- Native MediaOS Floating Toast Container -->
    <div id="mediaos-toast-container" class="fixed top-4 right-4 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none" aria-live="polite"></div>

    <!-- Native MediaOS Confirm Dialog Container -->
    <div id="mediaos-confirm-modal" class="fixed inset-0 z-[9995] hidden items-center justify-center p-4">
        <!-- Backdrop -->
        <div id="mediaos-confirm-backdrop" class="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"></div>
        <!-- Dialog Card -->
        <div class="relative w-full max-w-md rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl p-6 z-10 transition-all font-sans">
            <div class="flex items-start gap-4">
                <div id="mediaos-confirm-icon-box" class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60">
                    <i id="mediaos-confirm-icon" class="ri-alert-fill text-xl text-rose-600 dark:text-rose-400"></i>
                </div>
                <div class="flex-1 min-w-0">
                    <h4 id="mediaos-confirm-title" class="text-sm font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Are you sure?</h4>
                    <p id="mediaos-confirm-message" class="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed">This action cannot be undone.</p>
                </div>
            </div>
            <div class="flex items-center justify-end gap-2.5 mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
                <button type="button" id="mediaos-confirm-cancel-btn" class="px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition cursor-pointer">
                    Cancel
                </button>
                <button type="button" id="mediaos-confirm-ok-btn" class="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs transition active:scale-95 cursor-pointer">
                    Yes, Delete
                </button>
            </div>
        </div>
    </div>

<script>
    // Theme sync
    if (localStorage.getItem('mediaos_admin_theme') === 'dark') {
        document.documentElement.classList.add('dark');
    }

    // Native MediaOS In-House Toast System (Single instance, zero duplicates)
    window.mediaosToast = {
        show: function(type, title, message, duration = 4000) {
            const container = document.getElementById('mediaos-toast-container');
            if (!container) return;

            const toastId = 'toast-' + Math.random().toString(36).substring(2, 9);
            const typeConfig = {
                success: {
                    icon: '<i class="ri-checkbox-circle-fill text-lg text-emerald-500 shrink-0"></i>',
                    border: 'border-emerald-200/90 dark:border-emerald-900/60',
                    bar: 'bg-emerald-500'
                },
                error: {
                    icon: '<i class="ri-close-circle-fill text-lg text-rose-500 shrink-0"></i>',
                    border: 'border-rose-200/90 dark:border-rose-900/60',
                    bar: 'bg-rose-500'
                },
                warning: {
                    icon: '<i class="ri-alert-fill text-lg text-amber-500 shrink-0"></i>',
                    border: 'border-amber-200/90 dark:border-amber-900/60',
                    bar: 'bg-amber-500'
                },
                info: {
                    icon: '<i class="ri-information-fill text-lg text-blue-500 shrink-0"></i>',
                    border: 'border-blue-200/90 dark:border-blue-900/60',
                    bar: 'bg-blue-500'
                }
            }[type] || {
                icon: '<i class="ri-information-fill text-lg text-blue-500 shrink-0"></i>',
                border: 'border-zinc-200 dark:border-zinc-800',
                bar: 'bg-blue-500'
            };

            const toast = document.createElement('div');
            toast.id = toastId;
            toast.className = `group pointer-events-auto relative overflow-hidden rounded-2xl border ${typeConfig.border} bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-xl shadow-zinc-950/5 dark:shadow-zinc-950/40 p-4 flex flex-col gap-2 transition-all duration-200 transform translate-y-1 opacity-0`;
            
            toast.innerHTML = `
                <div class="flex items-start gap-3">
                    ${typeConfig.icon}
                    <div class="flex-1 min-w-0 pr-1">
                        <p class="text-xs font-bold text-zinc-900 dark:text-zinc-100 leading-tight">${title}</p>
                        ${message ? `<p class="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">${message}</p>` : ''}
                    </div>
                    <button type="button" class="dismiss-btn text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1 -mr-1 -mt-1 rounded-lg transition cursor-pointer" title="Dismiss">
                        <i class="ri-close-line text-sm"></i>
                    </button>
                </div>
                <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-100 dark:bg-zinc-800">
                    <div class="progress-bar h-full ${typeConfig.bar} transition-all" style="width: 100%;"></div>
                </div>
            `;

            container.appendChild(toast);

            requestAnimationFrame(() => {
                toast.classList.remove('translate-y-1', 'opacity-0');
                toast.classList.add('translate-y-0', 'opacity-100');
            });

            const dismiss = () => {
                toast.classList.remove('translate-y-0', 'opacity-100');
                toast.classList.add('translate-x-4', 'opacity-0');
                setTimeout(() => {
                    if (toast.parentElement) toast.remove();
                }, 200);
            };

            toast.querySelector('.dismiss-btn').addEventListener('click', dismiss);

            const startTime = Date.now();
            const interval = setInterval(() => {
                const elapsed = Date.now() - startTime;
                const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
                const bar = toast.querySelector('.progress-bar');
                if (bar) bar.style.width = remaining + '%';
                if (remaining <= 0) {
                    clearInterval(interval);
                    dismiss();
                }
            }, 50);
        },
        success: function(title, message) { this.show('success', title, message); },
        error: function(title, message) { this.show('error', title, message); },
        warning: function(title, message) { this.show('warning', title, message); },
        info: function(title, message) { this.show('info', title, message); }
    };

    // Backward-compatible alias
    window.Toast = {
        fire: function(opts) {
            window.mediaosToast.show(opts.icon || 'info', opts.title, opts.text || '');
        }
    };

    // Native MediaOS Confirmation Modal (Protected against duplicate triggers)
    let isConfirmModalOpen = false;

    window.mediaosConfirm = function(options = {}) {
        if (isConfirmModalOpen) {
            return Promise.resolve(false);
        }
        isConfirmModalOpen = true;

        return new Promise((resolve) => {
            const modal = document.getElementById('mediaos-confirm-modal');
            const backdrop = document.getElementById('mediaos-confirm-backdrop');
            const titleEl = document.getElementById('mediaos-confirm-title');
            const messageEl = document.getElementById('mediaos-confirm-message');
            const okBtn = document.getElementById('mediaos-confirm-ok-btn');
            const cancelBtn = document.getElementById('mediaos-confirm-cancel-btn');
            const iconBox = document.getElementById('mediaos-confirm-icon-box');
            const iconEl = document.getElementById('mediaos-confirm-icon');

            if (!modal) {
                isConfirmModalOpen = false;
                return resolve(false);
            }

            titleEl.textContent = options.title || 'Are you sure?';
            messageEl.textContent = options.message || options.text || 'This action cannot be undone.';
            okBtn.textContent = options.confirmText || 'Yes, Confirm';
            cancelBtn.textContent = options.cancelText || 'Cancel';

            const variant = options.variant || (options.icon === 'warning' ? 'warning' : 'danger');
            if (variant === 'danger') {
                iconBox.className = 'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60';
                iconEl.className = 'ri-delete-bin-line text-xl text-rose-600 dark:text-rose-400';
                okBtn.className = 'px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs transition active:scale-95 cursor-pointer';
            } else if (variant === 'warning') {
                iconBox.className = 'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900/60';
                iconEl.className = 'ri-alert-fill text-xl text-amber-600 dark:text-amber-400';
                okBtn.className = 'px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs transition active:scale-95 cursor-pointer';
            } else {
                iconBox.className = 'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/60';
                iconEl.className = 'ri-checkbox-circle-fill text-xl text-blue-600 dark:text-blue-400';
                okBtn.className = 'px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition active:scale-95 cursor-pointer';
            }

            modal.classList.remove('hidden');
            modal.classList.add('flex');

            const close = (result) => {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
                cleanup();
                isConfirmModalOpen = false;
                resolve(result);
            };

            const onOk = (e) => {
                e.stopPropagation();
                close(true);
            };
            const onCancel = (e) => {
                e.stopPropagation();
                close(false);
            };
            const onKey = (e) => {
                if (e.key === 'Escape') close(false);
            };

            const cleanup = () => {
                okBtn.removeEventListener('click', onOk);
                cancelBtn.removeEventListener('click', onCancel);
                backdrop.removeEventListener('click', onCancel);
                window.removeEventListener('keydown', onKey);
            };

            okBtn.addEventListener('click', onOk, { once: true });
            cancelBtn.addEventListener('click', onCancel, { once: true });
            backdrop.addEventListener('click', onCancel, { once: true });
            window.addEventListener('keydown', onKey);
        });
    };

    // Global Context-Aware Action Confirmer
    window.confirmAction = function(e, optionsOrMessage = 'Are you sure you want to proceed?') {
        e.preventDefault();
        const form = e.target;
        if (form.dataset.confirmed === 'true') {
            return true;
        }

        let options = {};
        if (typeof optionsOrMessage === 'string') {
            const text = optionsOrMessage.toLowerCase();
            if (text.includes('suspend')) {
                options = {
                    title: optionsOrMessage,
                    message: 'This account will be suspended and restricted from newsroom access.',
                    confirmText: 'Yes, Suspend Account',
                    variant: 'warning'
                };
            } else if (text.includes('active') || text.includes('activate')) {
                options = {
                    title: optionsOrMessage,
                    message: 'This account will be reactivated with full newsroom editorial access.',
                    confirmText: 'Yes, Activate Account',
                    variant: 'primary'
                };
            } else if (text.includes('switch')) {
                options = {
                    title: optionsOrMessage,
                    message: 'Your active workspace session will switch to this publication.',
                    confirmText: 'Yes, Switch Workspace',
                    variant: 'primary'
                };
            } else if (text.includes('publish') || text.includes('approve')) {
                options = {
                    title: optionsOrMessage,
                    message: 'This story will be approved and published immediately to the public broadsheet.',
                    confirmText: 'Yes, Publish Story',
                    variant: 'primary'
                };
            } else if (text.includes('reject')) {
                options = {
                    title: optionsOrMessage,
                    message: 'This story will be returned to the correspondent with editorial revision feedback.',
                    confirmText: 'Yes, Reject Story',
                    variant: 'warning'
                };
            } else {
                options = {
                    title: optionsOrMessage,
                    message: 'This item will be permanently removed from the system.',
                    confirmText: 'Yes, Delete',
                    variant: 'danger'
                };
            }
        } else if (typeof optionsOrMessage === 'object' && optionsOrMessage !== null) {
            options = optionsOrMessage;
        }

        window.mediaosConfirm(options).then((confirmed) => {
            if (confirmed) {
                form.dataset.confirmed = 'true';
                form.submit();
            }
        });
        return false;
    };

    // Aliases
    window.confirmDelete = window.confirmAction;
    window.confirmModal = function(options = {}) {
        return window.mediaosConfirm(options).then(confirmed => ({ isConfirmed: confirmed }));
    };
</script>

<?php if(session('success')): ?>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        if (window.mediaosToast) {
            mediaosToast.success(<?php echo json_encode(session('success'), 15, 512) ?>);
        }
    });
</script>
<?php endif; ?>

<?php if(session('error') || (isset($errors) && $errors->any())): ?>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        if (window.mediaosToast) {
            mediaosToast.error(<?php echo json_encode(session('error') ?? (isset($errors) ? $errors->first() : ''), 15, 512) ?>);
        }
    });
</script>
<?php endif; ?>
</body>
</html>
