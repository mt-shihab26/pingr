import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { TTeam } from "@/types/models";

import { router } from "@inertiajs/react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useShared } from "@/hooks/use-shared";

import { Check, ChevronsUpDown, Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateTeamModal } from "@/components/screens/dashboard/teams/create-team-modal";

export function TeamSwitcher({ inHeader = false }: { inHeader?: boolean }) {
    const { team, teams } = useShared();

    const isMobile = useIsMobile();

    const switchTeam = (team: TTeam) => {
        const previousTeamSlug = team?.slug;

        router.visit(
            route("dashboard.settings.teams.switch", { team: team.slug }),
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
                            currentUrl.replace(segment, `/${team.slug}`),
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
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button
                        variant="ghost"
                        data-test="team-switcher-trigger"
                        className={
                            inHeader
                                ? "h-8 gap-1 px-2"
                                : "w-full justify-start px-2 has-[>svg]:px-2 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        }
                    >
                        <Users
                            className={
                                inHeader
                                    ? "hidden"
                                    : "hidden size-4 shrink-0 group-data-[collapsible=icon]:block"
                            }
                        />
                        <div
                            className={
                                inHeader
                                    ? "grid flex-1 text-left text-sm leading-tight"
                                    : "grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden"
                            }
                        >
                            <span
                                className={
                                    inHeader
                                        ? "max-w-30 truncate font-medium"
                                        : "truncate font-semibold"
                                }
                            >
                                {team?.name ?? "Select team"}
                            </span>
                        </div>
                        <ChevronsUpDown
                            className={
                                inHeader
                                    ? "size-4 opacity-50"
                                    : "ml-auto group-data-[collapsible=icon]:hidden"
                            }
                        />
                    </Button>
                }
            />
            <DropdownMenuContent
                className={
                    inHeader
                        ? "w-56"
                        : "w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                }
                side={inHeader ? undefined : isMobile ? "bottom" : "right"}
                align={inHeader ? "end" : "start"}
                sideOffset={inHeader ? undefined : 4}
            >
                <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs text-muted-foreground">
                        Teams
                    </DropdownMenuLabel>
                    {teams.map((t) => (
                        <DropdownMenuItem
                            key={t.id}
                            data-test="team-switcher-item"
                            className={
                                inHeader
                                    ? "cursor-pointer gap-2"
                                    : "cursor-pointer gap-2 p-2"
                            }
                            onSelect={() => switchTeam(t)}
                        >
                            {t.name}
                            {team?.id === t.id && (
                                <Check
                                    className={
                                        inHeader
                                            ? "ml-auto size-4"
                                            : "ml-auto h-4 w-4"
                                    }
                                />
                            )}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <CreateTeamModal>
                    <DropdownMenuItem
                        data-test="team-switcher-new-team"
                        className={
                            inHeader
                                ? "cursor-pointer gap-2"
                                : "cursor-pointer gap-2 p-2"
                        }
                        onSelect={(event) => event.preventDefault()}
                    >
                        <Plus className={inHeader ? "size-4" : "h-4 w-4"} />
                        <span className="text-muted-foreground">New team</span>
                    </DropdownMenuItem>
                </CreateTeamModal>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
