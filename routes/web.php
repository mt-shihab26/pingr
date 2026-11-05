<?php

use App\Http\Controllers\Dashboard\OverviewController;
use App\Http\Controllers\Dashboard\Pages\PageController;
use App\Http\Controllers\Dashboard\Pages\Show as PageShow;
use App\Http\Controllers\Dashboard\Settings\ProfileController;
use App\Http\Controllers\Dashboard\Settings\SecurityController;
use App\Http\Controllers\Dashboard\Targets\Show;
use App\Http\Controllers\Dashboard\Targets\TargetController;
use App\Http\Controllers\Dashboard\Teams\TeamController;
use App\Http\Controllers\Dashboard\Teams\TeamInvitationController;
use App\Http\Controllers\Dashboard\Teams\TeamMemberController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\StatusPageController;
use App\Http\Controllers\WellKnownController;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Auth\Middleware\RequirePassword;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, "index"])->name('home');

Route::get('.well-known/passkey-endpoints', [WellKnownController::class, "passkeys"])->name('well-known.passkeys');

Route::get('/status/{slug}', [StatusPageController::class, "show"])->name('status.show');

Route::prefix("/dashboard")->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [OverviewController::class, "redirect"])->withoutMiddleware("verified")->name('dashboard.index');

    Route::prefix('/{team:slug}')->middleware(EnsureTeamMembership::class)->group(function () {
        Route::get('/overview', [OverviewController::class, "index"])->name('dashboard.overview.index');

        Route::prefix("/targets")->group(function () {
            Route::get('/', [TargetController::class, "index"])->name('dashboard.targets.index');
            Route::get('/create', [TargetController::class, "create"])->name('dashboard.targets.create');
            Route::post('/', [TargetController::class, "store"])->name('dashboard.targets.store');

            Route::prefix('/{target}')->group(function () {
                Route::get('/', [TargetController::class, 'show'])->name('dashboard.targets.show.redirect');

                Route::get('/overview', [Show\OverviewController::class, 'show'])->name('dashboard.targets.show.overview');
                Route::patch('/overview/toggle', [Show\OverviewController::class, 'toggle'])->name('dashboard.targets.show.toggle');

                Route::get('/uptime', [Show\UptimeController::class, 'show'])->name('dashboard.targets.show.uptime');
                Route::get('/certificate-health', [Show\CertificateHealthController::class, 'show'])->name('dashboard.targets.show.certificate-health');
                Route::get('/broken-links', [Show\BrokenLinksController::class, 'show'])->name('dashboard.targets.show.broken-links');
                Route::get('/mixed-content', [Show\MixedContentController::class, 'show'])->name('dashboard.targets.show.mixed-content');
                Route::get('/lighthouse', [Show\LighthouseController::class, 'show'])->name('dashboard.targets.show.lighthouse');
                Route::get('/scheduled-tasks', [Show\ScheduledTasksController::class, 'show'])->name('dashboard.targets.show.scheduled-tasks');
                Route::get('/application-health', [Show\ApplicationHealthController::class, 'show'])->name('dashboard.targets.show.application-health');
                Route::get('/sitemap', [Show\SitemapController::class, 'show'])->name('dashboard.targets.show.sitemap');
                Route::get('/dns', [Show\DnsController::class, 'show'])->name('dashboard.targets.show.dns');
                Route::get('/domain', [Show\DomainController::class, 'show'])->name('dashboard.targets.show.domain');
                Route::get('/dns-blocklist', [Show\DnsBlocklistController::class, 'show'])->name('dashboard.targets.show.dns-blocklist');
                Route::get('/open-ports', [Show\OpenPortsController::class, 'show'])->name('dashboard.targets.show.open-ports');
                Route::get('/monthly-reports', [Show\MonthlyReportsController::class, 'show'])->name('dashboard.targets.show.monthly-reports');
                Route::get('/run-history', [Show\RunHistoryController::class, 'show'])->name('dashboard.targets.show.run-history');
                Route::get('/snooze-history', [Show\SnoozeHistoryController::class, 'show'])->name('dashboard.targets.show.snooze-history');
                Route::get('/notifications', [Show\NotificationsController::class, 'show'])->name('dashboard.targets.show.notifications');
                Route::get('/maintenance-periods', [Show\MaintenancePeriodsController::class, 'show'])->name('dashboard.targets.show.maintenance-periods');
                Route::get('/badges', [Show\BadgesController::class, 'show'])->name('dashboard.targets.show.badges');
                Route::get('/settings', [Show\SettingsController::class, 'show'])->name('dashboard.targets.show.settings');
            });

            Route::get('/{target}/edit', [TargetController::class, 'edit'])->name('dashboard.targets.edit');
            Route::patch('/{target}', [TargetController::class, 'update'])->name('dashboard.targets.update');
            Route::delete('/{target}', [TargetController::class, 'destroy'])->name('dashboard.targets.destroy');
        });

        Route::prefix('/pages')->group(function () {
            Route::get('/', [PageController::class, 'index'])->name('dashboard.pages.index');

            Route::prefix('/{statusPage}')->group(function () {
                Route::get('/', [PageController::class, 'show'])->name('dashboard.pages.show.redirect');

                Route::get('/overview', [PageShow\OverviewController::class, 'show'])->name('dashboard.pages.show.overview');
                Route::get('/updates', [PageShow\UpdatesController::class, 'show'])->name('dashboard.pages.show.updates');
                Route::get('/monitors', [PageShow\MonitorsController::class, 'show'])->name('dashboard.pages.show.monitors');
                Route::get('/display', [PageShow\DisplayController::class, 'show'])->name('dashboard.pages.show.display');
                Route::get('/content', [PageShow\ContentController::class, 'show'])->name('dashboard.pages.show.content');
                Route::get('/notifications', [PageShow\NotificationsController::class, 'show'])->name('dashboard.pages.show.notifications');
                Route::get('/settings', [PageShow\SettingsController::class, 'show'])->name('dashboard.pages.show.settings');
            });
        });
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

    });

});
