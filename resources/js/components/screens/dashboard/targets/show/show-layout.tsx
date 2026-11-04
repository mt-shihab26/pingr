import type { TTarget } from "@/types/models";
import type { ReactNode } from "react";
import type { TBreadcrumb } from "@/types/utils";

import { useShared } from "@/hooks/use-shared";

import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { Heading } from "@/components/elements/heading";

import { Sidebar } from "./sidebar";

export const ShowLayout = ({
    target,
    title,
    children,
    breadcrumbs = [],
}: {
    target: TTarget;
    title: string;
    children?: ReactNode;
    breadcrumbs?: TBreadcrumb[];
}) => {
    const { team } = useShared();

    return (
        <DashboardLayout
            title={`${title} - ${target.label ?? target.endpoint}`}
            breadcrumbs={[
                {
                    type: "back",
                    title: "Back to targets",
                    href: route("dashboard.targets.index", { team }),
                },
                {
                    title: "Targets",
                    href: route("dashboard.targets.index", { team }),
                },
                {
                    title: target.label ?? target.endpoint,
                    href: route("dashboard.targets.show.redirect", { team, target }),
                },
                ...breadcrumbs,
            ]}
        >
            <div className="flex flex-col gap-6 md:flex-row">
                <Sidebar target={target} />
                <div className="flex min-w-0 flex-1 flex-col gap-6">
                    <Heading title={title} />
                    {children}
                </div>
            </div>
        </DashboardLayout>
    );
};
