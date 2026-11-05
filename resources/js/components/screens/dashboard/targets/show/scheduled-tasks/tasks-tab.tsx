import { CalendarClock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from "@/components/ui/input-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { PromptBlock } from "@/components/screens/dashboard/targets/show/shared/prompt-block";

import { setupPrompt } from "./setup-prompt";

export const TasksTab = () => {
    return (
        <div className="flex flex-col gap-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">
                        Know the moment a scheduled task stops running
                    </CardTitle>
                    <CardDescription className="flex flex-col gap-2">
                        <span>
                            A cron job that silently stops, a queue worker that dies overnight, a
                            backup that never runs. You usually find out far too late. Pingr watches
                            your scheduled tasks and alerts you the moment one doesn't run on time
                            or fails.
                        </span>
                        <span>
                            Here's how it works: each task pings Pingr when it runs. If a ping
                            doesn't arrive within the task's schedule plus a short grace period, or
                            a task reports a failure, you'll know.
                        </span>
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <p className="text-muted-foreground">
                        There are two ways to set this up. Pick whichever fits your project.
                    </p>
                    <Tabs defaultValue="sync">
                        <TabsList variant="line">
                            <TabsTrigger value="sync">
                                Sync your whole schedule
                                <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                                    Recommended
                                </Badge>
                            </TabsTrigger>
                            <TabsTrigger value="manual">Add a task manually</TabsTrigger>
                        </TabsList>
                        <TabsContent value="sync" className="flex flex-col gap-3 pt-2">
                            <p className="text-muted-foreground">
                                Sync every scheduled task in one go instead of adding them by hand.
                                Paste this prompt into your AI coding assistant (Claude Code,
                                Cursor, ...). It works in any project, whatever your language or
                                framework; on Laravel it wires up spatie/laravel-schedule-monitor so
                                your whole schedule syncs and pings Pingr automatically.
                            </p>
                            <PromptBlock {...setupPrompt} />
                        </TabsContent>
                        <TabsContent value="manual" className="pt-2">
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="task-name">Name</FieldLabel>
                                    <Input id="task-name" placeholder="Nightly backup" />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="task-cron">Cron expression</FieldLabel>
                                    <Input
                                        id="task-cron"
                                        placeholder="0 3 * * *"
                                        className="font-mono"
                                    />
                                    <FieldDescription>
                                        When the task is expected to run.
                                    </FieldDescription>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="task-grace">Grace time</FieldLabel>
                                    <InputGroup>
                                        <InputGroupInput
                                            id="task-grace"
                                            type="number"
                                            defaultValue={5}
                                            min={1}
                                        />
                                        <InputGroupAddon align="inline-end">
                                            <InputGroupText>minutes</InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <FieldDescription>
                                        How long we wait for a ping before alerting you.
                                    </FieldDescription>
                                </Field>
                                <Button className="w-fit">Add task</Button>
                            </FieldGroup>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <Empty>
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <CalendarClock />
                            </EmptyMedia>
                            <EmptyTitle>No scheduled tasks yet.</EmptyTitle>
                            <EmptyDescription>
                                Tasks show up here once they are synced or added.
                            </EmptyDescription>
                        </EmptyHeader>
                    </Empty>
                </CardContent>
            </Card>
        </div>
    );
};
