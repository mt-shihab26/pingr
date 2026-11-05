import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";
import { router } from "@inertiajs/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ShowLayout } from "@/components/screens/dashboard/targets/show/shared/show-layout";
import { CheckSnoozeTab } from "@/components/screens/dashboard/targets/show/shared/check-snooze-tab";

import { RecordsTab } from "@/components/screens/dashboard/targets/show/dns/records";
import { HistoryTab } from "@/components/screens/dashboard/targets/show/dns/history-tab";
import { SettingsTab } from "@/components/screens/dashboard/targets/show/dns/settings";

const DnsShowPage = ({
    target,
    tab,
}: {
    target: TTarget;
    tab: "records" | "history" | "snooze" | "settings";
}) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            title="DNS"
            breadcrumbs={[
                {
                    title: "DNS",
                    href: route("dashboard.targets.show.dns", { team, target }),
                },
            ]}
        >
            <Tabs value={tab} onValueChange={(tab) => router.reload({ data: { tab } })}>
                <TabsList variant="line">
                    <TabsTrigger value="records">Current DNS records</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                    <TabsTrigger value="snooze">Snooze</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="records">
                    <RecordsTab endpoint={target.label ?? target.endpoint} />
                </TabsContent>
                <TabsContent value="history">
                    <HistoryTab />
                </TabsContent>
                <TabsContent value="snooze">
                    <CheckSnoozeTab check="DNS" />
                </TabsContent>
                <TabsContent value="settings">
                    <SettingsTab target={target} />
                </TabsContent>
            </Tabs>
        </ShowLayout>
    );
};

export default DnsShowPage;
