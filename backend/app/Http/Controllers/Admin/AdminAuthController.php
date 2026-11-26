<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;

class AdminAuthController extends Controller
{
    public function showLogin(): View|RedirectResponse
    {
        if (Auth::check() && Auth::user()->isStaff()) {
            return redirect()->route('admin.dashboard');
        }

        return view('auth.login');
    }

    public function login(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (Auth::attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();

            $user = Auth::user();

            if ($user->status !== 'active') {
                $email = $user->email;
                Auth::logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();
                return redirect()->route('suspended', ['email' => $email]);
            }

            if (! $user->isStaff()) {
                Auth::logout();
                return back()->withErrors(['email' => 'This account does not have staff access to the Admin Console.']);
            }

            if ($user->tenant_id) {
                $request->session()->put('active_tenant_id', $user->tenant_id);
            }

            return redirect()->intended(route('admin.dashboard'));
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }

    public function demoLogin(Request $request): RedirectResponse
    {
        $email = $request->input('email', 'superadmin@mediaos.io');
        $user = User::where('email', $email)->first();

        if (! $user || ! $user->isStaff()) {
            return back()->withErrors(['email' => 'Demo staff account not found.']);
        }

        if ($user->status !== 'active') {
            return redirect()->route('suspended', ['email' => $user->email]);
        }

        Auth::login($user);
        $request->session()->regenerate();

        if ($user->tenant_id) {
            $request->session()->put('active_tenant_id', $user->tenant_id);
        }

        return redirect()->route('admin.dashboard');
    }

    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }

    public function showSuspended(Request $request): View
    {
        $email = $request->query('email', 'your account');
        return view('auth.suspended', compact('email'));
    }
}

