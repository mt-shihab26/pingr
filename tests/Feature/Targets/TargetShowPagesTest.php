<?php

use App\Models\Team;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

dataset('target show pages', [
    'overview',
    'uptime',
    'certificate-health',
    'broken-links',
    'mixed-content',
    'lighthouse',
    'scheduled-tasks',
    'application-health',
    'sitemap',
    'dns',
    'domain',
    'dns-blocklist',
    'open-ports',
    'monthly-reports',
    'run-history',
    'snooze-history',
    'notifications',
    'maintenance-periods',
    'badges',
    'settings',
]);

test('target show pages can be rendered', function (string $page) {
    $user = User::factory()->create();
    $team = $user->personalTeam();
    $target = $team->targets()->create(['type' => 'server', 'endpoint' => 'example.com']);

    $this->actingAs($user)
        ->get(route("dashboard.targets.show.{$page}", ['team' => $team, 'target' => $target]))
        ->assertOk()
        ->assertInertia(fn (Assert $inertia) => $inertia
            ->component("dashboard/targets/show/{$page}")
            ->where('target.id', $target->id)
        );
})->with('target show pages');

test('target show pages are not available for targets of another team', function (string $page) {
    $user = User::factory()->create();
    $team = $user->personalTeam();
    $target = Team::factory()->create()->targets()->create(['type' => 'server', 'endpoint' => 'example.com']);

    $this->actingAs($user)
        ->get(route("dashboard.targets.show.{$page}", ['team' => $team, 'target' => $target]))
        ->assertNotFound();
})->with('target show pages');

test('the target show route redirects to the overview page', function () {
    $user = User::factory()->create();
    $team = $user->personalTeam();
    $target = $team->targets()->create(['type' => 'server', 'endpoint' => 'example.com']);

    $this->actingAs($user)
        ->get(route('dashboard.targets.show.redirect', ['team' => $team, 'target' => $target]))
        ->assertRedirect(route('dashboard.targets.show.overview', ['team' => $team, 'target' => $target]));
});

test('target checks can be toggled from the overview page', function () {
    $user = User::factory()->create();
    $team = $user->personalTeam();
    $target = $team->targets()->create(['type' => 'website', 'endpoint' => 'https://example.com']);
    $params = ['team' => $team, 'target' => $target];

    $this->actingAs($user)
        ->from(route('dashboard.targets.show.overview', [...$params, 'tab' => 'disabled']))
        ->patch(route('dashboard.targets.show.toggle', $params), ['check' => 'check_sitemap'])
        ->assertRedirect(route('dashboard.targets.show.overview', [...$params, 'tab' => 'disabled']))
        ->assertSessionHas('success', 'Check enabled.');

    expect($target->fresh()->check_sitemap)->toBeTrue();

    $this->patch(route('dashboard.targets.show.toggle', $params), ['check' => 'check_sitemap'])
        ->assertSessionHas('success', 'Check disabled.');

    expect($target->fresh()->check_sitemap)->toBeFalse();
});

test('unsupported or invalid checks cannot be toggled', function (string $check) {
    $user = User::factory()->create();
    $team = $user->personalTeam();
    $target = $team->targets()->create(['type' => 'tcpport', 'endpoint' => 'example.com:443']);

    $this->actingAs($user)
        ->patch(route('dashboard.targets.show.toggle', ['team' => $team, 'target' => $target]), ['check' => $check])
        ->assertSessionHasErrors('check');

    expect($target->fresh()->check_broken_links)->toBeFalse();
})->with(['check_broken_links', 'type', 'unknown']);

test('checks of another team target cannot be toggled', function () {
    $user = User::factory()->create();
    $target = Team::factory()->create()->targets()->create(['type' => 'website', 'endpoint' => 'https://example.com']);

    $this->actingAs($user)
        ->patch(route('dashboard.targets.show.toggle', ['team' => $user->personalTeam(), 'target' => $target]), ['check' => 'check_sitemap'])
        ->assertNotFound();

    expect($target->fresh()->check_sitemap)->toBeFalse();
});

test('the uptime page is filtered by tab', function (?string $tab, string $expected) {
    $user = User::factory()->create();
    $team = $user->personalTeam();
    $target = $team->targets()->create(['type' => 'website', 'endpoint' => 'https://example.com']);

    $this->actingAs($user)
        ->get(route('dashboard.targets.show.uptime', array_filter(['team' => $team, 'target' => $target, 'tab' => $tab])))
        ->assertOk()
        ->assertInertia(fn (Assert $inertia) => $inertia->where('tab', $expected));
})->with([
    'default' => [null, 'report'],
    'history' => ['history', 'history'],
    'snooze' => ['snooze', 'snooze'],
    'settings' => ['settings', 'settings'],
]);

test('invalid uptime tabs are rejected', function () {
    $user = User::factory()->create();
    $team = $user->personalTeam();
    $target = $team->targets()->create(['type' => 'website', 'endpoint' => 'https://example.com']);

    $this->actingAs($user)
        ->getJson(route('dashboard.targets.show.uptime', ['team' => $team, 'target' => $target, 'tab' => 'unknown']))
        ->assertUnprocessable()
        ->assertJsonValidationErrors('tab');
});

test('the certificate health page is filtered by tab', function (?string $tab, string $expected) {
    $user = User::factory()->create();
    $team = $user->personalTeam();
    $target = $team->targets()->create(['type' => 'website', 'endpoint' => 'https://example.com']);

    $this->actingAs($user)
        ->get(route('dashboard.targets.show.certificate-health', array_filter(['team' => $team, 'target' => $target, 'tab' => $tab])))
        ->assertOk()
        ->assertInertia(fn (Assert $inertia) => $inertia->where('tab', $expected));
})->with([
    'default' => [null, 'report'],
    'detected certificates' => ['detected-certificates', 'detected-certificates'],
    'history' => ['history', 'history'],
    'snooze' => ['snooze', 'snooze'],
    'settings' => ['settings', 'settings'],
]);

