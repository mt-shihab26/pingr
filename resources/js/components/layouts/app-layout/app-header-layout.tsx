import type { ReactNode } from "react";
import type { TBreadcrumb } from "@/types/navigation";

import { AppContent } from "./app-content";
import { AppHeader } from "./app-header";
import { AppShell } from "./app-shell";

type AppLayoutProps = {
    children: ReactNode;
    breadcrumbs?: TBreadcrumb[];
};

export function AppHeaderLayout({ children, breadcrumbs }: AppLayoutProps) {
    return (
        <AppShell variant="header">
            <AppHeader breadcrumbs={breadcrumbs} />
            <AppContent variant="header">{children}</AppContent>
        </AppShell>
    );
}
