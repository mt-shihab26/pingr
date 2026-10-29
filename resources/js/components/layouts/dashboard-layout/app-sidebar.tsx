import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import { dashboardNavItems, dashboardUrl, resourceLinks } from "@/lib/links";
import { useShared } from "@/hooks/use-shared";

import { Link } from "@inertiajs/react";
import { AppLogo } from "./app-logo";
import { NavFooter } from "./nav-footer";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

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
