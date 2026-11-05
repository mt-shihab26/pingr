<?php

namespace App\Http\Controllers\Dashboard\Pages\Show;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Response;

class ContentController extends Controller
{
    /**
     * Render status page show content page
     */
    public function show(Request $request, Team $team, string $statusPage): Response
    {
        $validated = $request->validate([
            'tab' => ['sometimes', 'string', Rule::in(['languages', 'texts'])],
        ]);

        return inertia("dashboard/pages/show/content", [
            'statusPageId' => $statusPage,
            'tab' => $validated['tab'] ?? 'languages',
        ]);
    }
}
