<?php

namespace App\Http\Controllers\Dashboard\Pages\Show;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Inertia\Response;

class OverviewController extends Controller
{
    /**
     * Render status page show overview page
     */
    public function show(Team $team, string $statusPage): Response
    {
        return inertia("dashboard/pages/show/overview", [
            'statusPageId' => $statusPage,
        ]);
    }
}
