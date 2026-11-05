import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";
import { router } from "@inertiajs/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ShowLayout } from "@/components/screens/dashboard/targets/show/shared/show-layout";
import { CheckHistoryTab } from "@/components/screens/dashboard/targets/show/shared/check-history-tab";
import { CheckSnoozeTab } from "@/components/screens/dashboard/targets/show/shared/check-snooze-tab";

import { Report } from "@/components/screens/dashboard/targets/show/sitemap/report";
import { SettingsTab } from "@/components/screens/dashboard/targets/show/sitemap/settings";

const runs = ["2026-11-05 21:41:12", "2026-11-04 21:40:03", "2026-11-03 21:39:55"].map(
    (endedAt) => ({ result: "Failed" as const, endedAt }),
);

const SitemapShowPage = ({
    target,
    tab,
}: {
    target: TTarget;
    tab: "report" | "history" | "acknowledge" | "settings";
}) => {
    const { team } = useShared();
    const endpoint = target.label ?? target.endpoint;

    return (
        <ShowLayout
            target={target}
            title="Sitemap"
            breadcrumbs={[
                {
                    title: "Sitemap",
                    href: route("dashboard.targets.show.sitemap", { team, target }),
                },
            ]}
        >
            <Tabs value={tab} onValueChange={(tab) => router.reload({ data: { tab } })}>
                <TabsList variant="line">
                    <TabsTrigger value="report">Report</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                    <TabsTrigger value="acknowledge">Acknowledge</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="report">
                    <Report endpoint={endpoint} />
                </TabsContent>
                <TabsContent value="history">
                    <CheckHistoryTab check="Sitemap" endpoint={endpoint} runs={runs} />
                </TabsContent>
                <TabsContent value="acknowledge">
                    <CheckSnoozeTab
                        check="sitemap"
                        action="Acknowledge"
                        description="We'll silence these alerts until the check recovers, or until the selected time runs out, whichever comes first."
                    />
                </TabsContent>
                <TabsContent value="settings">
                    <SettingsTab target={target} />
                </TabsContent>
            </Tabs>
        </ShowLayout>
    );
};

export default SitemapShowPage;
