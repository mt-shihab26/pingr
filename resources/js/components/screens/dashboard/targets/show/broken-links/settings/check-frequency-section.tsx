import { Field, FieldLabel } from "@/components/ui/field";

import { SettingsSection } from "@/components/screens/dashboard/targets/show/uptime/settings/settings-section";
import { SimpleSelect } from "@/components/screens/dashboard/targets/show/uptime/settings/simple-select";

const frequencies = [
    { value: "60", label: "1 hour" },
    { value: "360", label: "6 hours" },
    { value: "720", label: "12 hours" },
    { value: "1440", label: "1 day" },
    { value: "10080", label: "1 week" },
];

export const CheckFrequencySection = ({
    description = "Configure how often we should run the broken links and mixed content checks.",
}: {
    description?: string;
}) => {
    return (
        <SettingsSection title="Check frequency" description={description}>
            <Field>
                <FieldLabel>Run check every</FieldLabel>
                <SimpleSelect items={frequencies} defaultValue="1440" />
            </Field>
        </SettingsSection>
    );
};
