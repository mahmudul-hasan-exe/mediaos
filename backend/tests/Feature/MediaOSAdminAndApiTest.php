<?php

namespace Tests\Feature;

use App\Models\Article;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MediaOSAdminAndApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_admin_pages_require_authentication_and_render_for_staff(): void
    {
        $this->get('/admin')->assertRedirect('/login');

        $admin = User::where('email', 'admin@mediaos.io')->firstOrFail();

        $this->actingAs($admin)
            ->get('/admin')
            ->assertOk()
            ->assertSee('Newsroom Overview');

        $routes = [
            '/admin/articles',
            '/admin/articles/create',
            '/admin/review-queue',
            '/admin/categories',
            '/admin/media',
            '/admin/comments',
            '/admin/advertisements',
            '/admin/epapers',
            '/admin/ai',
            '/admin/staff',
            '/admin/users',
            '/admin/tenants',
            '/admin/settings',
            '/admin/settings/mail',
        ];

        foreach ($routes as $route) {
            $this->actingAs($admin)->get($route)->assertOk();
        }
    }

    public function test_reader_cannot_access_admin_panel(): void
    {
        $reader = User::where('email', 'reader@mediaos.io')->firstOrFail();

        $this->actingAs($reader)
            ->get('/admin')
            ->assertForbidden();
    }

    public function test_admin_can_create_and_approve_article(): void
    {
        $admin = User::where('email', 'admin@mediaos.io')->firstOrFail();

        $this->actingAs($admin)
            ->post('/admin/articles', [
                'title' => 'Minimalist Laravel Admin Verification Story',
                'content' => '<p>Full verification story content.</p>',
                'status' => 'pending',
                'language' => 'en',
            ])
            ->assertRedirect('/admin/articles');

        $article = Article::where('title', 'Minimalist Laravel Admin Verification Story')->firstOrFail();
        $this->assertEquals('pending', $article->status);

        $this->actingAs($admin)
            ->patch("/admin/articles/{$article->id}/status", [
                'status' => 'published',
            ])
            ->assertRedirect();

        $this->assertEquals('published', $article->fresh()->status);
    }

    public function test_api_v1_endpoints_and_multi_tenant_resolution_work(): void
    {
        $this->getJson('/api/v1/health')->assertOk()->assertJsonPath('success', true);

        // Default tenant (ten-01 MediaOS)
        $this->getJson('/api/v1/articles')
            ->assertOk()
            ->assertJsonPath('success', true);

        // Switch tenant via X-Tenant-ID header (ten-02 The Dhaka Standard)
        $this->withHeader('X-Tenant-ID', 'ten-02')
            ->getJson('/api/v1/tenant/current')
            ->assertOk()
            ->assertJsonPath('data.slug', 'dhaka-standard');

        // Login via Sanctum API and create article
        $login = $this->postJson('/api/v1/auth/login', [
            'email' => 'admin@mediaos.io',
            'password' => 'password',
        ])->assertOk();

        $token = $login->json('data.token');

        $this->withToken($token)
            ->postJson('/api/v1/articles', [
                'title' => 'API Created Dispatch',
                'content' => '<p>Created via Sanctum API.</p>',
                'status' => 'draft',
            ])
            ->assertCreated()
            ->assertJsonPath('data.status', 'draft');
    }

    public function test_real_staff_creation_and_role_permissions(): void
    {
        $admin = User::where('email', 'admin@mediaos.io')->firstOrFail();
        $uniqueEmail = 'journalist_' . uniqid() . '@mediaos.io';

        // 1. Create real staff member via Admin Staff Route
        $response = $this->actingAs($admin)->post('/admin/staff', [
            'name' => 'Farhana Rahman',
            'email' => $uniqueEmail,
            'password' => 'journalistPass123!',
            'role' => 'editor',
            'designation' => 'National Desk Editor',
            'bio' => 'Senior editor covering national policy and elections.',
        ]);

        $response->assertSessionHas('success');

        // 2. Verify User exists in real Database
        $createdUser = User::where('email', $uniqueEmail)->first();
        $this->assertNotNull($createdUser);
        $this->assertEquals('Farhana Rahman', $createdUser->name);
        $this->assertEquals('editor', $createdUser->role);
        $this->assertEquals('active', $createdUser->status);

        // 3. Verify Role methods and permissions work
        $this->assertTrue($createdUser->isStaff());
        $this->assertTrue($createdUser->canReviewArticles());
        $this->assertFalse($createdUser->isSuperAdmin());

        // 4. Verify password was securely hashed and can authenticate
        $this->assertTrue(\Illuminate\Support\Facades\Hash::check('journalistPass123!', $createdUser->password));
        $this->actingAs($createdUser)->get('/admin')->assertOk();

        // 5. Test Status Toggle (active -> suspended)
        $this->actingAs($admin)->patch("/admin/staff/{$createdUser->id}/toggle");
        $createdUser->refresh();
        $this->assertEquals('suspended', $createdUser->status);

        // Cleanup
        $createdUser->delete();
    }

    public function test_login_with_remember_me_functionality(): void
    {
        $admin = User::where('email', 'admin@mediaos.io')->firstOrFail();
        $admin->remember_token = null;
        $admin->save();

        $response = $this->post('/login', [
            'email' => 'admin@mediaos.io',
            'password' => 'password',
            'remember' => '1',
        ]);

        $response->assertRedirect('/admin');
        $this->assertAuthenticatedAs($admin);

        // Verify remember_token was generated and saved to MySQL
        $admin->refresh();
        $this->assertNotNull($admin->remember_token);
        $this->assertNotEmpty($admin->remember_token);

        // Verify remember cookie is dispatched
        $response->assertCookie(\Illuminate\Support\Facades\Auth::getRecallerName());
    }

    public function test_website_registered_users_management(): void
    {
        $admin = User::where('email', 'admin@mediaos.io')->firstOrFail();

        // 1. Check /admin/users page displays registered readers
        $response = $this->actingAs($admin)->get('/admin/users');
        $response->assertOk();
        $response->assertSee('Website Users');
        $response->assertSee('Directory of registered public readers');

        // 2. Create a temporary reader
        $reader = User::create([
            'tenant_id' => $admin->tenant_id,
            'name' => 'Test Reader User',
            'email' => 'reader_' . uniqid() . '@example.com',
            'password' => bcrypt('password123'),
            'role' => 'reader',
            'status' => 'active',
            'email_verified_at' => now(),
        ]);

        // 3. Toggle status
        $this->actingAs($admin)->patch("/admin/users/{$reader->id}/toggle");
        $reader->refresh();
        $this->assertEquals('suspended', $reader->status);

        // 4. Delete reader
        $this->actingAs($admin)->delete("/admin/users/{$reader->id}");
        $this->assertNull(User::find($reader->id));
    }

    public function test_public_reader_api_registration_and_login(): void
    {
        $uniqueEmail = 'website_reader_' . uniqid() . '@example.com';

        // 1. Register new public reader via API
        $registerResponse = $this->postJson('/api/v1/auth/register', [
            'name' => 'Tariq Al-Mansoor',
            'email' => $uniqueEmail,
            'password' => 'readerSecret123!',
        ]);

        $registerResponse->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.user.name', 'Tariq Al-Mansoor')
            ->assertJsonPath('data.user.email', $uniqueEmail)
            ->assertJsonPath('data.user.role', 'reader')
            ->assertJsonPath('data.user.isEmailVerified', false);

        $verificationCode = $registerResponse->json('data.verificationCode');
        $this->assertNotEmpty($verificationCode);

        // 2. Real Login via API (User is still unverified)
        $loginResponse = $this->postJson('/api/v1/auth/login', [
            'email' => $uniqueEmail,
            'password' => 'readerSecret123!',
        ]);

        $loginResponse->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.user.role', 'reader')
            ->assertJsonPath('data.user.isEmailVerified', false);

        $loginToken = $loginResponse->json('data.token');

        // 3. Test Invalid Email Verification Code
        $this->postJson('/api/v1/auth/verify-email', [
            'email' => $uniqueEmail,
            'code' => '000000',
        ])->assertStatus(422);

        // 4. Test Valid Email Verification Code
        $verifyResponse = $this->postJson('/api/v1/auth/verify-email', [
            'email' => $uniqueEmail,
            'code' => $verificationCode,
        ]);

        $verifyResponse->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.user.isEmailVerified', true)
            ->assertJsonPath('data.user.designation', 'Verified Reader');

        // 5. Authenticated /auth/me now reflects verified status
        $meResponse = $this->withHeader('Authorization', 'Bearer ' . $loginToken)
            ->getJson('/api/v1/auth/me');

        $meResponse->assertOk()
            ->assertJsonPath('data.name', 'Tariq Al-Mansoor')
            ->assertJsonPath('data.isEmailVerified', true);

        // 6. Confirm this registered reader shows up in Admin Users list with Email provider
        $admin = User::where('email', 'admin@mediaos.io')->firstOrFail();
        $adminUsersResponse = $this->actingAs($admin)->get('/admin/users');
        $adminUsersResponse->assertOk();
        $adminUsersResponse->assertSee('Tariq Al-Mansoor');
        $adminUsersResponse->assertSee($uniqueEmail);
        $adminUsersResponse->assertSee('Email');

        // 7. Test Google SSO authentication
        $googleEmail = 'google_user_' . uniqid() . '@gmail.com';
        $googleResponse = $this->postJson('/api/v1/auth/google', [
            'name' => 'Maya Angelou',
            'email' => $googleEmail,
        ]);

        $googleResponse->assertOk()
            ->assertJsonPath('data.user.authProvider', 'google')
            ->assertJsonPath('data.user.isEmailVerified', true);

        // Verify Google reader renders with 'Google' account type in admin
        $adminUsersGoogle = $this->actingAs($admin)->get('/admin/users');
        $adminUsersGoogle->assertOk();
        $adminUsersGoogle->assertSee('Maya Angelou');
        $adminUsersGoogle->assertSee('Google');

        // Cleanup
        User::whereIn('email', [$uniqueEmail, $googleEmail])->delete();
    }

    public function test_admin_can_configure_otp_sender_email_and_test_dispatch(): void
    {
        $admin = User::where('email', 'admin@mediaos.io')->firstOrFail();

        // 1. Visit Email & OTP Settings screen
        $response = $this->actingAs($admin)->get('/admin/settings/mail');
        $response->assertOk();
        $response->assertSee('Email &amp; OTP Delivery', false);
        $response->assertSee('Sender Identity');

        // 2. Configure Custom OTP Sender Email and Name
        $updateResponse = $this->actingAs($admin)->put('/admin/settings/mail', [
            'from_address' => 'otp-desk@mediaos.io',
            'from_name' => 'MediaOS Security Desk',
            'reply_to' => 'support@mediaos.io',
            'driver' => 'log',
            'host' => '127.0.0.1',
            'port' => 587,
            'encryption' => 'tls',
        ]);

        $updateResponse->assertSessionHas('success');

        // 3. Verify changes persisted in Tenant website_config
        $admin->refresh();
        $tenant = $admin->tenant;
        $this->assertEquals('otp-desk@mediaos.io', $tenant->website_config['mail']['from_address']);
        $this->assertEquals('MediaOS Security Desk', $tenant->website_config['mail']['from_name']);

        // 4. Test live OTP dispatch test tool
        $testDispatchResponse = $this->actingAs($admin)->post('/admin/settings/mail/test', [
            'test_email' => 'admin@mediaos.io',
        ]);

        $testDispatchResponse->assertSessionHas('success');
    }
}

