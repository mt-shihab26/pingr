import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";
import { router } from "@inertiajs/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ShowLayout } from "@/components/screens/dashboard/targets/show/shared/show-layout";

import { Report } from "@/components/screens/dashboard/targets/show/uptime/report";
import { HistoryTab } from "@/components/screens/dashboard/targets/show/uptime/history";
import { SnoozeTab } from "@/components/screens/dashboard/targets/show/uptime/snooze";
import { SettingsTab } from "@/components/screens/dashboard/targets/show/uptime/settings";

const UptimeShowPage = ({
    target,
    tab,
}: {
    target: TTarget;
    tab: "report" | "history" | "snooze" | "settings";
}) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            title="Uptime"
            breadcrumbs={[
                {
                    title: "Uptime",
                    href: route("dashboard.targets.show.uptime", { team, target }),
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
                    <Report target={target} />
                </TabsContent>
                <TabsContent value="history">
                    <HistoryTab target={target} />
                </TabsContent>
                <TabsContent value="snooze">
                    <SnoozeTab />
                </TabsContent>
                <TabsContent value="settings">
                    <SettingsTab target={target} />
                </TabsContent>
            </Tabs>
        </ShowLayout>
    );
};

export default UptimeShowPage;
