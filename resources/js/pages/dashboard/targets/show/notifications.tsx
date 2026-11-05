import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";
import { router } from "@inertiajs/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ShowLayout } from "@/components/screens/dashboard/targets/show/shared/show-layout";

import { NotificationsTab } from "@/components/screens/dashboard/targets/show/notifications/notifications-tab";
import { PreferencesTab } from "@/components/screens/dashboard/targets/show/notifications/preferences-tab";

const NotificationsShowPage = ({
    target,
    tab,
}: {
    target: TTarget;
    tab: "notifications" | "preferences";
}) => {
    const { team } = useShared();
    const endpoint = target.label ?? target.endpoint;

    return (
        <ShowLayout
            target={target}
            title="Notifications"
            breadcrumbs={[
                {
                    title: "Notifications",
                    href: route("dashboard.targets.show.notifications", { team, target }),
                },
            ]}
        >
            <Tabs value={tab} onValueChange={(tab) => router.reload({ data: { tab } })}>
                <TabsList variant="line">
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>
                <TabsContent value="notifications">
                    <NotificationsTab endpoint={endpoint} />
                </TabsContent>
                <TabsContent value="preferences">
                    <PreferencesTab endpoint={endpoint} />
                </TabsContent>
            </Tabs>
        </ShowLayout>
    );
};

export default NotificationsShowPage;
