<?php

namespace App\Services;

use App\Models\Tenant;
use Illuminate\Support\Facades\Mail;

class MailConfigurator
{
    public static function apply(?array $mailConfig): void
    {
        if (empty($mailConfig) || empty($mailConfig['driver'])) {
            // Fallback to primary tenant mail settings if available
            $primaryTenant = Tenant::where('status', 'active')->first() ?? Tenant::find(1);
            if ($primaryTenant && ! empty($primaryTenant->website_config['mail'])) {
                $mailConfig = $primaryTenant->website_config['mail'];
            }
        }

        if (empty($mailConfig)) {
            return;
        }

        $driver = $mailConfig['driver'] ?? config('mail.default', 'smtp');

        if ($driver === 'smtp') {
            config([
                'mail.default' => 'smtp',
                'mail.mailers.smtp.host' => $mailConfig['host'] ?? 'smtp.gmail.com',
                'mail.mailers.smtp.port' => (int) ($mailConfig['port'] ?? 587),
                'mail.mailers.smtp.encryption' => ($mailConfig['encryption'] ?? 'tls') === 'none' ? null : ($mailConfig['encryption'] ?? 'tls'),
                'mail.mailers.smtp.username' => $mailConfig['username'] ?? null,
                'mail.mailers.smtp.password' => $mailConfig['password'] ?? null,
            ]);
        } elseif ($driver === 'log') {
            config(['mail.default' => 'log']);
        } elseif ($driver === 'sendmail') {
            config(['mail.default' => 'sendmail']);
        }

        if (! empty($mailConfig['from_address'])) {
            config(['mail.from.address' => $mailConfig['from_address']]);
        }

        if (! empty($mailConfig['from_name'])) {
            config(['mail.from.name' => $mailConfig['from_name']]);
        }

        // Purge mailer instance so dynamically applied credentials immediately take effect
        try {
            Mail::purge();
        } catch (\Throwable) {}
    }
}
