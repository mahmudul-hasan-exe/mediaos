<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\TenantResolver;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class UserController extends Controller
{
    public function index(Request $request, TenantResolver $resolver): View
    {
        $tenant = $resolver->resolveFromRequest($request);

        // Display all public website readers across portals
        $query = User::where('role', 'reader')->with('tenant');

        // Search filter
        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Status filter
        if ($status = $request->input('status')) {
            if ($status !== 'all') {
                $query->where('status', $status);
            }
        }

        $users = $query->orderByDesc('created_at')->paginate(12)->withQueryString();

        $allReaders = User::where('role', 'reader')->get();

        $stats = [
            'total' => $allReaders->count(),
            'active' => $allReaders->where('status', 'active')->count(),
            'suspended' => $allReaders->where('status', 'suspended')->count(),
            'verified' => $allReaders->whereNotNull('email_verified_at')->count(),
        ];

        return view('admin.users.index', compact('tenant', 'users', 'stats'));
    }

    public function toggleStatus(User $user): RedirectResponse
    {
        $user->status = ($user->status === 'active') ? 'suspended' : 'active';
        $user->save();

        $statusLabel = ucfirst($user->status);
        return back()->with('success', "Website user {$user->name} is now {$statusLabel}.");
    }

    public function destroy(User $user): RedirectResponse
    {
        $name = $user->name;
        $user->delete();

        return back()->with('success', "Website user '{$name}' has been deleted.");
    }
}
