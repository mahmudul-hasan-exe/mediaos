<?php $__env->startSection('title', 'Dashboard'); ?>

<?php $__env->startSection('content'); ?>
<div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h1 class="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Dashboard</h1>
            <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Newsroom Overview of publication metrics, readership, and editorial output for <?php echo e($tenant->name); ?></p>
        </div>
    </div>

    <!-- 8 KPI Metrics Cards Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <!-- 1. Total Articles -->
        <div class="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-4 sm:p-5 shadow-xs transition hover:border-zinc-300 dark:hover:border-zinc-700">
            <div class="flex items-center justify-between">
                <p class="text-xs font-medium text-zinc-500 dark:text-zinc-400">Total Articles</p>
                <i class="ri-article-line text-lg text-zinc-400"></i>
            </div>
            <p class="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-2"><?php echo e(number_format($stats['total_articles'])); ?></p>
            <p class="text-[11px] text-zinc-400 mt-1">Editorial archive</p>
        </div>

        <!-- 2. Published Today -->
        <div class="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-4 sm:p-5 shadow-xs transition hover:border-zinc-300 dark:hover:border-zinc-700">
            <div class="flex items-center justify-between">
                <p class="text-xs font-medium text-zinc-500 dark:text-zinc-400">Published Today</p>
                <i class="ri-calendar-check-line text-lg text-zinc-400"></i>
            </div>
            <p class="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-2"><?php echo e(number_format($stats['published_today'])); ?></p>
            <p class="text-[11px] text-zinc-400 mt-1">Live editions today</p>
        </div>

        <!-- 3. Total Views -->
        <div class="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-4 sm:p-5 shadow-xs transition hover:border-zinc-300 dark:hover:border-zinc-700">
            <div class="flex items-center justify-between">
                <p class="text-xs font-medium text-zinc-500 dark:text-zinc-400">Total Views</p>
                <i class="ri-eye-line text-lg text-zinc-400"></i>
            </div>
            <p class="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-2"><?php echo e(number_format($stats['total_views'])); ?></p>
            <p class="text-[11px] text-zinc-400 mt-1">Total article impressions</p>
        </div>

        <!-- 4. Categories -->
        <div class="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-4 sm:p-5 shadow-xs transition hover:border-zinc-300 dark:hover:border-zinc-700">
            <div class="flex items-center justify-between">
                <p class="text-xs font-medium text-zinc-500 dark:text-zinc-400">Categories</p>
                <i class="ri-folders-line text-lg text-zinc-400"></i>
            </div>
            <p class="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-2"><?php echo e(number_format($stats['categories'])); ?></p>
            <p class="text-[11px] text-zinc-400 mt-1">Topic sections active</p>
        </div>

        <!-- 5. Review Queue -->
        <div class="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-4 sm:p-5 shadow-xs transition hover:border-zinc-300 dark:hover:border-zinc-700">
            <div class="flex items-center justify-between">
                <p class="text-xs font-medium text-zinc-500 dark:text-zinc-400">Review Queue</p>
                <i class="ri-inbox-archive-line text-lg text-zinc-400"></i>
            </div>
            <p class="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-2"><?php echo e(number_format($stats['pending_articles'])); ?></p>
            <p class="text-[11px] text-zinc-400 mt-1">Pending editor review</p>
        </div>

        <!-- 6. Pending Comments -->
        <div class="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-4 sm:p-5 shadow-xs transition hover:border-zinc-300 dark:hover:border-zinc-700">
            <div class="flex items-center justify-between">
                <p class="text-xs font-medium text-zinc-500 dark:text-zinc-400">Pending Comments</p>
                <i class="ri-chat-voice-line text-lg text-zinc-400"></i>
            </div>
            <p class="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-2"><?php echo e(number_format($stats['pending_comments'])); ?></p>
            <p class="text-[11px] text-zinc-400 mt-1">Awaiting moderation</p>
        </div>

        <!-- 7. Total Comments -->
        <div class="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-4 sm:p-5 shadow-xs transition hover:border-zinc-300 dark:hover:border-zinc-700">
            <div class="flex items-center justify-between">
                <p class="text-xs font-medium text-zinc-500 dark:text-zinc-400">Total Comments</p>
                <i class="ri-chat-3-line text-lg text-zinc-400"></i>
            </div>
            <p class="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-2"><?php echo e(number_format($stats['total_comments'])); ?></p>
            <p class="text-[11px] text-zinc-400 mt-1">Reader engagements</p>
        </div>

        <!-- 8. Admin Users -->
        <div class="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-4 sm:p-5 shadow-xs transition hover:border-zinc-300 dark:hover:border-zinc-700">
            <div class="flex items-center justify-between">
                <p class="text-xs font-medium text-zinc-500 dark:text-zinc-400">Admin Users</p>
                <i class="ri-team-line text-lg text-zinc-400"></i>
            </div>
            <p class="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-2"><?php echo e(number_format($stats['admin_users'])); ?></p>
            <p class="text-[11px] text-zinc-400 mt-1">Desk team members</p>
        </div>
    </div>

    <!-- Charts / Panels Row -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Articles published (last 14 days) -->
        <div class="lg:col-span-8 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-5 shadow-xs">
            <div class="flex items-center justify-between mb-4">
                <div>
                    <h2 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Articles published (last 14 days)</h2>
                    <p class="text-xs text-zinc-400 mt-0.5">Daily publishing frequency trend</p>
                </div>
                <div class="flex items-center gap-3">
                    <span class="inline-flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
                        <span class="w-3 h-0.5 bg-blue-600 rounded"></span>
                        <span>Published Trend</span>
                    </span>
                    <span class="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400">
                        <?php echo e(array_sum(array_column($fourteenDaysArticles, 'count'))); ?> Total
                    </span>
                </div>
            </div>

            <!-- Line Chart Canvas Container -->
            <div class="h-52 w-full relative">
                <canvas id="fourteenDaysLineChart" class="w-full h-full"></canvas>
            </div>
        </div>

        <!-- Articles by type (Circle / Donut Chart) -->
        <div class="lg:col-span-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-5 shadow-xs flex flex-col justify-between">
            <div>
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Articles by type</h2>
                        <p class="text-xs text-zinc-400 mt-0.5">Format distribution of published content</p>
                    </div>
                </div>

                <!-- Circular / Donut Chart with Center Metric -->
                <div class="relative h-44 w-44 mx-auto my-4 flex items-center justify-center">
                    <canvas id="articlesByTypeChart" class="w-full h-full"></canvas>
                    <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span class="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-zinc-50"><?php echo e(array_sum(array_column($articlesByType, 'count'))); ?></span>
                        <span class="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">Articles</span>
                    </div>
                </div>

                <!-- Breakdown List -->
                <div class="space-y-2.5 pt-1">
                    <?php $__currentLoopData = $articlesByType; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $type): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <div class="flex items-center justify-between text-xs">
                            <span class="font-medium text-zinc-800 dark:text-zinc-200"><?php echo e($type['type']); ?></span>
                            <div class="flex items-center gap-3">
                                <span class="font-mono text-zinc-500 dark:text-zinc-400"><?php echo e($type['count']); ?></span>
                                <span class="text-[11px] font-mono text-zinc-400 w-9 text-right"><?php echo e($type['percentage']); ?>%</span>
                            </div>
                        </div>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </div>
            </div>

            <!-- Summary Footnote -->
            <div class="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 mt-4 flex items-center justify-between text-xs text-zinc-500">
                <span>Total Cataloged</span>
                <span class="font-semibold text-zinc-900 dark:text-zinc-100 font-mono"><?php echo e(array_sum(array_column($articlesByType, 'count'))); ?></span>
            </div>
        </div>
    </div>

    <!-- Top articles by views Table -->
    <div class="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 overflow-hidden shadow-xs">
        <div class="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
            <div>
                <h2 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Top articles by views</h2>
                <p class="text-xs text-zinc-400 mt-0.5">Most viewed editorial dispatches and multimedia stories</p>
            </div>
            <a href="<?php echo e(route('admin.articles.index')); ?>" class="text-xs font-medium text-blue-600 hover:text-blue-500 transition">
                View all articles →
            </a>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
                <thead>
                    <tr class="border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/80 text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-wider text-[11px]">
                        <th class="py-3 px-5">Title</th>
                        <th class="py-3 px-4">Category</th>
                        <th class="py-3 px-4">Type</th>
                        <th class="py-3 px-5 text-right">Views</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                    <?php $__empty_1 = true; $__currentLoopData = $topArticles; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $article): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); $__empty_1 = false; ?>
                        <tr class="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition">
                            <!-- Title -->
                            <td class="py-3.5 px-5 min-w-[280px]">
                                <?php if(!empty($article['article_id'])): ?>
                                    <a href="<?php echo e(route('admin.articles.edit', $article['article_id'])); ?>" class="font-medium text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition line-clamp-1">
                                        <?php echo e($article['title']); ?>

                                    </a>
                                <?php else: ?>
                                    <span class="font-medium text-zinc-900 dark:text-zinc-100 line-clamp-1">
                                        <?php echo e($article['title']); ?>

                                    </span>
                                <?php endif; ?>
                            </td>

                            <!-- Category -->
                            <td class="py-3.5 px-4 whitespace-nowrap text-zinc-600 dark:text-zinc-300">
                                <span><?php echo e($article['category']); ?></span>
                            </td>

                            <!-- Type -->
                            <td class="py-3.5 px-4 whitespace-nowrap text-xs font-mono uppercase text-zinc-500 dark:text-zinc-400">
                                <?php echo e($article['type']); ?>

                            </td>

                            <!-- Views -->
                            <td class="py-3.5 px-5 text-right font-mono font-medium text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                                <?php echo e(number_format($article['views'])); ?>

                            </td>
                        </tr>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); if ($__empty_1): ?>
                        <tr>
                            <td colspan="4" class="py-10 text-center text-zinc-400 text-xs">
                                No articles published yet.
                            </td>
                        </tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>

    <!-- MediaOS Footer -->
    <footer class="pt-6 pb-4 border-t border-zinc-200/80 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
        <p>© 2026 MediaOS. All rights reserved.</p>
        <div class="flex items-center gap-4">
            <a href="#license" class="hover:text-zinc-900 dark:hover:text-zinc-300 transition underline underline-offset-4">
                License
            </a>
            <span>·</span>
            <span>Version 2.4.0</span>
        </div>
    </footer>
