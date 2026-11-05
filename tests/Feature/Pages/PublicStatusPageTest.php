<?php

use Inertia\Testing\AssertableInertia as Assert;

test('guests can view a public status page', function () {
    $this->get(route('status.show', ['slug' => 'shihab']))
        ->assertOk()
        ->assertInertia(fn (Assert $inertia) => $inertia
            ->component('status/show')
            ->where('slug', 'shihab'));
});
