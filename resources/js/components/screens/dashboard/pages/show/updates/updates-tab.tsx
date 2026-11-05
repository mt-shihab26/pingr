import type { TUpdateValues } from "./update-dialog";

import { useState } from "react";
import { format } from "date-fns";
import { Info, Megaphone } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { SeverityBadge } from "./severity";
import { UpdateDialog } from "./update-dialog";

type TUpdate = TUpdateValues & { time: string };

export const UpdatesTab = () => {
    const [updates, setUpdates] = useState<TUpdate[]>([]);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
                <Alert>
                    <Info />
                    <AlertDescription>
                        Keep your users up-to-date when something is down, or let them know when
                        you're going down for maintenance. Auto updates are enabled. All times are
                        in the Asia/Dhaka timezone.
                    </AlertDescription>
                </Alert>
                <UpdateDialog
                    trigger="Create update"
                    title="Create status update"
                    description="This update will be shown on your status page right away."
                    nameLabel="Title"
                    submitLabel="Post update"
                    onSubmit={(values) =>
                        setUpdates([
                            { ...values, time: format(new Date(), "yyyy-MM-dd HH:mm") },
                            ...updates,
                        ])
                    }
                />
            </div>
            <Card className="py-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="pl-4">Title</TableHead>
                            <TableHead>Severity</TableHead>
                            <TableHead className="pr-4 text-right">Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {updates.map((update) => (
                            <TableRow key={`${update.time}-${update.name}`}>
                                <TableCell className="pl-4">
                                    <div className="flex flex-col">
                                        <span className="font-medium">{update.name}</span>
                                        <span className="text-muted-foreground">{update.text}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <SeverityBadge severity={update.severity} />
                                </TableCell>
                                <TableCell className="pr-4 text-right font-mono tabular-nums">
                                    {update.time}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {updates.length === 0 && (
                    <Empty>
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <Megaphone />
                            </EmptyMedia>
                            <EmptyTitle>
                                No updates have been posted on this status page yet.
                            </EmptyTitle>
                            <EmptyDescription>Posted updates will show up here.</EmptyDescription>
                        </EmptyHeader>
                    </Empty>
                )}
            </Card>
        </div>
    );
};