test('invalid certificate health tabs are rejected', function () {
    $user = User::factory()->create();
    $team = $user->personalTeam();
    $target = $team->targets()->create(['type' => 'website', 'endpoint' => 'https://example.com']);

    $this->actingAs($user)
        ->getJson(route('dashboard.targets.show.certificate-health', ['team' => $team, 'target' => $target, 'tab' => 'unknown']))
        ->assertUnprocessable()
        ->assertJsonValidationErrors('tab');
});

test('the broken links page is filtered by tab', function (?string $tab, string $expected) {
    $user = User::factory()->create();
    $team = $user->personalTeam();
    $target = $team->targets()->create(['type' => 'website', 'endpoint' => 'https://example.com']);

    $this->actingAs($user)
        ->get(route('dashboard.targets.show.broken-links', array_filter(['team' => $team, 'target' => $target, 'tab' => $tab])))
        ->assertOk()
        ->assertInertia(fn (Assert $inertia) => $inertia->where('tab', $expected));
})->with([
    'default' => [null, 'report'],
    'history' => ['history', 'history'],
    'acknowledge' => ['acknowledge', 'acknowledge'],
    'settings' => ['settings', 'settings'],
    'troubleshooting' => ['troubleshooting', 'troubleshooting'],
]);

test('invalid broken links tabs are rejected', function () {
    $user = User::factory()->create();
    $team = $user->personalTeam();
    $target = $team->targets()->create(['type' => 'website', 'endpoint' => 'https://example.com']);

    $this->actingAs($user)
        ->getJson(route('dashboard.targets.show.broken-links', ['team' => $team, 'target' => $target, 'tab' => 'unknown']))
        ->assertUnprocessable()
        ->assertJsonValidationErrors('tab');
});

test('the mixed content page is filtered by tab', function (?string $tab, string $expected) {
    $user = User::factory()->create();
    $team = $user->personalTeam();
    $target = $team->targets()->create(['type' => 'website', 'endpoint' => 'https://example.com']);

    $this->actingAs($user)
        ->get(route('dashboard.targets.show.mixed-content', array_filter(['team' => $team, 'target' => $target, 'tab' => $tab])))
        ->assertOk()
        ->assertInertia(fn (Assert $inertia) => $inertia->where('tab', $expected));
})->with([
    'default' => [null, 'report'],
    'history' => ['history', 'history'],
    'snooze' => ['snooze', 'snooze'],
    'settings' => ['settings', 'settings'],
]);

test('invalid mixed content tabs are rejected', function () {
    $user = User::factory()->create();
    $team = $user->personalTeam();
    $target = $team->targets()->create(['type' => 'website', 'endpoint' => 'https://example.com']);

    $this->actingAs($user)
        ->getJson(route('dashboard.targets.show.mixed-content', ['team' => $team, 'target' => $target, 'tab' => 'unknown']))
        ->assertUnprocessable()
        ->assertJsonValidationErrors('tab');
});

test('the lighthouse page is filtered by tab', function (?string $tab, string $expected) {
    $user = User::factory()->create();
    $team = $user->personalTeam();
    $target = $team->targets()->create(['type' => 'website', 'endpoint' => 'https://example.com']);

    $this->actingAs($user)
        ->get(route('dashboard.targets.show.lighthouse', array_filter(['team' => $team, 'target' => $target, 'tab' => $tab])))
        ->assertOk()
        ->assertInertia(fn (Assert $inertia) => $inertia->where('tab', $expected));
})->with([
    'default' => [null, 'latest'],
    'history' => ['history', 'history'],
    'snooze' => ['snooze', 'snooze'],
    'settings' => ['settings', 'settings'],
    'troubleshooting' => ['troubleshooting', 'troubleshooting'],
]);

test('invalid lighthouse tabs are rejected', function () {
    $user = User::factory()->create();
    $team = $user->personalTeam();
    $target = $team->targets()->create(['type' => 'website', 'endpoint' => 'https://example.com']);

    $this->actingAs($user)
        ->getJson(route('dashboard.targets.show.lighthouse', ['team' => $team, 'target' => $target, 'tab' => 'unknown']))
        ->assertUnprocessable()
        ->assertJsonValidationErrors('tab');
});

test('the scheduled tasks page is filtered by tab', function (?string $tab, string $expected) {
    $user = User::factory()->create();
    $team = $user->personalTeam();
    $target = $team->targets()->create(['type' => 'website', 'endpoint' => 'https://example.com']);

    $this->actingAs($user)
        ->get(route('dashboard.targets.show.scheduled-tasks', array_filter(['team' => $team, 'target' => $target, 'tab' => $tab])))
        ->assertOk()
        ->assertInertia(fn (Assert $inertia) => $inertia->where('tab', $expected));
})->with([
    'default' => [null, 'tasks'],
    'snooze' => ['snooze', 'snooze'],
    'settings' => ['settings', 'settings'],
]);

test('invalid scheduled tasks tabs are rejected', function () {
    $user = User::factory()->create();
    $team = $user->personalTeam();
    $target = $team->targets()->create(['type' => 'website', 'endpoint' => 'https://example.com']);

    $this->actingAs($user)
        ->getJson(route('dashboard.targets.show.scheduled-tasks', ['team' => $team, 'target' => $target, 'tab' => 'unknown']))
        ->assertUnprocessable()
        ->assertJsonValidationErrors('tab');
});
