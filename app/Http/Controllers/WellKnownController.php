<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

class WellKnownController extends Controller
{
    /**
     * Render the well known passkeys endpoints
     */
    public function passkeys(): JsonResponse
    {
        return response()->json([
            'enroll' => route('dashboard.settings.security.edit'),
            'manage' => route('dashboard.settings.security.edit'),
        ]);
    }
}
