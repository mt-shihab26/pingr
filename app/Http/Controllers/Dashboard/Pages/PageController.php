<?php

namespace App\Http\Controllers\Dashboard\Pages;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class PageController extends Controller
{
    /**
     * Render status pages index page
     */
    public function index(Team $team): Response
    {
        return inertia("dashboard/pages/index");
    }

    /**
     * Redirect to the status page overview
     */
    public function show(Team $team, string $statusPage): RedirectResponse
    {
        return to_route('dashboard.pages.show.overview', ['team' => $team, 'statusPage' => $statusPage]);
    }
}
