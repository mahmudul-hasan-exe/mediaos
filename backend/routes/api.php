<?php

use App\Http\Controllers\Api\V1\AdvertisementController;
use App\Http\Controllers\Api\V1\AiController;
use App\Http\Controllers\Api\V1\AnalyticsController;
use App\Http\Controllers\Api\V1\ArticleController;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\CategoryController;
use App\Http\Controllers\Api\V1\CommentController;
use App\Http\Controllers\Api\V1\EpaperController;
use App\Http\Controllers\Api\V1\MediaController;
use App\Http\Controllers\Api\V1\NavigationController;
use App\Http\Controllers\Api\V1\TenantController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    // Public Health & Tenant Info
    Route::get('/health', fn () => response()->json(['success' => true, 'service' => 'MediaOS Laravel API v1']));
    Route::get('/tenant/current', [TenantController::class, 'current']);
    Route::get('/tenants', [TenantController::class, 'index']);

    // Auth
    Route::post('/auth/login', [AuthController::class, 'login']);
    Route::post('/auth/google', [AuthController::class, 'googleLogin']);
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/verify-email', [AuthController::class, 'verifyEmail']);
    Route::post('/auth/resend-verification', [AuthController::class, 'resendVerification']);

    // Public Content Endpoints (Multi-tenant resolved via X-Tenant-ID / X-Tenant-Domain)
    Route::get('/articles', [ArticleController::class, 'index']);
    Route::get('/articles/{slugOrId}', [ArticleController::class, 'show']);
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/navigation', [NavigationController::class, 'index']);
    Route::get('/comments', [CommentController::class, 'index']);
    Route::post('/comments', [CommentController::class, 'store']);
    Route::get('/advertisements', [AdvertisementController::class, 'index']);
    Route::get('/epapers', [EpaperController::class, 'index']);
    Route::get('/analytics/overview', [AnalyticsController::class, 'overview']);
    Route::get('/ai/providers', [AiController::class, 'providers']);

    // Authenticated Staff & CMS Endpoints
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/auth/me', [AuthController::class, 'me']);
        Route::post('/auth/logout', [AuthController::class, 'logout']);

        Route::middleware('staff')->group(function () {
            // Articles CRUD & Editorial Status
            Route::post('/articles', [ArticleController::class, 'store']);
            Route::patch('/articles/{article}', [ArticleController::class, 'update']);
            Route::patch('/articles/{article}/status', [ArticleController::class, 'updateStatus']);
            Route::delete('/articles/{article}', [ArticleController::class, 'destroy']);

            // Categories
            Route::post('/categories', [CategoryController::class, 'store']);
            Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);

            // Media Library
            Route::get('/media', [MediaController::class, 'index']);
            Route::post('/media', [MediaController::class, 'store']);
            Route::delete('/media/{media}', [MediaController::class, 'destroy']);

            // Comments Moderation
            Route::patch('/comments/{comment}/status', [CommentController::class, 'updateStatus']);

            // AI Editorial Assistant Proxy
            Route::post('/ai/generate', [AiController::class, 'generate']);

            // Super Admin Tenant Provisioning
            Route::post('/tenants', [TenantController::class, 'store']);
            Route::patch('/tenants/{tenant}/toggle-status', [TenantController::class, 'toggleStatus']);
        });
    });
});
