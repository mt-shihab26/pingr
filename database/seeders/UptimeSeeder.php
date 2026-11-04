<?php

namespace Database\Seeders;

use App\Models\Target;
use App\Models\Uptime;
use Illuminate\Database\Seeder;

class UptimeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Target::query()->where('check_uptime', true)->each(function (Target $target) {
            Uptime::factory()->for($target)->create();
        });
    }
}
