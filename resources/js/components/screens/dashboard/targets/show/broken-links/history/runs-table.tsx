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
    "2026-11-05 16:01:08",
    "2026-11-04 15:17:39",
    "2026-11-03 17:33:44",
    "2026-11-02 15:27:50",
    "2026-11-01 20:04:55",
    "2026-10-31 16:31:45",
    "2026-10-30 08:05:34",
    "2026-10-29 10:57:02",
].map((endedAt) => ({ check: "Broken links", result: "Failed", endedAt }));

export const RunsTable = ({ endpoint }: { endpoint: string }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="pl-4">Type</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead className="pr-4 text-right">Ended at</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {runs.map((run) => (
                    <TableRow key={run.endedAt}>
                        <TableCell className="pl-4">
                            <div className="flex flex-col">
                                <span className="font-medium">{run.check}</span>
                                <span className="text-muted-foreground">{endpoint}</span>
                            </div>
                        </TableCell>
                        <TableCell>
                            <Badge variant="destructive">{run.result}</Badge>
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
