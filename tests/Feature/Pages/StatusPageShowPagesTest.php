<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('the status pages index can be rendered', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('dashboard.pages.index', ['team' => $user->personalTeam()]))
        ->assertOk()
        ->assertInertia(fn (Assert $inertia) => $inertia->component('dashboard/pages/index'));
});

test('the status page redirects to its overview', function () {
    $user = User::factory()->create();
    $team = $user->personalTeam();

    $this->actingAs($user)
        ->get(route('dashboard.pages.show.redirect', ['team' => $team, 'statusPage' => '11434']))
        ->assertRedirect(route('dashboard.pages.show.overview', ['team' => $team, 'statusPage' => '11434']));
});

test('status page show pages can be rendered', function (string $page) {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route("dashboard.pages.show.$page", ['team' => $user->personalTeam(), 'statusPage' => '11434']))
        ->assertOk()
        ->assertInertia(fn (Assert $inertia) => $inertia
            ->component("dashboard/pages/show/$page")
            ->where('statusPageId', '11434'));
})->with([
    'overview',
    'updates',
    'monitors',
    'display',
    'content',
    'notifications',
    'settings',
]);

test('status page show pages are filtered by tab', function (string $page, ?string $tab, string $expected) {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route("dashboard.pages.show.$page", array_filter(['team' => $user->personalTeam(), 'statusPage' => '11434', 'tab' => $tab])))
        ->assertOk()
        ->assertInertia(fn (Assert $inertia) => $inertia->where('tab', $expected));
})->with([
    'updates default' => ['updates', null, 'updates'],
    'updates templates' => ['updates', 'templates', 'templates'],
    'monitors default' => ['monitors', null, 'monitors'],
    'monitors auto-updates' => ['monitors', 'auto-updates', 'auto-updates'],
    'monitors uptime-history' => ['monitors', 'uptime-history', 'uptime-history'],
    'display default' => ['display', null, 'general'],
    'display logo' => ['display', 'logo', 'logo'],
    'display style' => ['display', 'style', 'style'],
    'display badges' => ['display', 'badges', 'badges'],
    'content default' => ['content', null, 'languages'],
    'content texts' => ['content', 'texts', 'texts'],
    'notifications default' => ['notifications', null, 'subscriptions'],
    'notifications subscribers' => ['notifications', 'subscribers', 'subscribers'],
    'settings default' => ['settings', null, 'url'],
    'settings certificate' => ['settings', 'certificate', 'certificate'],
    'settings secret' => ['settings', 'secret', 'secret'],
]);

test('invalid status page tabs are rejected', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->getJson(route('dashboard.pages.show.display', ['team' => $user->personalTeam(), 'statusPage' => '11434', 'tab' => 'unknown']))
        ->assertUnprocessable()
        ->assertJsonValidationErrors('tab');
});

test('guests cannot view status pages', function () {
    $user = User::factory()->create();

    $this->get(route('dashboard.pages.index', ['team' => $user->personalTeam()]))
        ->assertRedirect(route('login'));
});
