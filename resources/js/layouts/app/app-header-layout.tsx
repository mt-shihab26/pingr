import { AppContent } from "@/components/elements/app-content";
import { AppHeader } from "@/components/elements/app-header";
import { AppShell } from "@/components/elements/app-shell";
import type { AppLayoutProps } from "@/types";

export default function AppHeaderLayout({
    children,
    breadcrumbs,
}: AppLayoutProps) {
    return (
        <AppShell variant="header">
            <AppHeader breadcrumbs={breadcrumbs} />
            <AppContent variant="header">{children}</AppContent>
        </AppShell>
    );
}
