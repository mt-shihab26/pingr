<?php

namespace App\Http\Controllers\Dashboard\Pages\Show;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Response;

class UpdatesController extends Controller
{
    /**
     * Render status page show status updates page
     */
    public function show(Request $request, Team $team, string $statusPage): Response
    {
        $validated = $request->validate([
            'tab' => ['sometimes', 'string', Rule::in(['updates', 'templates'])],
        ]);

        return inertia("dashboard/pages/show/updates", [
            'statusPageId' => $statusPage,
            'tab' => $validated['tab'] ?? 'updates',
        ]);
    }
}
