<?php

namespace Tests\Feature;

use App\Models\Tenant;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminRoutesRenderTest extends TestCase
{
    use RefreshDatabase;

    public function test_all_admin_views_render_successfully(): void
    {
        $this->seed();
        $tenant = Tenant::first();
        $user = User::where('email', 'superadmin@mediaos.io')->first();

        $routes = [
            '/admin',
            '/admin/staff',
            '/admin/users',
            '/admin/articles',
            '/admin/categories',
            '/admin/media',
            '/admin/comments',
            '/admin/epapers',
            '/admin/advertisements',
            '/admin/ai',
            '/admin/settings',
            '/admin/settings/mail',
            '/admin/navigation',
            '/admin/tenants',
        ];

        foreach ($routes as $route) {
            $response = $this->actingAs($user)->get($route);
            $this->assertEquals(200, $response->getStatusCode(), "Failed asserting that $route returns 200 OK.");
        }
    }

    public function test_navigation_builder_and_public_api_work(): void
    {
        $this->seed();
        $user = User::where('email', 'superadmin@mediaos.io')->first();

        // Add menu item to BOTH Sections (mega) and More dropdown in one click
        $this->actingAs($user)->post('/admin/navigation', [
            'locations' => ['mega', 'more'],
            'label' => 'Fact Check Desk',
        ])->assertRedirect('/admin/navigation?location=mega');

        // Add menu item by ONLY providing location and label (URL, target & order auto-resolved)
        $this->actingAs($user)->post('/admin/navigation', [
            'location' => 'header',
            'label' => 'Election Special',
        ])->assertRedirect('/admin/navigation?location=header');

        // Verify public API exposes the new menu items in header, Sections (mega), and More
        $apiResponse = $this->getJson('/api/v1/navigation');
        $apiResponse->assertOk()
            ->assertJsonPath('success', true);

        $headerLabels = collect($apiResponse->json('data.menus.header'))->pluck('label')->all();
        $megaLabels = collect($apiResponse->json('data.menus.mega'))->pluck('label')->all();
        $moreLabels = collect($apiResponse->json('data.menus.more'))->pluck('label')->all();

        $this->assertContains('Election Special', $headerLabels);
        $this->assertContains('Fact Check Desk', $megaLabels);
        $this->assertContains('Fact Check Desk', $moreLabels);

        // Add nested sub-menu inside Side Menu (drawer) under World Affairs
        $worldDrawer = \App\Models\MenuItem::where('location', 'drawer')
            ->whereNull('parent_id')
            ->where('label', 'World Affairs')
            ->firstOrFail();

        $this->actingAs($user)->post('/admin/navigation', [
            'location' => 'drawer',
            'parent_id' => $worldDrawer->id,
            'label' => 'Middle East Summit',
        ])->assertRedirect('/admin/navigation?location=drawer');

        $drawerApi = $this->getJson('/api/v1/navigation');
        $worldNode = collect($drawerApi->json('data.menus.drawer'))->firstWhere('label', 'World Affairs');
        $childLabels = collect($worldNode['children'] ?? [])->pluck('label')->all();
        $this->assertContains('Middle East Summit', $childLabels);
    }
}
