<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            "shared" => [
                'name' => config('app.name'),
                'user' => $request->user(),
                'sidebar' => $this->sidebar($request),
                'team' => fn () => $this->team($request),
                'teams' => fn () => $this->teams($request),
                'flash' => fn () => $this->flash($request),
            ],

        ];
    }

    /**
     * Determine whether the sidebar should start open.
     */
    private function sidebar(Request $request): bool
    {
        return ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true';
    }

    /**
     * Get the current team, falling back to the user's personal team.
     *
     * @return array<string, mixed>|null
     */
    private function team(Request $request): ?array
    {
        $user = $request->user();

        if (! $user) {
            return null;
        }

        $team = $user->currentTeam ?? $user->personalTeam();

        return $team ? $user->toUserTeam($team) : null;
    }

    /**
     * Get the teams available to the authenticated user.
     *
     * @return Collection<int, array{id: int, name: string, slug: string, isPersonal: bool, role: string|null, roleLabel: string|null, isCurrent: bool}>|array{}
     */
    private function teams(Request $request): Collection|array
    {
        return $request->user()?->toUserTeams(includeCurrent: true) ?? [];
    }

    /**
     * Get the session flash messages.
     *
     * @return array<string, mixed>
     */
    private function flash(Request $request): array
    {
        return [
            'info' => $request->session()->get('info'),
            'warning' => $request->session()->get('warning'),
            'success' => $request->session()->get('success'),
            'error' => $request->session()->get('error'),
        ];
    }
}
