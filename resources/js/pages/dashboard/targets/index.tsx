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

import { useShared } from "@/hooks/use-shared";
import { types } from "@/lib/targets";

import { Link } from "@inertiajs/react";
import { TargetActions } from "@/components/screens/dashboard/targets/target-actions";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { Heading } from "@/components/elements/heading";
import { Button } from "@/components/ui/button";

const TargetIndex = ({ targets }: { targets: TPaginated<TTarget> }) => {
    const { team } = useShared();

    return (
        <DashboardLayout
            title="Targets"
            breadcrumbs={[
                { title: "Overview", href: route("dashboard.overview.index", { team }) },
                { title: "Targets", href: route("dashboard.targets.index", { team }) },
            ]}
        >
            <div className="flex items-center justify-between gap-4">
                <Heading title="Targets" description="Manage your team's monitoring targets." />
                <Button
                    nativeButton={false}
                    render={<Link href={route("dashboard.targets.create", { team })} />}
                >
                    Add target
                </Button>
            </div>
            {targets.data.length === 0 ? (
                <p className="text-muted-foreground">
                    No targets yet. Add a target to start monitoring.
                </p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Target</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Endpoint</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {targets.data.map((target) => (
                            <TableRow key={target.id}>
                                <TableCell>
                                    <Link
                                        className="underline"
                                        href={route("dashboard.targets.show", {
                                            team,
                                            target: target.id,
                                        })}
                                    >
                                        {target.label ?? target.endpoint}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    {types.find((type) => type.key === target.type)?.display.label}
                                </TableCell>
                                <TableCell className="break-all">{target.endpoint}</TableCell>
                                <TableCell>
                                    <TargetActions target={target} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
            <div className="flex items-center justify-between gap-4">
                {targets.prev_page_url ? (
                    <Link href={targets.prev_page_url}>Previous</Link>
                ) : (
                    <span />
                )}
                <span>
                    Page {targets.current_page} of {targets.last_page}
                </span>
                {targets.next_page_url ? <Link href={targets.next_page_url}>Next</Link> : <span />}
            </div>
        </DashboardLayout>
    );
};

export default TargetIndex;
