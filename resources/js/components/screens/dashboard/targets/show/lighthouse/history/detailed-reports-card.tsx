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

import { reports } from "../data";

const scoreClassName = (value: number) =>
    value >= 90
        ? "text-emerald-600 dark:text-emerald-400"
        : value >= 50
          ? "text-amber-600 dark:text-amber-400"
          : "text-destructive";

export const DetailedReportsCard = () => {
    return (
        <Card className="pb-0">
            <CardHeader>
                <CardTitle className="text-base">Detailed reports</CardTitle>
            </CardHeader>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="pl-4">Measured at</TableHead>
                        <TableHead className="text-center">Performance</TableHead>
                        <TableHead className="text-center">Accessibility</TableHead>
                        <TableHead className="text-center">Best practices</TableHead>
                        <TableHead className="pr-4 text-center">SEO</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {reports.map((report) => (
                        <TableRow key={report.measuredAt}>
                            <TableCell className="pl-4">
                                <Button variant="link" className="h-auto p-0 font-mono">
                                    {report.measuredAt}
                                </Button>
                            </TableCell>
                            {[
                                report.performance,
                                report.accessibility,
                                report.bestPractices,
                                report.seo,
                            ].map((value, index) => (
                                <TableCell
                                    key={index}
                                    className={`text-center font-mono tabular-nums ${scoreClassName(value)}`}
                                >
                                    {value}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
};
