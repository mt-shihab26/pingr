import type { ReactNode } from "react";
import type { TBreadcrumb } from "./breadcrumbs";

import { AppContent } from "./app-content";
import { AppShell } from "./app-shell";
import { AppSidebar } from "./app-sidebar";
import { AppSidebarHeader } from "./app-sidebar-header";

type AppLayoutProps = {
    children: ReactNode;
    breadcrumbs?: TBreadcrumb[];
};

export function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: AppLayoutProps) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="min-w-0 overflow-x-clip">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
