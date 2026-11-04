<?php

namespace Database\Factories;

use App\Enums\UptimeCheckStatus;
use App\Models\Uptime;
use App\Models\UptimeCheck;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<UptimeCheck>
 */
class UptimeCheckFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = fake()->randomElement([
            ...array_fill(0, 18, UptimeCheckStatus::Up),
            UptimeCheckStatus::Degraded,
            UptimeCheckStatus::Down,
        ]);

        return [
            'uptime_id' => Uptime::inRandomOrder()->first()?->id ?? Uptime::factory(),
            'status' => $status,
            'location' => 'tokyo',
            'status_code' => match ($status) {
                UptimeCheckStatus::Up, UptimeCheckStatus::Degraded => 200,
                UptimeCheckStatus::Down => fake()->randomElement([null, 500, 502, 503, 504]),
            },
            'response_time' => match ($status) {
                UptimeCheckStatus::Up => fake()->numberBetween(50, 900),
                UptimeCheckStatus::Degraded => fake()->numberBetween(1000, 5000),
                UptimeCheckStatus::Down => null,
            },
            'error' => $status === UptimeCheckStatus::Down ? fake()->randomElement(['Connection timed out', 'Unexpected status code']) : null,
            'checked_at' => fake()->dateTimeBetween('-1 day'),
        ];
    }
}
