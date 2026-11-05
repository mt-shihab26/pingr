import { Field, FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";

import { SettingsSection } from "@/components/screens/dashboard/targets/show/uptime/settings/settings-section";

export const SubscriptionsTab = () => {
    return (
        <SettingsSection
            title="Notification subscriptions"
            description="Let visitors subscribe to updates straight from your status page, via email, Slack, and RSS."
        >
            <Field orientation="horizontal">
                <FieldContent>
                    <FieldLabel htmlFor="enable-subscriptions">
                        Enable notification subscriptions
                    </FieldLabel>
                    <FieldDescription>
                        When enabled, a dropdown will be displayed on your status page that allows
                        people to subscribe to updates via email, Slack, RSS, and other channels.
                    </FieldDescription>
                </FieldContent>
                <Switch id="enable-subscriptions" defaultChecked />
            </Field>
        </SettingsSection>
    );
};
