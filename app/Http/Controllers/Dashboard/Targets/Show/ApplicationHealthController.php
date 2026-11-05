<?php

namespace App\Http\Controllers\Dashboard\Targets\Show;

use App\Http\Controllers\Controller;
use App\Models\Target;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Response;

class ApplicationHealthController extends Controller
{
    /**
     * Render target show application health page
     */
    public function show(Request $request, Team $team, Target $target): Response
    {
        abort_unless($target->team_id === $team->id, 404);

        $validated = $request->validate([
            'tab' => ['sometimes', 'string', Rule::in(['checks', 'history', 'snooze', 'settings'])],
        ]);

        $tab = $validated['tab'] ?? 'checks';

        return inertia("dashboard/targets/show/application-health", [
            'target' => $target,
            'tab' => $tab,
        ]);
    }
}
