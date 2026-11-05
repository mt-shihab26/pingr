import type { TStatusPage } from "@/components/screens/dashboard/pages/status-pages-data";

import { Field, FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import { SettingsSection } from "@/components/screens/dashboard/targets/show/uptime/settings/settings-section";
import { SimpleSelect } from "@/components/screens/dashboard/targets/show/uptime/settings/simple-select";

const timezones = [
    "UTC",
    "Asia/Dhaka",
    "Asia/Tokyo",
    "Europe/Brussels",
    "Europe/London",
    "America/New_York",
].map((zone) => ({ value: zone, label: zone }));

export const GeneralTab = ({ statusPage }: { statusPage: TStatusPage }) => {
    return (
        <div className="flex flex-col gap-4">
            <SettingsSection
                title="Name"
                description="Shown in the header and the browser tab of your status page."
            >
                <Field>
                    <FieldLabel htmlFor="status-page-name">Name</FieldLabel>
                    <Input id="status-page-name" defaultValue={statusPage.name} />
                </Field>
            </SettingsSection>
            <SettingsSection
                title="Timezone"
                description="All times displayed on your status page use this timezone."
            >
                <Field>
                    <FieldLabel>Timezone</FieldLabel>
                    <SimpleSelect items={timezones} defaultValue="Asia/Dhaka" />
                </Field>
            </SettingsSection>
            <SettingsSection
                title="Return URL"
                description='When set, a "Return to <domain>" link is shown in the header so visitors can get back to your site.'
            >
                <Field>
                    <FieldLabel htmlFor="return-url">Return URL</FieldLabel>
                    <Input id="return-url" type="url" placeholder="https://example.com" />
                </Field>
            </SettingsSection>
            <SettingsSection
                title="Search engine indexing"
                description='When enabled, we add a "noindex" meta tag so search engines leave your status page out of their results.'
            >
                <Field orientation="horizontal">
                    <FieldContent>
                        <FieldLabel htmlFor="noindex">
                            Prevent search engines from indexing this status page
                        </FieldLabel>
                        <FieldDescription>
                            Visitors with the link can still open it.
                        </FieldDescription>
                    </FieldContent>
                    <Switch id="noindex" />
                </Field>
            </SettingsSection>
        </div>
    );
};
