import { router } from "@inertiajs/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { StatusPageLayout } from "@/components/screens/dashboard/pages/show/shared/status-page-layout";
import { UpdatesTab } from "@/components/screens/dashboard/pages/show/updates/updates-tab";
import { TemplatesTab } from "@/components/screens/dashboard/pages/show/updates/templates-tab";

const UpdatesStatusPage = ({
    statusPageId,
    tab,
}: {
    statusPageId: string;
    tab: "updates" | "templates";
}) => {
    return (
        <StatusPageLayout statusPageId={statusPageId} title="Status updates">
            <Tabs value={tab} onValueChange={(tab) => router.reload({ data: { tab } })}>
                <TabsList variant="line">
                    <TabsTrigger value="updates">Status updates</TabsTrigger>
                    <TabsTrigger value="templates">Templates</TabsTrigger>
                </TabsList>
                <TabsContent value="updates">
                    <UpdatesTab />
                </TabsContent>
                <TabsContent value="templates">
                    <TemplatesTab />
                </TabsContent>
            </Tabs>
        </StatusPageLayout>
    );
};

export default UpdatesStatusPage;
