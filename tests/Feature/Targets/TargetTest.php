<?php

use App\Models\Team;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('targets are listed only for the requested team', function () {
    $user = User::factory()->create();
    $team = $user->personalTeam();
    $target = $team->targets()->create(['type' => 'server', 'endpoint' => 'example.com']);
    Team::factory()->create()->targets()->create(['type' => 'server', 'endpoint' => 'other.example.com']);

    $this->actingAs($user)
        ->get(route('dashboard.targets.index', $team))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard/targets/index')
            ->has('targets.data', 1)
            ->where('targets.data.0.id', $target->id)
        );
});

test('targets can be created with check defaults and team ownership', function () {
    $user = User::factory()->create();
    $team = $user->personalTeam();

    $this->actingAs($user)
        ->post(route('dashboard.targets.store', $team), [
            'type' => 'server',
            'endpoint' => 'example.com',
            'check_uptime' => true,
        ])
        ->assertRedirect(route('dashboard.targets.index', $team))
        ->assertSessionHas('success', 'Target created.');

    $target = $team->targets()->sole();

    expect($target->team_id)->toBe($team->id)
        ->and($target->check_uptime)->toBeTrue()
        ->and($target->check_dns)->toBeFalse();
});

test('targets can be viewed edited updated and deleted', function (string $type, string $endpoint) {
    $user = User::factory()->create();
    $team = $user->personalTeam();
    $target = $team->targets()->create(['type' => 'server', 'endpoint' => 'example.com']);
    $params = ['team' => $team, 'target' => $target];

    foreach (['show', 'edit'] as $action) {
        $this->actingAs($user)->get(route("dashboard.targets.{$action}", $params))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component("dashboard/targets/{$action}")
                ->where('target.id', $target->id)
            );
    }

    $this->patch(route('dashboard.targets.update', $params), [
        'type' => $type,
        'endpoint' => $endpoint,
        'label' => 'Updated target',
        'ai_frequency_value' => $type === 'ai' ? 2 : null,
        'ai_frequency_unit' => $type === 'ai' ? 'hour' : null,
    ])->assertRedirect(route('dashboard.targets.index', $team))
        ->assertSessionHas('success', 'Target updated.');

    expect($target->fresh()->endpoint)->toBe($endpoint);

    $this->delete(route('dashboard.targets.destroy', $params))
        ->assertRedirect(route('dashboard.targets.index', $team))
        ->assertSessionHas('success', 'Target deleted.');

    $this->assertModelMissing($target);
})->with([
    'website' => ['website', 'https://example.com'],
    'server' => ['server', 'example.com'],
    'tcpport' => ['tcpport', '[2001:db8::1]:443'],
    'ai' => ['ai', 'https://example.com'],
]);

test('targets from another team cannot be accessed or changed', function () {
    $user = User::factory()->create();
    $target = Team::factory()->create()->targets()->create(['type' => 'server', 'endpoint' => 'example.com']);
    $params = ['team' => $user->personalTeam(), 'target' => $target];

    $this->actingAs($user);
    $this->get(route('dashboard.targets.show', $params))->assertNotFound();
    $this->get(route('dashboard.targets.edit', $params))->assertNotFound();
    $this->patch(route('dashboard.targets.update', $params), ['type' => 'server', 'endpoint' => 'other.example.com'])->assertNotFound();
    $this->delete(route('dashboard.targets.destroy', $params))->assertNotFound();

    expect($target->fresh()->endpoint)->toBe('example.com');
});

test('invalid endpoint values and unsupported checks are rejected', function (array $payload, string $field) {
    $user = User::factory()->create();

    $this->actingAs($user)->post(route('dashboard.targets.store', $user->personalTeam()), $payload)
        ->assertSessionHasErrors($field);

    $this->assertDatabaseCount('targets', 0);
})->with([
    'non-string endpoint' => [['type' => 'tcpport', 'endpoint' => ['bad']], 'endpoint'],
    'invalid port' => [['type' => 'tcpport', 'endpoint' => 'example.com:65536'], 'endpoint'],
    'unsupported check' => [['type' => 'server', 'endpoint' => 'example.com', 'check_broken_links' => true], 'check_broken_links'],
    'missing AI frequency' => [['type' => 'ai', 'endpoint' => 'https://example.com'], 'ai_frequency_value'],
]);
