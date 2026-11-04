import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { SettingsSection } from "./settings-section";
import { SimpleSelect } from "./simple-select";

const units = [
    { value: "minutes", label: "minutes" },
    { value: "hours", label: "hours" },
];

export const CheckFrequencySection = () => {
    return (
        <SettingsSection
            title="Check frequency"
            description="Configure how often we check your uptime."
        >
            <Field>
                <FieldLabel>Run check every</FieldLabel>
                <div className="flex gap-2">
                    <Input type="number" defaultValue={1} min={1} />
                    <SimpleSelect items={units} defaultValue="minutes" className="w-32" />
                </div>
            </Field>
        </SettingsSection>
    );
};
