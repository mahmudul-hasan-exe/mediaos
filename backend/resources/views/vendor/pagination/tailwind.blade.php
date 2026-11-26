<?php if($paginator->hasPages() || $paginator->total() > 0): ?>
    <div class="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500 dark:text-zinc-400">
        <!-- Results Counter -->
        <div>
            <?php if($paginator->total() > 0): ?>
                <p>
                    Showing <span class="font-medium text-zinc-700 dark:text-zinc-200"><?php echo e($paginator->firstItem()); ?></span> to <span class="font-medium text-zinc-700 dark:text-zinc-200"><?php echo e($paginator->lastItem()); ?></span> of <span class="font-medium text-zinc-700 dark:text-zinc-200"><?php echo e($paginator->total()); ?></span> results
                </p>
            <?php else: ?>
                <p>No results found</p>
            <?php endif; ?>
        </div>

        <!-- Pagination Controls -->
        <?php if($paginator->hasPages()): ?>
            <nav role="navigation" aria-label="Pagination Navigation" class="inline-flex items-stretch -space-x-px rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs overflow-hidden">
                
                <?php if($paginator->onFirstPage()): ?>
                    <span aria-disabled="true" class="inline-flex items-center justify-center px-2.5 py-1.5 text-zinc-300 dark:text-zinc-600 border-r border-zinc-200 dark:border-zinc-800 cursor-not-allowed select-none">
                        <i class="ri-arrow-left-s-line text-sm"></i>
                    </span>
                <?php else: ?>
                    <a href="<?php echo e($paginator->previousPageUrl()); ?>" rel="prev" class="inline-flex items-center justify-center px-2.5 py-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 border-r border-zinc-200 dark:border-zinc-800 transition">
                        <i class="ri-arrow-left-s-line text-sm"></i>
                    </a>
                <?php endif; ?>

                
                <?php $__currentLoopData = $elements; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $element): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    
                    <?php if(is_string($element)): ?>
                        <span aria-disabled="true" class="inline-flex items-center justify-center px-3 py-1.5 text-zinc-400 dark:text-zinc-500 border-r border-zinc-200 dark:border-zinc-800 select-none">
                            <?php echo e($element); ?>

                        </span>
                    <?php endif; ?>

                    
                    <?php if(is_array($element)): ?>
                        <?php $__currentLoopData = $element; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $page => $url): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                            <?php if($page == $paginator->currentPage()): ?>
                                <span aria-current="page" class="inline-flex items-center justify-center px-3 py-1.5 font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-r border-zinc-200 dark:border-zinc-800 select-none">
                                    <?php echo e($page); ?>

                                </span>
                            <?php else: ?>
                                <a href="<?php echo e($url); ?>" class="inline-flex items-center justify-center px-3 py-1.5 font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 border-r border-zinc-200 dark:border-zinc-800 transition">
                                    <?php echo e($page); ?>

                                </a>
                            <?php endif; ?>
                        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                    <?php endif; ?>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>

                
                <?php if($paginator->hasMorePages()): ?>
                    <a href="<?php echo e($paginator->nextPageUrl()); ?>" rel="next" class="inline-flex items-center justify-center px-2.5 py-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition">
                        <i class="ri-arrow-right-s-line text-sm"></i>
                    </a>
                <?php else: ?>
                    <span aria-disabled="true" class="inline-flex items-center justify-center px-2.5 py-1.5 text-zinc-300 dark:text-zinc-600 cursor-not-allowed select-none">
                        <i class="ri-arrow-right-s-line text-sm"></i>
                    </span>
                <?php endif; ?>
            </nav>
        <?php endif; ?>
    </div>
<?php endif; ?>
