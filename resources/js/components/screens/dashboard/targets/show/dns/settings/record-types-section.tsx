import { Fragment } from "react";

import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";

import { SettingsSection } from "@/components/screens/dashboard/targets/show/uptime/settings/settings-section";

const types = ["A", "AAAA", "CAA", "CNAME", "MX", "NS", "SOA", "SRV", "TXT", "PTR"];

export const RecordTypesSection = () => {
    return (
        <SettingsSection
            title="Monitored DNS record types"
            description="We will only store and send notifications about enabled DNS record types."
        >
            <FieldGroup className="max-w-xs gap-2">
                {types.map((type, index) => (
                    <Fragment key={type}>
                        {index > 0 && <FieldSeparator />}
                        <Field orientation="horizontal" className="justify-between">
                            <FieldLabel htmlFor={`record-${type}`} className="font-mono">
                                {type}
                            </FieldLabel>
                            <Switch id={`record-${type}`} defaultChecked={type !== "SOA"} />
                        </Field>
                    </Fragment>
                ))}
                <FieldDescription>
                    Check our docs to learn the meaning of each record type.
                </FieldDescription>
            </FieldGroup>
        </SettingsSection>
    );
};
