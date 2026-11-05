import { Link } from "@inertiajs/react";
import { Plus } from "lucide-react";

import { useShared } from "@/hooks/use-shared";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { StatusPageLayout } from "@/components/screens/dashboard/pages/show/shared/status-page-layout";
import { findStatusPage } from "@/components/screens/dashboard/pages/status-pages-data";
import { StatGrid } from "@/components/screens/dashboard/pages/show/overview/stat-grid";
import { CardMenu } from "@/components/screens/dashboard/pages/show/overview/card-menu";

const OverviewStatusPage = ({ statusPageId }: { statusPageId: string }) => {
    const { team } = useShared();
    const statusPage = findStatusPage(statusPageId);

    const href = (section: string, tab?: string) =>
        route(`dashboard.pages.show.${section}`, { team, statusPage: statusPageId, tab });

    return (
        <StatusPageLayout statusPageId={statusPageId} title="Overview">
            <div className="grid gap-4 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Your status page</CardTitle>
                        <CardDescription>
                            {statusPage.monitors.length === 0
                                ? "Your status page is active, but it doesn't contain any monitors yet."
                                : `Your status page shows ${statusPage.monitors.length} monitor(s).`}
                        </CardDescription>
                        <CardAction>
                            <CardMenu
                                items={[
                                    { label: "Display settings", href: href("display") },
                                    { label: "URL settings", href: href("settings") },
                                ]}
                            />
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <StatGrid
                            stats={[
                                { label: "Active", value: statusPage.active ? "Yes" : "No" },
                                { label: "Public URL", value: "Yes" },
                                {
                                    label: "Custom domain",
                                    value: statusPage.customDomain ? "Yes" : "No",
                                },
                            ]}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button
                            variant="link"
                            className="px-0"
                            nativeButton={false}
                            render={
                                <a
                                    href={route("status.show", { slug: statusPage.slug })}
                                    target="_blank"
                                    rel="noreferrer"
                                />
                            }
                        >
                            Preview status page
                        </Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Latest status update</CardTitle>
                        <CardDescription>
                            Your status page can display updates to inform your audience on how your
                            service is doing.
                        </CardDescription>
                        <CardAction>
                            <CardMenu items={[{ label: "All updates", href: href("updates") }]} />
                        </CardAction>
                    </CardHeader>
                    <CardFooter>
                        <Button
                            size="sm"
                            render={<Link href={href("updates")} />}
                            nativeButton={false}
                        >
                            <Plus data-icon="inline-start" />
                            Create new update
                        </Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Monitors</CardTitle>
                        <CardDescription>
                            Add monitors to show their status here, or use this page for manual
                            updates only. With auto updates enabled, we'll automatically post status
                            updates when a monitor goes up or down.
                        </CardDescription>
                        <CardAction>
                            <CardMenu
                                items={[{ label: "Manage monitors", href: href("monitors") }]}
                            />
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <StatGrid
                            stats={[
                                {
                                    label: "Monitors added",
                                    value: String(statusPage.monitors.length),
                                },
                                {
                                    label: "Auto updates",
                                    value: statusPage.autoUpdates ? "Enabled" : "Disabled",
                                },
                            ]}
                        />
                    </CardContent>
                    <CardFooter className="flex-wrap gap-4">
                        <Button
                            size="sm"
                            render={<Link href={href("monitors")} />}
                            nativeButton={false}
                        >
                            <Plus data-icon="inline-start" />
                            Add monitors
                        </Button>
                        <Button
                            variant="link"
                            className="px-0"
                            render={<Link href={href("monitors", "auto-updates")} />}
                            nativeButton={false}
                        >
                            Configure auto updates
                        </Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Latest incident</CardTitle>
                        <CardDescription>
                            Your status page did not display any incidents yet.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </StatusPageLayout>
    );
};

export default OverviewStatusPage;
