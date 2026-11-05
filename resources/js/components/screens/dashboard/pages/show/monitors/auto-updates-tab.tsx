import {
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";

import { SettingsSection } from "@/components/screens/dashboard/targets/show/uptime/settings/settings-section";

export const AutoUpdatesTab = () => {
    return (
        <div className="flex flex-col gap-4">
            <SettingsSection
                title="Auto updates"
                description="If anything happens to the sites you selected, we can automatically post a status update for you."
            >
                <Field orientation="horizontal" className="justify-between">
                    <FieldLabel htmlFor="auto-updates">Enable auto updates</FieldLabel>
                    <Switch id="auto-updates" defaultChecked />
                </Field>
            </SettingsSection>
            <SettingsSection
                title="Incident history"
                description="Show the incidents from the past 7 days on your status page."
            >
                <FieldGroup>
                    <Field orientation="horizontal" className="justify-between">
                        <FieldLabel htmlFor="incident-history">Show incident history</FieldLabel>
                        <Switch id="incident-history" defaultChecked />
                    </Field>
                    <Field orientation="horizontal">
                        <FieldContent>
                            <FieldLabel htmlFor="site-updates">Show site updates</FieldLabel>
                            <FieldDescription>
                                Also display automatic site incidents from the past 7 days.
                            </FieldDescription>
                        </FieldContent>
                        <Switch id="site-updates" defaultChecked />
                    </Field>
                </FieldGroup>
            </SettingsSection>
        </div>
    );
};
