<?php $__env->startSection('title', 'Email & OTP Delivery'); ?>

<?php $__env->startSection('content'); ?>
<div class="space-y-6" x-data="{
    mailType: '<?php echo e(old('mail_type', $defaults['mail_type'])); ?>',
    showPassword: false,
    selectProvider(type) {
        this.mailType = type;
        if (type === 'gmail') {
            if ($refs.host) $refs.host.value = 'smtp.gmail.com';
            if ($refs.port) $refs.port.value = '587';
            if ($refs.encryption) $refs.encryption.value = 'tls';
        }
    }
}">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h1 class="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Email &amp; OTP Delivery</h1>
            <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Configure sender email and gateway to dispatch reader OTPs &amp; verification codes for <?php echo e($tenant->name); ?></p>
        </div>
    </div>

    <!-- 4 KPI Metrics Summary Cards (MediaOS UI Pattern) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <!-- 1. Active Sender Email -->
        <div class="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-4 sm:p-5 shadow-xs transition hover:border-zinc-300 dark:hover:border-zinc-700">
            <div class="flex items-center justify-between">
                <p class="text-xs font-medium text-zinc-500 dark:text-zinc-400">Active Sender</p>
                <i class="ri-mail-send-line text-lg text-zinc-400"></i>
            </div>
            <p class="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-2 truncate" title="<?php echo e($stats['sender']); ?>">
                <?php echo e($stats['sender']); ?>

            </p>
            <p class="text-[11px] text-zinc-400 mt-1 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Active OTP identity</span>
            </p>
        </div>

        <!-- 2. Delivery Gateway -->
        <div class="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-4 sm:p-5 shadow-xs transition hover:border-zinc-300 dark:hover:border-zinc-700">
            <div class="flex items-center justify-between">
                <p class="text-xs font-medium text-zinc-500 dark:text-zinc-400">Delivery Gateway</p>
                <i class="ri-server-line text-lg text-zinc-400"></i>
            </div>
            <p class="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-2">
                <?php echo e($stats['driver']); ?>

            </p>
            <p class="text-[11px] text-zinc-400 mt-1">
                Port <?php echo e($stats['port']); ?> (<?php echo e(strtoupper($defaults['encryption'])); ?>)
            </p>
        </div>

        <!-- 3. Verified Readers -->
        <div class="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-4 sm:p-5 shadow-xs transition hover:border-zinc-300 dark:hover:border-zinc-700">
            <div class="flex items-center justify-between">
                <p class="text-xs font-medium text-zinc-500 dark:text-zinc-400">Verified Readers</p>
                <i class="ri-checkbox-circle-line text-lg text-zinc-400"></i>
            </div>
            <p class="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-2">
                <?php echo e($stats['verified_readers']); ?>

            </p>
            <p class="text-[11px] text-zinc-400 mt-1">Confirmed via OTP</p>
        </div>

        <!-- 4. Pending Activation -->
        <div class="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-4 sm:p-5 shadow-xs transition hover:border-zinc-300 dark:hover:border-zinc-700">
            <div class="flex items-center justify-between">
                <p class="text-xs font-medium text-zinc-500 dark:text-zinc-400">Pending Activation</p>
                <i class="ri-time-line text-lg text-zinc-400"></i>
            </div>
            <p class="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-2">
                <?php echo e($stats['pending_verifications']); ?>

            </p>
            <p class="text-[11px] text-zinc-400 mt-1">Awaiting 6-digit confirmation</p>
        </div>
    </div>

    <!-- Provider Selection (Gmail vs Custom Email) -->
    <div class="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-4 sm:p-5 shadow-xs">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div>
                <p class="text-xs font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                    <i class="ri-mail-check-line text-zinc-400 text-sm"></i>
                    <span>Select Email Method</span>
                </p>
                <p class="text-[11px] text-zinc-400 mt-0.5">Choose Gmail or your custom domain email to send registration OTPs</p>
            </div>
        </div>
        <div class="flex flex-wrap items-center gap-2.5">
            <!-- Gmail Option -->
            <button type="button" @click="selectProvider('gmail')" 
                    :class="mailType === 'gmail' 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 ring-1 ring-blue-500 font-semibold' 
                        : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/80'"
                    class="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs transition cursor-pointer select-none">
                <svg class="w-4 h-4 shrink-0" viewBox="0 49.4 512 399.42" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fill-rule="evenodd">
                    <path fill="#4285f4" d="M34.91 448.818h81.454V251L0 163.727V413.91c0 19.287 15.622 34.91 34.91 34.91z"/>
                    <path fill="#34a853" d="M395.636 448.818h81.455c19.287 0 34.909-15.622 34.909-34.909V163.727L395.636 251z"/>
                    <path fill="#fbbc04" d="M395.636 99.727V251L512 163.727v-46.545c0-43.142-49.25-67.782-83.782-41.891z"/>
                    <path fill="#ea4335" d="M116.364 251V99.727L256 204.455 395.636 99.727V251L256 355.727z"/>
                    <path fill="#c5221f" d="M0 117.182v46.545L116.364 251V99.727L83.782 75.291C49.25 49.4 0 74.04 0 117.18z"/>
                  </g>
                </svg>
                <span>Gmail / Google Workspace</span>
            </button>

            <!-- Custom Email Option -->
            <button type="button" @click="selectProvider('custom')" 
                    :class="mailType === 'custom' 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 ring-1 ring-blue-500 font-semibold' 
                        : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/80'"
                    class="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs transition cursor-pointer select-none">
                <i class="ri-mail-settings-line text-base text-blue-500"></i>
                <span>Custom Email (Domain SMTP)</span>
            </button>
        </div>
    </div>

    <!-- Main Configuration Card (MediaOS Pattern) -->
    <form method="POST" action="<?php echo e(route('admin.settings.mail.update')); ?>"
          class="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-5 sm:p-6 space-y-6 shadow-xs">
        <?php echo csrf_field(); ?> <?php echo method_field('PUT'); ?>
        <input type="hidden" name="mail_type" :value="mailType">

        <!-- Group 1: Sender Identity -->
        <div class="space-y-4">
            <div class="flex items-center gap-2 pb-2.5 border-b border-zinc-100 dark:border-zinc-800/80">
                <i class="ri-user-shared-line text-zinc-400 text-base"></i>
                <div>
                    <h3 class="text-xs font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Sender Identity (From Email)</h3>
                    <p class="text-[11px] text-zinc-400">The specific email address shown to readers when they receive registration OTPs</p>
                </div>
            </div>

            <!-- GMAIL FORM LAYOUT -->
            <div x-show="mailType === 'gmail'" class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                            Gmail Address *
                        </label>
                        <input type="email" name="from_address" 
                               value="<?php echo e(old('from_address', $defaults['from_address'])); ?>" 
                               :disabled="mailType !== 'gmail'"
                               required
                               placeholder="yourname@gmail.com"
                               class="w-full h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 px-3.5 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-xs">
                        <p class="text-[11px] text-zinc-400 mt-1">E.g. <span class="font-mono text-zinc-500">mediaos.news@gmail.com</span></p>
                    </div>

                    <div>
                        <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                            Sender Display Name *
                        </label>
                        <input type="text" name="from_name" 
                               value="<?php echo e(old('from_name', $defaults['from_name'])); ?>" 
                               :disabled="mailType !== 'gmail'"
                               required
                               placeholder="<?php echo e($tenant->name); ?> OTP Desk"
                               class="w-full h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 px-3.5 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-xs">
                        <p class="text-[11px] text-zinc-400 mt-1">E.g. <span class="font-medium text-zinc-500"><?php echo e($tenant->name); ?> Security</span></p>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                        <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                            Google App Password (16-digit) *
                        </label>
                        <div class="relative">
                            <input :type="showPassword ? 'text' : 'password'" name="password" 
                                   :disabled="mailType !== 'gmail'"
                                   value="<?php echo e(old('password', $defaults['password'])); ?>"
                                   placeholder="abcd efgh ijkl mnop"
                                   class="w-full h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 pl-3.5 pr-10 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-xs">
                            <button type="button" @click="showPassword = !showPassword" 
                                    class="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 p-1 cursor-pointer">
                                <i :class="showPassword ? 'ri-eye-off-line' : 'ri-eye-line'" class="text-sm"></i>
                            </button>
                        </div>
                        <p class="text-[11px] text-zinc-400 mt-1">Generated from Google Account &rarr; Security &rarr; App passwords</p>
                    </div>
                </div>
            </div>

            <!-- CUSTOM SMTP FORM LAYOUT -->
            <div x-show="mailType === 'custom'" class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                            Sender Email Address (From Email) *
                        </label>
                        <input type="email" name="from_address" 
                               value="<?php echo e(old('from_address', $defaults['from_address'])); ?>" 
                               :disabled="mailType !== 'custom'"
                               placeholder="otp{{ $tenant->domain }}"
                               class="w-full h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 px-3.5 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-xs">
                        <p class="text-[11px] text-zinc-400 mt-1">E.g. <span class="font-mono text-zinc-500">otp{{ $tenant->domain }}</span></p>
                    </div>

                    <div>
                        <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                            Sender Display Name (From Name) *
                        </label>
                        <input type="text" name="from_name" 
                               value="<?php echo e(old('from_name', $defaults['from_name'])); ?>" 
                               :disabled="mailType !== 'custom'"
                               placeholder="<?php echo e($tenant->name); ?>"
                               class="w-full h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 px-3.5 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-xs">
                        <p class="text-[11px] text-zinc-400 mt-1">E.g. <span class="font-medium text-zinc-500"><?php echo e($tenant->name); ?> OTP</span></p>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                            Reply-To Email Address (Optional)
                        </label>
                        <input type="email" name="reply_to" value="<?php echo e(old('reply_to', $defaults['reply_to'])); ?>"
                               :disabled="mailType !== 'custom'"
                               placeholder="support{{ $tenant->domain }}"
                               class="w-full h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 px-3.5 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-xs">
                    </div>
                </div>

                <!-- Custom SMTP Server Settings -->
                <div class="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 space-y-4">
                    <div class="flex items-center gap-2 pb-2 border-b border-zinc-100 dark:border-zinc-800/80">
                        <i class="ri-server-line text-zinc-400 text-sm"></i>
                        <h4 class="text-xs font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">SMTP Server Credentials</h4>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">SMTP Host *</label>
                            <input type="text" name="host" x-ref="host"
                                   :disabled="mailType !== 'custom'"
                                   value="<?php echo e(old('host', $defaults['host'] === 'smtp.gmail.com' ? 'mail.' . $tenant->domain : $defaults['host'])); ?>"
                                   placeholder="mail.<?php echo e($tenant->domain); ?>"
                                   class="w-full h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 px-3.5 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-xs">
                        </div>

                        <div>
                            <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">SMTP Port *</label>
                            <input type="number" name="port" x-ref="port"
                                   :disabled="mailType !== 'custom'"
                                   value="<?php echo e(old('port', $defaults['port'])); ?>"
                                   placeholder="587"
                                   class="w-full h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 px-3.5 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-xs">
                        </div>

                        <div>
                            <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Encryption *</label>
                            <select name="encryption" x-ref="encryption"
                                    :disabled="mailType !== 'custom'"
                                    class="w-full h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 px-3.5 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-xs cursor-pointer">
                                <option value="tls" <?php echo e($defaults['encryption'] === 'tls' ? 'selected' : ''); ?>>TLS (Port 587)</option>
                                <option value="ssl" <?php echo e($defaults['encryption'] === 'ssl' ? 'selected' : ''); ?>>SSL (Port 465)</option>
                                <option value="none" <?php echo e($defaults['encryption'] === 'none' ? 'selected' : ''); ?>>None</option>
                            </select>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">SMTP Username *</label>
                            <input type="text" name="username" 
                                   :disabled="mailType !== 'custom'"
                                   value="<?php echo e(old('username', $defaults['username'])); ?>"
                                   placeholder="user{{ $tenant->domain }}"
                                   class="w-full h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 px-3.5 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-xs">
                        </div>

                        <div>
                            <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">SMTP Password *</label>
                            <div class="relative">
                                <input :type="showPassword ? 'text' : 'password'" name="password" 
                                       :disabled="mailType !== 'custom'"
                                       value="<?php echo e(old('password', $defaults['password'])); ?>"
                                       placeholder="••••••••••••••••"
                                       class="w-full h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 pl-3.5 pr-10 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-xs">
                                <button type="button" @click="showPassword = !showPassword" 
                                        class="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 p-1 cursor-pointer">
                                    <i :class="showPassword ? 'ri-eye-off-line' : 'ri-eye-line'" class="text-sm"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer Actions -->
        <div class="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p class="text-xs text-zinc-400">All reader verification OTPs and reset tokens will instantly dispatch from this sender</p>
            <button type="submit" 
                    class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-black text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 text-xs font-semibold shadow-xs transition active:scale-[0.98] cursor-pointer">
                <i class="ri-check-line text-sm"></i>
                <span>Save Configuration</span>
            </button>
        </div>
    </form>

    <!-- Live Test OTP Tool (Anchor: #test-section) -->
    <div id="test-section" class="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-5 sm:p-6 shadow-xs space-y-4">
        <div class="flex items-center gap-2 pb-2.5 border-b border-zinc-100 dark:border-zinc-800/80">
            <i class="ri-mail-check-line text-zinc-400 text-base"></i>
            <div>
                <h3 class="text-xs font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Send Live Test OTP Email</h3>
                <p class="text-[11px] text-zinc-400">Verify that your sender address (<span class="font-mono text-zinc-500"><?php echo e($defaults['from_address']); ?></span>) and gateway relay are working</p>
            </div>
        </div>

        <form method="POST" action="<?php echo e(route('admin.settings.mail.test')); ?>" class="flex flex-col sm:flex-row items-center gap-3">
            <?php echo csrf_field(); ?>
            <div class="w-full sm:flex-1">
                <input type="email" name="test_email" required 
                       value="<?php echo e(old('test_email', auth()->user()->email)); ?>"
                       placeholder="Enter your email to receive a live test OTP..."
                       class="w-full h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 px-3.5 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-xs">
            </div>
            <button type="submit" 
                    class="w-full sm:w-auto h-10 inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-zinc-900 hover:bg-black text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 text-xs font-medium shadow-xs transition active:scale-[0.98] cursor-pointer shrink-0">
                <i class="ri-send-plane-fill text-xs"></i>
                <span>Dispatch Test OTP</span>
            </button>
        </form>
    </div>
</div>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('layouts.admin', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
