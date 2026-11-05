import { router } from "@inertiajs/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { StatusPageLayout } from "@/components/screens/dashboard/pages/show/shared/status-page-layout";
import { SubscriptionsTab } from "@/components/screens/dashboard/pages/show/notifications/subscriptions-tab";
import { SubscribersTab } from "@/components/screens/dashboard/pages/show/notifications/subscribers-tab";

const NotificationsStatusPage = ({
    statusPageId,
    tab,
}: {
    statusPageId: string;
    tab: "subscriptions" | "subscribers";
}) => {
    return (
        <StatusPageLayout statusPageId={statusPageId} title="Notifications">
            <Tabs value={tab} onValueChange={(tab) => router.reload({ data: { tab } })}>
                <TabsList variant="line">
                    <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
                    <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
                </TabsList>
                <TabsContent value="subscriptions">
                    <SubscriptionsTab />
                </TabsContent>
                <TabsContent value="subscribers">
                    <SubscribersTab />
                </TabsContent>
            </Tabs>
        </StatusPageLayout>
    );
};

export default NotificationsStatusPage;
