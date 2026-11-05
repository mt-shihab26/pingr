import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";

import { SettingsSection } from "@/components/screens/dashboard/targets/show/uptime/settings/settings-section";
import { SimpleSelect } from "@/components/screens/dashboard/targets/show/uptime/settings/simple-select";

const continents = ["Africa", "Asia", "Europe", "North America", "Oceania", "South America"].map(
    (label) => ({ value: label.toLowerCase().replace(" ", "-"), label }),
);

const devices = [
    { value: "desktop", label: "Desktop" },
    { value: "mobile", label: "Mobile" },
];

export const GeneralSection = () => {
    return (
        <SettingsSection
            title="General"
            description="These settings determine how the lighthouse check will be run."
        >
            <FieldGroup>
                <Field>
                    <FieldLabel>Continent</FieldLabel>
                    <SimpleSelect items={continents} defaultValue="asia" />
                    <FieldDescription>
                        We'll perform the lighthouse check from this continent.
                    </FieldDescription>
                </Field>
                <Field>
                    <FieldLabel>Device emulation</FieldLabel>
                    <SimpleSelect items={devices} defaultValue="desktop" />
                    <FieldDescription>
                        Choose whether to emulate a desktop or mobile device.
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </SettingsSection>
    );
};
