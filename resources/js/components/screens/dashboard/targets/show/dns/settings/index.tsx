import type { TTarget } from "@/types/models";

import { ApiSection } from "@/components/screens/dashboard/targets/show/uptime/settings/api-section";

import { RecordTypesSection } from "./record-types-section";
import { CustomizeSection } from "./customize-section";
import { CheckFrequencySection } from "./check-frequency-section";

export const SettingsTab = ({ target }: { target: TTarget }) => {
    return (
        <div className="flex flex-col gap-4">
            <RecordTypesSection />
            <CustomizeSection />
            <CheckFrequencySection />
            <ApiSection targetId={target.id} />
        </div>
    );
};
