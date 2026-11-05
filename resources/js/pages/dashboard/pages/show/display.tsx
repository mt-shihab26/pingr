import { router } from "@inertiajs/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { StatusPageLayout } from "@/components/screens/dashboard/pages/show/shared/status-page-layout";
import { findStatusPage } from "@/components/screens/dashboard/pages/status-pages-data";
import { GeneralTab } from "@/components/screens/dashboard/pages/show/display/general-tab";
import { LogoTab } from "@/components/screens/dashboard/pages/show/display/logo-tab";
import { StyleTab } from "@/components/screens/dashboard/pages/show/display/style-tab";
import { BadgesTab } from "@/components/screens/dashboard/pages/show/display/badges-tab";

const DisplayStatusPage = ({
    statusPageId,
    tab,
}: {
    statusPageId: string;
    tab: "general" | "logo" | "style" | "badges";
}) => {
    const statusPage = findStatusPage(statusPageId);

    return (
        <StatusPageLayout statusPageId={statusPageId} title="Display settings">
            <Tabs value={tab} onValueChange={(tab) => router.reload({ data: { tab } })}>
                <TabsList variant="line">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="logo">Logo</TabsTrigger>
                    <TabsTrigger value="style">Style</TabsTrigger>
                    <TabsTrigger value="badges">Badges</TabsTrigger>
                </TabsList>
                <TabsContent value="general">
                    <GeneralTab statusPage={statusPage} />
                </TabsContent>
                <TabsContent value="logo">
                    <LogoTab />
                </TabsContent>
                <TabsContent value="style">
                    <StyleTab />
                </TabsContent>
                <TabsContent value="badges">
                    <BadgesTab statusPage={statusPage} />
                </TabsContent>
            </Tabs>
        </StatusPageLayout>
    );
};

export default DisplayStatusPage;
