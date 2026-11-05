import type { TTarget } from "@/types/models";

import { ApiSection } from "@/components/screens/dashboard/targets/show/uptime/settings/api-section";
import { RequestHeadersSection } from "@/components/screens/dashboard/targets/show/broken-links/settings/request-headers-section";
import { CheckFrequencySection } from "@/components/screens/dashboard/targets/show/broken-links/settings/check-frequency-section";
import { NotificationsSection } from "@/components/screens/dashboard/targets/show/application-health/settings/notifications-section";

import { PreferencesSection } from "./preferences-section";

export const SettingsTab = ({ target }: { target: TTarget }) => {
    const endpoint = target.label ?? target.endpoint;

    return (
        <div className="flex flex-col gap-4">
            <PreferencesSection endpoint={endpoint} />
            <NotificationsSection
                subject="sitemap"
                hint="raise it if your sitemap is only regenerated occasionally"
            />
            <RequestHeadersSection endpoint={endpoint} />
            <CheckFrequencySection description="Configure how often we should run the Sitemap check." />
            <ApiSection targetId={target.id} />
        </div>
    );
};
