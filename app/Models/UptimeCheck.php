<?php

namespace App\Models;

use App\Enums\UptimeCheckStatus;
use Database\Factories\UptimeCheckFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property string $id
 * @property string $uptime_id
 * @property UptimeCheckStatus $status
 * @property string $location
 * @property int|null $status_code
 * @property int|null $response_time
 * @property string|null $error
 * @property Carbon $checked_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Uptime $uptime
 */
#[Fillable([
    'status',
    'location',
    'status_code',
    'response_time',
    'error',
    'checked_at',
])]
class UptimeCheck extends Model
{
    /** @use HasFactory<UptimeCheckFactory> */
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
            'uptime_id' => 'string',
            'status' => UptimeCheckStatus::class,
            'location' => 'string',
            'status_code' => 'integer',
            'response_time' => 'integer',
            'error' => 'string',
            'checked_at' => 'datetime',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    /**
     * Get the uptime settings that the check belongs to.
     *
     * @return BelongsTo<Uptime, $this>
     */
    public function uptime(): BelongsTo
    {
        return $this->belongsTo(Uptime::class);
    }
}
