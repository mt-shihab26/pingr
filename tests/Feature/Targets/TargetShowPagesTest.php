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
    'dns',
    'domain',
    'dns-blocklist',
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
