<?php

namespace App\Http\Controllers\Dashboard\Pages\Show;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Response;

class NotificationsController extends Controller
{
    /**
     * Render status page show notifications page
     */
    public function show(Request $request, Team $team, string $statusPage): Response
    {
        $validated = $request->validate([
            'tab' => ['sometimes', 'string', Rule::in(['subscriptions', 'subscribers'])],
        ]);

        return inertia("dashboard/pages/show/notifications", [
            'statusPageId' => $statusPage,
            'tab' => $validated['tab'] ?? 'subscriptions',
        ]);
    }
}
