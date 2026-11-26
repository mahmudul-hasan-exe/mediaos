<?php

use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\AdvertisementController;
use App\Http\Controllers\Admin\AiController;
use App\Http\Controllers\Admin\ArticleController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CommentController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EpaperController;
use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Admin\NavigationController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\StaffController;
use App\Http\Controllers\Admin\TenantController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', fn () => redirect()->route('admin.dashboard'));

// Authentication
Route::get('/login', [AdminAuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AdminAuthController::class, 'login'])->name('login.submit');
Route::post('/login/demo', [AdminAuthController::class, 'demoLogin'])->name('login.demo');
Route::post('/logout', [AdminAuthController::class, 'logout'])->name('logout');
Route::get('/suspended', [AdminAuthController::class, 'showSuspended'])->name('suspended');

// Laravel Admin Console
Route::prefix('admin')->name('admin.')->middleware(['auth', 'staff', 'tenant'])->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    // Articles & Editorial Review Queue
    Route::get('/articles', [ArticleController::class, 'index'])->name('articles.index');
    Route::get('/articles/create', [ArticleController::class, 'create'])->name('articles.create');
    Route::post('/articles', [ArticleController::class, 'store'])->name('articles.store');
    Route::get('/articles/{article}/edit', [ArticleController::class, 'edit'])->name('articles.edit');
    Route::put('/articles/{article}', [ArticleController::class, 'update'])->name('articles.update');
    Route::patch('/articles/{article}/status', [ArticleController::class, 'updateStatus'])->name('articles.status');
    Route::delete('/articles/{article}', [ArticleController::class, 'destroy'])->name('articles.destroy');
    Route::get('/review-queue', [ArticleController::class, 'reviewQueue'])->name('articles.review');

    // Categories
    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');

    // Media Library
    Route::get('/media', [MediaController::class, 'index'])->name('media.index');
    Route::post('/media', [MediaController::class, 'store'])->name('media.store');
    Route::delete('/media/{media}', [MediaController::class, 'destroy'])->name('media.destroy');

    // Reader Comments Moderation
    Route::get('/comments', [CommentController::class, 'index'])->name('comments.index');
    Route::patch('/comments/{comment}/status', [CommentController::class, 'updateStatus'])->name('comments.status');
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');

    // Advertisements
    Route::get('/advertisements', [AdvertisementController::class, 'index'])->name('advertisements.index');
    Route::post('/advertisements', [AdvertisementController::class, 'store'])->name('advertisements.store');
    Route::patch('/advertisements/{advertisement}/toggle', [AdvertisementController::class, 'toggle'])->name('advertisements.toggle');
    Route::delete('/advertisements/{advertisement}', [AdvertisementController::class, 'destroy'])->name('advertisements.destroy');

    // Digital E-Paper Editions
    Route::get('/epapers', [EpaperController::class, 'index'])->name('epapers.index');
    Route::post('/epapers', [EpaperController::class, 'store'])->name('epapers.store');
    Route::patch('/epapers/{epaper}/toggle', [EpaperController::class, 'toggle'])->name('epapers.toggle');
    Route::delete('/epapers/{epaper}', [EpaperController::class, 'destroy'])->name('epapers.destroy');

    // AI Writing Suite & Provider Logs
    Route::get('/ai', [AiController::class, 'index'])->name('ai.index');
    Route::post('/ai/generate', [AiController::class, 'generate'])->name('ai.generate');

    // Staff & Editorial Team Directory
    Route::get('/staff', [StaffController::class, 'index'])->name('staff.index');
    Route::post('/staff', [StaffController::class, 'store'])->name('staff.store');
    Route::patch('/staff/{user}/toggle', [StaffController::class, 'toggleStatus'])->name('staff.toggle');

    // Website Registered Users (Public Readers)
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::patch('/users/{user}/toggle', [UserController::class, 'toggleStatus'])->name('users.toggle');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');

    // Multi-Tenant Publications
    Route::get('/tenants', [TenantController::class, 'index'])->name('tenants.index');
    Route::post('/tenants', [TenantController::class, 'store'])->name('tenants.store');
    Route::post('/tenants/{tenant}/switch', [TenantController::class, 'switchTenant'])->name('tenants.switch');
    Route::patch('/tenants/{tenant}/toggle', [TenantController::class, 'toggleStatus'])->name('tenants.toggle');

    // Navigation & Frontend Menus
    Route::get('/navigation', [NavigationController::class, 'index'])->name('navigation.index');
    Route::post('/navigation', [NavigationController::class, 'store'])->name('navigation.store');
    Route::post('/navigation/add-categories', [NavigationController::class, 'addCategories'])->name('navigation.add-categories');
    Route::put('/navigation/{menuItem}', [NavigationController::class, 'update'])->name('navigation.update');
    Route::patch('/navigation/{menuItem}/toggle', [NavigationController::class, 'toggle'])->name('navigation.toggle');
    Route::delete('/navigation/{menuItem}', [NavigationController::class, 'destroy'])->name('navigation.destroy');

    // Settings & OTP Email Delivery
    Route::get('/settings', [SettingController::class, 'index'])->name('settings.index');
    Route::put('/settings', [SettingController::class, 'update'])->name('settings.update');
    Route::get('/settings/mail', [SettingController::class, 'mailSettings'])->name('settings.mail');
    Route::put('/settings/mail', [SettingController::class, 'updateMailSettings'])->name('settings.mail.update');
    Route::post('/settings/mail/test', [SettingController::class, 'sendTestMail'])->name('settings.mail.test');
});
