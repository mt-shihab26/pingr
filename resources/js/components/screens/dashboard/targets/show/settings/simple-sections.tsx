import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { SettingsSection } from "@/components/screens/dashboard/targets/show/uptime/settings/settings-section";

export const GroupingSection = () => (
    <SettingsSection
        title="Grouping"
        description="On our monitor list, we can display several monitors together in one group."
    >
        <Field>
            <FieldLabel htmlFor="group-name">Group name</FieldLabel>
            <Input id="group-name" />
            <FieldDescription>
                Monitors with the same group name will be displayed together on the site list.
            </FieldDescription>
        </Field>
    </SettingsSection>
);

export const ServerDetailsSection = () => (
    <SettingsSection
        title="Server details"
        description="Help us check the right things by telling us about your (main) server. If your site is behind a CDN or WAF, the IPs we resolve point to the CDN, not your actual server."
    >
        <Field>
            <FieldLabel htmlFor="origin-ip">Origin IP address</FieldLabel>
            <Input id="origin-ip" placeholder="176.62.160.106" className="font-mono" />
            <FieldDescription>
                We use this for DNS blocklist checks and port scans, so we test your real server
                instead of the IPs your CDN resolves to.
            </FieldDescription>
        </Field>
    </SettingsSection>
);

export const NotesSection = () => (
    <SettingsSection
        title="Notes"
        description="Here you can store some custom extra information on this site. We'll display it in your monitor overview."
    >
        <Field>
            <FieldLabel htmlFor="notes">Notes</FieldLabel>
            <Textarea id="notes" rows={5} placeholder="Important information on this monitor..." />
            <FieldDescription>Markdown is supported.</FieldDescription>
        </Field>
    </SettingsSection>
);
