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
                href: route("dashboard.targets.show.overview", { team, target }),
                icon: LayoutGrid,
            },
        ],
        [
            {
                title: "Uptime",
                href: route("dashboard.targets.show.uptime", { team, target }),
                icon: Globe,
            },
            {
                title: "Certificate health",
                href: route("dashboard.targets.show.certificate-health", { team, target }),
                icon: ShieldCheck,
            },
            {
                title: "Broken links",
                href: route("dashboard.targets.show.broken-links", { team, target }),
                icon: Unlink,
            },
            {
                title: "Mixed content",
                href: route("dashboard.targets.show.mixed-content", { team, target }),
                icon: LockOpen,
            },
            {
                title: "Lighthouse",
                href: route("dashboard.targets.show.lighthouse", { team, target }),
                icon: Gauge,
            },
            {
                title: "DNS",
                href: route("dashboard.targets.show.dns", { team, target }),
                icon: List,
            },
            {
                title: "Domain",
                href: route("dashboard.targets.show.domain", { team, target }),
                icon: Flag,
            },
            {
                title: "DNS blocklist",
                href: route("dashboard.targets.show.dns-blocklist", { team, target }),
                icon: Ban,
            },
        ],
        [
            {
                title: "Monthly reports",
                href: route("dashboard.targets.show.monthly-reports", { team, target }),
                icon: FileText,
            },
            {
                title: "Run History",
                href: route("dashboard.targets.show.run-history", { team, target }),
                icon: History,
            },
            {
                title: "Snooze History",
                href: route("dashboard.targets.show.snooze-history", { team, target }),
                icon: AlarmClockOff,
            },
        ],
        [
            {
                title: "Notifications",
                href: route("dashboard.targets.show.notifications", { team, target }),
                icon: Megaphone,
            },
            {
                title: "Maintenance periods",
                href: route("dashboard.targets.show.maintenance-periods", { team, target }),
                icon: Wrench,
            },
            {
                title: "Badges",
                href: route("dashboard.targets.show.badges", { team, target }),
                icon: Badge,
            },
            {
                title: "Settings",
                href: route("dashboard.targets.show.settings", { team, target }),
                icon: Settings,
            },
        ],
    ];
};
