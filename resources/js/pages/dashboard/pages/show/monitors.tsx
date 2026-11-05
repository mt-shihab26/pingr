import { router } from "@inertiajs/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { StatusPageLayout } from "@/components/screens/dashboard/pages/show/shared/status-page-layout";
import { MonitorsTab } from "@/components/screens/dashboard/pages/show/monitors/monitors-tab";
import { AutoUpdatesTab } from "@/components/screens/dashboard/pages/show/monitors/auto-updates-tab";
import { UptimeHistoryTab } from "@/components/screens/dashboard/pages/show/monitors/uptime-history-tab";

const MonitorsStatusPage = ({
    statusPageId,
    tab,
}: {
    statusPageId: string;
    tab: "monitors" | "auto-updates" | "uptime-history";
}) => {
    return (
        <StatusPageLayout statusPageId={statusPageId} title="Monitors">
            <Tabs value={tab} onValueChange={(tab) => router.reload({ data: { tab } })}>
                <TabsList variant="line">
                    <TabsTrigger value="monitors">Monitors</TabsTrigger>
                    <TabsTrigger value="auto-updates">Auto updates</TabsTrigger>
                    <TabsTrigger value="uptime-history">Uptime history</TabsTrigger>
                </TabsList>
                <TabsContent value="monitors">
                    <MonitorsTab />
                </TabsContent>
                <TabsContent value="auto-updates">
                    <AutoUpdatesTab />
                </TabsContent>
                <TabsContent value="uptime-history">
                    <UptimeHistoryTab />
                </TabsContent>
            </Tabs>
        </StatusPageLayout>
    );
};

export default MonitorsStatusPage;
