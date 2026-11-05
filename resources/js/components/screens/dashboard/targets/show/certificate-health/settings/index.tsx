import type { TTarget } from "@/types/models";

import { ApiSection } from "@/components/screens/dashboard/targets/show/uptime/settings/api-section";

import { PreferencesSection } from "./preferences-section";
import { CheckFrequencySection } from "./check-frequency-section";

export const SettingsTab = ({ target }: { target: TTarget }) => {
    return (
        <div className="flex flex-col gap-4">
            <PreferencesSection />
            <CheckFrequencySection />
            <ApiSection targetId={target.id} />
        </div>
    );
};
