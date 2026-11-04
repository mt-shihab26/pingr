<?php

namespace App\Http\Controllers\Dashboard\Targets\Show;

use App\Http\Controllers\Controller;
use App\Models\Target;
use App\Models\Team;
use Illuminate\Http\RedirectResponse;
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

    /**
     * Enable or disable a single check on the target
     */
    public function toggle(Request $request, Team $team, Target $target): RedirectResponse
    {
        abort_unless($target->team_id === $team->id, 404);

        $validated = $request->validate([
            'check' => ['required', 'string', Rule::in($target->type->checks())],
        ]);

        $field = $validated['check'];

        $target->update([$field => ! $target->{$field}]);

        return back()->with('success', $target->{$field} ? 'Check enabled.' : 'Check disabled.');
    }
}
