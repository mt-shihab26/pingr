<?php

namespace App\Http\Controllers\Dashboard\Settings\Teams;

use App\Enums\TeamRole;
use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Teams\CreateTeamInvitationRequest;
use App\Http\Requests\Dashboard\Teams\RespondToTeamInvitationRequest;
use App\Models\Team;
use App\Models\TeamInvitation;
use App\Notifications\TeamInvitation as TeamInvitationNotification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;

class TeamInvitationController extends Controller
{
    /**
     * Store a newly created invitation.
     */
    public function store(CreateTeamInvitationRequest $request, Team $team): RedirectResponse
    {
        abort_unless($request->user()->hasTeamPermission($team, 'invitation:create'), 403);

        $invitation = $team->invitations()->create([
            'email' => $request->validated('email'),
            'role' => TeamRole::from($request->validated('role')),
            'invited_by' => $request->user()->id,
            'expires_at' => now()->addDays(3),
        ]);

        Notification::route('mail', $invitation->email)
            ->notify(new TeamInvitationNotification($invitation));

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Invitation sent.')]);

        return to_route('dashboard.settings.teams.edit', ['team' => $team->slug]);
    }

    /**
     * Cancel the specified invitation.
     */
    public function destroy(Request $request, Team $team, TeamInvitation $invitation): RedirectResponse
    {
        abort_unless($invitation->team_id === $team->id, 404);

        abort_unless($request->user()->hasTeamPermission($team, 'invitation:cancel'), 403);

        $invitation->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Invitation cancelled.')]);

        return to_route('dashboard.settings.teams.edit', ['team' => $team->slug]);
    }

    /**
     * Accept the invitation.
     */
    public function accept(RespondToTeamInvitationRequest $request, TeamInvitation $invitation): RedirectResponse
    {
        $user = $request->user();

        DB::transaction(function () use ($user, $invitation) {
            $team = $invitation->team;

            $team->memberships()->firstOrCreate(
                ['user_id' => $user->id],
                ['role' => $invitation->role],
            );

            $invitation->update(['accepted_at' => now()]);

            $user->switchTeam($team);
        });

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Invitation accepted.')]);

        $team = $user->currentTeam ?? $user->personalTeam();

        abort_if(! $team, 403);

        return to_route('dashboard.team.index', ['team' => $team->slug]);
    }

    /**
     * Decline the invitation.
     */
    public function decline(RespondToTeamInvitationRequest $request, TeamInvitation $invitation): RedirectResponse
    {
        $user = $request->user();

        $invitation->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Invitation declined.')]);

        $team = $user->currentTeam ?? $user->personalTeam();

        abort_if(! $team, 403);

        return to_route('dashboard.team.index', ['team' => $team->slug]);
    }
}
