<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\TargetTab;
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
            'tab' => ['sometimes', 'string', Rule::enum(TargetTab::class)],
        ]);

        $search = trim($validated['search'] ?? '');
        $tab = TargetTab::from($validated['tab'] ?? TargetTab::All->value);

        $query = $team->targets()
            ->when($search !== '', fn ($query) => $query->where(function ($query) use ($search) {
                $query->where('label', 'like', '%'.$search.'%')
                    ->orWhere('endpoint', 'like', '%'.$search.'%');
            }));

        // Targets do not store monitoring results yet, so none have recorded issues.
        $issuesQuery = (clone $query)->whereRaw('1 = 0');
        $counts = [
            TargetTab::All->value => (clone $query)->count(),
            TargetTab::Issues->value => (clone $issuesQuery)->count(),
        ];

        $targets = ($tab === TargetTab::Issues ? $issuesQuery : $query)
            ->latest()
            ->paginate((int) ($validated['per_page'] ?? 20))
            ->withQueryString();

        return inertia("dashboard/targets/index", [
            'targets' => $targets,
            'filters' => ['search' => $search, 'tab' => $tab->value],
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
