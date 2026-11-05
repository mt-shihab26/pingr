import type { TTarget } from "@/types/models";

import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { SettingsSection } from "@/components/screens/dashboard/targets/show/uptime/settings/settings-section";
import { SimpleSelect } from "@/components/screens/dashboard/targets/show/uptime/settings/simple-select";

const protocols = [
    { value: "https", label: "https" },
    { value: "http", label: "http" },
];

export const GeneralSection = ({ target }: { target: TTarget }) => {
    const [protocol, host] = target.endpoint.includes("://")
        ? target.endpoint.split("://")
        : ["https", target.endpoint];

    return (
        <SettingsSection
            title="General"
            description="Here you can configure what should be monitored and how we should display it."
        >
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="website-url">Website URL</FieldLabel>
                    <div className="flex gap-2">
                        <SimpleSelect items={protocols} defaultValue={protocol} className="w-28" />
                        <Input id="website-url" defaultValue={host} />
                    </div>
                    <FieldDescription>
                        You can use magic variables in this URL to make each request unique.
                    </FieldDescription>
                </Field>
                <Field>
                    <FieldLabel htmlFor="friendly-name">Friendly name</FieldLabel>
                    <Input id="friendly-name" defaultValue={target.label ?? ""} />
                    <FieldDescription>
                        If you specify a friendly name we'll display this instead of the url.
                    </FieldDescription>
                </Field>
                <Field>
                    <FieldLabel htmlFor="description">Description</FieldLabel>
                    <Input id="description" />
                    <FieldDescription>
                        A public description of your site. This will be displayed on your status
                        page.
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </SettingsSection>
    );
};