</div>

<script>
document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('fourteenDaysLineChart');
    if (!canvas || typeof Chart === 'undefined') return;

    const ctx = canvas.getContext('2d');
    const isDark = document.documentElement.classList.contains('dark');

    // Create soft vertical gradient under line
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, 'rgba(37, 99, 235, 0.32)');
    gradient.addColorStop(1, 'rgba(37, 99, 235, 0.00)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: <?php echo json_encode(array_column($fourteenDaysArticles, 'date')); ?>,
            datasets: [{
                label: 'Articles',
                data: <?php echo json_encode(array_column($fourteenDaysArticles, 'count')); ?>,
                borderColor: '#2563EB',
                borderWidth: 2.5,
                fill: true,
                backgroundColor: gradient,
                tension: 0.38,
                pointBackgroundColor: '#2563EB',
                pointBorderColor: isDark ? '#18181b' : '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6.5,
                pointHoverBackgroundColor: '#1d4ed8',
                pointHoverBorderColor: '#ffffff',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index',
            },
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    backgroundColor: isDark ? '#090d16' : '#1e293b',
                    titleColor: '#ffffff',
                    bodyColor: '#cbd5e1',
                    padding: 10,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        label: function (context) {
                            return `${context.parsed.y} articles published`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        color: isDark ? '#94a3b8' : '#64748b',
                        font: { size: 10, family: 'Inter, sans-serif' },
                        maxRotation: 0,
                    }
                },
                y: {
                    beginAtZero: true,
                    suggestedMax: 10,
                    grid: {
                        color: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
                        drawBorder: false,
                    },
                    ticks: {
                        color: isDark ? '#94a3b8' : '#64748b',
                        font: { size: 10, family: 'Inter, sans-serif' },
                        stepSize: 2,
                    }
                }
            }
        }
    });

    // 2. Articles by Type Circle / Donut Chart
    const typeCanvas = document.getElementById('articlesByTypeChart');
    if (typeCanvas) {
        const typeCtx = typeCanvas.getContext('2d');
        const typeLabels = <?php echo json_encode(array_column($articlesByType, 'type')); ?>;
        const typeData = <?php echo json_encode(array_column($articlesByType, 'count')); ?>;

        new Chart(typeCtx, {
            type: 'doughnut',
            data: {
                labels: typeLabels,
                datasets: [{
                    data: typeData,
                    backgroundColor: ['#2563EB', '#10B981', '#8B5CF6'],
                    hoverBackgroundColor: ['#1d4ed8', '#059669', '#7c3aed'],
                    borderWidth: 2,
                    borderColor: isDark ? '#18181b' : '#ffffff',
                    hoverOffset: 4,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '74%',
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        backgroundColor: isDark ? '#090d16' : '#1e293b',
                        titleColor: '#ffffff',
                        bodyColor: '#cbd5e1',
                        padding: 10,
                        cornerRadius: 8,
                        displayColors: false,
                        callbacks: {
                            label: function (context) {
                                return ` ${context.label}: ${context.parsed} articles`;
                            }
                        }
                    }
                }
            }
        });
    }
});
</script>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.admin', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
