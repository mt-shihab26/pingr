<?php

namespace App\Models;

use App\Enums\TargetAIFrequencyUnit;
use Database\Factories\UptimeFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property string $id
 * @property string $target_id
 * @property string $method
 * @property array<string, string>|null $request_headers
 * @property string|null $payload
 * @property int $timeout
 * @property bool $follow_redirects
 * @property string $expected_status_codes
 * @property string|null $verify_text
 * @property array<string, string>|null $response_headers
 * @property array<int, string>|null $body_assertions
 * @property string $location
 * @property int $frequency_value
 * @property TargetAIFrequencyUnit $frequency_unit
 * @property int $downtime_threshold
 * @property int $performance_threshold
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Target $target
 * @property-read Collection<int, UptimeCheck> $checks
 */
#[Fillable([
    'method',
    'request_headers',
    'payload',
    'timeout',
    'follow_redirects',
    'expected_status_codes',
    'verify_text',
    'response_headers',
    'body_assertions',
    'location',
    'frequency_value',
    'frequency_unit',
    'downtime_threshold',
    'performance_threshold',
])]
class Uptime extends Model
{
    /** @use HasFactory<UptimeFactory> */
    use HasFactory, HasUuids;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'id' => 'string',
            'target_id' => 'string',
            'method' => 'string',
            'request_headers' => 'array',
            'payload' => 'string',
            'timeout' => 'integer',
            'follow_redirects' => 'boolean',
            'expected_status_codes' => 'string',
            'verify_text' => 'string',
            'response_headers' => 'array',
            'body_assertions' => 'array',
            'location' => 'string',
            'frequency_value' => 'integer',
            'frequency_unit' => TargetAIFrequencyUnit::class,
            'downtime_threshold' => 'integer',
            'performance_threshold' => 'integer',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    /**
     * Get the target that the uptime settings belong to.
     *
     * @return BelongsTo<Target, $this>
     */
    public function target(): BelongsTo
    {
        return $this->belongsTo(Target::class);
    }

    /**
     * Get the check results for the uptime settings.
     *
     * @return HasMany<UptimeCheck, $this>
     */
    public function checks(): HasMany
    {
        return $this->hasMany(UptimeCheck::class);
    }
}
