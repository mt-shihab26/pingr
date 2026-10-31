<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Targets\StoreTargetRequest;
use App\Http\Requests\Dashboard\Targets\UpdateTargetRequest;
use App\Models\Target;
use App\Models\Team;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Response;

class TargetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Team $team): Response
    {
        $validated = $request->validate([
            'search' => ['nullable', 'string', 'max:255'],
            'per_page' => ['sometimes', 'integer', 'min:1', 'max:100'],
            'tab' => ['sometimes', 'string', Rule::in(['all', 'issues'])],
        ]);

        $search = trim($validated['search'] ?? '');
        $tab = $validated['tab'] ?? 'all';

        $query = $team->targets()->search($search);
        $counts = [
            'all' => (clone $query)->count(),
            'issues' => (clone $query)->withIssues()->count(),
        ];

        $targets = $query
            ->when($tab === 'issues', fn ($query) => $query->withIssues())
            ->latest()
            ->paginate((int) ($validated['per_page'] ?? 20))
            ->withQueryString();

        return inertia("dashboard/targets/index", [
            'targets' => $targets,
            'filters' => ['search' => $search, 'tab' => $tab],
            'counts' => $counts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return inertia("dashboard/targets/create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTargetRequest $request, Team $team): RedirectResponse
    {
        $validated = $request->validated();

        $team->targets()->create($validated);

        return redirect()
            ->route('dashboard.targets.index', ['team' => $team->slug])
            ->with("success", "Target created.");
    }

    /**
     * Display the specified resource.
     */
    public function show(Team $team, Target $target): Response
    {
        abort_unless($target->team_id === $team->id, 404);

        return inertia("dashboard/targets/show", [
            'target' => $target,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Team $team, Target $target): Response
    {
        abort_unless($target->team_id === $team->id, 404);

        return inertia("dashboard/targets/edit", [
            'target' => $target,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTargetRequest $request, Team $team, Target $target): RedirectResponse
    {
        abort_unless($target->team_id === $team->id, 404);

        $validated = $request->validated();

        $target->update($validated);

        return redirect()
            ->route('dashboard.targets.index', $team)
            ->with("success", "Target updated.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Team $team, Target $target): RedirectResponse
    {
        abort_unless($target->team_id === $team->id, 404);

        $target->delete();

        return redirect()
            ->route('dashboard.targets.index', $team)
            ->with("success", "Target deleted.");
    }
}
