<?php

namespace Database\Seeders;

use App\Models\Target;
use App\Models\Team;
use Illuminate\Database\Seeder;

class TargetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Team::query()->each(function (Team $team) {
            Target::factory()->count(200)->for($team)->create();
        });
    }
}
