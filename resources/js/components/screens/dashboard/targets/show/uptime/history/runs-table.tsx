import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const runs = [
    { check: "Uptime", result: "Succeeded", endedAt: "2026-11-04 11:58:15" },
    { check: "Performance", result: "Succeeded", endedAt: "2026-11-04 11:54:53" },
    { check: "Performance", result: "Succeeded", endedAt: "2026-10-29 11:18:26" },
    { check: "Uptime", result: "Succeeded", endedAt: "2026-10-29 10:56:45" },
];

export const RunsTable = ({ endpoint }: { endpoint: string }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="pl-4">Check</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead className="pr-4 text-right">Ended at</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {runs.map((run) => (
                    <TableRow key={`${run.check}-${run.endedAt}`}>
                        <TableCell className="pl-4">
                            <div className="flex flex-col">
                                <span className="font-medium">{run.check}</span>
                                <span className="text-muted-foreground">{endpoint}</span>
                            </div>
                        </TableCell>
                        <TableCell>
                            <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
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
    );
};
