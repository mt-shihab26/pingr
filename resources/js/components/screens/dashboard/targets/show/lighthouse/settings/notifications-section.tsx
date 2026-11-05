import { Fragment } from "react";

import { Field, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from "@/components/ui/input-group";
import { Switch } from "@/components/ui/switch";

import { SettingsSection } from "@/components/screens/dashboard/targets/show/uptime/settings/settings-section";

type TThreshold = { id: string; label: string; value: number; unit?: string };

const scoreThresholds: TThreshold[] = [
    { id: "performance", label: "Performance score is below", value: 50 },
    { id: "accessibility", label: "Accessibility score is below", value: 50 },
    { id: "best-practices", label: "Best practices score is below", value: 50 },
    { id: "seo", label: "SEO score is below", value: 50 },
];

const metricThresholds: TThreshold[] = [
    { id: "fcp", label: "First contentful paint is over", value: 3000, unit: "ms" },
    { id: "si", label: "Speed index is over", value: 4000, unit: "ms" },
    { id: "tti", label: "Interactive is over", value: 4000, unit: "ms" },
    { id: "lcp", label: "Largest contentful paint is over", value: 4000, unit: "ms" },
    { id: "tbt", label: "Total blocking time is over", value: 600, unit: "ms" },
    { id: "cls", label: "Cumulative layout shift is over", value: 0.25 },
];

const ThresholdGroup = ({ name, thresholds }: { name: string; thresholds: TThreshold[] }) => (
    <FieldGroup className="gap-3">
        <Field orientation="horizontal">
            <FieldLabel htmlFor={`${name}-times`} className="font-normal">
                Send notification if one of these events happens
            </FieldLabel>
            <InputGroup className="w-36">
                <InputGroupInput id={`${name}-times`} type="number" defaultValue={2} min={1} />
                <InputGroupAddon align="inline-end">
                    <InputGroupText>times in a row</InputGroupText>
                </InputGroupAddon>
            </InputGroup>
        </Field>
        {thresholds.map((threshold, index) => (
            <Fragment key={threshold.id}>
                {index > 0 && <FieldSeparator />}
                <Field orientation="horizontal">
                    <Switch id={threshold.id} defaultChecked />
                    <FieldLabel htmlFor={threshold.id} className="font-normal">
                        {threshold.label}
                    </FieldLabel>
                    <InputGroup className="w-32">
                        <InputGroupInput
                            type="number"
                            defaultValue={threshold.value}
                            aria-label={threshold.label}
                        />
                        {threshold.unit && (
                            <InputGroupAddon align="inline-end">
                                <InputGroupText>{threshold.unit}</InputGroupText>
                            </InputGroupAddon>
                        )}
                    </InputGroup>
                </Field>
            </Fragment>
        ))}
    </FieldGroup>
);

export const NotificationsSection = () => {
    return (
        <SettingsSection
            title="Notifications"
            description='Customize when notifications should be sent. Make sure to also enable "Lighthouse issues detected" at the team or site notifications.'
        >
            <FieldGroup>
                <ThresholdGroup name="scores" thresholds={scoreThresholds} />
                <ThresholdGroup name="metrics" thresholds={metricThresholds} />
            </FieldGroup>
        </SettingsSection>
    );
};
