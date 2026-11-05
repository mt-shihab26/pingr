import type { TTarget } from "@/types/models";

import { Fragment } from "react";

import { Field, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";

import { checks } from "@/lib/targets";

import { SettingsSection } from "@/components/screens/dashboard/targets/show/uptime/settings/settings-section";

export const ChecksSection = ({ target }: { target: TTarget }) => {
    return (
        <SettingsSection
            title="Checks"
            description="We can perform these checks to make sure your site is running smoothly."
        >
            <FieldGroup className="gap-3">
                {checks.map((check, index) => (
                    <Fragment key={check.key}>
                        {index > 0 && <FieldSeparator />}
                        <Field orientation="horizontal" className="justify-between">
                            <FieldLabel htmlFor={check.key}>{check.label}</FieldLabel>
                            <Switch id={check.key} defaultChecked={target[check.key]} />
                        </Field>
                    </Fragment>
                ))}
            </FieldGroup>
        </SettingsSection>
    );
};
