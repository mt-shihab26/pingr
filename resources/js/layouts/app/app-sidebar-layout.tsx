import { AppContent } from "@/components/elements/app-content";
import { AppShell } from "@/components/elements/app-shell";
import { AppSidebar } from "@/components/elements/app-sidebar";
import { AppSidebarHeader } from "@/components/elements/app-sidebar-header";
import type { AppLayoutProps } from "@/types";

export default function AppSidebarLayout({
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
