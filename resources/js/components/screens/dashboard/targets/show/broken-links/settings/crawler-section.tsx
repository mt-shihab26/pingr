import {
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from "@/components/ui/input-group";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

import { SettingsSection } from "@/components/screens/dashboard/targets/show/uptime/settings/settings-section";
import { SimpleSelect } from "@/components/screens/dashboard/targets/show/uptime/settings/simple-select";

const concurrency = ["1", "2", "5", "10"].map((value) => ({ value, label: value }));

export const CrawlerSection = ({ endpoint }: { endpoint: string }) => {
    return (
        <SettingsSection
            title="Crawler"
            description="Our crawler will visit your site to check for broken links and mixed content."
        >
            <Tabs defaultValue="general">
                <TabsList variant="line">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="speed">Speed</TabsTrigger>
                </TabsList>
                <TabsContent value="general" className="pt-2">
                    <FieldGroup>
                        <Field orientation="horizontal">
                            <FieldContent>
                                <FieldLabel htmlFor="respect-robots">
                                    Respect robots instructions
                                </FieldLabel>
                                <FieldDescription>
                                    By default our crawler can respect robots.txt and robots meta
                                    tags.
                                </FieldDescription>
                            </FieldContent>
                            <Switch id="respect-robots" defaultChecked />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="do-not-crawl">Do not crawl URLs</FieldLabel>
                            <Textarea
                                id="do-not-crawl"
                                placeholder={`https://${endpoint}/do-not-crawl-url`}
                            />
                            <FieldDescription>
                                A list of URLs (with wildcards) that we will not crawl. We will
                                merge the URLs listed here with the URLs listed in robots.txt. This
                                list will be prioritized over the robots.txt file.
                            </FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="force-crawl">Force crawl URLs</FieldLabel>
                            <Textarea
                                id="force-crawl"
                                placeholder={`https://${endpoint}/force-crawl-url`}
                            />
                            <FieldDescription>
                                A list of URLs (with wildcards) that we will crawl even if they are
                                blocked in robots.txt.
                            </FieldDescription>
                        </Field>
                    </FieldGroup>
                </TabsContent>
                <TabsContent value="speed" className="pt-2">
                    <FieldGroup>
                        <Field>
                            <FieldLabel>Concurrent requests</FieldLabel>
                            <SimpleSelect items={concurrency} defaultValue="5" />
                            <FieldDescription>
                                How many pages we crawl at the same time.
                            </FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="crawl-delay">Delay between requests</FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    id="crawl-delay"
                                    type="number"
                                    defaultValue={0}
                                    min={0}
                                />
                                <InputGroupAddon align="inline-end">
                                    <InputGroupText>ms</InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                            <FieldDescription>
                                Slow down the crawler if your server can't keep up.
                            </FieldDescription>
                        </Field>
                    </FieldGroup>
                </TabsContent>
            </Tabs>
        </SettingsSection>
    );
};
