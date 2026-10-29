import type { TBreadcrumb } from "./breadcrumbs";
import type { ReactNode } from "react";

import { Head } from "@inertiajs/react";
import { AppSidebarLayout } from "./app-sidebar-layout";

export function AppLayout({
    title,
    breadcrumbs = [],
    children,
}: {
    title: string;
    breadcrumbs?: TBreadcrumb[];
    children: ReactNode;
}) {
    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <h1 className="sr-only">{title}</h1>
            {children}
        </AppSidebarLayout>
    );
}
