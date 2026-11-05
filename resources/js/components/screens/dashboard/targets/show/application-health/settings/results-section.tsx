import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { SettingsSection } from "@/components/screens/dashboard/targets/show/uptime/settings/settings-section";

export const ResultsSection = ({ endpoint }: { endpoint: string }) => {
    return (
        <SettingsSection
            title="Application health check results"
            description="Here you can specify where we should try to read application health results."
        >
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="report-url">Health report URL</FieldLabel>
                    <Input
                        id="report-url"
                        placeholder={`https://${endpoint}/pingr-health-check-results`}
                    />
                    <FieldDescription>
                        The URL where we can get the results of your health checks.
                    </FieldDescription>
                </Field>
                <Field>
                    <FieldLabel htmlFor="report-secret">Health report secret</FieldLabel>
                    <Input
                        id="report-secret"
                        defaultValue="7JQDcjT6kX86brYH"
                        className="font-mono"
                    />
                    <FieldDescription>
                        We will send this as the value of the <code>pingr-health-check-secret</code>{" "}
                        header when retrieving health check results.
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </SettingsSection>
    );
};
