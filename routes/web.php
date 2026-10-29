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
    Route::prefix('/{current_team}')->middleware(['auth', 'verified', EnsureTeamMembership::class])->group(function () {
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

        Route::prefix("/teams")->middleware('verified')->group(function () {
            Route::get('/', [TeamController::class, 'index'])->name('dashboard.settings.teams.index');
            Route::post('/', [TeamController::class, 'store'])->name('dashboard.settings.teams.store');

            Route::prefix("/{team}")->middleware(EnsureTeamMembership::class)->group(function () {
                Route::get('/', [TeamController::class, 'edit'])->name('dashboard.settings.teams.edit');
                Route::patch('/', [TeamController::class, 'update'])->name('dashboard.settings.teams.update');
                Route::delete('/', [TeamController::class, 'destroy'])->name('dashboard.settings.teams.destroy');
                Route::post('/switch', [TeamController::class, 'switch'])->name('dashboard.settings.teams.switch');
                Route::delete('/leave', [TeamController::class, 'leave'])->name('dashboard.settings.teams.leave');

                Route::patch('/members/{user}', [TeamMemberController::class, 'update'])->name('dashboard.settings.teams.members.update');
                Route::delete('/members/{user}', [TeamMemberController::class, 'destroy'])->name('dashboard.settings.teams.members.destroy');

                Route::post('/invitations', [TeamInvitationController::class, 'store'])->name('dashboard.settings.teams.invitations.store');
                Route::delete('/invitations/{invitation}', [TeamInvitationController::class, 'destroy'])->name('dashboard.settings.teams.invitations.destroy');
            });
        });

        Route::prefix("/invitations")->group(function () {
            Route::post('/{invitation}/accept', [TeamInvitationController::class, 'accept'])->name('invitations.accept');
            Route::delete('/{invitation}', [TeamInvitationController::class, 'decline'])->name('invitations.decline');
        });

        Route::prefix('/appearance')->group(function () {
            Route::get('/', [AppearanceController::class, 'edit'])->name('dashboard.settings.appearance.edit');
        });

    });

});
