import { useState } from "react";
import { Link } from "@inertiajs/react";
import { Search, SearchX } from "lucide-react";

import { useShared } from "@/hooks/use-shared";

import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { Heading } from "@/components/elements/heading";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import type { TStatusPage } from "@/components/screens/dashboard/pages/status-pages-data";

import { statusPages } from "@/components/screens/dashboard/pages/status-pages-data";
import { CreateStatusPageDialog } from "@/components/screens/dashboard/pages/index/create-status-page-dialog";

const publicUrl = (page: TStatusPage) =>
    page.customDomain ? `https://${page.customDomain}` : route("status.show", { slug: page.slug });

const StatusPagesIndex = () => {
    const { team } = useShared();
    const [search, setSearch] = useState("");

    const filtered = statusPages.filter((page) =>
        page.name.toLowerCase().includes(search.trim().toLowerCase()),
    );

    return (
        <DashboardLayout
            title="Status pages"
            breadcrumbs={[
                { title: "Status pages", href: route("dashboard.pages.index", { team }) },
            ]}
        >
            <div className="flex flex-col gap-6">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <Heading
                        title="Status pages"
                        description="Keep your users informed about the health of your services."
                    />
                    <div className="flex gap-2">
                        <InputGroup className="w-56">
                            <InputGroupInput
                                placeholder="Search status pages"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                            />
                            <InputGroupAddon>
                                <Search />
                            </InputGroupAddon>
                        </InputGroup>
                        <CreateStatusPageDialog />
                    </div>
                </div>
                <Card className="py-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="pl-4">Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Monitors</TableHead>
                                <TableHead className="pr-4">URL</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filtered.map((page) => (
                                <TableRow key={page.id}>
                                    <TableCell className="pl-4 font-medium">
                                        <Link
                                            href={route("dashboard.pages.show.overview", {
                                                team,
                                                statusPage: page.id,
                                            })}
                                            className="hover:underline"
                                        >
                                            {page.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {page.active ? (
                                            <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                                                Active
                                            </Badge>
                                        ) : (
                                            <Badge variant="secondary">Inactive</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="tabular-nums">
                                        {page.monitors.length}
                                    </TableCell>
                                    <TableCell className="pr-4 font-mono text-muted-foreground">
                                        <a
                                            href={publicUrl(page)}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="hover:underline"
                                        >
                                            {publicUrl(page)}
                                        </a>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {filtered.length === 0 && (
                        <Empty>
                            <EmptyHeader>
                                <EmptyMedia variant="icon">
                                    <SearchX />
                                </EmptyMedia>
                                <EmptyTitle>No status pages found.</EmptyTitle>
                                <EmptyDescription>Try a different search.</EmptyDescription>
                            </EmptyHeader>
                        </Empty>
                    )}
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default StatusPagesIndex;
