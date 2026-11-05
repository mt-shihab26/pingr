import type { FormEvent } from "react";

import { Fragment, useState } from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import { SettingsSection } from "@/components/screens/dashboard/targets/show/uptime/settings/settings-section";

const MAX_RECIPIENTS = 5;

const checks = [
    "Uptime",
    "Performance",
    "Certificate health",
    "Broken links",
    "Mixed content",
    "Lighthouse",
    "Scheduled tasks",
    "Sitemap",
    "DNS",
    "Domain",
    "DNS blocklist",
];

export const SettingsTab = ({ endpoint }: { endpoint: string }) => {
    const [email, setEmail] = useState("");
    const [recipients, setRecipients] = useState<string[]>([]);

    const full = recipients.length >= MAX_RECIPIENTS;

    const add = (event: FormEvent) => {
        event.preventDefault();
        const value = email.trim();

        if (!value || full || recipients.includes(value)) return;

        setRecipients([...recipients, value]);
        setEmail("");
    };

    return (
        <div className="flex flex-col gap-4">
            <SettingsSection
                title="Email recipients"
                description={`Pingr can send a monthly report with a summary of all check results for ${endpoint}. Add up to five addresses that should receive it.`}
                save={false}
            >
                <form onSubmit={add} className="flex flex-col gap-3">
                    <Field>
                        <FieldLabel htmlFor="report-recipient" className="sr-only">
                            Email address
                        </FieldLabel>
                        <div className="flex gap-2">
                            <Input
                                id="report-recipient"
                                type="email"
                                placeholder="Add an email address"
                                value={email}
                                disabled={full}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                            <Button type="submit" variant="outline" disabled={full}>
                                Add
                            </Button>
                        </div>
                        <FieldDescription>
                            {recipients.length} of {MAX_RECIPIENTS} recipients added.
                        </FieldDescription>
                    </Field>
                    {recipients.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {recipients.map((recipient) => (
                                <Badge key={recipient} variant="secondary">
                                    {recipient}
                                    <button
                                        type="button"
                                        aria-label={`Remove ${recipient}`}
                                        onClick={() =>
                                            setRecipients(recipients.filter((r) => r !== recipient))
                                        }
                                    >
                                        <X />
                                    </button>
                                </Badge>
                            ))}
                        </div>
                    )}
                </form>
            </SettingsSection>
            <SettingsSection
                title="Included checks"
                description="Choose which checks appear in the report. Enable at least one to start receiving monthly reports."
            >
                <FieldGroup className="gap-3">
                    {checks.map((check, index) => {
                        const id = `report-check-${check.toLowerCase().replaceAll(" ", "-")}`;

                        return (
                            <Fragment key={check}>
                                {index > 0 && <FieldSeparator />}
                                <Field orientation="horizontal" className="justify-between">
                                    <FieldLabel htmlFor={id}>{check}</FieldLabel>
                                    <Switch id={id} />
                                </Field>
                            </Fragment>
                        );
                    })}
                </FieldGroup>
            </SettingsSection>
        </div>
    );
};
