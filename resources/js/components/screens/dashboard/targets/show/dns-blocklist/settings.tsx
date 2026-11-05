import type { TTarget } from "@/types/models";
import type { TBlocklist } from "./blocklists";

import { Fragment, useState } from "react";

import {
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";

import { ApiSection } from "@/components/screens/dashboard/targets/show/uptime/settings/api-section";
import { SettingsSection } from "@/components/screens/dashboard/targets/show/uptime/settings/settings-section";
import { FrequencySection } from "@/components/screens/dashboard/targets/show/shared/frequency-section";

import { contentFilters, securityBlocklists } from "./blocklists";

const BlocklistGroup = ({
    legend,
    description,
    items,
    useAll,
}: {
    legend: string;
    description: string;
    items: TBlocklist[];
    useAll: boolean;
}) => (
    <FieldSet>
        <FieldLegend variant="label">{legend}</FieldLegend>
        <FieldDescription>{description}</FieldDescription>
        <FieldGroup className="gap-3">
            {items.map((item, index) => {
                const id = `blocklist-${item.name.toLowerCase().replaceAll(" ", "-")}`;

                return (
                    <Fragment key={item.name}>
                        {index > 0 && <FieldSeparator />}
                        <Field orientation="horizontal">
                            <FieldContent>
                                <FieldLabel htmlFor={id}>
                                    {item.name}
                                    {item.kind && (
                                        <span className="font-normal text-muted-foreground">
                                            ({item.kind})
                                        </span>
                                    )}
                                </FieldLabel>
                                <FieldDescription>{item.description}</FieldDescription>
                            </FieldContent>
                            <Switch
                                key={String(useAll)}
                                id={id}
                                {...(useAll
                                    ? { checked: true, disabled: true }
                                    : { defaultChecked: true })}
                            />
                        </Field>
                    </Fragment>
                );
            })}
        </FieldGroup>
    </FieldSet>
);

export const SettingsTab = ({ target }: { target: TTarget }) => {
    const [useAll, setUseAll] = useState(true);

    return (
        <div className="flex flex-col gap-4">
            <SettingsSection
                title="Blocklist configuration"
                description="Blocklists are databases of IPs and domains flagged for spam, malware, or abuse. Being listed can hurt your email deliverability or make your site unreachable for some users."
            >
                <FieldGroup>
                    <Field orientation="horizontal">
                        <FieldContent>
                            <FieldLabel htmlFor="use-all-blocklists">Use all blocklists</FieldLabel>
                            <FieldDescription>
                                Automatically includes any new blocklists we add in the future.
                            </FieldDescription>
                        </FieldContent>
                        <Switch
                            id="use-all-blocklists"
                            checked={useAll}
                            onCheckedChange={setUseAll}
                        />
                    </Field>
                    <BlocklistGroup
                        legend="Security & email blocklists"
                        description="Critical - affects email deliverability"
                        items={securityBlocklists}
                        useAll={useAll}
                    />
                    <BlocklistGroup
                        legend="Content filtering DNS"
                        description="Informational - blocks access for users of these DNS resolvers"
                        items={contentFilters}
                        useAll={useAll}
                    />
                </FieldGroup>
            </SettingsSection>
            <FrequencySection check="DNS blocklist" defaultValue="240" />
            <ApiSection targetId={target.id} />
        </div>
    );
};
