<?php

namespace Database\Factories;

use App\Enums\TargetAIFrequencyUnit;
use App\Enums\TargetType;
use App\Models\Target;
use App\Models\Team;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Target>
 */
class TargetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = TargetType::cases();
        $type = $types[fake()->numberBetween(0, count($types) - 1)];

        return [
            'team_id' => Team::inRandomOrder()->first()?->id ?? Team::factory(),
            'type' => $type,
            'label' => fake()->words(3, true),
            'endpoint' => match ($type) {
                TargetType::Website, TargetType::Ai => 'https://'.fake()->domainName(),
                TargetType::Server => fake()->ipv4(),
                TargetType::Tcpport => fake()->ipv4().':'.fake()->numberBetween(1, 65535),
            },
            'ai_frequency_value' => $type === TargetType::Ai ? fake()->numberBetween(1, 365) : null,
            'ai_frequency_unit' => $type === TargetType::Ai ? fake()->randomElement(TargetAIFrequencyUnit::cases()) : null,
            'check_uptime' => $type !== TargetType::Ai,
            'check_certificate_health' => $type === TargetType::Website,
            'check_broken_links' => $type === TargetType::Website,
            'check_mixed_content' => $type === TargetType::Website,
            'check_lighthouse' => $type === TargetType::Website,
            'check_scheduled_tasks' => false,
            'check_application_health' => false,
            'check_sitemap' => $type === TargetType::Website,
            'check_dns' => $type !== TargetType::Ai,
            'check_domain' => $type !== TargetType::Ai,
            'check_dns_blocklist' => $type !== TargetType::Ai,
            'check_open_ports' => $type === TargetType::Server,
        ];
    }
}
