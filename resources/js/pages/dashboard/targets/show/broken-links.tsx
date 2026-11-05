import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";
import { router } from "@inertiajs/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ShowLayout } from "@/components/screens/dashboard/targets/show/shared/show-layout";

import { Report } from "@/components/screens/dashboard/targets/show/broken-links/report";
import { HistoryTab } from "@/components/screens/dashboard/targets/show/broken-links/history";
import { AcknowledgeTab } from "@/components/screens/dashboard/targets/show/broken-links/acknowledge";
import { SettingsTab } from "@/components/screens/dashboard/targets/show/broken-links/settings";
import { TroubleshootingTab } from "@/components/screens/dashboard/targets/show/broken-links/troubleshooting";

const BrokenLinksShowPage = ({
    target,
    tab,
}: {
    target: TTarget;
    tab: "report" | "history" | "acknowledge" | "settings" | "troubleshooting";
}) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            title="Broken links"
            breadcrumbs={[
                {
                    title: "Broken links",
                    href: route("dashboard.targets.show.broken-links", { team, target }),
                },
            ]}
        >
            <Tabs value={tab} onValueChange={(tab) => router.reload({ data: { tab } })}>
                <TabsList variant="line">
                    <TabsTrigger value="report">Report</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                    <TabsTrigger value="acknowledge">Acknowledge</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                    <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
                </TabsList>
                <TabsContent value="report">
                    <Report />
                </TabsContent>
                <TabsContent value="history">
                    <HistoryTab target={target} />
                </TabsContent>
                <TabsContent value="acknowledge">
                    <AcknowledgeTab />
                </TabsContent>
                <TabsContent value="settings">
                    <SettingsTab target={target} />
                </TabsContent>
                <TabsContent value="troubleshooting">
                    <TroubleshootingTab />
                </TabsContent>
            </Tabs>
        </ShowLayout>
    );
};

export default BrokenLinksShowPage;
