import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { SettingsSection } from "@/components/screens/dashboard/targets/show/uptime/settings/settings-section";

const labels = [
    {
        id: "no-problems",
        label: "No problems detected",
        value: "No problems detected.",
        description: "Shown when you do not have any status updates with issues.",
    },
    {
        id: "warning",
        label: "Warning detected",
        value: "Service may be impacted.",
        description: "Shown when the latest status update concerns a warning.",
    },
    {
        id: "problems",
        label: "Problems detected",
        value: "Problems detected.",
        description: "Shown when the latest status update concerns an outage.",
    },
];

const messages = [
    {
        id: "down-message",
        label: "Down message",
        value: ":monitor appears to be down.",
        when: "goes down",
    },
    {
        id: "up-message",
        label: "Up message",
        value: ":monitor has recovered.",
        when: "comes back up",
    },
];

export const TextsTab = () => {
    return (
        <div className="flex flex-col gap-4">
            <SettingsSection
                title="Status labels"
                description="The intro shown at the top of your status page and the headline shown for each status."
            >
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="intro">Intro</FieldLabel>
                        <Textarea id="intro" rows={3} />
                        <FieldDescription>
                            Optional. Markdown is allowed. This message is shown at the top of your
                            status page.
                        </FieldDescription>
                    </Field>
                    {labels.map((item) => (
                        <Field key={item.id}>
                            <FieldLabel htmlFor={item.id}>{item.label}</FieldLabel>
                            <Input id={item.id} defaultValue={item.value} />
                            <FieldDescription>{item.description}</FieldDescription>
                        </Field>
                    ))}
                </FieldGroup>
            </SettingsSection>
            <SettingsSection
                title="Auto-update messages"
                description="Used when auto updates are active. We post these automatically when a monitor goes down or comes back up."
            >
                <FieldGroup>
                    {messages.map((item) => (
                        <Field key={item.id}>
                            <FieldLabel htmlFor={item.id}>{item.label}</FieldLabel>
                            <Textarea id={item.id} rows={3} defaultValue={item.value} />
                            <FieldDescription>
                                Posted when a site {item.when}. Use the <code>:monitor</code>{" "}
                                placeholder to insert the site name.
                            </FieldDescription>
                        </Field>
                    ))}
                </FieldGroup>
            </SettingsSection>
        </div>
    );
};
