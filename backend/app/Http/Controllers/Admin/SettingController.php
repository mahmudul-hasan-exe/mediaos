<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\VerifyReaderEmail;
use App\Models\User;
use App\Services\MailConfigurator;
use App\Services\TenantResolver;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\View\View;

class SettingController extends Controller
{
    public function index(Request $request, TenantResolver $resolver): View
    {
        $tenant = $resolver->resolveFromRequest($request);

        return view('admin.settings.index', compact('tenant'));
    }

    public function update(Request $request, TenantResolver $resolver): RedirectResponse
    {
        $tenant = $resolver->resolveFromRequest($request);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'domain' => ['required', 'string', 'max:255'],
            'primary_color' => ['required', 'string', 'max:20'],
            'default_language' => ['required', 'in:en,bn,ar'],
            'site_title' => ['required', 'string', 'max:255'],
            'tagline' => ['nullable', 'string', 'max:500'],
            'contact_email' => ['nullable', 'email'],
        ]);

        $tenant->update([
            'name' => $validated['name'],
            'domain' => $validated['domain'],
            'primary_color' => $validated['primary_color'],
            'default_language' => $validated['default_language'],
            'contact_email' => $validated['contact_email'] ?? $tenant->contact_email,
            'website_config' => array_merge($tenant->website_config ?? [], [
                'siteTitle' => $validated['site_title'],
                'tagline' => $validated['tagline'] ?? '',
                'breakingNewsEnabled' => $request->boolean('breaking_news_enabled'),
                'ePaperEnabled' => $request->boolean('epaper_enabled'),
                'commentsModeration' => $request->boolean('comments_moderation'),
                'advertisementsEnabled' => $request->boolean('advertisements_enabled'),
            ]),
        ]);

        return back()->with('success', 'Publication settings saved.');
    }

    public function mailSettings(Request $request, TenantResolver $resolver): View
    {
        $tenant = $resolver->resolveFromRequest($request);
        $mailConfig = $tenant->website_config['mail'] ?? [];

        $defaults = [
            'mail_type' => $mailConfig['mail_type'] ?? (str_contains($mailConfig['host'] ?? '', 'gmail') ? 'gmail' : 'custom'),
            'from_address' => $mailConfig['from_address'] ?? config('mail.from.address', 'noreply@mediaos.io'),
            'from_name' => $mailConfig['from_name'] ?? ($tenant->name . ' Security Desk'),
            'reply_to' => $mailConfig['reply_to'] ?? $tenant->contact_email,
            'driver' => $mailConfig['driver'] ?? config('mail.default', 'smtp'),
            'host' => $mailConfig['host'] ?? 'smtp.gmail.com',
            'port' => $mailConfig['port'] ?? 587,
            'encryption' => $mailConfig['encryption'] ?? 'tls',
            'username' => $mailConfig['username'] ?? '',
            'password' => $mailConfig['password'] ?? '',
        ];

        $stats = [
            'sender' => $defaults['from_address'],
            'driver' => strtoupper($defaults['driver']),
            'port' => $defaults['port'],
            'verified_readers' => User::where('role', 'reader')->whereNotNull('email_verified_at')->count(),
            'pending_verifications' => User::where('role', 'reader')->whereNull('email_verified_at')->count(),
        ];

        return view('admin.settings.mail', compact('tenant', 'mailConfig', 'defaults', 'stats'));
    }

    public function updateMailSettings(Request $request, TenantResolver $resolver): RedirectResponse
    {
        $tenant = $resolver->resolveFromRequest($request);
        $mailType = $request->input('mail_type');
        if (!$mailType) {
            $mailType = ($request->has('host') && str_contains($request->input('host'), 'gmail')) ? 'gmail' : 'custom';
        }

        $validated = $request->validate([
            'mail_type' => ['nullable', 'in:gmail,custom'],
            'from_address' => ['required', 'email'],
            'from_name' => ['required', 'string', 'max:255'],
            'reply_to' => ['nullable', 'email'],
            'driver' => ['nullable', 'in:smtp,log,sendmail'],
            'host' => ['nullable', 'string', 'max:255'],
            'port' => ['nullable', 'numeric'],
            'encryption' => ['nullable', 'in:tls,ssl,none'],
            'username' => ['nullable', 'string', 'max:255'],
            'password' => ['nullable', 'string', 'max:255'],
        ]);

        $currentConfig = $tenant->website_config ?? [];
        $existingPassword = $currentConfig['mail']['password'] ?? null;
        $password = !empty($validated['password']) ? $validated['password'] : $existingPassword;

        if ($mailType === 'gmail') {
            $mailData = [
                'mail_type' => 'gmail',
                'from_address' => $validated['from_address'],
                'from_name' => $validated['from_name'],
                'reply_to' => $validated['reply_to'] ?? $validated['from_address'],
                'driver' => 'smtp',
                'host' => 'smtp.gmail.com',
                'port' => 587,
                'encryption' => 'tls',
                'username' => $validated['from_address'],
                'password' => $password,
                'updated_at' => now()->toIso8601String(),
            ];
        } else {
            $mailData = [
                'mail_type' => 'custom',
                'from_address' => $validated['from_address'],
                'from_name' => $validated['from_name'],
                'reply_to' => $validated['reply_to'] ?? null,
                'driver' => $validated['driver'] ?? 'smtp',
                'host' => $validated['host'] ?? '127.0.0.1',
                'port' => (int) ($validated['port'] ?? 587),
                'encryption' => $validated['encryption'] ?? 'tls',
                'username' => $validated['username'] ?? $validated['from_address'],
                'password' => $password,
                'updated_at' => now()->toIso8601String(),
            ];
        }

        $currentConfig['mail'] = $mailData;
        $tenant->website_config = $currentConfig;
        $tenant->save();

        return back()->with('success', "OTP Sender Email '{$validated['from_address']}' saved successfully.");
    }

    public function sendTestMail(Request $request, TenantResolver $resolver): RedirectResponse
    {
        $tenant = $resolver->resolveFromRequest($request);

        $validated = $request->validate([
            'test_email' => ['required', 'email'],
        ]);

        $mailConfig = $tenant->website_config['mail'] ?? [];
        MailConfigurator::apply($mailConfig);

        $fromAddress = $mailConfig['from_address'] ?? config('mail.from.address', 'noreply@mediaos.io');
        $fromName = $mailConfig['from_name'] ?? ($tenant->name . ' Security Desk');

        $dummyUser = new User([
            'name' => 'MediaOS Test Recipient',
            'email' => $validated['test_email'],
        ]);
        $dummyUser->setRelation('tenant', $tenant);

        $testCode = (string) random_int(100000, 999999);
        $testUrl = url('/verify-email?token=test-verification-token');

        try {
            Mail::to($validated['test_email'])->send(
                new VerifyReaderEmail($dummyUser, $testCode, $testUrl, $fromAddress, $fromName)
            );

            return back()->with('success', "Live Test OTP ({$testCode}) successfully sent to {$validated['test_email']} from '{$fromAddress}'.");
        } catch (\Throwable $e) {
            Log::error('Test mail failed: ' . $e->getMessage());
            return back()->withErrors(['test_email' => 'Failed to send test email: ' . $e->getMessage()]);
        }
    }
}

