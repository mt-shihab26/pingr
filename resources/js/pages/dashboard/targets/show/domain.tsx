import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";
import { router } from "@inertiajs/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ShowLayout } from "@/components/screens/dashboard/targets/show/shared/show-layout";
import { CheckHistoryTab } from "@/components/screens/dashboard/targets/show/shared/check-history-tab";
import { CheckSnoozeTab } from "@/components/screens/dashboard/targets/show/shared/check-snooze-tab";

import { Report } from "@/components/screens/dashboard/targets/show/domain/report";
import { SettingsTab } from "@/components/screens/dashboard/targets/show/domain/settings";

const runs = ["2026-11-05 10:23:33", "2026-10-29 10:56:44"].map((endedAt) => ({
    result: "Succeeded" as const,
    endedAt,
}));

const DomainShowPage = ({
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
            title="Domain"
            breadcrumbs={[
                {
                    title: "Domain",
                    href: route("dashboard.targets.show.domain", { team, target }),
                },
            ]}
        >
            <Tabs value={tab} onValueChange={(tab) => router.reload({ data: { tab } })}>
                <TabsList variant="line">
                    <TabsTrigger value="report">Report for {endpoint}</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                    <TabsTrigger value="snooze">Snooze</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="report">
                    <Report />
                </TabsContent>
                <TabsContent value="history">
                    <CheckHistoryTab check="Domain" endpoint={endpoint} runs={runs} />
                </TabsContent>
                <TabsContent value="snooze">
                    <CheckSnoozeTab check="domain" />
                </TabsContent>
                <TabsContent value="settings">
                    <SettingsTab target={target} />
                </TabsContent>
            </Tabs>
        </ShowLayout>
    );
};

export default DomainShowPage;
