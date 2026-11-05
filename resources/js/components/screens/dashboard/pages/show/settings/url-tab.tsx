import type { TStatusPage } from "@/components/screens/dashboard/pages/status-pages-data";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock, CodeBlockContent } from "@/components/ui/code-block";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from "@/components/ui/input-group";

import { SettingsSection } from "@/components/screens/dashboard/targets/show/uptime/settings/settings-section";

export const UrlTab = ({ statusPage }: { statusPage: TStatusPage }) => {
    const [slug, setSlug] = useState(statusPage.slug);
    const [domain, setDomain] = useState(statusPage.customDomain ?? "");

    const publicUrl = `https://pingr.app/status-page/${slug || "your-slug"}`;

    return (
        <div className="flex flex-col gap-4">
            <SettingsSection
                title="Pingr URL"
                description="Your status page is always reachable on our own domain."
            >
                <Field>
                    <FieldLabel htmlFor="status-page-slug">Pingr URL</FieldLabel>
                    <InputGroup>
                        <InputGroupAddon>
                            <InputGroupText>pingr.app/status-page/</InputGroupText>
                        </InputGroupAddon>
                        <InputGroupInput
                            id="status-page-slug"
                            value={slug}
                            onChange={(event) =>
                                setSlug(
                                    event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
                                )
                            }
                        />
                    </InputGroup>
                    <FieldDescription>
                        Your status page will be available on our domain at{" "}
                        <code className="text-foreground">{publicUrl}</code>
                    </FieldDescription>
                </Field>
            </SettingsSection>
            <SettingsSection
                title="Custom domain"
                description="Serve your status page from your own domain instead of ours."
            >
                <FieldGroup>
                    <Badge className="w-fit bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                        Recommended
                    </Badge>
                    <Field>
                        <FieldLabel htmlFor="custom-domain">Domain</FieldLabel>
                        <Input
                            id="custom-domain"
                            placeholder="ie. status.your-domain.com"
                            value={domain}
                            onChange={(event) => setDomain(event.target.value)}
                        />
                        <FieldDescription>
                            Enter your domain and hit Save. We'll then show you the exact DNS record
                            to add and verify it for you.
                        </FieldDescription>
                    </Field>
                    <Collapsible>
                        <CollapsibleTrigger
                            render={
                                <Button variant="link" className="group/dns px-0">
                                    <ChevronRight
                                        data-icon="inline-start"
                                        className="transition-transform group-data-panel-open/dns:rotate-90"
                                    />
                                    Show me the DNS configuration already
                                </Button>
                            }
                        />
                        <CollapsibleContent className="pt-2">
                            <CodeBlock>
                                <CodeBlockContent>
                                    {`Type:  CNAME
Name:  ${domain || "status.your-domain.com"}
Value: status-pages.pingr.app`}
                                </CodeBlockContent>
                            </CodeBlock>
                        </CollapsibleContent>
                    </Collapsible>
                </FieldGroup>
            </SettingsSection>
        </div>
    );
};
