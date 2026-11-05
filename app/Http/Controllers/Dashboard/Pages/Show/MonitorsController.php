<?php

namespace App\Http\Controllers\Dashboard\Pages\Show;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Response;

class MonitorsController extends Controller
{
    /**
     * Render status page show monitors page
     */
    public function show(Request $request, Team $team, string $statusPage): Response
    {
        $validated = $request->validate([
            'tab' => ['sometimes', 'string', Rule::in(['monitors', 'auto-updates', 'uptime-history'])],
        ]);

        return inertia("dashboard/pages/show/monitors", [
            'statusPageId' => $statusPage,
            'tab' => $validated['tab'] ?? 'monitors',
        ]);
    }
}
