import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";

import { SettingsSection } from "./settings-section";
import { SimpleSelect } from "./simple-select";

const locations = [
    { value: "tokyo", label: "Tokyo" },
    { value: "frankfurt", label: "Frankfurt" },
    { value: "new-york", label: "New York" },
    { value: "singapore", label: "Singapore" },
];

export const LocationSection = ({ endpoint }: { endpoint: string }) => {
    return (
        <SettingsSection
            title="Location"
            description="We can check your server from all over the world."
        >
            <Field>
                <FieldLabel>Uptime check location</FieldLabel>
                <SimpleSelect items={locations} defaultValue="tokyo" />
                <FieldDescription>
                    We'll check the uptime of {endpoint} from this location. This is also the
                    location from where performance metrics are stored.
                </FieldDescription>
            </Field>
        </SettingsSection>
    );
};
