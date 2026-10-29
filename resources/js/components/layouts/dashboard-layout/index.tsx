import type { TBreadcrumb } from "./breadcrumbs";
import type { ReactNode } from "react";

import { Head } from "@inertiajs/react";
import { AppHeaderLayout } from "./app-header-layout";

export function DashboardLayout({
    title,
    breadcrumbs = [],
    children,
}: {
    title: string;
    breadcrumbs?: TBreadcrumb[];
    children: ReactNode;
}) {
    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <h1 className="sr-only">{title}</h1>
            {children}
        </AppHeaderLayout>
    );
}
