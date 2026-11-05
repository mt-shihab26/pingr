import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from "@/components/ui/input-group";

import { SettingsSection } from "@/components/screens/dashboard/targets/show/uptime/settings/settings-section";

export const PreferencesSection = () => {
    return (
        <SettingsSection
            title="Certificate health preferences"
            description="Customize when notifications should be sent."
        >
            <Field>
                <FieldLabel>Expires soon threshold in days</FieldLabel>
                <InputGroup>
                    <InputGroupInput type="number" min={1} />
                    <InputGroupAddon align="inline-end">
                        <InputGroupText>days</InputGroupText>
                    </InputGroupAddon>
                </InputGroup>
                <FieldDescription>
                    We'll send you a notification if your certificate expires within this number of
                    days. If this field is empty, we default to 7 days for Let's Encrypt
                    certificates and 14 days for all others.
                </FieldDescription>
            </Field>
        </SettingsSection>
    );
};
