import type { TTargetAIFrequencyUnit, TTargetCheck, TTargetType } from "@/types/enums";

export const types: {
    key: TTargetType;
    label: string;
    description: string;
    checks: TTargetCheck[];
}[] = [
    {
        key: "website",
        label: "Website",
        description: "Check website uptime, broken pages & more",
        checks: [
            "uptime",
            "certificate_health",
            "broken_links",
            "mixed_content",
            "lighthouse",
            "scheduled_tasks",
            "application_health",
            "sitemap",
            "dns",
            "domain",
            "dns_blocklist",
        ],
    },
    {
        key: "server",
        label: "Server",
        description: "Test server availability via ICMP ping & port scans",
        checks: ["uptime", "scheduled_tasks", "dns", "domain", "dns_blocklist", "open_ports"],
    },
    {
        key: "tcpport",
        label: "TCP Port",
        description: "Verify if a TCP port is reachable",
        checks: ["uptime", "dns", "domain", "dns_blocklist"],
    },
    {
        key: "ai",
        label: "AI",
        description: "Use AI to verify anything you want",
        checks: [],
    },
];

export const checks: {
    key: TTargetCheck;
    label: string;
}[] = [
    {
        key: "uptime",
        label: "Uptime",
    },
    {
        key: "certificate_health",
        label: "Certificate Health",
    },
    {
        key: "broken_links",
        label: "Broken Links",
    },
    {
        key: "mixed_content",
        label: "Mixed Content",
    },
    {
        key: "lighthouse",
        label: "Lighthouse",
    },
    {
        key: "scheduled_tasks",
        label: "Scheduled Tasks",
    },
    {
        key: "application_health",
        label: "Application Health",
    },
    {
        key: "sitemap",
        label: "Sitemap",
    },
    {
        key: "dns",
        label: "DNS",
    },
    {
        key: "domain",
        label: "Domain",
    },
    {
        key: "dns_blocklist",
        label: "DNS Blocklist",
    },
    {
        key: "open_ports",
        label: "Open Ports",
    },
];

export const aiFrequencyUnits: {
    key: TTargetAIFrequencyUnit;
    label: string;
}[] = [
    {
        key: "minute",
        label: "Minute(s)",
    },
    {
        key: "hour",
        label: "Hour(s)",
    },
    {
        key: "day",
        label: "Day(s)",
    },
];
