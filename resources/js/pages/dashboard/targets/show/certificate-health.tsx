import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";
import { router } from "@inertiajs/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ShowLayout } from "@/components/screens/dashboard/targets/show/shared/show-layout";

import { Report } from "@/components/screens/dashboard/targets/show/certificate-health/report";
import { DetectedCertificatesTab } from "@/components/screens/dashboard/targets/show/certificate-health/detected-certificates";
import { HistoryTab } from "@/components/screens/dashboard/targets/show/certificate-health/history";
import { SnoozeTab } from "@/components/screens/dashboard/targets/show/certificate-health/snooze";
import { SettingsTab } from "@/components/screens/dashboard/targets/show/certificate-health/settings";

const CertificateHealthShowPage = ({
    target,
    tab,
}: {
    target: TTarget;
    tab: "report" | "detected-certificates" | "history" | "snooze" | "settings";
}) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            title="Certificate health"
            breadcrumbs={[
                {
                    title: "Certificate health",
                    href: route("dashboard.targets.show.certificate-health", { team, target }),
                },
            ]}
        >
            <Tabs value={tab} onValueChange={(tab) => router.reload({ data: { tab } })}>
                <TabsList variant="line">
                    <TabsTrigger value="report">Report</TabsTrigger>
                    <TabsTrigger value="detected-certificates">Detected certificates</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                    <TabsTrigger value="snooze">Snooze</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="report">
                    <Report />
                </TabsContent>
                <TabsContent value="detected-certificates">
                    <DetectedCertificatesTab />
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

export default CertificateHealthShowPage;
