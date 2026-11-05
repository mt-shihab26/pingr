import { useState } from "react";
import { History } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
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

const PER_PAGE = 10;

const runs = [
    { check: "Uptime", result: "Succeeded", endedAt: "2026-11-05 21:50:15" },
    { check: "Performance", result: "Succeeded", endedAt: "2026-11-05 21:46:32" },
    { check: "Certificate health", result: "Succeeded", endedAt: "2026-11-05 21:39:55" },
    { check: "Sitemap", result: "Failed", endedAt: "2026-11-05 21:39:54" },
    { check: "DNS", result: "Succeeded", endedAt: "2026-11-05 21:15:04" },
    { check: "Mixed content", result: "Succeeded", endedAt: "2026-11-05 16:01:09" },
    { check: "Broken links", result: "Failed", endedAt: "2026-11-05 16:01:08" },
    { check: "Domain", result: "Succeeded", endedAt: "2026-11-05 10:23:33" },
    { check: "DNS blocklist", result: "Succeeded", endedAt: "2026-11-05 10:11:48" },
    { check: "Lighthouse", result: "Succeeded", endedAt: "2026-11-05 07:42:33" },
    { check: "Broken links", result: "Failed", endedAt: "2026-11-04 15:17:39" },
    { check: "Mixed content", result: "Succeeded", endedAt: "2026-11-04 15:17:39" },
    { check: "Lighthouse", result: "Succeeded", endedAt: "2026-11-04 07:39:12" },
];

const checkOptions = [
    { value: "all", label: "All" },
    ...[...new Set(runs.map((run) => run.check))].sort().map((check) => ({
        value: check,
        label: check,
    })),
];

const resultOptions = [
    { value: "all", label: "All" },
    { value: "Succeeded", label: "Succeeded" },
    { value: "Failed", label: "Failed" },
];

export const RunsCard = ({ endpoint }: { endpoint: string }) => {
    const [check, setCheck] = useState("all");
    const [result, setResult] = useState("all");
    const [from, setFrom] = useState<Date>();
    const [to, setTo] = useState<Date>();
    const [page, setPage] = useState(1);

    const filtered = runs.filter(
        (run) =>
            (check === "all" || run.check === check) && (result === "all" || run.result === result),
    );
    const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
    const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    const filter = (setter: (value: string) => void) => (value: string) => {
        setter(value);
        setPage(1);
    };

    return (
        <Card className="py-0">
            <CardContent className="grid gap-4 border-b py-4 sm:grid-cols-2 lg:grid-cols-4">
                <FilterSelect
                    label="Check"
                    items={checkOptions}
                    value={check}
                    onChange={filter(setCheck)}
                />
                <FilterSelect
                    label="Result"
                    items={resultOptions}
                    value={result}
                    onChange={filter(setResult)}
                />
                <DatePicker label="Ended at (from)" value={from} onChange={setFrom} />
                <DatePicker label="Ended at (to)" value={to} onChange={setTo} />
            </CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="pl-4">Check</TableHead>
                        <TableHead>Result</TableHead>
                        <TableHead className="pr-4 text-right">Ended at</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {visible.map((run) => (
                        <TableRow key={`${run.check}-${run.endedAt}`}>
                            <TableCell className="pl-4">
                                <div className="flex flex-col">
                                    <span className="font-medium">{run.check}</span>
                                    <span className="text-muted-foreground">{endpoint}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                {run.result === "Failed" ? (
                                    <Badge variant="destructive">{run.result}</Badge>
                                ) : (
                                    <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                                        {run.result}
                                    </Badge>
                                )}
                            </TableCell>
                            <TableCell className="pr-4 text-right font-mono tabular-nums">
                                {run.endedAt}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {visible.length === 0 && (
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <History />
                        </EmptyMedia>
                        <EmptyTitle>No runs found.</EmptyTitle>
                        <EmptyDescription>Try changing the filters.</EmptyDescription>
                    </EmptyHeader>
                </Empty>
            )}
            <Pagination className="border-t py-4">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            aria-disabled={page === 1}
                            className={page === 1 ? "pointer-events-none opacity-50" : undefined}
                            onClick={(event) => {
                                event.preventDefault();
                                setPage(Math.max(1, page - 1));
                            }}
                        />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            aria-disabled={page === pages}
                            className={
                                page === pages ? "pointer-events-none opacity-50" : undefined
                            }
                            onClick={(event) => {
                                event.preventDefault();
                                setPage(Math.min(pages, page + 1));
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </Card>
    );
};
