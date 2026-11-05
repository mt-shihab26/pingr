import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from "@/components/ui/input-group";

import { SettingsSection } from "@/components/screens/dashboard/targets/show/uptime/settings/settings-section";

export const NotificationsSection = ({
    subject = "application health",
    hint = "raise it to ride out the brief failures that can happen during deploys",
}: {
    subject?: string;
    hint?: string;
}) => {
    return (
        <SettingsSection
            title="Notifications"
            description={`Control when we alert you about ${subject} problems.`}
        >
            <Field>
                <FieldLabel htmlFor="consecutive-failures">
                    Consecutive failures before notifying
                </FieldLabel>
                <InputGroup>
                    <InputGroupInput
                        id="consecutive-failures"
                        type="number"
                        defaultValue={0}
                        min={0}
                    />
                    <InputGroupAddon align="inline-end">
                        <InputGroupText>checks</InputGroupText>
                    </InputGroupAddon>
                </InputGroup>
                <FieldDescription>
                    We'll wait for this many failed checks in a row before alerting you. Leave it at
                    0 to be alerted on the very first failure, or {hint}.
                </FieldDescription>
            </Field>
        </SettingsSection>
    );
};
