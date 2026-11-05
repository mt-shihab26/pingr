import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { SettingsSection } from "@/components/screens/dashboard/targets/show/uptime/settings/settings-section";
import { SimpleSelect } from "@/components/screens/dashboard/targets/show/uptime/settings/simple-select";

import { FileDrop } from "./file-drop";

const positions = [
    { value: "left", label: "Left" },
    { value: "center", label: "Center" },
    { value: "right", label: "Right" },
];

export const LogoTab = () => {
    return (
        <div className="flex flex-col gap-4">
            <SettingsSection
                title="Logo"
                description="Upload your logo and choose how it sits in the header. Resized to 270px height and shown at 90px. Accepted formats: png, jpg."
            >
                <FieldGroup>
                    <Field>
                        <FieldLabel>Position</FieldLabel>
                        <SimpleSelect items={positions} defaultValue="center" />
                        <FieldDescription>
                            Choose the position of the logo on your status page.
                        </FieldDescription>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="logo-max-height">Max height (px)</FieldLabel>
                        <Input id="logo-max-height" type="number" min={1} defaultValue={90} />
                    </Field>
                    <Field>
                        <FieldLabel>Logo</FieldLabel>
                        <FileDrop accept="image/png,image/jpeg" />
                    </Field>
                </FieldGroup>
            </SettingsSection>
            <SettingsSection
                title="Favicon"
                description="The icon shown in the browser tab for your status page. Accepted formats: png, jpg."
            >
                <Field>
                    <FieldLabel>Favicon</FieldLabel>
                    <FileDrop accept="image/png,image/jpeg" />
                </Field>
            </SettingsSection>
        </div>
    );
};
