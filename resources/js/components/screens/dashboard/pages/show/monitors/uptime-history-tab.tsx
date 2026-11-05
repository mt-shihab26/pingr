import { useState } from "react";

import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from "@/components/ui/input-group";
import { Switch } from "@/components/ui/switch";

import { SettingsSection } from "@/components/screens/dashboard/targets/show/uptime/settings/settings-section";
import { SimpleSelect } from "@/components/screens/dashboard/targets/show/uptime/settings/simple-select";

const days = ["30", "60", "90"].map((value) => ({ value, label: `${value} days` }));

const PercentField = ({
    id,
    label,
    value,
    description,
    disabled,
}: {
    id: string;
    label: string;
    value: number;
    description: string;
    disabled: boolean;
}) => (
    <Field data-disabled={disabled}>
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        <InputGroup>
            <InputGroupInput
                id={id}
                type="number"
                min={0}
                max={100}
                defaultValue={value}
                disabled={disabled}
            />
            <InputGroupAddon align="inline-end">
                <InputGroupText>%</InputGroupText>
            </InputGroupAddon>
        </InputGroup>
        <FieldDescription>{description}</FieldDescription>
    </Field>
);

export const UptimeHistoryTab = () => {
    const [enabled, setEnabled] = useState(true);

    return (
        <div className="flex flex-col gap-4">
            <SettingsSection
                title="Uptime history"
                description="Show a graph of the daily uptime of the sites you selected."
            >
                <FieldGroup>
                    <Field orientation="horizontal" className="justify-between">
                        <FieldLabel htmlFor="uptime-history">Enable uptime history</FieldLabel>
                        <Switch
                            id="uptime-history"
                            checked={enabled}
                            onCheckedChange={setEnabled}
                        />
                    </Field>
                    <Field data-disabled={!enabled}>
                        <FieldLabel>Number of days to show</FieldLabel>
                        <SimpleSelect items={days} defaultValue="60" />
                    </Field>
                </FieldGroup>
            </SettingsSection>
            <SettingsSection
                title="Day color thresholds"
                description="Choose the uptime percentage at which a day turns orange (warning) or red (outage) on the graph."
            >
                <FieldGroup>
                    <PercentField
                        id="orange-threshold"
                        label="Orange day percentage threshold"
                        value={98}
                        description="If the uptime percentage is less than this, we'll color the day orange."
                        disabled={!enabled}
                    />
                    <PercentField
                        id="red-threshold"
                        label="Red day percentage threshold"
                        value={50}
                        description="If the uptime percentage is less than this, we'll color the day red."
                        disabled={!enabled}
                    />
                </FieldGroup>
            </SettingsSection>
        </div>
    );
};
