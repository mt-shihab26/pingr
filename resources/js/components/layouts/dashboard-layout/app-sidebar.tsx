import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useShared } from "@/hooks/use-shared";

import { Link } from "@inertiajs/react";
import { BookOpen, FolderGit2, LayoutGrid } from "lucide-react";
import { AppLogo } from "./app-logo";
import { NavFooter } from "./nav-footer";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

export function AppSidebar() {
    const { team } = useShared();

    const dashboardUrl = team ? route("dashboard.team.overview.index", { team: team.slug }) : "/";

    const mainNavItems = [
        {
            title: "Dashboard",
            href: dashboardUrl,
            icon: LayoutGrid,
        },
    ];

    const footerNavItems = [
        {
            title: "Repository",
            href: "https://github.com/laravel/react-starter-kit",
            icon: FolderGit2,
        },
        {
            title: "Documentation",
            href: "https://laravel.com/docs/starter-kits#react",
            icon: BookOpen,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            render={
                                <Link href={dashboardUrl} prefetch>
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
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
