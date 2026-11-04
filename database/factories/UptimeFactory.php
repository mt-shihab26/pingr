<?php

namespace Database\Factories;

use App\Enums\TargetAIFrequencyUnit;
use App\Models\Target;
use App\Models\Uptime;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Uptime>
 */
class UptimeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'target_id' => Target::inRandomOrder()->first()?->id ?? Target::factory(),
            'method' => fake()->randomElement(['GET', 'HEAD', 'POST']),
            'request_headers' => null,
            'payload' => null,
            'timeout' => fake()->numberBetween(1, 30),
            'follow_redirects' => fake()->boolean(80),
            'expected_status_codes' => fake()->randomElement(['2*', '200', '200,301,302']),
            'verify_text' => null,
            'response_headers' => null,
            'body_assertions' => null,
            'location' => 'tokyo',
            'frequency_value' => fake()->numberBetween(1, 60),
            'frequency_unit' => fake()->randomElement(TargetAIFrequencyUnit::cases()),
            'downtime_threshold' => fake()->numberBetween(1, 5),
            'performance_threshold' => fake()->numberBetween(500, 5000),
        ];
    }
}
