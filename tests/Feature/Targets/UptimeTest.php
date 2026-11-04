<?php

use App\Enums\TargetAIFrequencyUnit;
use App\Models\Team;

test('a target has uptime settings with defaults', function () {
    $target = Team::factory()->create()->targets()->create(['type' => 'website', 'endpoint' => 'https://example.com']);

    $uptime = $target->uptime()->create()->fresh();

    expect($target->fresh()->uptime->is($uptime))->toBeTrue()
        ->and($uptime->target->is($target))->toBeTrue()
        ->and($uptime->method)->toBe('GET')
        ->and($uptime->expected_status_codes)->toBe('2*')
        ->and($uptime->follow_redirects)->toBeTrue()
        ->and($uptime->frequency_unit)->toBe(TargetAIFrequencyUnit::Minute);
});

test('uptime settings are deleted with their target', function () {
    $target = Team::factory()->create()->targets()->create(['type' => 'website', 'endpoint' => 'https://example.com']);
    $uptime = $target->uptime()->create();

    $target->delete();

    $this->assertModelMissing($uptime);
});
