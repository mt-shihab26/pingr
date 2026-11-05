import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";

import { ShowLayout } from "@/components/screens/dashboard/targets/show/shared/show-layout";

import { BadgeCard } from "@/components/screens/dashboard/targets/show/badges/badge-card";

const BadgesShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();
    const endpoint = target.label ?? target.endpoint;
    const url = `https://pingr.app/badges/target/${target.id}`;

    return (
        <ShowLayout
            target={target}
            title="Badges"
            breadcrumbs={[
                {
                    title: "Badges",
                    href: route("dashboard.targets.show.badges", { team, target }),
                },
            ]}
        >
            <div className="flex flex-col gap-4">
                <p className="max-w-2xl text-muted-foreground">
                    Embed a badge to show your site's live uptime status. It updates automatically
                    whenever the uptime status of your site changes.
                </p>
                <div className="grid gap-4 lg:grid-cols-2">
                    <BadgeCard
                        title="Default badge"
                        description="Shows your site name and current uptime status. Ideal for documentation, READMEs, and websites."
                        url={url}
                        alt={`${endpoint} uptime status`}
                        preview={
                            <span className="inline-flex overflow-hidden text-xs">
                                <span className="bg-neutral-800 px-2 py-1 text-white">
                                    {endpoint}
                                </span>
                                <span className="bg-emerald-500 px-2 py-1 text-white">online</span>
                            </span>
                        }
                    />
                    <BadgeCard
                        title="Small badge"
                        description="A compact status dot for tight spaces like navigation bars, tables, or dashboards."
                        url={`${url}?size=small`}
                        alt={`${endpoint} uptime status`}
                        preview={
                            <span className="size-4 rounded-full bg-emerald-500 ring-4 ring-emerald-500/25" />
                        }
                    />
                </div>
            </div>
        </ShowLayout>
    );
};

export default BadgesShowPage;
