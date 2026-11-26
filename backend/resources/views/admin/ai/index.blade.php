<?php $__env->startSection('title', 'AI Writing Suite'); ?>

<?php $__env->startSection('content'); ?>
<div class="space-y-6">
    <div>
        <h1 class="text-xl font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">AI Writing Suite</h1>
        <p class="text-xs text-zinc-500 mt-0.5">Centralized AI gateway. All generated stories initialize in draft status for human review.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Generator -->
        <div class="lg:col-span-7 space-y-5">
            <form method="POST" action="<?php echo e(route('admin.ai.generate')); ?>"
                  class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 p-5 space-y-4">
                <?php echo csrf_field(); ?>
                <h2 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Editorial Assistant</h2>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                        <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Tool</label>
                        <select name="tool" class="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-xs">
                            <option value="article_writer">Article Writer</option>
                            <option value="headline_generator">Headline Generator</option>
                            <option value="summarizer">Executive Summarizer</option>
                            <option value="translator">Multilingual Translator</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Provider</label>
                        <select name="provider" class="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-xs">
                            <?php $__currentLoopData = $providers; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $p): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                <option value="<?php echo e($p->provider); ?>"><?php echo e($p->name); ?></option>
                            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Language</label>
                        <select name="target_language" class="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-xs">
                            <option value="en">English (en)</option>
                            <option value="bn">Bangla (bn)</option>
                            <option value="ar">Arabic (ar)</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Topic / Factual Prompt *</label>
                    <input type="text" name="topic" required placeholder="e.g., Central bank announces new digital remittance corridor"
                           class="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-3.5 py-2 text-xs">
                </div>

                <div class="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <label class="inline-flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 cursor-pointer">
                        <input type="checkbox" name="save_as_draft" value="1" class="rounded">
                        <span>Save generated output directly as Draft Article</span>
                    </label>
                    <button type="submit" class="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-medium cursor-pointer">
                        Generate Draft
                    </button>
                </div>
            </form>

            <?php if(session('ai_output')): ?>
                <div class="rounded-2xl border border-blue-200/70 dark:border-blue-900/60 bg-white dark:bg-zinc-900/50 p-5 space-y-2">
                    <span class="text-[11px] font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400">Generated Output</span>
                    <div class="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre-line">
                        <?php echo session('ai_output'); ?>

                    </div>
                </div>
            <?php endif; ?>
        </div>

        <!-- Providers & Logs -->
        <div class="lg:col-span-5 space-y-5">
            <div class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 p-5 space-y-3">
                <h2 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Upstream AI Providers</h2>
                <div class="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                    <?php $__currentLoopData = $providers; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $p): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <div class="py-2.5 flex items-center justify-between text-xs">
                            <div>
                                <p class="font-medium text-zinc-900 dark:text-zinc-100"><?php echo e($p->name); ?></p>
                                <p class="text-[11px] text-zinc-400"><?php echo e(number_format($p->total_tokens_used)); ?> tokens · $<?php echo e(number_format($p->estimated_cost, 2)); ?></p>
                            </div>
                            <span class="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                                <?php echo e(ucfirst($p->status)); ?>

                            </span>
                        </div>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </div>
            </div>

            <div class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 p-5 space-y-3">
                <h2 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Recent Generations</h2>
                <div class="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                    <?php $__empty_1 = true; $__currentLoopData = $logs; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $log): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); $__empty_1 = false; ?>
                        <div class="py-2 flex items-center justify-between text-xs">
                            <div>
                                <span class="font-medium text-zinc-800 dark:text-zinc-200"><?php echo e($log->tool); ?></span>
                                <span class="text-zinc-400">· <?php echo e($log->model); ?></span>
                            </div>
                            <span class="font-mono text-[11px] text-zinc-400"><?php echo e($log->tokens_used); ?> tok</span>
                        </div>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); if ($__empty_1): ?>
                        <p class="text-xs text-zinc-400 py-2">No AI runs recorded yet.</p>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
</div>
<?php $__env->stopSection(); ?>


<?php echo $__env->make('layouts.admin', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
