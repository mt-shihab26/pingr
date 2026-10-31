<?php

use Illuminate\Support\Facades\Route;
use Inertia\Testing\AssertableInertia as Assert;

use function Pest\Laravel\get;

test('redirect flash messages are shared once with Inertia', function (string $type) {

    Route::middleware('web')->get('/test-session-flash', function () use ($type) {
        return redirect()->route('home')->with($type, 'Test message.');
    });

    get('/test-session-flash')->assertRedirect(route('home'));

    get(route('home'))->assertInertia(fn (Assert $page) => $page->where("shared.flash.{$type}", 'Test message.'));

    get(route('home'))->assertInertia(fn (Assert $page) => $page->where("shared.flash.{$type}", null));

})->with(['success', 'error', 'warning', 'info']);
