<?php

namespace App\Http\Controllers\Dashboard\Targets\Show;

use App\Http\Controllers\Controller;
use App\Models\Target;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Response;

class OverviewController extends Controller
{
    /**
     * Render target show overview page
     */
    public function show(Request $request, Team $team, Target $target): Response
    {
        abort_unless($target->team_id === $team->id, 404);

        $validated = $request->validate([
            'tab' => ['sometimes', 'string', Rule::in(['active', 'disabled'])],
        ]);

        $tab = $validated['tab'] ?? 'active';

        return inertia("dashboard/targets/show/overview", [
            'target' => $target,
            'tab' => $tab,
        ]);
    }
}
