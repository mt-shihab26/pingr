import { Checkbox } from "@/components/ui/checkbox";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field";
import { Kbd } from "@/components/ui/kbd";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { SettingsSection } from "@/components/screens/dashboard/targets/show/uptime/settings/settings-section";

const resources = [
    { value: "links", label: "Links" },
    { value: "images", label: "Images" },
    { value: "scripts", label: "Scripts" },
    { value: "stylesheets", label: "Stylesheets" },
    { value: "og-images", label: "Open Graph Images" },
];

export const LinksToCheckSection = ({ endpoint }: { endpoint: string }) => {
    return (
        <SettingsSection
            title="Links to check"
            description="You have fine-grained control over which links we will verify when performing the broken links check."
        >
            <FieldGroup>
                <Field orientation="horizontal">
                    <FieldContent>
                        <FieldLabel htmlFor="include-external-links">
                            Include external links
                        </FieldLabel>
                        <FieldDescription>
                            When looking for broken links we can check if links leading to external
                            domains are valid.
                        </FieldDescription>
                    </FieldContent>
                    <Switch id="include-external-links" />
                </Field>
                <FieldSet>
                    <FieldLegend variant="label">Resources</FieldLegend>
                    <FieldDescription>
                        You can choose which resources we should check for broken links. For
                        example, you can choose to only check images and not links.
                    </FieldDescription>
                    <FieldGroup className="gap-2">
                        {resources.map((resource) => (
                            <Field key={resource.value} orientation="horizontal">
                                <Checkbox id={`resource-${resource.value}`} defaultChecked />
                                <FieldLabel
                                    htmlFor={`resource-${resource.value}`}
                                    className="font-normal"
                                >
                                    {resource.label}
                                </FieldLabel>
                            </Field>
                        ))}
                    </FieldGroup>
                </FieldSet>
                <Field>
                    <FieldLabel htmlFor="ignored-urls">Broken links ignored urls</FieldLabel>
                    <Textarea id="ignored-urls" placeholder={`https://${endpoint}/ignored-url`} />
                    <FieldDescription>
                        When looking for broken links we'll ignore any errors on these urls. You can
                        use <Kbd>*</Kbd> as a placeholder. Put each url on its own line.
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </SettingsSection>
    );
};
