<?php

namespace App\Models;

use App\Enums\TargetAIFrequencyUnit;
use App\Enums\TargetType;
use Database\Factories\TargetFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $team_id
 * @property TargetType $type
 * @property string|null $label
 * @property string $endpoint
 * @property int|null $ai_frequency_value
 * @property TargetAIFrequencyUnit|null $ai_frequency_unit
 * @property bool $check_uptime
 * @property bool $check_certificate_health
 * @property bool $check_broken_links
 * @property bool $check_mixed_content
 * @property bool $check_lighthouse
 * @property bool $check_scheduled_tasks
 * @property bool $check_application_health
 * @property bool $check_sitemap
 * @property bool $check_dns
 * @property bool $check_domain
 * @property bool $check_dns_blocklist
 * @property bool $check_open_ports
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Team $team
 */
#[Fillable([
    'type',
    'label',
    'endpoint',
    'ai_frequency_value',
    'ai_frequency_unit',
    'check_uptime',
    'check_certificate_health',
    'check_broken_links',
    'check_mixed_content',
    'check_lighthouse',
    'check_scheduled_tasks',
    'check_application_health',
    'check_sitemap',
    'check_dns',
    'check_domain',
    'check_dns_blocklist',
    'check_open_ports',
])]
class Target extends Model
{
    /** @use HasFactory<TargetFactory> */
    use HasFactory;

    /**
     * Get the team that the target belongs to.
     *
     * @return BelongsTo<Team, $this>
     */
    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'id' => 'integer',
            'team_id' => 'integer',
            'type' => TargetType::class,
            'label' => 'string',
            'endpoint' => 'string',
            'ai_frequency_value' => 'integer',
            'ai_frequency_unit' => TargetAIFrequencyUnit::class,
            'check_uptime' => 'boolean',
            'check_certificate_health' => 'boolean',
            'check_broken_links' => 'boolean',
            'check_mixed_content' => 'boolean',
            'check_lighthouse' => 'boolean',
            'check_scheduled_tasks' => 'boolean',
            'check_application_health' => 'boolean',
            'check_sitemap' => 'boolean',
            'check_dns' => 'boolean',
            'check_domain' => 'boolean',
            'check_dns_blocklist' => 'boolean',
            'check_open_ports' => 'boolean',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }
}
