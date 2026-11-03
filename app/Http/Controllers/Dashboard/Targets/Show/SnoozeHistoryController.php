<?php

namespace App\Http\Controllers\Dashboard\Targets\Show;

use App\Http\Controllers\Controller;
use App\Models\Target;
use App\Models\Team;
use Inertia\Response;

class SnoozeHistoryController extends Controller
{
    /**
     * Render target show snooze history page
     */
    public function show(Team $team, Target $target): Response
    {
        abort_unless($target->team_id === $team->id, 404);

        return inertia("dashboard/targets/show/snooze-history", [
            'target' => $target,
        ]);
    }
}
