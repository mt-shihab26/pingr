import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { SettingsSection } from "@/components/screens/dashboard/targets/show/uptime/settings/settings-section";

export const SecretTab = () => {
    return (
        <SettingsSection
            title="Secret"
            description="Keep your status page private by requiring a secret in the URL."
        >
            <Field>
                <FieldLabel htmlFor="status-page-secret">Secret</FieldLabel>
                <Input id="status-page-secret" placeholder="your-secret" />
                <FieldDescription>
                    You can set a secret to avoid your status page from being available publicly.
                    Your secret must be appended to the URL of your status page in this format{" "}
                    <code>?secret=your-secret</code>.
                </FieldDescription>
            </Field>
        </SettingsSection>
    );
};
