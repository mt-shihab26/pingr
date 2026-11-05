import type { TTarget } from "@/types/models";

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from "@/components/ui/input-group";

import { ApiSection } from "@/components/screens/dashboard/targets/show/uptime/settings/api-section";
import { SettingsSection } from "@/components/screens/dashboard/targets/show/uptime/settings/settings-section";
import { FrequencySection } from "@/components/screens/dashboard/targets/show/shared/frequency-section";

export const SettingsTab = ({ target }: { target: TTarget }) => {
    return (
        <div className="flex flex-col gap-4">
            <SettingsSection
                title="Notifications"
                description="Customize when notifications should be sent."
            >
                <Field>
                    <FieldLabel htmlFor="domain-expires-threshold">
                        Expires soon threshold in days
                    </FieldLabel>
                    <InputGroup>
                        <InputGroupInput
                            id="domain-expires-threshold"
                            type="number"
                            defaultValue={10}
                            min={1}
                        />
                        <InputGroupAddon align="inline-end">
                            <InputGroupText>days</InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                    <FieldDescription>
                        If your domain will expire in less than this number of days, we'll start
                        sending you a notification once a day.
                    </FieldDescription>
                </Field>
            </SettingsSection>
            <FrequencySection check="Domain" defaultValue="240" />
            <ApiSection targetId={target.id} />
        </div>
    );
};
