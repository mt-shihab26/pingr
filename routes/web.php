<?php

use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Dashboard\Settings\AppearanceController;
use App\Http\Controllers\Dashboard\Settings\ProfileController;
use App\Http\Controllers\Dashboard\Settings\SecurityController;
use App\Http\Controllers\Dashboard\Settings\Teams\TeamController;
use App\Http\Controllers\Dashboard\Settings\Teams\TeamInvitationController;
use App\Http\Controllers\Dashboard\Settings\Teams\TeamMemberController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\WellKnownController;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Auth\Middleware\RequirePassword;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, "index"])->name('home');

Route::get('.well-known/passkey-endpoints', [WellKnownController::class, "passkeys"])->name('well-known.passkeys');

Route::prefix("/dashboard")->group(function () {
    Route::prefix('{current_team}')->middleware(['auth', 'verified', EnsureTeamMembership::class])->group(function () {
        Route::get('dashboard', DashboardController::class)->name('dashboard');
    });

    Route::prefix("/settings")->middleware("auth")->group(function () {
        Route::get('/', [ProfileController::class, "redirect"])->name("dashboard.settings.index");

        Route::prefix("/profile")->group(function () {
            Route::get('/', [ProfileController::class, 'edit'])->name('dashboard.settings.profile.edit');
            Route::patch('/', [ProfileController::class, 'update'])->name('dashboard.settings.profile.update');
            Route::delete('/', [ProfileController::class, 'destroy'])->middleware("verified")->name('dashboard.settings.profile.destroy');
        });

        Route::prefix("/security")->middleware('verified')->group(function () {
            Route::get('/', [SecurityController::class, 'edit'])->middleware(RequirePassword::class)->name('dashboard.settings.security.edit');
            Route::put('/password', [SecurityController::class, 'update'])->middleware('throttle:6,1')->name('dashboard.settings.security.password.update');
        });

        Route::middleware(['auth', 'verified'])->group(function () {
            Route::get('settings/teams', [TeamController::class, 'index'])->name('teams.index');
            Route::post('settings/teams', [TeamController::class, 'store'])->name('teams.store');

            Route::middleware(EnsureTeamMembership::class)->group(function () {
                Route::get('settings/teams/{team}', [TeamController::class, 'edit'])->name('teams.edit');
                Route::patch('settings/teams/{team}', [TeamController::class, 'update'])->name('teams.update');
                Route::delete('settings/teams/{team}', [TeamController::class, 'destroy'])->name('teams.destroy');
                Route::post('settings/teams/{team}/switch', [TeamController::class, 'switch'])->name('teams.switch');
                Route::delete('settings/teams/{team}/leave', [TeamController::class, 'leave'])->name('teams.leave');

                Route::patch('settings/teams/{team}/members/{user}', [TeamMemberController::class, 'update'])->name('teams.members.update');
                Route::delete('settings/teams/{team}/members/{user}', [TeamMemberController::class, 'destroy'])->name('teams.members.destroy');

                Route::post('settings/teams/{team}/invitations', [TeamInvitationController::class, 'store'])->name('teams.invitations.store');
                Route::delete('settings/teams/{team}/invitations/{invitation}', [TeamInvitationController::class, 'destroy'])->name('teams.invitations.destroy');
            });
        });

        Route::prefix('/appearance')->group(function () {
            Route::get('/', [AppearanceController::class, 'edit'])->name('dashboard.settings.appearance.edit');
        });

    });

    Route::middleware(['auth'])->group(function () {
        Route::post('invitations/{invitation}/accept', [TeamInvitationController::class, 'accept'])->name('invitations.accept');
        Route::delete('invitations/{invitation}', [TeamInvitationController::class, 'decline'])->name('invitations.decline');
    });

});
