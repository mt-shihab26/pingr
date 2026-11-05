import type { ReactNode } from "react";

import { useShared } from "@/hooks/use-shared";

import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { Heading } from "@/components/elements/heading";

import { findStatusPage } from "../../status-pages-data";
import { StatusPageSidebar } from "./status-page-sidebar";

export const StatusPageLayout = ({
    statusPageId,
    title,
    children,
}: {
    statusPageId: string;
    title: string;
    children?: ReactNode;
}) => {
    const { team } = useShared();
    const statusPage = findStatusPage(statusPageId);

    return (
        <DashboardLayout
            title={`${title} - ${statusPage.name}`}
            breadcrumbs={[
                {
                    type: "back",
                    title: "Back to status pages",
                    href: route("dashboard.pages.index", { team }),
                },
                {
                    title: "Status pages",
                    href: route("dashboard.pages.index", { team }),
                },
                {
                    title: statusPage.name,
                    href: route("dashboard.pages.show.overview", {
                        team,
                        statusPage: statusPageId,
                    }),
                },
                {
                    title,
                    href: route("dashboard.pages.show.overview", {
                        team,
                        statusPage: statusPageId,
                    }),
                },
            ]}
        >
            <div className="flex flex-col gap-6 md:flex-row">
                <StatusPageSidebar statusPageId={statusPageId} />
                <div className="flex min-w-0 flex-1 flex-col gap-6">
                    <Heading title={statusPage.name} description={title} />
                    {children}
                </div>
            </div>
        </DashboardLayout>
    );
};
