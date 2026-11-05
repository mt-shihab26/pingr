import { Field, FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";

import { SettingsSection } from "@/components/screens/dashboard/targets/show/uptime/settings/settings-section";

export const NotificationsSection = () => {
    return (
        <SettingsSection title="Notifications" description="Choose how you want to be notified.">
            <Field orientation="horizontal">
                <FieldContent>
                    <FieldLabel htmlFor="new-broken-links-only">New broken links only</FieldLabel>
                    <FieldDescription>
                        Prevent duplicate notifications and only be alerted when new broken links
                        are found. This will be applied to all 'Broken links found' notifications
                        you have enabled relating to this site.
                    </FieldDescription>
                </FieldContent>
                <Switch id="new-broken-links-only" />
            </Field>
        </SettingsSection>
    );
};
