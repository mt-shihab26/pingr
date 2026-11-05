import { router } from "@inertiajs/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { StatusPageLayout } from "@/components/screens/dashboard/pages/show/shared/status-page-layout";
import { LanguagesTab } from "@/components/screens/dashboard/pages/show/content/languages-tab";
import { TextsTab } from "@/components/screens/dashboard/pages/show/content/texts-tab";

const ContentStatusPage = ({
    statusPageId,
    tab,
}: {
    statusPageId: string;
    tab: "languages" | "texts";
}) => {
    return (
        <StatusPageLayout statusPageId={statusPageId} title="Content">
            <Tabs value={tab} onValueChange={(tab) => router.reload({ data: { tab } })}>
                <TabsList variant="line">
                    <TabsTrigger value="languages">Languages</TabsTrigger>
                    <TabsTrigger value="texts">Texts</TabsTrigger>
                </TabsList>
                <TabsContent value="languages">
                    <LanguagesTab />
                </TabsContent>
                <TabsContent value="texts">
                    <TextsTab />
                </TabsContent>
            </Tabs>
        </StatusPageLayout>
    );
};

export default ContentStatusPage;
