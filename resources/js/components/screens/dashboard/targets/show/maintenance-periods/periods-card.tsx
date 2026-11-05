import { Info, Trash2 } from "lucide-react";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export type TMaintenancePeriod = { start: string; end: string };

export const PeriodsCard = ({
    periods,
    onRemove,
}: {
    periods: TMaintenancePeriod[];
    onRemove: (period: TMaintenancePeriod) => void;
}) => {
    if (periods.length === 0) {
        return (
            <Alert>
                <Info />
                <AlertTitle>No maintenance periods have been created for this site yet.</AlertTitle>
            </Alert>
        );
    }

    return (
        <Card className="pb-0">
            <CardHeader>
                <CardTitle className="text-base">Maintenance periods</CardTitle>
            </CardHeader>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="pl-4">Starts at (Asia/Dhaka)</TableHead>
                        <TableHead>Ends at</TableHead>
                        <TableHead className="pr-4" />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {periods.map((period) => (
                        <TableRow key={`${period.start}-${period.end}`}>
                            <TableCell className="pl-4 font-mono tabular-nums">
                                {period.start}
                            </TableCell>
                            <TableCell className="font-mono tabular-nums">{period.end}</TableCell>
                            <TableCell className="pr-4 text-right">
                                <Button
                                    variant="ghost"
                                    size="icon-sm"
                                    aria-label="Delete maintenance period"
                                    onClick={() => onRemove(period)}
                                >
                                    <Trash2 />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
};
