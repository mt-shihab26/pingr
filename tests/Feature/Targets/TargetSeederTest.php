<?php

use App\Http\Requests\Dashboard\Targets\StoreTargetRequest;
use App\Models\Target;
use App\Models\Team;
use Database\Seeders\TargetSeeder;
use Illuminate\Support\Facades\Validator;

test('the target factory generates valid target configurations', function () {
    foreach (Target::factory()->count(30)->make() as $target) {
        $request = new StoreTargetRequest;
        $request->replace(array_filter($target->toArray(), fn ($value) => $value !== null));

        $validator = Validator::make($request->all(), $request->rules());
        $validator->after($request->after());

        expect($validator->passes())->toBeTrue($validator->errors()->toJson());
    }
});

test('the target seeder creates targets for existing teams', function () {
    $teams = Team::factory()->count(2)->create();

    $this->seed(TargetSeeder::class);

    expect(Team::count())->toBe(2)
        ->and(Target::count())->toBe(24);

    foreach ($teams as $team) {
        expect($team->targets()->count())->toBe(12);
    }
});
