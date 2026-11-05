import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";
import { router } from "@inertiajs/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ShowLayout } from "@/components/screens/dashboard/targets/show/shared/show-layout";
import { CheckHistoryTab } from "@/components/screens/dashboard/targets/show/shared/check-history-tab";
import { CheckSnoozeTab } from "@/components/screens/dashboard/targets/show/shared/check-snooze-tab";

import { ChecksTab } from "@/components/screens/dashboard/targets/show/application-health/checks";
import { SettingsTab } from "@/components/screens/dashboard/targets/show/application-health/settings";

const ApplicationHealthShowPage = ({
    target,
    tab,
}: {
    target: TTarget;
    tab: "checks" | "history" | "snooze" | "settings";
}) => {
    const { team } = useShared();
    const endpoint = target.label ?? target.endpoint;

    return (
        <ShowLayout
            target={target}
            title="Application health"
            breadcrumbs={[
                {
                    title: "Application health",
                    href: route("dashboard.targets.show.application-health", { team, target }),
                },
            ]}
        >
            <Tabs value={tab} onValueChange={(tab) => router.reload({ data: { tab } })}>
                <TabsList variant="line">
                    <TabsTrigger value="checks">Checks</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                    <TabsTrigger value="snooze">Snooze</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="checks">
                    <ChecksTab endpoint={endpoint} />
                </TabsContent>
                <TabsContent value="history">
                    <CheckHistoryTab check="Application health" endpoint={endpoint} runs={[]} />
                </TabsContent>
                <TabsContent value="snooze">
                    <CheckSnoozeTab check="application health" />
                </TabsContent>
                <TabsContent value="settings">
                    <SettingsTab target={target} />
                </TabsContent>
            </Tabs>
        </ShowLayout>
    );
};

export default ApplicationHealthShowPage;
