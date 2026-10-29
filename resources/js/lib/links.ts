import type { TNavItem } from "@/types/utils";
import type { TTeam } from "@/types/models";

import { FolderGit2, LayoutGrid } from "lucide-react";

export const dashboardNavItems = (team: TTeam | null): TNavItem[] => {
    return [
        {
            title: "Dashboard",
            href: route("dashboard.team.overview.index", { team: team?.slug }),
            icon: LayoutGrid,
        },
        {
            title: "Targets",
            href: route("dashboard.team.targets.index", { team: team?.slug }),
            icon: LayoutGrid,
        },
        {
            title: "Pages",
            href: route("dashboard.team.pages.index", { team: team?.slug }),
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
