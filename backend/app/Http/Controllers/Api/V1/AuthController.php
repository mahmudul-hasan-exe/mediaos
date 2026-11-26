<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Mail\VerifyReaderEmail;
use App\Models\User;
use App\Services\MailConfigurator;
use App\Services\TenantResolver;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login(Request $request, TenantResolver $resolver): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (! $user || ! Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid email or password.',
            ], 401);
        }

        if ($user->status !== 'active') {
            return response()->json([
                'success' => false,
                'status' => 'suspended',
                'message' => 'Your account is currently ' . $user->status . '.',
            ], 403);
        }

        $token = $user->createToken('mediaos-api')->plainTextToken;
        $tenant = $user->tenant ?? $resolver->resolveFromRequest($request);

        return response()->json([
            'success' => true,
            'message' => 'Authenticated successfully.',
            'data' => [
                'token' => $token,
                'user' => $this->formatUser($user, $tenant?->name),
            ],
        ]);
    }

    public function register(Request $request, TenantResolver $resolver): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6'],
            'auth_provider' => ['nullable', 'string', 'in:email,google'],
        ]);

        $tenant = $resolver->resolveFromRequest($request);
        $authProvider = $validated['auth_provider'] ?? 'email';

        $code = (string) random_int(100000, 999999);
        $verifyToken = Str::random(40);

        $user = User::create([
            'tenant_id' => $tenant->id,
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'reader',
            'auth_provider' => $authProvider,
            'designation' => $authProvider === 'google' ? 'Verified Reader' : 'Reader',
            'status' => 'active',
            'email_verified_at' => $authProvider === 'google' ? now() : null,
            'verification_code' => $code,
            'verification_token' => $verifyToken,
            'verification_expires_at' => now()->addSeconds(120),
        ]);

        $frontendUrl = env('FRONTEND_URL', 'http://localhost:3000');
        $verifyUrl = "{$frontendUrl}/verify-email?token={$verifyToken}&email=" . urlencode($user->email);

        MailConfigurator::apply($tenant->website_config['mail'] ?? null);

        if ($authProvider === 'email') {
            try {
                Mail::to($user->email)->send(new VerifyReaderEmail($user, $code, $verifyUrl));
            } catch (\Throwable $e) {
                Log::warning('Email verification dispatch log: ' . $e->getMessage());
            }
        }

        $token = $user->createToken('mediaos-api')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => $authProvider === 'google' ? 'Signed in with Google successfully.' : 'Registration completed. A verification code has been dispatched to your email.',
            'data' => [
                'token' => $token,
                'user' => $this->formatUser($user, $tenant->name),
                'requiresVerification' => $authProvider === 'email',
                'verificationCode' => $authProvider === 'email' ? $code : null,
                'verifyUrl' => $authProvider === 'email' ? $verifyUrl : null,
            ],
        ], 201);
    }

    public function googleLogin(Request $request, TenantResolver $resolver): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
            'name' => ['nullable', 'string', 'max:255'],
            'avatar' => ['nullable', 'string', 'max:1000'],
        ]);

        $tenant = $resolver->resolveFromRequest($request);

        $user = User::where('email', $validated['email'])->first();

        if ($user && $user->status !== 'active') {
            return response()->json([
                'success' => false,
                'status' => 'suspended',
                'message' => 'Your account is currently ' . $user->status . '.',
            ], 403);
        }

        if (! $user) {
            $user = User::create([
                'tenant_id' => $tenant->id,
                'name' => $validated['name'] ?? explode('@', $validated['email'])[0],
                'email' => $validated['email'],
                'password' => Hash::make(Str::random(32)),
                'role' => 'reader',
                'auth_provider' => 'google',
                'avatar' => $validated['avatar'] ?? null,
                'designation' => 'Verified Reader',
                'status' => 'active',
                'email_verified_at' => now(),
            ]);
        } else {
            $user->auth_provider = 'google';
            $user->email_verified_at = $user->email_verified_at ?? now();
            if (! empty($validated['avatar'])) {
                $user->avatar = $validated['avatar'];
            }
            if (! empty($validated['name']) && ($user->name === explode('@', $user->email)[0] || empty($user->name))) {
                $user->name = $validated['name'];
            }
            $user->save();
        }

        $token = $user->createToken('mediaos-api')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Authenticated successfully with Google.',
            'data' => [
                'token' => $token,
                'user' => $this->formatUser($user, $tenant->name),
            ],
        ]);
    }

    public function verifyEmail(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['nullable', 'email'],
            'code' => ['nullable', 'string', 'max:10'],
            'token' => ['nullable', 'string'],
        ]);

        $user = null;

        if (! empty($validated['token'])) {
            $user = User::where('verification_token', $validated['token'])->first();
        }

        if (! $user && ! empty($validated['email']) && ! empty($validated['code'])) {
            $user = User::where('email', $validated['email'])
                ->where('verification_code', $validated['code'])
                ->first();
        }

        if (! $user) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid or expired verification code / token.',
            ], 422);
        }

        if ($user->verification_expires_at && now()->isAfter($user->verification_expires_at)) {
            return response()->json([
                'success' => false,
                'message' => 'Verification code has expired (120-second limit). Please request a new code.',
            ], 422);
        }

        $user->email_verified_at = now();
        $user->verification_code = null;
        $user->verification_token = null;
        $user->verification_expires_at = null;
        $user->designation = 'Verified Reader';
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Email verified successfully! You are now an official Verified Reader.',
            'data' => [
                'user' => $this->formatUser($user, $user->tenant?->name),
            ],
        ]);
    }

    public function resendVerification(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
        ]);

        $user = User::where('email', $validated['email'])->first();

        if ($user && $user->status !== 'active') {
            return response()->json([
                'success' => false,
                'status' => 'suspended',
                'message' => 'Your account is currently ' . $user->status . '.',
            ], 403);
        }

        if (! $user) {
            return response()->json([
                'success' => false,
                'message' => 'No account found with this email address.',
            ], 404);
        }

        if ($user->email_verified_at) {
            return response()->json([
                'success' => false,
                'message' => 'Your email address is already verified.',
            ], 400);
        }

        if ($user->verification_expires_at && $user->verification_expires_at->isFuture()) {
            $secondsLeft = max(1, (int) now()->diffInSeconds($user->verification_expires_at, false));
            return response()->json([
                'success' => false,
                'message' => "Please wait {$secondsLeft}s before requesting a new code.",
            ], 429);
        }

        $code = (string) random_int(100000, 999999);
        $verifyToken = Str::random(40);

        $user->verification_code = $code;
        $user->verification_token = $verifyToken;
        $user->verification_expires_at = now()->addSeconds(120);
        $user->save();

        $frontendUrl = env('FRONTEND_URL', 'http://localhost:3000');
        $verifyUrl = "{$frontendUrl}/verify-email?token={$verifyToken}&email=" . urlencode($user->email);

        $tenant = $user->tenant;
        MailConfigurator::apply($tenant?->website_config['mail'] ?? null);

        try {
            Mail::to($user->email)->send(new VerifyReaderEmail($user, $code, $verifyUrl));
        } catch (\Throwable $e) {
            Log::warning('Resend email verification dispatch log: ' . $e->getMessage());
        }

        return response()->json([
            'success' => true,
            'message' => 'A fresh verification code has been dispatched to your email address (Valid for 120 seconds).',
            'expires_in' => 120,
            'data' => [
                'verificationCode' => $code,
                'verifyUrl' => $verifyUrl,
            ],
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        $user = $request->user();

        return response()->json([
            'success' => true,
            'data' => $this->formatUser($user, $user->tenant?->name),
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()?->currentAccessToken()?->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully.',
        ]);
    }

    protected function formatUser(User $user, ?string $tenantName = null): array
    {
        return [
            'id' => (string) $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'avatar' => $user->avatar,
            'role' => $user->role,
            'authProvider' => $user->auth_provider ?? 'email',
            'tenantId' => $user->tenant?->code ?? (string) $user->tenant_id,
            'tenantName' => $tenantName ?? $user->tenant?->name,
            'designation' => $user->email_verified_at ? 'Verified Reader' : ($user->designation ?? 'Reader'),
            'bio' => $user->bio,
            'phone' => $user->phone,
            'status' => $user->status,
            'emailVerifiedAt' => $user->email_verified_at?->toIso8601String(),
            'isEmailVerified' => ! is_null($user->email_verified_at),
            'articlesCount' => $user->articles()->count(),
            'createdAt' => $user->created_at?->toIso8601String(),
        ];
    }
}

