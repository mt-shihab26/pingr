import { Head } from "@inertiajs/react";
import { format } from "date-fns";
import { CircleCheck, SearchX, Zap } from "lucide-react";

import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";

import { findStatusPageBySlug } from "@/components/screens/dashboard/pages/status-pages-data";
import { incidentDays } from "@/components/screens/status/status-data";
import { MonitorUptime } from "@/components/screens/status/monitor-uptime";
import { IncidentHistory } from "@/components/screens/status/incident-history";
import { SubscribeDialog } from "@/components/screens/status/subscribe-dialog";

const TIMEZONE = "Asia/Dhaka";

const PublicStatusPage = ({ slug }: { slug: string }) => {
    const statusPage = findStatusPageBySlug(slug);

    if (!statusPage) {
        return (
            <main className="flex min-h-svh items-center justify-center bg-background p-4">
                <Head title="Status page not found" />
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <SearchX />
                        </EmptyMedia>
                        <EmptyTitle>Status page not found</EmptyTitle>
                        <EmptyDescription>
                            There is no status page at <code>/status/{slug}</code>.
                        </EmptyDescription>
                    </EmptyHeader>
                </Empty>
            </main>
        );
    }

    return (
        <div className="min-h-svh bg-background">
            <Head title={`${statusPage.name} status`} />
            <header className="border-b">
                <div className="mx-auto flex max-w-2xl items-center justify-between gap-4 px-4 py-6">
                    <h1 className="text-2xl font-semibold tracking-tight text-primary">
                        {statusPage.name}
                    </h1>
                    <SubscribeDialog name={statusPage.name} slug={statusPage.slug} />
                </div>
            </header>

            <main className="mx-auto flex max-w-2xl flex-col gap-16 px-4 py-16">
                <section className="flex flex-col items-center gap-2 text-center">
                    <span className="flex size-12 items-center justify-center rounded-full bg-emerald-500 text-white ring-4 ring-emerald-500/25">
                        <CircleCheck className="size-6" />
                    </span>
                    <h2 className="mt-2 text-xl font-semibold">No problems detected.</h2>
                    <p className="flex items-center gap-1 text-muted-foreground">
                        <Zap className="size-3.5" />
                        Last updated on {format(new Date(), "HH:mm:ss")} {TIMEZONE}
                    </p>
                </section>

                <div className="flex flex-col gap-8">
                    {statusPage.monitors.length > 0 ? (
                        statusPage.monitors.map((monitor) => (
                            <MonitorUptime key={monitor} monitor={monitor} />
                        ))
                    ) : (
                        <p className="text-center text-muted-foreground">
                            No monitors on this status page yet.
                        </p>
                    )}
                </div>

                <IncidentHistory days={incidentDays(statusPage.monitors)} timezone={TIMEZONE} />
            </main>

            <Separator className="mx-auto max-w-2xl" />
            <footer className="py-8 text-center text-sm font-semibold text-primary">
                Powered by Pingr
            </footer>
        </div>
    );
};

export default PublicStatusPage;
