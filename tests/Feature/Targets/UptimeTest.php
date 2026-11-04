<?php

use App\Enums\TargetAIFrequencyUnit;
use App\Enums\UptimeCheckStatus;
use App\Models\Team;
use App\Models\Uptime;
use App\Models\UptimeCheck;

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

test('uptime settings have many check results', function () {
    $uptime = Uptime::factory()->create();

    $checks = UptimeCheck::factory()->count(3)->for($uptime)->create();

    expect($uptime->checks)->toHaveCount(3)
        ->and($checks->first()->uptime->is($uptime))->toBeTrue()
        ->and($checks->first()->status)->toBeInstanceOf(UptimeCheckStatus::class);
});

test('check results are deleted with their uptime settings', function () {
    $check = UptimeCheck::factory()->create();

    $check->uptime->target->delete();

    $this->assertModelMissing($check);
});
