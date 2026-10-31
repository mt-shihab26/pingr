import type { TTarget } from "@/types/models";

import { useState } from "react";
import { useShared } from "@/hooks/use-shared";
import { checks, types } from "@/lib/targets";
import { router } from "@inertiajs/react";

import { Link } from "@inertiajs/react";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { Heading } from "@/components/elements/heading";
import { Button } from "@/components/ui/button";

const ShowTarget = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

    const [deleting, setDeleting] = useState(false);

    const enabledChecks = checks.filter((check) => target[`check_${check.key}`]);

    const destroy = () => {
        if (!window.confirm("Delete this target?")) return;
        router.delete(route("dashboard.targets.destroy", { team, target: target.id }), {
            onStart: () => setDeleting(true),
            onFinish: () => setDeleting(false),
        });
    };

    return (
        <DashboardLayout
            title={target.label ?? target.endpoint}
            breadcrumbs={[
                {
                    type: "back",
                    title: "Back to targets",
                    href: route("dashboard.targets.index", { team }),
                },
                { title: "Targets", href: route("dashboard.targets.index", { team }) },
                {
                    title: target.label ?? target.endpoint,
                    href: route("dashboard.targets.show", { team, target: target.id }),
                },
            ]}
        >
            <Heading title={target.label ?? target.endpoint} />
            <dl className="space-y-4">
                <div>
                    <dt className="text-muted-foreground">Type</dt>
                    <dd>{types.find((type) => type.key === target.type)?.display.label}</dd>
                </div>
                <div>
                    <dt className="text-muted-foreground">Endpoint</dt>
                    <dd className="break-all">{target.endpoint}</dd>
                </div>
                {target.type === "ai" && (
                    <div>
                        <dt className="text-muted-foreground">Frequency</dt>
                        <dd>
                            Every {target.ai_frequency_value} {target.ai_frequency_unit}
                            {target.ai_frequency_value !== 1 ? "s" : ""}
                        </dd>
                    </div>
                )}
                {target.type !== "ai" && (
                    <div>
                        <dt className="text-muted-foreground">Enabled checks</dt>
                        <dd>{enabledChecks.map((check) => check.label).join(", ") || "None"}</dd>
                    </div>
                )}
            </dl>
            <div className="flex gap-2">
                <Button
                    nativeButton={false}
                    render={
                        <Link href={route("dashboard.targets.edit", { team, target: target.id })} />
                    }
                >
                    Edit target
                </Button>
                <Button variant="destructive" disabled={deleting} onClick={destroy}>
                    Delete target
                </Button>
            </div>
        </DashboardLayout>
    );
};

export default ShowTarget;
