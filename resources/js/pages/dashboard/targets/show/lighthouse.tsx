import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";
import { router } from "@inertiajs/react";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ShowLayout } from "@/components/screens/dashboard/targets/show/shared/show-layout";
import { CheckSnoozeTab } from "@/components/screens/dashboard/targets/show/shared/check-snooze-tab";

import { LatestTab } from "@/components/screens/dashboard/targets/show/lighthouse/latest";
import { HistoryTab } from "@/components/screens/dashboard/targets/show/lighthouse/history";
import { SettingsTab } from "@/components/screens/dashboard/targets/show/lighthouse/settings";

const LighthouseShowPage = ({
    target,
    tab,
}: {
    target: TTarget;
    tab: "latest" | "history" | "snooze" | "settings" | "troubleshooting";
}) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            title="Lighthouse"
            breadcrumbs={[
                {
                    title: "Lighthouse",
                    href: route("dashboard.targets.show.lighthouse", { team, target }),
                },
            ]}
        >
            <Tabs value={tab} onValueChange={(tab) => router.reload({ data: { tab } })}>
                <TabsList variant="line">
                    <TabsTrigger value="latest">Latest Lighthouse report</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                    <TabsTrigger value="snooze">Snooze</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                    <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
                </TabsList>
                <TabsContent value="latest">
                    <LatestTab />
                </TabsContent>
                <TabsContent value="history">
                    <HistoryTab />
                </TabsContent>
                <TabsContent value="snooze">
                    <CheckSnoozeTab check="lighthouse" />
                </TabsContent>
                <TabsContent value="settings">
                    <SettingsTab target={target} />
                </TabsContent>
                <TabsContent value="troubleshooting">
                    <Card>
                        <CardContent>
                            We currently have no suggestions on how to troubleshoot this check.
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </ShowLayout>
    );
};

export default LighthouseShowPage;
