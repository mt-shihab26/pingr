import type { InertiaLinkProps } from "@inertiajs/react";
import type { LucideIcon } from "lucide-react";

export type TNavItem = {
    title: string;
    href: NonNullable<InertiaLinkProps["href"]>;
    icon?: LucideIcon | null;
    isActive?: boolean;
};

export type TBreadcrumb = {
    type?: "link" | "back";
    title: string;
    href: NonNullable<InertiaLinkProps["href"]>;
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
    | "check_uptime" //
    | "check_certificate_health"
    | "check_broken_links"
    | "check_mixed_content"
    | "check_lighthouse"
    | "check_scheduled_tasks"
    | "check_application_health"
    | "check_sitemap"
    | "check_dns"
    | "check_domain"
    | "check_dns_blocklist"
    | "check_open_ports";

export type TTargetCheckItem = {
    key: TTargetCheck;
    label: string;
};
