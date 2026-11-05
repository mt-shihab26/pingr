import {
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import { SettingsSection } from "@/components/screens/dashboard/targets/show/uptime/settings/settings-section";

export const CustomizeSection = () => {
    return (
        <SettingsSection
            title="Customize DNS check"
            description="These settings allow you to fine-tune the DNS check."
        >
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="extra-cnames">Extra CNAMEs</FieldLabel>
                    <Input id="extra-cnames" placeholder="www, mail, shop" />
                    <FieldDescription>
                        CNAMEs with a different value than the main domain will not be discovered
                        automatically. To check those CNAME records, you can add them here.
                    </FieldDescription>
                </Field>
                <Field orientation="horizontal">
                    <Switch id="nameservers-in-sync" defaultChecked />
                    <FieldContent>
                        <FieldLabel htmlFor="nameservers-in-sync">
                            Check nameservers in sync
                        </FieldLabel>
                        <FieldDescription>
                            When this setting is enabled, we will warn you when the nameservers of
                            your domain are not in sync.
                        </FieldDescription>
                    </FieldContent>
                </Field>
            </FieldGroup>
        </SettingsSection>
    );
};
