import type { TTarget } from "@/types/models";

import { ApiSection } from "@/components/screens/dashboard/targets/show/uptime/settings/api-section";
import { CheckFrequencySection } from "@/components/screens/dashboard/targets/show/uptime/settings/check-frequency-section";
import { RequestHeadersSection } from "@/components/screens/dashboard/targets/show/broken-links/settings/request-headers-section";

import { ResultsSection } from "./results-section";
import { NotificationsSection } from "./notifications-section";

export const SettingsTab = ({ target }: { target: TTarget }) => {
    const endpoint = target.label ?? target.endpoint;

    return (
        <div className="flex flex-col gap-4">
            <ResultsSection endpoint={endpoint} />
            <RequestHeadersSection
                endpoint={endpoint}
                description={`These headers will be sent with every HTTP request made by the application health check to ${endpoint}.`}
            />
            <CheckFrequencySection description="Configure how often we check your application's health." />
            <NotificationsSection />
            <ApiSection targetId={target.id} />
        </div>
    );
};
