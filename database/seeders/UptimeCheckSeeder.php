<?php

namespace Database\Seeders;

use App\Models\Uptime;
use App\Models\UptimeCheck;
use Illuminate\Database\Seeder;

class UptimeCheckSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Uptime::query()->each(function (Uptime $uptime) {
            UptimeCheck::factory()->count(20)->for($uptime)->create();
        });
    }
}
