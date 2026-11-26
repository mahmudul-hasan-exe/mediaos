<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\TenantResolver;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\View\View;

class StaffController extends Controller
{
    public function index(Request $request, TenantResolver $resolver): View
    {
        $tenant = $resolver->resolveFromRequest($request);

        $query = User::where('role', '!=', 'reader')
            ->withCount('articles')
            ->where(function ($q) use ($tenant) {
                $q->where('tenant_id', $tenant->id)->orWhere('role', 'super-admin');
            });

        // Search filter
        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('designation', 'like', "%{$search}%");
            });
        }

        // Role filter
        if ($role = $request->input('role')) {
            if ($role !== 'all') {
                $query->where('role', $role);
            }
        }

        // Status filter
        if ($status = $request->input('status')) {
            if ($status !== 'all') {
                $query->where('status', $status);
            }
        }

        $users = $query->orderByDesc('created_at')->paginate(12)->withQueryString();

        // Overall statistics
        $allStaff = User::where('role', '!=', 'reader')->where(function ($q) use ($tenant) {
            $q->where('tenant_id', $tenant->id)->orWhere('role', 'super-admin');
        })->get();

        $stats = [
            'total' => $allStaff->count(),
            'admins' => $allStaff->whereIn('role', ['admin', 'super-admin'])->count(),
            'editors' => $allStaff->whereIn('role', ['editor', 'editor-in-chief'])->count(),
            'reporters' => $allStaff->whereIn('role', ['reporter', 'author'])->count(),
            'active' => $allStaff->where('status', 'active')->count(),
        ];

        return view('admin.staff.index', compact('tenant', 'users', 'stats'));
    }

    public function store(Request $request, TenantResolver $resolver): RedirectResponse
    {
        $tenant = $resolver->resolveFromRequest($request);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6'],
            'role' => ['required', 'in:super-admin,admin,editor-in-chief,editor,reporter,author,moderator'],
            'designation' => ['nullable', 'string', 'max:255'],
            'bio' => ['nullable', 'string', 'max:500'],
        ]);

        User::create([
            'tenant_id' => $tenant->id,
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'designation' => $validated['designation'] ?: ucfirst($validated['role']),
            'bio' => $validated['bio'] ?? null,
            'status' => 'active',
        ]);

        return back()->with('success', "Staff member '{$validated['name']}' added to {$tenant->name}.");
    }

    public function toggleStatus(User $user): RedirectResponse
    {
        $user->status = ($user->status === 'active') ? 'suspended' : 'active';
        $user->save();

        $statusLabel = ucfirst($user->status);
        return back()->with('success', "Member {$user->name} is now {$statusLabel}.");
    }
}
