import { ArrowRight, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock, CodeBlockContent } from "@/components/ui/code-block";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemTitle,
} from "@/components/ui/item";

const robots = `User-agent: *
Disallow: /admin
Disallow: /articles/   # <- this blocks our crawler from your articles

User-agent: PingrBot
Allow: /`;

export const TroubleshootingTab = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Blocked by robots.txt</CardTitle>
                <CardDescription>
                    Can't see all your links? A robots.txt file tells web crawlers which pages they
                    are allowed or not allowed to access.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
                <section className="flex flex-col gap-2">
                    <h3 className="font-medium">Solutions</h3>
                    <ItemGroup className="gap-2">
                        <Item variant="outline">
                            <ItemContent>
                                <ItemTitle>Do not respect robots</ItemTitle>
                                <ItemDescription>
                                    Pingr will ignore the robots.txt file when crawling.
                                </ItemDescription>
                            </ItemContent>
                            <ItemActions>
                                <Button variant="outline" size="sm">
                                    Enable
                                </Button>
                            </ItemActions>
                        </Item>
                        <Collapsible>
                            <Item variant="outline">
                                <ItemContent>
                                    <ItemTitle>Update robots.txt</ItemTitle>
                                    <ItemDescription>
                                        Look for Disallow rules that might be blocking our crawler
                                        and update your robots.txt.
                                    </ItemDescription>
                                </ItemContent>
                                <ItemActions>
                                    <CollapsibleTrigger
                                        render={
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="group/view"
                                            >
                                                View
                                                <ChevronDown
                                                    data-icon="inline-end"
                                                    className="transition-transform group-data-panel-open/view:rotate-180"
                                                />
                                            </Button>
                                        }
                                    />
                                </ItemActions>
                                <CollapsibleContent className="basis-full">
                                    <CodeBlock>
                                        <CodeBlockContent>{robots}</CodeBlockContent>
                                    </CodeBlock>
                                </CollapsibleContent>
                            </Item>
                        </Collapsible>
                    </ItemGroup>
                </section>
                <section className="flex flex-col gap-2">
                    <h3 className="font-medium">Related links</h3>
                    <Item variant="outline" render={<a href="#" />}>
                        <ItemContent>
                            <ItemTitle>Broken links detection</ItemTitle>
                            <ItemDescription>
                                Find out how Pingr decides which links to crawl.
                            </ItemDescription>
                        </ItemContent>
                        <ItemActions>
                            <ArrowRight className="size-4" />
                        </ItemActions>
                    </Item>
                </section>
            </CardContent>
        </Card>
    );
};
