<?php

namespace App\Http\Controllers\Dashboard\Settings;

use App\Http\Controllers\Controller;
use Inertia\Response;

class AppearanceController extends Controller
{
    /**
     * Show the user's theme switching settings page.
     */
    public function edit(): Response
    {
        return inertia('dashboard/settings/appearance');
    }
}
