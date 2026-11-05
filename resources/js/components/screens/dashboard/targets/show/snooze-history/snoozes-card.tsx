import { useState } from "react";
import { BellOff } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
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

import { FilterSelect } from "@/components/screens/dashboard/targets/show/uptime/history/filter-select";

type TSnooze = { check: string; type: string; start: string; end: string };

const snoozes: TSnooze[] = [];

const checkOptions = [
    "All",
    "Uptime",
    "Performance",
    "Certificate health",
    "Broken links",
    "Mixed content",
    "Lighthouse",
    "Scheduled tasks",
    "Application health",
    "Sitemap",
    "DNS",
    "Domain",
    "DNS blocklist",
].map((label) => ({ value: label === "All" ? "all" : label, label }));

export const SnoozesCard = () => {
    const [check, setCheck] = useState("all");

    const filtered = snoozes.filter((snooze) => check === "all" || snooze.check === check);

    return (
        <Card className="py-0">
            <CardContent className="grid gap-4 border-b py-4 sm:grid-cols-4">
                <FilterSelect
                    label="Check"
                    items={checkOptions}
                    value={check}
                    onChange={setCheck}
                />
            </CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="pl-4">Check</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Start (Asia/Dhaka)</TableHead>
                        <TableHead className="pr-4">End</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filtered.map((snooze) => (
                        <TableRow key={`${snooze.check}-${snooze.start}`}>
                            <TableCell className="pl-4 font-medium">{snooze.check}</TableCell>
                            <TableCell>{snooze.type}</TableCell>
                            <TableCell className="font-mono tabular-nums">{snooze.start}</TableCell>
                            <TableCell className="pr-4 font-mono tabular-nums">
                                {snooze.end}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {filtered.length === 0 && (
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <BellOff />
                        </EmptyMedia>
                        <EmptyTitle>No acknowledgements or snoozes found.</EmptyTitle>
                        <EmptyDescription>Snoozed alerts will show up here.</EmptyDescription>
                    </EmptyHeader>
                </Empty>
            )}
        </Card>
    );
};
