import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import type { TTeam } from "@/types/models";

import { dashboardNavItems, resourceLinks } from "@/lib/links";
import { useShared } from "@/hooks/use-shared";

import { Link } from "@inertiajs/react";
import { AppLogo } from "./app-logo";
import { NavFooter } from "./nav-footer";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

const dashboardUrl = (team: TTeam | null): string => {
    return team
        ? route("dashboard.team.overview.index", { team: team.slug })
        : "/";
};

export function AppSidebar() {
    const { team } = useShared();

    const dashboardHref = dashboardUrl(team);
    const mainNavItems = dashboardNavItems(team);

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            render={
                                <Link href={dashboardHref} prefetch>
                                    <AppLogo />
                                </Link>
                            }
                        />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={resourceLinks} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
