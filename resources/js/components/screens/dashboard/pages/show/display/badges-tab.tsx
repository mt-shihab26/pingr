import type { TStatusPage } from "@/components/screens/dashboard/pages/status-pages-data";

import { BadgeCard } from "@/components/screens/dashboard/targets/show/badges/badge-card";

export const BadgesTab = ({ statusPage }: { statusPage: TStatusPage }) => {
    const url = `https://pingr.app/badges/status-page/${statusPage.id}`;
    const alt = `${statusPage.name} status`;

    return (
        <div className="grid gap-4 lg:grid-cols-2">
            <BadgeCard
                title="Default badge"
                description="Embed this badge to show your current uptime status. It updates automatically whenever your status page changes."
                url={url}
                alt={alt}
                preview={
                    <span className="inline-flex overflow-hidden text-xs">
                        <span className="bg-neutral-800 px-2 py-1 text-white">
                            {statusPage.name}
                        </span>
                        <span className="bg-emerald-500 px-2 py-1 text-white">ok</span>
                    </span>
                }
            />
            <BadgeCard
                title="Small badge"
                description="A compact dot version of the badge for tight spots like navigation bars or footers."
                url={`${url}?size=small`}
                alt={alt}
                preview={
                    <span className="size-4 rounded-full bg-emerald-500 ring-4 ring-emerald-500/25" />
                }
            />
        </div>
    );
};
