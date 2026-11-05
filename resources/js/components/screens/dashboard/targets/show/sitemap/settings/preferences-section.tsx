import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from "@/components/ui/input-group";

import { SettingsSection } from "@/components/screens/dashboard/targets/show/uptime/settings/settings-section";
import { SimpleSelect } from "@/components/screens/dashboard/targets/show/uptime/settings/simple-select";

const speeds = [
    { value: "slow", label: "Slow (1 concurrent request, 1000ms)" },
    { value: "default", label: "Default (2 concurrent requests, 250ms)" },
    { value: "fast", label: "Fast (5 concurrent requests, 100ms)" },
];

export const PreferencesSection = ({ endpoint }: { endpoint: string }) => {
    return (
        <SettingsSection title="Sitemap preferences" description="Configure the sitemap check.">
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="sitemap-path">Sitemap URL</FieldLabel>
                    <InputGroup>
                        <InputGroupAddon>
                            <InputGroupText>https://{endpoint}/</InputGroupText>
                        </InputGroupAddon>
                        <InputGroupInput id="sitemap-path" defaultValue="sitemap.xml" />
                    </InputGroup>
                </Field>
                <Field>
                    <FieldLabel>Sitemap speed</FieldLabel>
                    <SimpleSelect items={speeds} defaultValue="default" />
                    <FieldDescription>
                        How fast we check URLs found on your sitemap(s). If you experience high
                        load, you can slow us down here.
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </SettingsSection>
    );
};
