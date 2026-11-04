import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";
import { checks, types } from "@/lib/targets";
import { router } from "@inertiajs/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";

import { ShowLayout } from "@/components/screens/dashboard/targets/show/shared/show-layout";
import { ActiveCheckCard } from "@/components/screens/dashboard/targets/show/overview/active-check-card";
import { DisabledCheckCard } from "@/components/screens/dashboard/targets/show/overview/disabled-check-card";

const OverviewShowPage = ({ target, tab }: { target: TTarget; tab: "active" | "disabled" }) => {
    const { team } = useShared();

    const supported = types.find((type) => type.key === target.type)?.checks ?? [];

    const active = checks.filter(
        (check) => supported.includes(check.key) && target[`check_${check.key}`],
    );

    const disabled = checks.filter(
        (check) => supported.includes(check.key) && !target[`check_${check.key}`],
    );

    return (
        <ShowLayout
            target={target}
            title="Overview"
            breadcrumbs={[
                {
                    title: "Overview",
                    href: route("dashboard.targets.show.overview", { team, target }),
                },
            ]}
        >
            <Tabs value={tab} onValueChange={(tab) => router.reload({ data: { tab } })}>
                <TabsList variant="line">
                    <TabsTrigger value="active">
                        Active
                        <Badge variant={tab === "active" ? "default" : "secondary"}>
                            {active.length}
                        </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="disabled">
                        Disabled
                        <Badge variant={tab === "disabled" ? "default" : "secondary"}>
                            {disabled.length}
                        </Badge>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="active">
                    {active.length === 0 ? (
                        <Empty className="border">
                            <EmptyHeader>
                                <EmptyTitle>No active checks</EmptyTitle>
                                <EmptyDescription>
                                    Enable a check to start monitoring this target.
                                </EmptyDescription>
                            </EmptyHeader>
                        </Empty>
                    ) : (
                        <div className="grid gap-4 lg:grid-cols-2">
                            {active.map((check) => (
                                <ActiveCheckCard key={check.key} target={target} check={check} />
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="disabled">
                    {disabled.length === 0 ? (
                        <Empty className="border">
                            <EmptyHeader>
                                <EmptyTitle>All checks enabled</EmptyTitle>
                                <EmptyDescription>
                                    Every check available for this target is active.
                                </EmptyDescription>
                            </EmptyHeader>
                        </Empty>
                    ) : (
                        <div className="grid gap-4 lg:grid-cols-2">
                            {disabled.map((check) => (
                                <DisabledCheckCard key={check.key} target={target} check={check} />
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </ShowLayout>
    );
};

export default OverviewShowPage;
