import type { InertiaLinkProps } from "@inertiajs/react";
import type { LucideIcon } from "lucide-react";

export type TNavItem = {
    title: string;
    href: NonNullable<InertiaLinkProps["href"]>;
    icon?: LucideIcon | null;
    isActive?: boolean;
};

export type TPaginated<T> = {
    data: T[];
    total: number;
    from: number | null;
    to: number | null;
    first_page_url: string;
    current_page: number;
    per_page: number;
    last_page: number;
    prev_page_url: string | null;
    next_page_url: string | null;
};

export type TTargetTab = "all" | "issues";

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
