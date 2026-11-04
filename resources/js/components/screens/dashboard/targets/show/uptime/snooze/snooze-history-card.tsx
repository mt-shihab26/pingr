import { BellOff } from "lucide-react";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const SnoozeHistoryCard = () => {
    return (
        <Card className="pb-0">
            <CardHeader>
                <CardTitle className="text-base">Acknowledgement & snooze history</CardTitle>
                <CardDescription>All times are shown in Asia/Dhaka.</CardDescription>
            </CardHeader>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="pl-4">Type</TableHead>
                        <TableHead>Start</TableHead>
                        <TableHead>End</TableHead>
                        <TableHead className="pr-4">Duration</TableHead>
                    </TableRow>
                </TableHeader>
            </Table>
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <BellOff />
                    </EmptyMedia>
                    <EmptyTitle>No acknowledgements or snoozes found.</EmptyTitle>
                    <EmptyDescription>Snoozed alerts will show up here.</EmptyDescription>
                </EmptyHeader>
            </Empty>
        </Card>
    );
};
