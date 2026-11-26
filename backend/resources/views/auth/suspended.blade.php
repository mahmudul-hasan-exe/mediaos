<!DOCTYPE html>
<html lang="en" class="h-full">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Suspended — MediaOS Desk</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,500..900;1,500..900&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.css" rel="stylesheet">
    <style>
        body { font-family: 'Inter', system-ui, -apple-system, sans-serif; }
        .font-serif { font-family: 'Playfair Display', Georgia, serif; }
    </style>
</head>
<body class="min-h-full bg-white text-zinc-900 antialiased selection:bg-rose-600 selection:text-white">

<div class="min-h-screen lg:h-screen lg:max-h-screen grid grid-cols-1 lg:grid-cols-12 bg-white overflow-x-hidden">

    <!-- Left Form Container -->
    <div class="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 lg:p-10 h-full overflow-y-auto">
        <!-- Header Brand -->
        <div class="flex items-center justify-between shrink-0 mb-4">
            <a href="http://localhost:3000" class="flex items-center gap-2.5 group">
                <svg width="34" height="34" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="shrink-0 transition-transform duration-300 group-hover:scale-105">
                    <defs>
                        <linearGradient id="svgl-mediaos-bg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#2563EB" />
                            <stop offset="1" stop-color="#1D4ED8" />
                        </linearGradient>
                        <linearGradient id="svgl-mediaos-fold" x1="16" y1="8" x2="26" y2="24" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#93C5FD" />
                            <stop offset="1" stop-color="#60A5FA" />
                        </linearGradient>
                    </defs>
                    <rect width="32" height="32" rx="8" fill="url(#svgl-mediaos-bg)" />
                    <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="7.25" stroke="white" stroke-opacity="0.2" stroke-width="1.25" />
                    <path d="M8 23V9L13.5 16.5L19 9V23" stroke="white" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M19 16.5L24 9V23" stroke="url(#svgl-mediaos-fold)" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round" />
                    <circle cx="24.5" cy="7.5" r="1.75" fill="#F59E0B" />
                </svg>
                <div class="flex items-center leading-none">
                    <span class="font-sans font-black text-xl tracking-tight text-zinc-950 group-hover:text-blue-700 transition">
                        Media
                    </span>
                    <span class="font-sans font-black text-xl tracking-tight text-blue-600">
                        OS
                    </span>
                </div>
            </a>
            <a href="http://localhost:3000" class="text-xs text-zinc-500 hover:text-blue-600 font-medium transition">
                &larr; Back to Front Page
            </a>
        </div>

        <!-- Suspended Page Content -->
        <div class="my-auto max-w-md w-full mx-auto py-4 space-y-6 text-center">
            <!-- Icon Badge -->
            <div class="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 shadow-xs">
                <i class="ri-user-forbid-line text-3xl"></i>
                <span class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white ring-2 ring-white">
                    !
                </span>
            </div>

            <!-- Main Header -->
            <div class="space-y-2">
                <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-rose-100 text-rose-700 border border-rose-200">
                    <i class="ri-shield-alert-line text-xs"></i>
                    <span>Account Suspended</span>
                </div>
                <h1 class="text-2xl sm:text-3xl font-black font-serif tracking-tight text-zinc-950">
                    Access Restricted
                </h1>
                <p class="text-xs sm:text-sm text-zinc-600 max-w-sm mx-auto leading-relaxed">
                    Your account is currently suspended and restricted from logging in to the MediaOS Editorial Desk.
                </p>
            </div>

            <!-- Account Details Card -->
            <div class="rounded-xl border border-zinc-200 bg-zinc-50/70 p-4 text-left space-y-2.5 text-xs">
                <div class="flex items-center justify-between">
                    <span class="text-zinc-500 font-medium">Affected Account</span>
                    <span class="font-semibold text-zinc-900 truncate max-w-[200px]" title="<?php echo e($email); ?>">
                        <?php echo e($email); ?>

                    </span>
                </div>
                <div class="flex items-center justify-between border-t border-zinc-200/80 pt-2">
                    <span class="text-zinc-500 font-medium">Status</span>
                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-100 text-rose-700">
                        Suspended
                    </span>
                </div>
                <div class="flex items-start justify-between border-t border-zinc-200/80 pt-2">
                    <span class="text-zinc-500 font-medium">Notice</span>
                    <span class="text-right text-zinc-600 text-[11px] max-w-[220px]">
                        Administrative privileges and editorial tools have been paused.
                    </span>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="space-y-2.5 pt-1">
                <a href="mailto:support@mediaos.io"
                   class="flex items-center justify-center gap-2 w-full h-10 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold shadow-xs transition">
                    <i class="ri-mail-line"></i>
                    <span>Contact Editorial Support</span>
                </a>

                <div class="grid grid-cols-2 gap-2">
                    <a href="http://localhost:3000"
                       class="flex items-center justify-center gap-1.5 h-9 rounded-lg border border-zinc-200 hover:bg-zinc-100 text-xs font-medium text-zinc-700 transition">
                        <i class="ri-arrow-left-line"></i>
                        <span>Front Page</span>
                    </a>

                    <a href="<?php echo e(route('login')); ?>"
                       class="flex items-center justify-center gap-1.5 h-9 rounded-lg border border-zinc-200 hover:bg-zinc-100 text-xs font-medium text-zinc-700 transition">
                        <i class="ri-logout-box-r-line"></i>
                        <span>Try Another Account</span>
                    </a>
                </div>
            </div>
        </div>

        <!-- Bottom Footer -->
        <div class="shrink-0 text-xs text-zinc-400 flex items-center justify-between border-t border-zinc-100 pt-4 mt-6">
            <span>&copy; <?php echo e(date('Y')); ?> MediaOS News Network</span>
            <span>Enterprise Editorial Platform</span>
        </div>
    </div>

    <!-- Right Reader Showcase -->
    <div class="hidden lg:col-span-6 lg:flex flex-col justify-between p-10 lg:p-14 bg-zinc-900 text-white relative overflow-hidden border-l border-zinc-800 h-full">
        <div class="absolute inset-0 bg-gradient-to-br from-rose-950/20 via-zinc-900 to-zinc-950 pointer-events-none"></div>

        <div class="relative z-10 space-y-6 max-w-lg my-auto">
            <h2 class="text-4xl sm:text-5xl font-black font-serif tracking-tight leading-tight">
                Integrity & Governance.
            </h2>
            <p class="text-sm text-zinc-300 leading-relaxed">
                MediaOS enforces continuous compliance and editorial integrity across multi-tenant news organizations, keeping your publications protected.
            </p>

            <div class="grid grid-cols-2 gap-4 pt-2">
                <div class="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
                    <i class="ri-shield-keyhole-line text-rose-400 text-xl mb-2 block"></i>
                    <h4 class="text-xs font-bold text-zinc-100">Editorial Policy Enforcement</h4>
                    <p class="text-[11px] text-zinc-400 mt-1">
                        Suspensions are logged in administrative audit trails for governance review.
                    </p>
                </div>
                <div class="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
                    <i class="ri-customer-service-2-line text-blue-400 text-xl mb-2 block"></i>
                    <h4 class="text-xs font-bold text-zinc-100">Super-Admin Resolution</h4>
                    <p class="text-[11px] text-zinc-400 mt-1">
                        Contact your managing editor or system administrator to request account reactivation.
                    </p>
                </div>
            </div>
        </div>

        <div class="relative z-10 text-xs text-zinc-500 flex items-center justify-between border-t border-zinc-800/80 pt-4 mt-6">
            <span>Security Compliance Standard v2.4</span>
            <div class="flex items-center gap-1.5">
                <span class="h-2 w-2 rounded-full bg-rose-500 animate-pulse"></span>
                <span class="text-zinc-400 font-mono text-[10px]">AUTH_SUSPENDED</span>
            </div>
        </div>
    </div>
</div>

</body>
</html>
