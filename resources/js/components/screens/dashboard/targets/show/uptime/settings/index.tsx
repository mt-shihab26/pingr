import type { TTarget } from "@/types/models";

import { RequestsSection } from "./requests-section";
import { ResponsesSection } from "./responses-section";
import { LocationSection } from "./location-section";
import { CheckFrequencySection } from "./check-frequency-section";
import { NotificationsSection } from "./notifications-section";
import { ApiSection } from "./api-section";

export const SettingsTab = ({ target }: { target: TTarget }) => {
    return (
        <div className="flex flex-col gap-4">
            <RequestsSection />
            <ResponsesSection />
            <LocationSection endpoint={target.label ?? target.endpoint} />
            <CheckFrequencySection />
            <NotificationsSection />
            <ApiSection targetId={target.id} />
        </div>
    );
};
