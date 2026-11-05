import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";
import { router } from "@inertiajs/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ShowLayout } from "@/components/screens/dashboard/targets/show/shared/show-layout";

import { SettingsTab } from "@/components/screens/dashboard/targets/show/monthly-reports/settings";
import { ArchiveTab } from "@/components/screens/dashboard/targets/show/monthly-reports/archive";

const MonthlyReportsShowPage = ({
    target,
    tab,
}: {
    target: TTarget;
    tab: "settings" | "archive";
}) => {
    const { team } = useShared();
    const endpoint = target.label ?? target.endpoint;

    return (
        <ShowLayout
            target={target}
            title="Monthly reports"
            breadcrumbs={[
                {
                    title: "Monthly reports",
                    href: route("dashboard.targets.show.monthly-reports", { team, target }),
                },
            ]}
        >
            <Tabs value={tab} onValueChange={(tab) => router.reload({ data: { tab } })}>
                <TabsList variant="line">
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                    <TabsTrigger value="archive">Past reports</TabsTrigger>
                </TabsList>
                <TabsContent value="settings">
                    <SettingsTab endpoint={endpoint} />
                </TabsContent>
                <TabsContent value="archive">
                    <ArchiveTab />
                </TabsContent>
            </Tabs>
        </ShowLayout>
    );
};

export default MonthlyReportsShowPage;
