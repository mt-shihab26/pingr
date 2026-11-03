import type { TTarget } from "@/types/models";
import type { ReactNode } from "react";
import type { TBreadcrumb } from "@/types/utils";

import { useShared } from "@/hooks/use-shared";

import { DashboardLayout } from "@/components/layouts/dashboard-layout";

import { Sidebar } from "./sidebar";

export const ShowLayout = ({
    target,
    children,
    breadcrumbs = [],
}: {
    target: TTarget;
    children: ReactNode;
    breadcrumbs?: TBreadcrumb[];
}) => {
    const { team } = useShared();

    return (
        <DashboardLayout
            title={target.label ?? target.endpoint}
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
                    href: route("dashboard.targets.show", { team, target }),
                },
                ...breadcrumbs,
            ]}
        >
            {/* 114px = app header (65px) + breadcrumb bar (49px), 3rem = layout py-6 */}
            <div className="flex flex-col gap-6 md:h-[calc(100svh-114px-3rem)] md:flex-row">
                <Sidebar target={target} />
                <div className="scrollbar-slim flex min-w-0 flex-1 flex-col gap-6 md:overflow-y-auto">
                    {children}
                </div>
            </div>
        </DashboardLayout>
    );
};
