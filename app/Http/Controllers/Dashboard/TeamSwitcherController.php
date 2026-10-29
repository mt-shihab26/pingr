<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TeamSwitcherController extends Controller
{
    /**
     * Display the teams the user can switch between.
     *
     * @return Response
     */
    public function index(Request $request): Response
    {
        return Inertia::render('dashboard/teams/index', [
            'teams' => $request->user()->toUserTeams(includeCurrent: true),
        ]);
    }
}
