import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";
import { router } from "@inertiajs/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ShowLayout } from "@/components/screens/dashboard/targets/show/shared/show-layout";
import { CheckHistoryTab } from "@/components/screens/dashboard/targets/show/shared/check-history-tab";
import { CheckSnoozeTab } from "@/components/screens/dashboard/targets/show/shared/check-snooze-tab";

import { Report } from "@/components/screens/dashboard/targets/show/mixed-content/report";
import { SettingsTab } from "@/components/screens/dashboard/targets/show/mixed-content/settings";

const runs = [
    "2026-11-05 16:01:09",
    "2026-11-04 15:17:39",
    "2026-11-03 17:33:45",
    "2026-11-02 15:27:50",
    "2026-11-01 20:04:55",
].map((endedAt) => ({ result: "Succeeded" as const, endedAt }));

const MixedContentShowPage = ({
    target,
    tab,
}: {
    target: TTarget;
    tab: "report" | "history" | "snooze" | "settings";
}) => {
    const { team } = useShared();
    const endpoint = target.label ?? target.endpoint;

    return (
        <ShowLayout
            target={target}
            title="Mixed content"
            breadcrumbs={[
                {
                    title: "Mixed content",
                    href: route("dashboard.targets.show.mixed-content", { team, target }),
                },
            ]}
        >
            <Tabs value={tab} onValueChange={(tab) => router.reload({ data: { tab } })}>
                <TabsList variant="line">
                    <TabsTrigger value="report">Report</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                    <TabsTrigger value="snooze">Snooze</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="report">
                    <Report />
                </TabsContent>
                <TabsContent value="history">
                    <CheckHistoryTab check="Mixed content" endpoint={endpoint} runs={runs} />
                </TabsContent>
                <TabsContent value="snooze">
                    <CheckSnoozeTab check="mixed content" />
                </TabsContent>
                <TabsContent value="settings">
                    <SettingsTab target={target} />
                </TabsContent>
            </Tabs>
        </ShowLayout>
    );
};

export default MixedContentShowPage;
