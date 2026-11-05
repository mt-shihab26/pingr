import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const snapshots = [
    {
        summary: "26 records over 2 nameservers",
        changes: "No changes",
        discoveredAt: "2026-10-29 10:56:45",
    },
];

export const HistoryTab = () => {
    return (
        <Card className="py-0">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="pl-4">Summary</TableHead>
                        <TableHead>Changes</TableHead>
                        <TableHead className="pr-4 text-right">Discovered at</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {snapshots.map((snapshot) => (
                        <TableRow key={snapshot.discoveredAt}>
                            <TableCell className="pl-4">
                                <Button variant="link" className="h-auto p-0">
                                    {snapshot.summary}
                                </Button>
                            </TableCell>
                            <TableCell>{snapshot.changes}</TableCell>
                            <TableCell className="pr-4 text-right font-mono tabular-nums">
                                {snapshot.discoveredAt}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
};
