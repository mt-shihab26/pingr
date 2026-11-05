import type { TTarget } from "@/types/models";

import { ApiSection } from "@/components/screens/dashboard/targets/show/uptime/settings/api-section";

import { LinksToCheckSection } from "./links-to-check-section";
import { RequestHeadersSection } from "./request-headers-section";
import { CrawlerSection } from "./crawler-section";
import { CheckFrequencySection } from "./check-frequency-section";
import { NotificationsSection } from "./notifications-section";

export const SettingsTab = ({ target }: { target: TTarget }) => {
    const endpoint = target.label ?? target.endpoint;

    return (
        <div className="flex flex-col gap-4">
            <LinksToCheckSection endpoint={endpoint} />
            <RequestHeadersSection endpoint={endpoint} />
            <CrawlerSection endpoint={endpoint} />
            <CheckFrequencySection />
            <NotificationsSection />
            <ApiSection targetId={target.id} />
        </div>
    );
};
