import type { TNavItem } from "@/types/utils";
import type { TTarget, TTeam } from "@/types/models";

import {
    AlarmClockOff,
    Badge,
    Ban,
    FileText,
    Flag,
    FolderGit2,
    Gauge,
    Globe,
    History,
    LayoutGrid,
    List,
    LockOpen,
    Megaphone,
    Settings,
    ShieldCheck,
    Unlink,
    Wrench,
} from "lucide-react";

export const dashboardNavItems = (team: TTeam | null): TNavItem[] => {
    return [
        {
            title: "Dashboard",
            href: route("dashboard.overview.index", { team: team?.slug }),
            icon: LayoutGrid,
        },
        {
            title: "Targets",
            href: route("dashboard.targets.index", { team: team?.slug }),
            icon: LayoutGrid,
        },
        {
            title: "Pages",
            href: route("dashboard.pages.index", { team: team?.slug }),
            icon: LayoutGrid,
        },
    ];
};

export const resourceLinks: TNavItem[] = [
    {
        title: "Repository",
        href: "https://github.com/mt-shihab26/pingr",
        icon: FolderGit2,
    },
];

export const settingsNavItems: TNavItem[] = [
    {
        title: "Profile",
        href: route("dashboard.settings.profile.edit"),
        icon: null,
    },
    {
        title: "Security",
        href: route("dashboard.settings.security.edit"),
        icon: null,
    },

    {
        title: "Appearance",
        href: route("dashboard.settings.appearance.edit"),
        icon: null,
    },
    {
        title: "Teams",
        href: route("dashboard.teams.index"),
        icon: null,
    },
];

export const targetNavItems = (team: TTeam | null, target: TTarget): TNavItem[][] => {
    return [
        [
            {
                title: "Overview",
                href: route("dashboard.targets.show", { team, target }),
                icon: LayoutGrid,
            },
        ],
        [
            { title: "Uptime", href: "#", icon: Globe },
            { title: "Certificate health", href: "#", icon: ShieldCheck },
            { title: "Broken links", href: "#", icon: Unlink },
            { title: "Mixed content", href: "#", icon: LockOpen },
            { title: "Lighthouse", href: "#", icon: Gauge },
            { title: "DNS", href: "#", icon: List },
            { title: "Domain", href: "#", icon: Flag },
            { title: "DNS blocklist", href: "#", icon: Ban },
        ],
        [
            { title: "Monthly reports", href: "#", icon: FileText },
            { title: "Run History", href: "#", icon: History },
            { title: "Snooze History", href: "#", icon: AlarmClockOff },
        ],
        [
            { title: "Notifications", href: "#", icon: Megaphone },
            { title: "Maintenance periods", href: "#", icon: Wrench },
            { title: "Badges", href: "#", icon: Badge },
            { title: "Settings", href: "#", icon: Settings },
        ],
    ];
};
