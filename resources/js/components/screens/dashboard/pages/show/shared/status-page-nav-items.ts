import type { TNavItem } from "@/types/utils";
import type { TTeam } from "@/types/models";

import { Bell, Globe, Languages, LayoutGrid, Megaphone, Paintbrush, Settings } from "lucide-react";

export const statusPageNavItems = (team: TTeam | null, statusPage: string): TNavItem[][] => {
    const href = (section: string) =>
        route(`dashboard.pages.show.${section}`, { team: team?.slug, statusPage });

    return [
        [{ title: "Overview", href: href("overview"), icon: LayoutGrid }],
        [
            { title: "Status updates", href: href("updates"), icon: Megaphone },
            { title: "Monitors", href: href("monitors"), icon: Globe },
        ],
        [
            { title: "Display", href: href("display"), icon: Paintbrush },
            { title: "Content", href: href("content"), icon: Languages },
            { title: "Notifications", href: href("notifications"), icon: Bell },
            { title: "Settings", href: href("settings"), icon: Settings },
        ],
    ];
};
