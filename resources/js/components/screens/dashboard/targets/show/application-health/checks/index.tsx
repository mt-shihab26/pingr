import type { ReactNode } from "react";

import { useState } from "react";
import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group";

import { PromptBlock } from "@/components/screens/dashboard/targets/show/shared/prompt-block";

const SECRET = "7JQDcjT6kX86brYH";

const Step = ({
    number,
    title,
    children,
}: {
    number: number;
    title: string;
    children: ReactNode;
}) => (
    <section className="flex flex-col gap-3">
        <h3 className="flex items-center gap-3 text-base font-medium">
            <span className="flex size-7 items-center justify-center rounded-full border font-mono text-sm">
                {number}
            </span>
            {title}
        </h3>
        {children}
    </section>
);

export const ChecksTab = ({ endpoint }: { endpoint: string }) => {
    const [url, setUrl] = useState(`https://${endpoint}/pingr-health-check-results`);

    const summary = `Add an "application health" endpoint to this project so Pingr (https://pingr.app), a monitoring service, can poll it and alert the team when something is unhealthy. This works in any project, in any language or framework: detect the stack and build it the idiomatic way. Do everything in code yourself. When a step can only be done by a person (such as deploying), ask the human to do it and wait.`;

    const details = `

If this is a Laravel project: install spatie/laravel-health (run \`composer require spatie/laravel-health\`) and register its Pingr results endpoint.

Otherwise:
1. Serve the endpoint at ${url}.
2. Reject requests unless the "pingr-health-check-secret" header equals "${SECRET}".
3. Return JSON with a "finishedAt" timestamp and a "checkResults" array. Each result has a name, label, status (ok, warning, failed, crashed, skipped), notificationMessage, and shortSummary.
4. Add checks for the database connection, queue, disk space, and outgoing mail.`;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Catch what uptime checks miss</CardTitle>
                <CardDescription className="flex flex-col gap-2">
                    <span>
                        An uptime check tells you your site responds. It can't see what's happening
                        inside your app: a stalled queue, an unreachable database, a disk filling
                        up, mail that quietly stopped going out. Application Health watches all of
                        that.
                    </span>
                    <span>
                        Here's how it works: your app exposes a single endpoint that returns a
                        small, structured bit of JSON describing whatever you want to keep an eye
                        on. We poll it every minute, and the moment something turns unhealthy,
                        you'll know.
                    </span>
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-8">
                <Step number={1} title="Tell us where it'll live">
                    <p className="text-muted-foreground">
                        Pick the URL where your health endpoint will be reachable. We poll it every
                        minute, sending the secret below as a header so your app knows the request
                        is really from us.
                    </p>
                    <FieldGroup className="max-w-xl">
                        <Field>
                            <FieldLabel htmlFor="health-url">Health endpoint URL</FieldLabel>
                            <Input
                                id="health-url"
                                value={url}
                                onChange={(event) => setUrl(event.target.value)}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="health-secret">Secret</FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    id="health-secret"
                                    value={SECRET}
                                    readOnly
                                    className="font-mono"
                                />
                                <InputGroupAddon align="inline-end">
                                    <InputGroupButton
                                        size="icon-xs"
                                        aria-label="Copy secret"
                                        onClick={() => navigator.clipboard.writeText(SECRET)}
                                    >
                                        <Copy />
                                    </InputGroupButton>
                                </InputGroupAddon>
                            </InputGroup>
                            <FieldDescription>
                                We send this as the <code>pingr-health-check-secret</code> header.
                                It's baked into the prompt below, so your endpoint and Pingr stay in
                                sync.
                            </FieldDescription>
                        </Field>
                    </FieldGroup>
                </Step>
                <Step number={2} title="Build the endpoint">
                    <p className="text-muted-foreground">
                        No endpoint yet? Paste this prompt into your AI coding assistant (Claude
                        Code, Cursor, ...). It builds an endpoint that returns exactly what we
                        expect at the URL above, protected by your secret. The prompt updates as you
                        change the URL.
                    </p>
                    <PromptBlock title="Setup prompt" summary={summary} details={details} />
                    <p className="text-muted-foreground">
                        Running Laravel? <code>composer require spatie/laravel-health</code> does
                        the heavy lifting.
                    </p>
                </Step>
                <Step number={3} title="Verify & activate">
                    <p className="text-muted-foreground">
                        Once your endpoint is live, we'll fetch it right now to make sure everything
                        lines up, then start monitoring.
                    </p>
                    <Button className="w-fit">Verify & activate</Button>
                </Step>
            </CardContent>
        </Card>
    );
};
