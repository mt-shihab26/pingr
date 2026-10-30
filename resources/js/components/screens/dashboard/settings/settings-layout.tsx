import { Link } from "@inertiajs/react";
import { Heading } from "@/components/elements/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCurrentUrl } from "@/hooks/use-current-url";
import { useShared } from "@/hooks/use-shared";
import { cn, toUrl } from "@/lib/utils";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import type { ReactNode } from "react";
import type { TBreadcrumb } from "@/components/layouts/dashboard-layout/breadcrumbs";
import { settingsNavItems } from "@/lib/links";

export function SettingsLayout({
    title,
    children,
    breadcrumbs = [],
}: {
    title: string;
    children: ReactNode;
    breadcrumbs?: TBreadcrumb[];
}) {
    const { isCurrentOrParentUrl } = useCurrentUrl();
    const { team } = useShared();

    return (
        <DashboardLayout
            title={title}
            breadcrumbs={[
                {
                    type: "back",
                    title: "Back to dashboard",
                    href: team
                        ? route("dashboard.overview.index", {
                              team: team.slug,
                          })
                        : "/",
                },
                {
                    title: "Settings",
                    href: route("dashboard.settings.profile.edit"),
                },
                ...breadcrumbs,
            ]}
        >
            <Heading
                title="Settings"
                description="Manage your profile and account settings"
            />

            <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
                <aside className="w-full max-w-xl lg:w-48">
                    <nav className="flex flex-col gap-1" aria-label="Settings">
                        {settingsNavItems.map((item, index) => (
                            <Button
                                key={`${toUrl(item.href)}-${index}`}
                                size="sm"
                                variant="ghost"
                                nativeButton={false}
                                className={cn("w-full justify-start", {
                                    "bg-muted": isCurrentOrParentUrl(item.href),
                                })}
                                render={
                                    <Link href={item.href}>
                                        {item.icon && (
                                            <item.icon className="h-4 w-4" />
                                        )}
                                        {item.title}
                                    </Link>
                                }
                            />
                        ))}
                    </nav>
                </aside>

                <Separator className="lg:hidden" />

                <div className="flex-1 md:max-w-2xl">
                    <section className="max-w-xl space-y-12">
                        {children}
                    </section>
                </div>
            </div>
        </DashboardLayout>
    );
}
