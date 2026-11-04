import {
    Sidebar,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/ui/sidebar";

import type { TTarget } from "@/types/models";

import { targetNavItems } from "@/lib/links";
import { useShared } from "@/hooks/use-shared";
import { useCurrentUrl } from "@/hooks/use-current-url";

import { Link } from "@inertiajs/react";

export const ShowSidebar = ({ target }: { target: TTarget }) => {
    const { team } = useShared();
    const { isCurrentUrl } = useCurrentUrl();

    const groups = targetNavItems(team, target);

    return (
        <SidebarProvider className="min-h-0 w-full shrink-0 md:w-(--sidebar-width)">
            <Sidebar collapsible="none" className="w-full bg-transparent">
                <div className="flex flex-1 flex-col">
                    {groups.map((items, index) => (
                        <SidebarGroup key={index} className="px-0">
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {items.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                isActive={isCurrentUrl(item.href)}
                                                render={<Link href={item.href} />}
                                            >
                                                {item.icon && <item.icon />}
                                                <span>{item.title}</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    ))}
                </div>
            </Sidebar>
        </SidebarProvider>
    );
};
