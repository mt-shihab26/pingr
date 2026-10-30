import { Link, router } from "@inertiajs/react";
import { ArrowRightLeft, Check, Plus, Settings2, Users } from "lucide-react";
import { CreateTeamModal } from "@/components/screens/dashboard/teams/create-team-modal";
import { Heading } from "@/components/elements/heading";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { useShared } from "@/hooks/use-shared";
import type { TTeam } from "@/types/models";

type Props = {
    teams: TTeam[];
};

export default function TeamsIndex({ teams }: Props) {
    const { team: currentTeam } = useShared();

    return (
        <DashboardLayout
            title="Switch team"
            breadcrumbs={[
                {
                    type: "back",
                    title: "Back to dashboard",
                    href: currentTeam
                        ? route("dashboard.overview.index", {
                              team: currentTeam.slug,
                          })
                        : "/",
                },
                {
                    title: "Teams",
                    href: route("dashboard.teams.index"),
                },
            ]}
        >
            <div className="w-full max-w-3xl space-y-6 self-center">
                <div className="flex items-center justify-between gap-4">
                    <Heading
                        title="Your teams"
                        description="Switch between teams or manage a team."
                    />

                    <CreateTeamModal>
                        <Button type="button" data-test="teams-new-team-button">
                            <Plus /> New team
                        </Button>
                    </CreateTeamModal>
                </div>

                <div className="space-y-3">
                    {teams.map((listedTeam) => {
                        const isCurrentTeam = currentTeam?.id === listedTeam.id;

                        return (
                            <div
                                key={listedTeam.id}
                                data-test="team-row"
                                className="flex flex-wrap items-center justify-between gap-4 rounded-none border p-4"
                            >
                                <div className="flex items-center gap-3">
                                    <Users className="size-5 text-muted-foreground" />
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">
                                                {listedTeam.name}
                                            </span>
                                            {isCurrentTeam && (
                                                <Check className="size-4 text-muted-foreground" />
                                            )}
                                        </div>
                                        <span className="text-sm text-muted-foreground">
                                            {listedTeam.roleLabel}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        disabled={isCurrentTeam}
                                        onClick={() =>
                                            router.post(
                                                route(
                                                    "dashboard.teams.switch",
                                                    { team: listedTeam.slug },
                                                ),
                                            )
                                        }
                                    >
                                        {isCurrentTeam ? (
                                            <>
                                                <Check className="size-4" />
                                                Current team
                                            </>
                                        ) : (
                                            <>
                                                <ArrowRightLeft className="size-4" />
                                                Switch
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        nativeButton={false}
                                        render={
                                            <Link
                                                href={route(
                                                    "dashboard.teams.edit",
                                                    { team: listedTeam.slug },
                                                )}
                                            />
                                        }
                                    >
                                        <Settings2 className="size-4" />
                                        Manage team
                                    </Button>
                                </div>
                            </div>
                        );
                    })}

                    {teams.length === 0 && (
                        <p className="py-8 text-center text-muted-foreground">
                            You don&apos;t belong to any teams yet.
                        </p>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
