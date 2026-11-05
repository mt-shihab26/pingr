import { Field, FieldLabel } from "@/components/ui/field";

import { SettingsSection } from "@/components/screens/dashboard/targets/show/uptime/settings/settings-section";
import { SimpleSelect } from "@/components/screens/dashboard/targets/show/uptime/settings/simple-select";

const frequencies = [
    { value: "30", label: "30 minutes" },
    { value: "60", label: "1 hour" },
    { value: "120", label: "2 hours" },
    { value: "360", label: "6 hours" },
    { value: "1440", label: "1 day" },
];

export const CheckFrequencySection = () => {
    return (
        <SettingsSection
            title="Check frequency"
            description="Configure how often we should run the DNS check."
        >
            <Field>
                <FieldLabel>Run check every</FieldLabel>
                <SimpleSelect items={frequencies} defaultValue="120" />
            </Field>
        </SettingsSection>
    );
};
