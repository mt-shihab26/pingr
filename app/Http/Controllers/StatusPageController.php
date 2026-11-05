<?php

namespace App\Http\Controllers;

use Inertia\Response;

class StatusPageController extends Controller
{
    /**
     * Render the public status page
     */
    public function show(string $slug): Response
    {
        return inertia("status/show", [
            'slug' => $slug,
        ]);
    }
}
