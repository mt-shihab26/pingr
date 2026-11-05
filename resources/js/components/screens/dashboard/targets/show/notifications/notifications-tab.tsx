import { BellRing, ChevronDown, Globe, Mail, Monitor } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item";

import { AddConfigurationDialog } from "./add-configuration-dialog";

export const NotificationsTab = ({ endpoint }: { endpoint: string }) => {
    return (
        <div className="flex flex-col gap-4">
            <Card>
                <CardContent className="flex flex-col gap-4">
                    <Item className="px-0">
                        <ItemMedia variant="icon">
                            <Monitor />
                        </ItemMedia>
                        <ItemContent>
                            <ItemTitle>
                                <span className="text-muted-foreground">Monitor ·</span> {endpoint}
                            </ItemTitle>
                            <ItemDescription>
                                Sent only for this monitor, in addition to the inherited
                                notifications below.
                            </ItemDescription>
                        </ItemContent>
                        <ItemActions>
                            <AddConfigurationDialog endpoint={endpoint} />
                        </ItemActions>
                    </Item>
                    <Empty>
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <BellRing />
                            </EmptyMedia>
                            <EmptyTitle>Nothing set just for this monitor yet...</EmptyTitle>
                            <EmptyDescription>
                                Your other notifications still apply (see below). Add a
                                configuration to send alerts just for this monitor.
                            </EmptyDescription>
                        </EmptyHeader>
                    </Empty>
                </CardContent>
            </Card>

            <Collapsible>
                <Card className="py-0">
                    <Item>
                        <ItemMedia variant="icon">
                            <BellRing />
                        </ItemMedia>
                        <ItemContent>
                            <ItemTitle>1 more notification also applies to {endpoint}</ItemTitle>
                            <ItemDescription>1 global</ItemDescription>
                        </ItemContent>
                        <ItemActions>
                            <CollapsibleTrigger
                                render={
                                    <Button variant="ghost" size="sm" className="group/show">
                                        Show
                                        <ChevronDown
                                            data-icon="inline-end"
                                            className="transition-transform group-data-panel-open/show:rotate-180"
                                        />
                                    </Button>
                                }
                            />
                        </ItemActions>
                    </Item>
                    <CollapsibleContent>
                        <ItemGroup className="border-t">
                            <Item>
                                <ItemMedia variant="icon">
                                    <Mail />
                                </ItemMedia>
                                <ItemContent>
                                    <ItemTitle>Mail</ItemTitle>
                                    <ItemDescription>dev@example.com</ItemDescription>
                                </ItemContent>
                                <ItemActions>
                                    <Badge variant="secondary">
                                        <Globe />
                                        Global
                                    </Badge>
                                </ItemActions>
                            </Item>
                        </ItemGroup>
                    </CollapsibleContent>
                </Card>
            </Collapsible>
        </div>
    );
};
