<?php

namespace App\Http\Controllers\Dashboard\Pages\Show;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Response;

class SettingsController extends Controller
{
    /**
     * Render status page show settings page
     */
    public function show(Request $request, Team $team, string $statusPage): Response
    {
        $validated = $request->validate([
            'tab' => ['sometimes', 'string', Rule::in(['url', 'certificate', 'secret'])],
        ]);

        return inertia("dashboard/pages/show/settings", [
            'statusPageId' => $statusPage,
            'tab' => $validated['tab'] ?? 'url',
        ]);
    }
}
