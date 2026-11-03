<?php

namespace App\Http\Controllers\Dashboard\Targets\Show;

use App\Http\Controllers\Controller;
use App\Models\Target;
use App\Models\Team;
use Inertia\Response;

class OverviewController extends Controller
{
    /**
     * Render target show overview page
     */
    public function show(Team $team, Target $target): Response
    {
        abort_unless($target->team_id === $team->id, 404);

        return inertia("dashboard/targets/show/overview", [
            'target' => $target,
        ]);

    }
}
