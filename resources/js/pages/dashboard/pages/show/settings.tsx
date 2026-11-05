import { router } from "@inertiajs/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { StatusPageLayout } from "@/components/screens/dashboard/pages/show/shared/status-page-layout";
import { findStatusPage } from "@/components/screens/dashboard/pages/status-pages-data";
import { UrlTab } from "@/components/screens/dashboard/pages/show/settings/url-tab";
import { CertificateTab } from "@/components/screens/dashboard/pages/show/settings/certificate-tab";
import { SecretTab } from "@/components/screens/dashboard/pages/show/settings/secret-tab";

const SettingsStatusPage = ({
    statusPageId,
    tab,
}: {
    statusPageId: string;
    tab: "url" | "certificate" | "secret";
}) => {
    const statusPage = findStatusPage(statusPageId);

    return (
        <StatusPageLayout statusPageId={statusPageId} title="Settings">
            <Tabs value={tab} onValueChange={(tab) => router.reload({ data: { tab } })}>
                <TabsList variant="line">
                    <TabsTrigger value="url">URL</TabsTrigger>
                    <TabsTrigger value="certificate">Certificate</TabsTrigger>
                    <TabsTrigger value="secret">Secret</TabsTrigger>
                </TabsList>
                <TabsContent value="url">
                    <UrlTab statusPage={statusPage} />
                </TabsContent>
                <TabsContent value="certificate">
                    <CertificateTab statusPage={statusPage} />
                </TabsContent>
                <TabsContent value="secret">
                    <SecretTab />
                </TabsContent>
            </Tabs>
        </StatusPageLayout>
    );
};

export default SettingsStatusPage;
