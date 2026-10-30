export type TTeamRole = "owner" | "admin" | "member";

export type TTargetType = "website" | "server" | "tcpport" | "ai";

export type TTargetCheck =
    | "uptime"
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
