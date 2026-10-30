import type { TTargetAIFrequencyUnit, TTargetCheck, TTargetType } from "@/types/enums";

export const types: {
    key: TTargetType;
    display: {
        label: string;
        description: string;
    };
    endpoint: {
        label: string;
        description?: string;
        type: "url" | "text";
        placeholder: string;
        minLength: number;
        maxLength: number;
    };
    checks: TTargetCheck[];
}[] = [
    {
        key: "website",
        display: {
            label: "Website",
            description: "Check website uptime, broken pages & more",
        },
        endpoint: {
            label: "Website URL",
            type: "url",
            placeholder: "https://example.com",
            minLength: 10,
            maxLength: 2048,
        },
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
        display: {
            label: "Server",
            description: "Test server availability via ICMP ping & port scans",
        },
        endpoint: {
            label: "Server address",
            type: "text",
            placeholder: "192.168.1.1 or server.example.com",
            minLength: 4,
            maxLength: 253,
        },
        checks: ["uptime", "scheduled_tasks", "dns", "domain", "dns_blocklist", "open_ports"],
    },
    {
        key: "tcpport",
        display: {
            label: "TCP Port",
            description: "Verify if a TCP port is reachable",
        },
        endpoint: {
            label: "TCP endpoint",
            type: "text",
            placeholder: "example.com:443",
            minLength: 6,
            maxLength: 259,
        },
        checks: ["uptime", "dns", "domain", "dns_blocklist"],
    },
    {
        key: "ai",
        display: {
            label: "AI",
            description: "Use AI to verify anything you want",
        },
        endpoint: {
            label: "What website would you like to monitor?",
            description: "We'll analyze the page and suggest what to monitor.",
            type: "url",
            placeholder: "https://example.com",
            minLength: 10,
            maxLength: 2048,
        },
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
