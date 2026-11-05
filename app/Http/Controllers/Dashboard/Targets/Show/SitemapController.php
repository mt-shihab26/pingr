<?php

namespace App\Http\Controllers\Dashboard\Targets\Show;

use App\Http\Controllers\Controller;
use App\Models\Target;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Response;

class SitemapController extends Controller
{
    /**
     * Render target show sitemap page
     */
    public function show(Request $request, Team $team, Target $target): Response
    {
        abort_unless($target->team_id === $team->id, 404);

        $validated = $request->validate([
            'tab' => ['sometimes', 'string', Rule::in(['report', 'history', 'acknowledge', 'settings'])],
        ]);

        $tab = $validated['tab'] ?? 'report';

        return inertia("dashboard/targets/show/sitemap", [
            'target' => $target,
            'tab' => $tab,
        ]);
    }
}
