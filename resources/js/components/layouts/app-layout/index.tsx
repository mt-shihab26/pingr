import type { TBreadcrumb } from "@/types";

import { AppSidebarLayout } from "./app-sidebar-layout";

export function AppLayout({
    breadcrumbs = [],
    children,
}: {
    breadcrumbs?: TBreadcrumb[];
    children: React.ReactNode;
}) {
    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            {children}
        </AppSidebarLayout>
    );
}
