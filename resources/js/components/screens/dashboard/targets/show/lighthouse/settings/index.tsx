import type { TTarget } from "@/types/models";

import { ApiSection } from "@/components/screens/dashboard/targets/show/uptime/settings/api-section";
import { RequestHeadersSection } from "@/components/screens/dashboard/targets/show/broken-links/settings/request-headers-section";

import { GeneralSection } from "./general-section";
import { CheckFrequencySection } from "./check-frequency-section";
import { NotificationsSection } from "./notifications-section";

export const SettingsTab = ({ target }: { target: TTarget }) => {
    return (
        <div className="flex flex-col gap-4">
            <GeneralSection />
            <RequestHeadersSection endpoint={target.label ?? target.endpoint} />
            <CheckFrequencySection />
            <NotificationsSection />
            <ApiSection targetId={target.id} />
        </div>
    );
};
