<!DOCTYPE html>
<html lang="en" class="h-full">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign In — MediaOS Desk</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Newsreader:ital,opsz,wght@0,6..72,400..800;1,6..72,400..800&family=Playfair+Display:ital,wght@0,500..900;1,500..900&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.css" rel="stylesheet">
    <style>
        body { font-family: 'Inter', system-ui, -apple-system, sans-serif; }
        .font-serif { font-family: 'Playfair Display', Georgia, serif; }
        [x-cloak] { display: none !important; }
    </style>
</head>
<body class="min-h-full bg-white text-zinc-900 antialiased selection:bg-blue-600 selection:text-white">

<div class="min-h-screen lg:h-screen lg:max-h-screen grid grid-cols-1 lg:grid-cols-12 bg-white overflow-x-hidden">

    <!-- Left Form Container -->
    <div class="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 lg:p-10 h-full overflow-y-auto">
        <!-- Header Brand -->
        <div class="flex items-center justify-between shrink-0 mb-4">
            <a href="http://localhost:3000" class="flex items-center gap-2.5 group">
                <!-- SVGL-Standard MediaOS Official Logo Icon -->
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

        <!-- Auth Page Content -->
        <div class="my-auto max-w-md w-full mx-auto py-2 sm:py-4 space-y-6" x-data="{ showPass: false, email: '<?php echo e(old('email', 'admin@mediaos.io')); ?>', pass: 'password' }">
            <div>
                <h1 class="text-2xl font-bold tracking-tight text-zinc-900">
                    Sign In to Your Newsroom Desk
                </h1>
                <p class="mt-1 text-xs text-zinc-500">
                    Welcome back! Access breaking news desks, editorial pipelines, and publication operations.
                </p>
            </div>

            <?php if($errors->any()): ?>
                <div class="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
                    <i class="ri-error-warning-fill text-base shrink-0"></i>
                    <span><?php echo e($errors->first()); ?></span>
                </div>
            <?php endif; ?>

            <!-- Main Sign-In Form -->
            <form method="POST" action="<?php echo e(route('login.submit')); ?>" class="space-y-4">
                <?php echo csrf_field(); ?>

                <div>
                    <label class="text-xs font-semibold text-zinc-700 block mb-1.5">
                        Email Address
                    </label>
                    <div class="relative">
                        <i class="ri-mail-line absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none text-base"></i>
                        <input type="email"
                               name="email"
                               x-model="email"
                               required
                               autofocus
                               placeholder="admin@mediaos.io"
                               class="w-full h-10 rounded-xl border border-zinc-200 pl-10 pr-3.5 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition bg-white shadow-2xs">
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between mb-1.5">
                        <label class="text-xs font-semibold text-zinc-700">
                            Password
                        </label>
                        <a href="http://localhost:3000/forgot-password" class="text-xs text-blue-600 hover:underline">
                            Forgot password?
                        </a>
                    </div>
                    <div class="relative">
                        <i class="ri-lock-line absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none text-base"></i>
                        <input :type="showPass ? 'text' : 'password'"
                               name="password"
                               x-model="pass"
                               required
                               placeholder="••••••••"
                               class="w-full h-10 rounded-xl border border-zinc-200 pl-10 pr-10 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition bg-white shadow-2xs">
                        <button type="button" 
                                @click="showPass = !showPass" 
                                class="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 p-0.5 cursor-pointer transition"
                                title="Toggle password visibility">
                            <i :class="showPass ? 'ri-eye-off-line' : 'ri-eye-line'" class="text-base"></i>
                        </button>
                    </div>
                </div>

                <div class="flex items-center justify-between pt-0.5">
                    <label class="flex items-center gap-2 cursor-pointer select-none">
                        <input type="checkbox"
                               name="remember"
                               value="1"
                               checked
                               class="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-600">
                        <span class="text-xs text-zinc-600">Remember credentials</span>
                    </label>

                    <!-- Quick Demo Fill Helper -->
                    <button type="button" 
                            @click="email = 'admin@mediaos.io'; pass = 'password'"
                            class="text-[11px] font-medium text-zinc-400 hover:text-blue-600 transition cursor-pointer">
                        Fill Demo Admin
                    </button>
                </div>

                <button type="submit"
                        class="w-full h-10 rounded-xl bg-zinc-900 hover:bg-blue-600 text-white text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm">
                    <i class="ri-shield-keyhole-line text-sm"></i>
                    <span>Sign In to Newsroom</span>
                </button>
            </form>
        </div>

        <!-- Pinned Bottom Footer -->
        <div class="shrink-0 text-xs text-zinc-400 flex items-center justify-between border-t border-zinc-100 pt-4 mt-6">
            <span>&copy; <?php echo e(date('Y')); ?> MediaOS News Network</span>
            <span>Independent Global Broadsheet</span>
        </div>
    </div>

    <!-- Right Reader / Newsroom Showcase -->
    <div class="hidden lg:col-span-6 lg:flex flex-col justify-between p-10 lg:p-14 bg-zinc-900 text-white relative overflow-hidden border-l border-zinc-800 h-full">
        <div class="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-zinc-900 to-zinc-950 pointer-events-none"></div>

        <div class="relative z-10 space-y-6 max-w-lg my-auto">
            <h2 class="text-4xl sm:text-5xl font-black font-serif tracking-tight leading-tight">
                Truth Without Compromise.
            </h2>
            <p class="text-sm text-zinc-300 leading-relaxed">
                Stay ahead with fearless global reporting, investigative scoops, and deep analysis from verified correspondents across 60+ countries.
            </p>

            <div class="grid grid-cols-2 gap-4 pt-2">
                <div class="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
                    <i class="ri-book-open-line text-blue-400 text-xl mb-2 block"></i>
                    <h4 class="text-xs font-bold text-zinc-100">Personalized Reading</h4>
                    <p class="text-[11px] text-zinc-400 mt-1">
                        Save in-depth investigations, follow your favorite news desks, and read offline anytime.
                    </p>
                </div>
                <div class="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
                    <i class="ri-shield-check-line text-emerald-400 text-xl mb-2 block"></i>
                    <h4 class="text-xs font-bold text-zinc-100">Verified &amp; Fact-Checked</h4>
                    <p class="text-[11px] text-zinc-400 mt-1">
                        Zero sensationalism or clickbait. Every dispatch is rigorously vetted by seasoned editors.
                    </p>
                </div>
            </div>
        </div>

        <div class="relative z-10 text-xs text-zinc-500">
            Trusted by millions of informed readers worldwide for daily news intelligence.
        </div>
    </div>

</div>

</body>
</html>
