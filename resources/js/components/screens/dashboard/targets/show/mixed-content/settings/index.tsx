import type { TTarget } from "@/types/models";

import { ApiSection } from "@/components/screens/dashboard/targets/show/uptime/settings/api-section";

import { CrawlerSection } from "@/components/screens/dashboard/targets/show/broken-links/settings/crawler-section";
import { RequestHeadersSection } from "@/components/screens/dashboard/targets/show/broken-links/settings/request-headers-section";
import { CheckFrequencySection } from "@/components/screens/dashboard/targets/show/broken-links/settings/check-frequency-section";

export const SettingsTab = ({ target }: { target: TTarget }) => {
    const endpoint = target.label ?? target.endpoint;

    return (
        <div className="flex flex-col gap-4">
            <CrawlerSection endpoint={endpoint} />
            <RequestHeadersSection endpoint={endpoint} />
            <CheckFrequencySection />
            <ApiSection targetId={target.id} />
        </div>
    );
};
