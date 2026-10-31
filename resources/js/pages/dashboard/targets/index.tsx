import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import type { TTarget } from "@/types/models";
import type { TPaginated } from "@/types/utils";

import { useState } from "react";
import { useShared } from "@/hooks/use-shared";
import { useDebounce } from "@/hooks/use-debounce";
import { types } from "@/lib/targets";
import { router } from "@inertiajs/react";

import { Link } from "@inertiajs/react";
import { Paginator } from "@/components/elements/paginator";
import { Filter, Plus, Activity, SearchX, CircleDashed } from "lucide-react";
import { TargetActions } from "@/components/screens/dashboard/targets/target-actions";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const TargetIndex = ({
    targets,
    filters,
}: {
    targets: TPaginated<TTarget>;
    filters: { search: string; per_page: number };
}) => {
    const { team } = useShared();

    const [search, setSearch] = useState(filters.search);
    const [tab, setTab] = useState<string>("all");

    useDebounce(search.trim(), (debouncedSearch) => {
        if (debouncedSearch === filters.search) return;

        router.get(
            route("dashboard.targets.index", { team }),
            { search: debouncedSearch, per_page: filters.per_page },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    });

    return (
        <DashboardLayout
            title="Targets"
            breadcrumbs={[{ title: "Targets", href: route("dashboard.targets.index", { team }) }]}
        >
            <div className="border">
                <Tabs
                    value={tab}
                    onValueChange={(value) => setTab(String(value))}
                    className="gap-0"
                >
                    <div className="flex flex-wrap items-center gap-4 border-b p-4">
                        <div className="relative w-full sm:w-64">
                            <Filter className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="search"
                                aria-label="Filter targets"
                                placeholder="Filter targets…"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <TabsList>
                            <TabsTrigger value="all" className="cursor-pointer">
                                All
                                <Badge className="tabular-nums">{targets.total}</Badge>
                            </TabsTrigger>
                            <TabsTrigger value="issues" className="cursor-pointer">
                                Targets with issues
                                <Badge variant="secondary" className="tabular-nums">
                                    0
                                </Badge>
                            </TabsTrigger>
                        </TabsList>
                        <Button
                            className="ml-auto"
                            nativeButton={false}
                            render={<Link href={route("dashboard.targets.create", { team })} />}
                        >
                            <Plus className="size-4" /> Add target
                        </Button>
                    </div>
                    <TabsContent value="all">
                        <Table className="min-w-160">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[30%]">Target</TableHead>
                                    <TableHead className="w-[40%]">Performance</TableHead>
                                    <TableHead>Issues detected</TableHead>
                                    <TableHead className="w-14">
                                        <span className="sr-only">Actions</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {targets.data.map((target) => (
                                    <TableRow key={target.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <CircleDashed
                                                    className="size-4 shrink-0 text-muted-foreground"
                                                    aria-label="Awaiting first check"
                                                />
                                                <div className="min-w-0">
                                                    <Link
                                                        className="font-medium hover:underline"
                                                        href={route("dashboard.targets.show", {
                                                            team,
                                                            target: target.id,
                                                        })}
                                                    >
                                                        {target.label ?? target.endpoint}
                                                    </Link>
                                                    <div className="mt-1 text-xs text-muted-foreground">
                                                        {
                                                            types.find(
                                                                (type) => type.key === target.type,
                                                            )?.display.label
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-muted-foreground">
                                                Awaiting first check
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-xs text-muted-foreground">
                                            No results yet
                                        </TableCell>
                                        <TableCell>
                                            <TargetActions target={target} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {targets.data.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-44 text-center">
                                            <SearchX className="mx-auto mb-3 size-6 text-muted-foreground" />
                                            <p className="font-medium">
                                                {filters.search
                                                    ? "No matching targets"
                                                    : "No targets yet"}
                                            </p>
                                            <p className="mt-1 text-muted-foreground">
                                                {filters.search
                                                    ? "Try another name or endpoint."
                                                    : "Add your first target to start monitoring."}
                                            </p>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <Paginator pagination={targets} />
                    </TabsContent>
                    <TabsContent value="issues" className="py-14 text-center">
                        <Activity className="mx-auto mb-3 size-6 text-muted-foreground" />
                        <p className="font-medium">No issue results yet</p>
                        <p className="mt-1 text-muted-foreground">
                            Issues will appear here once monitoring results are available.
                        </p>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
};

export default TargetIndex;
