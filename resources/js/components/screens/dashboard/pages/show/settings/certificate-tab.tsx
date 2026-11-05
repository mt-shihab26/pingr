import type { TStatusPage } from "@/components/screens/dashboard/pages/status-pages-data";

import { router } from "@inertiajs/react";
import { Download, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FieldDescription } from "@/components/ui/field";

import { SettingsSection } from "@/components/screens/dashboard/targets/show/uptime/settings/settings-section";

export const CertificateTab = ({ statusPage }: { statusPage: TStatusPage }) => {
    return (
        <SettingsSection
            title="Certificate"
            description="Manage the TLS certificate we serve for your status page's custom domain."
            save={false}
        >
            {statusPage.customDomain ? (
                <div className="flex flex-col gap-3">
                    <FieldDescription>
                        We serve a certificate for <code>{statusPage.customDomain}</code>. You can
                        download it or upload your own.
                    </FieldDescription>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            Download certificate
                            <Download data-icon="inline-end" />
                        </Button>
                        <Button variant="outline" size="sm">
                            Upload your own
                            <Upload data-icon="inline-end" />
                        </Button>
                    </div>
                </div>
            ) : (
                <FieldDescription>
                    This status page doesn't have a custom domain yet. Once you set one on the{" "}
                    <Button
                        variant="link"
                        className="h-auto p-0"
                        onClick={() => router.reload({ data: { tab: "url" } })}
                    >
                        URL tab
                    </Button>
                    , you'll be able to download our certificate or upload your own.
                </FieldDescription>
            )}
        </SettingsSection>
    );
};
