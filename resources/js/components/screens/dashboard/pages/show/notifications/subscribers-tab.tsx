import { useState } from "react";
import { format } from "date-fns";
import { Download, Mail, Search, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { AddSubscriberDialog } from "./add-subscriber-dialog";

type TSubscriber = { email: string; subscribedAt: string };

export const SubscribersTab = () => {
    const [search, setSearch] = useState("");
    const [subscribers, setSubscribers] = useState<TSubscriber[]>([]);

    const filtered = subscribers.filter((subscriber) =>
        subscriber.email.toLowerCase().includes(search.trim().toLowerCase()),
    );

    return (
        <Card className="pb-0">
            <CardHeader>
                <CardDescription className="flex flex-col gap-2">
                    <span>
                        These are the people who subscribed to email updates from your status page.
                        Visitors subscribe themselves with the Subscribe button on the page; you can
                        also add someone manually.
                    </span>
                    <span>
                        Your account can have up to 500 confirmed email subscribers across all your
                        status pages.
                    </span>
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center justify-between gap-2">
                <InputGroup className="w-64">
                    <InputGroupInput
                        placeholder="Search subscribers"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                    <InputGroupAddon>
                        <Search />
                    </InputGroupAddon>
                </InputGroup>
                <div className="flex items-center gap-2">
                    <Badge variant="secondary">{subscribers.length} subscribers</Badge>
                    <Button variant="outline" size="sm" disabled={subscribers.length === 0}>
                        Export CSV
                        <Download data-icon="inline-end" />
                    </Button>
                    <AddSubscriberDialog
                        onAdd={(email) =>
                            setSubscribers(
                                subscribers.some((s) => s.email === email)
                                    ? subscribers
                                    : [
                                          ...subscribers,
                                          {
                                              email,
                                              subscribedAt: format(new Date(), "yyyy-MM-dd HH:mm"),
                                          },
                                      ],
                            )
                        }
                    />
                </div>
            </CardContent>
            {filtered.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="pl-4">Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Subscribed at</TableHead>
                            <TableHead className="pr-4" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((subscriber) => (
                            <TableRow key={subscriber.email}>
                                <TableCell className="pl-4">{subscriber.email}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary">Pending confirmation</Badge>
                                </TableCell>
                                <TableCell className="font-mono tabular-nums">
                                    {subscriber.subscribedAt}
                                </TableCell>
                                <TableCell className="pr-4 text-right">
                                    <Button
                                        variant="ghost"
                                        size="icon-sm"
                                        aria-label={`Remove ${subscriber.email}`}
                                        onClick={() =>
                                            setSubscribers(
                                                subscribers.filter((s) => s !== subscriber),
                                            )
                                        }
                                    >
                                        <Trash2 />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <Empty className="border-t">
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <Mail />
                        </EmptyMedia>
                        <EmptyTitle>
                            {subscribers.length === 0 ? "No email subscribers yet" : "No matches"}
                        </EmptyTitle>
                        <EmptyDescription>
                            {subscribers.length === 0
                                ? "When someone subscribes to email updates from your status page, they'll show up here."
                                : "Try a different search."}
                        </EmptyDescription>
                    </EmptyHeader>
                </Empty>
            )}
        </Card>
    );
};
