<?php

use App\Http\Controllers\Dashboard\OverviewController;
use App\Http\Controllers\Dashboard\Settings\AppearanceController;
use App\Http\Controllers\Dashboard\Settings\ProfileController;
use App\Http\Controllers\Dashboard\Settings\SecurityController;
use App\Http\Controllers\Dashboard\TargetController;
use App\Http\Controllers\Dashboard\Teams\TeamController;
use App\Http\Controllers\Dashboard\Teams\TeamInvitationController;
use App\Http\Controllers\Dashboard\Teams\TeamMemberController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\WellKnownController;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Auth\Middleware\RequirePassword;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, "index"])->name('home');

Route::get('.well-known/passkey-endpoints', [WellKnownController::class, "passkeys"])->name('well-known.passkeys');

Route::prefix("/dashboard")->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [OverviewController::class, "redirect"])->withoutMiddleware("verified")->name('dashboard.index');

    Route::prefix('/{team:slug}')->middleware(EnsureTeamMembership::class)->group(function () {
        Route::get('/overview', [OverviewController::class, "index"])->name('dashboard.overview.index');

        Route::prefix("/targets")->group(function () {
            Route::get('/', [TargetController::class, "index"])->name('dashboard.targets.index');
            Route::get('/create', [TargetController::class, "create"])->name('dashboard.targets.create');
            Route::post('/', [TargetController::class, "store"])->name('dashboard.targets.store');
        });

        Route::get('/pages', [OverviewController::class, "index"])->name('dashboard.pages.index');
    });

    Route::prefix('/teams')->group(function () {
        Route::get('/', [TeamController::class, 'index'])->name('dashboard.teams.index');
        Route::post('/', [TeamController::class, 'store'])->name('dashboard.teams.store');

        Route::prefix('/invitations')->withoutMiddleware('verified')->group(function () {
            Route::post('/{invitation}/accept', [TeamInvitationController::class, 'accept'])->name('dashboard.teams.invitations.accept');
            Route::delete('/{invitation}', [TeamInvitationController::class, 'decline'])->name('dashboard.teams.invitations.decline');
        });

        Route::prefix('/{team:slug}')->middleware(EnsureTeamMembership::class)->group(function () {
            Route::get('/', [TeamController::class, 'edit'])->name('dashboard.teams.edit');
            Route::patch('/', [TeamController::class, 'update'])->name('dashboard.teams.update');
            Route::delete('/', [TeamController::class, 'destroy'])->name('dashboard.teams.destroy');
            Route::post('/switch', [TeamController::class, 'switch'])->name('dashboard.teams.switch');
            Route::delete('/leave', [TeamController::class, 'leave'])->name('dashboard.teams.leave');

            Route::patch('/members/{user}', [TeamMemberController::class, 'update'])->name('dashboard.teams.members.update');
            Route::delete('/members/{user}', [TeamMemberController::class, 'destroy'])->name('dashboard.teams.members.destroy');

            Route::post('/invitations', [TeamInvitationController::class, 'store'])->name('dashboard.teams.invitations.store');
            Route::delete('/invitations/{invitation}', [TeamInvitationController::class, 'destroy'])->name('dashboard.teams.invitations.destroy');
        });
    });

    Route::prefix("/settings")->group(function () {
        Route::get('/', [ProfileController::class, "redirect"])->withoutMiddleware('verified')->name("dashboard.settings.index");

        Route::prefix("/profile")->group(function () {
            Route::get('/', [ProfileController::class, 'edit'])->withoutMiddleware('verified')->name('dashboard.settings.profile.edit');
            Route::patch('/', [ProfileController::class, 'update'])->withoutMiddleware('verified')->name('dashboard.settings.profile.update');
            Route::delete('/', [ProfileController::class, 'destroy'])->name('dashboard.settings.profile.destroy');
        });

        Route::prefix("/security")->group(function () {
            Route::get('/', [SecurityController::class, 'edit'])->middleware(RequirePassword::class)->name('dashboard.settings.security.edit');
            Route::put('/password', [SecurityController::class, 'update'])->middleware('throttle:6,1')->name('dashboard.settings.security.password.update');
        });

        Route::prefix('/appearance')->group(function () {
            Route::get('/', [AppearanceController::class, 'edit'])->withoutMiddleware('verified')->name('dashboard.settings.appearance.edit');
        });

    });

});
