import type { TBreadcrumb } from "./breadcrumbs";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Head } from "@inertiajs/react";
import { AppHeaderLayout } from "./app-header-layout";

export function DashboardLayout({
    title,
    breadcrumbs = [],
    children,
    className,
}: {
    title: string;
    breadcrumbs?: TBreadcrumb[];
    children: ReactNode;
    className?: string;
}) {
    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <h1 className="sr-only">{title}</h1>
            <div
                className={cn(
                    "flex flex-1 flex-col gap-8 px-4 py-6",
                    className,
                )}
            >
                {children}
            </div>
        </AppHeaderLayout>
    );
}
