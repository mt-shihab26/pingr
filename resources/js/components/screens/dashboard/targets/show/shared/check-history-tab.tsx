import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { FilterSelect } from "@/components/screens/dashboard/targets/show/uptime/history/filter-select";
import { DatePicker } from "@/components/screens/dashboard/targets/show/uptime/history/date-picker";

export type TCheckRun = { result: "Succeeded" | "Failed" | "Warning"; endedAt: string };

const resultOptions = [
    { value: "all", label: "All" },
    { value: "succeeded", label: "Succeeded" },
    { value: "warning", label: "Warning" },
    { value: "failed", label: "Failed" },
];

const resultClassNames: Record<TCheckRun["result"], string> = {
    Succeeded: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    Warning: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
    Failed: "",
};

export const CheckHistoryTab = ({
    check,
    endpoint,
    runs,
}: {
    check: string;
    endpoint: string;
    runs: TCheckRun[];
}) => {
    const [result, setResult] = useState("all");
    const [from, setFrom] = useState<Date>();
    const [to, setTo] = useState<Date>();

    const filtered = runs.filter((run) => result === "all" || run.result.toLowerCase() === result);

    return (
        <Card className="py-0">
            <CardContent className="grid gap-4 border-b py-4 sm:grid-cols-3">
                <FilterSelect
                    label="Result"
                    items={resultOptions}
                    value={result}
                    onChange={setResult}
                />
                <DatePicker label="Ended at (from)" value={from} onChange={setFrom} />
                <DatePicker label="Ended at (to)" value={to} onChange={setTo} />
            </CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="pl-4">Type</TableHead>
                        <TableHead>Result</TableHead>
                        <TableHead className="pr-4 text-right">Ended at</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filtered.map((run) => (
                        <TableRow key={run.endedAt}>
                            <TableCell className="pl-4">
                                <div className="flex flex-col">
                                    <span className="font-medium">{check}</span>
                                    <span className="text-muted-foreground">{endpoint}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant={run.result === "Failed" ? "destructive" : "default"}
                                    className={resultClassNames[run.result]}
                                >
                                    {run.result}
                                </Badge>
                            </TableCell>
                            <TableCell className="pr-4 text-right font-mono tabular-nums">
                                {run.endedAt}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
};
