import type { InertiaLinkProps } from "@inertiajs/react";
import type { LucideIcon } from "lucide-react";

export type TNavItem = {
    title: string;
    href: NonNullable<InertiaLinkProps["href"]>;
    icon?: LucideIcon | null;
    isActive?: boolean;
};

export type TTargetCheck =
    | "uptime" //
    | "certificate_health"
    | "broken_links"
    | "mixed_content"
    | "lighthouse"
    | "scheduled_tasks"
    | "application_health"
    | "sitemap"
    | "dns"
    | "domain"
    | "dns_blocklist"
    | "open_ports";
