import { useState } from "react";
import { Info, Plus, X } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Empty, EmptyDescription, EmptyHeader } from "@/components/ui/empty";
import { Item, ItemActions, ItemContent, ItemGroup, ItemTitle } from "@/components/ui/item";
import { Switch } from "@/components/ui/switch";

const allMonitors = [
    "developershihab.com",
    "tic-tac-toe.developershihab.com",
    "api.developershihab.com",
];

export const MonitorsTab = () => {
    const [enabled, setEnabled] = useState<{ name: string; clickable: boolean }[]>([]);

    const available = allMonitors.filter(
        (name) => !enabled.some((monitor) => monitor.name === name),
    );

    return (
        <div className="flex flex-col gap-4">
            <Alert>
                <Info />
                <AlertDescription>
                    The status of these monitors will be shown on your status page. When you enable
                    auto updates we'll also automatically create a status update when something
                    happens to your monitor.
                </AlertDescription>
            </Alert>
            <Card>
                <CardContent className="grid gap-4 md:grid-cols-[2fr_1fr]">
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between text-muted-foreground">
                            <span>Enabled monitors</span>
                            <span>Clickable</span>
                        </div>
                        {enabled.length === 0 ? (
                            <Empty className="border border-dashed">
                                <EmptyHeader>
                                    <EmptyDescription>
                                        Add monitors from the list of available monitors.
                                    </EmptyDescription>
                                </EmptyHeader>
                            </Empty>
                        ) : (
                            <ItemGroup className="gap-2">
                                {enabled.map((monitor) => (
                                    <Item key={monitor.name} variant="outline" size="sm">
                                        <ItemContent>
                                            <ItemTitle>{monitor.name}</ItemTitle>
                                        </ItemContent>
                                        <ItemActions>
                                            <Switch
                                                aria-label={`${monitor.name} is clickable`}
                                                checked={monitor.clickable}
                                                onCheckedChange={(clickable) =>
                                                    setEnabled(
                                                        enabled.map((m) =>
                                                            m.name === monitor.name
                                                                ? { ...m, clickable }
                                                                : m,
                                                        ),
                                                    )
                                                }
                                            />
                                            <Button
                                                variant="ghost"
                                                size="icon-sm"
                                                aria-label={`Remove ${monitor.name}`}
                                                onClick={() =>
                                                    setEnabled(
                                                        enabled.filter(
                                                            (m) => m.name !== monitor.name,
                                                        ),
                                                    )
                                                }
                                            >
                                                <X />
                                            </Button>
                                        </ItemActions>
                                    </Item>
                                ))}
                            </ItemGroup>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 md:border-l md:pl-4">
                        <span className="text-muted-foreground">Available monitors</span>
                        <ItemGroup className="gap-2">
                            {available.map((name) => (
                                <Item key={name} size="sm">
                                    <ItemContent>
                                        <ItemTitle>{name}</ItemTitle>
                                    </ItemContent>
                                    <ItemActions>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                setEnabled([...enabled, { name, clickable: true }])
                                            }
                                        >
                                            <Plus data-icon="inline-start" />
                                            Add
                                        </Button>
                                    </ItemActions>
                                </Item>
                            ))}
                        </ItemGroup>
                    </div>
                </CardContent>
                <CardFooter className="justify-end">
                    <Button>Save</Button>
                </CardFooter>
            </Card>
        </div>
    );
};
