import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import type { TTeam } from "@/types/models";

import { router } from "@inertiajs/react";
import { useShared } from "@/hooks/use-shared";

import { Check, Plus, Users } from "lucide-react";
import { CreateTeamModal } from "@/components/screens/dashboard/teams/create-team-modal";

export function TeamSwitcher() {
    const { team: currentTeam, teams } = useShared();

    const switchTeam = (nextTeam: TTeam) => {
        const previousTeamSlug = currentTeam?.slug;

        router.visit(
            route("dashboard.settings.teams.switch", { team: nextTeam.slug }),
            {
                onFinish: () => {
                    if (!previousTeamSlug || typeof window === "undefined") {
                        router.reload();

                        return;
                    }

                    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
                    const segment = `/${previousTeamSlug}`;

                    if (currentUrl.includes(segment)) {
                        router.visit(
                                currentUrl.replace(segment, `/${nextTeam.slug}`),
                            {
                                replace: true,
                            },
                        );

                        return;
                    }

                    router.reload();
                },
            },
        );
    };

    return (
        <>
            <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                    Teams
                </DropdownMenuLabel>
                {teams.map((listedTeam) => (
                    <DropdownMenuItem
                        key={listedTeam.id}
                        data-test="team-switcher-item"
                        className="cursor-pointer gap-2"
                        onSelect={() => switchTeam(listedTeam)}
                    >
                        <Users className="size-4" />
                        {listedTeam.name}
                        {currentTeam?.id === listedTeam.id && (
                            <Check className="ml-auto size-4" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <CreateTeamModal>
                <DropdownMenuItem
                    data-test="team-switcher-new-team"
                    className="cursor-pointer gap-2"
                    onSelect={(event) => event.preventDefault()}
                >
                    <Plus className="size-4" />
                    <span className="text-muted-foreground">New team</span>
                </DropdownMenuItem>
            </CreateTeamModal>
        </>
    );
}
