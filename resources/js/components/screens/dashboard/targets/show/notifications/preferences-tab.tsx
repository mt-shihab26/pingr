import { Fragment } from "react";

import {
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import { SettingsSection } from "@/components/screens/dashboard/targets/show/uptime/settings/settings-section";
import { SimpleSelect } from "@/components/screens/dashboard/targets/show/uptime/settings/simple-select";

import { channels } from "./channels";

const units = [
    { value: "minute", label: "minute" },
    { value: "hour", label: "hour" },
    { value: "day", label: "day" },
];

export const PreferencesTab = ({ endpoint }: { endpoint: string }) => {
    return (
        <div className="flex flex-col gap-4">
            <SettingsSection
                title="Throttling"
                description="Control how frequently notifications are sent to reduce noise and prevent notification fatigue."
            >
                <FieldGroup>
                    <Field orientation="horizontal">
                        <FieldContent>
                            <FieldLabel htmlFor="suppress-ok">
                                Suppress repeated ok notifications
                            </FieldLabel>
                            <FieldDescription>
                                Prevent sending multiple "OK" notifications when a check recovers
                                from failure.
                            </FieldDescription>
                        </FieldContent>
                        <Switch id="suppress-ok" defaultChecked />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="throttle-interval">
                            Throttle failed interval
                        </FieldLabel>
                        <div className="flex gap-2">
                            <Input id="throttle-interval" type="number" defaultValue={1} min={1} />
                            <SimpleSelect items={units} defaultValue="minute" className="w-32" />
                        </div>
                        <FieldDescription>
                            Minimum time between failure notifications for the same check. Set
                            throttling to avoid spam during extended outages.
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </SettingsSection>
            <SettingsSection
                title="Use team notification channels"
                description={`When sending notifications for ${endpoint} we'll also use these channels that are configured in the team notification settings.`}
            >
                <FieldGroup className="gap-3">
                    {channels.map((channel, index) => (
                        <Fragment key={channel.value}>
                            {index > 0 && <FieldSeparator />}
                            <Field orientation="horizontal" className="justify-between">
                                <FieldLabel
                                    htmlFor={`channel-${channel.value}`}
                                    className="font-normal"
                                >
                                    <channel.icon className="size-4 text-muted-foreground" />
                                    {channel.label}
                                </FieldLabel>
                                <Switch id={`channel-${channel.value}`} defaultChecked />
                            </Field>
                        </Fragment>
                    ))}
                </FieldGroup>
            </SettingsSection>
        </div>
    );
};
