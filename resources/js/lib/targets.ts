import type { TTargetAIFrequencyUnit, TTargetType } from "@/types/enums";
import type { TTarget, TTeam } from "@/types/models";
import type { TTargetCheck, TTargetCheckItem } from "@/types/utils";
import type { LucideIcon } from "lucide-react";

import { Globe, Network, Server, Sparkles } from "lucide-react";

export const types: {
    key: TTargetType;
    display: {
        icon: LucideIcon;
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
            icon: Globe,
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
            "check_uptime",
            "check_certificate_health",
            "check_broken_links",
            "check_mixed_content",
            "check_lighthouse",
            "check_scheduled_tasks",
            "check_application_health",
            "check_sitemap",
            "check_dns",
            "check_domain",
            "check_dns_blocklist",
        ],
    },
    {
        key: "server",
        display: {
            icon: Server,
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
        checks: [
            "check_uptime",
            "check_scheduled_tasks",
            "check_dns",
            "check_domain",
            "check_dns_blocklist",
            "check_open_ports",
        ],
    },
    {
        key: "tcpport",
        display: {
            icon: Network,
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
        checks: ["check_uptime", "check_dns", "check_domain", "check_dns_blocklist"],
    },
    {
        key: "ai",
        display: {
            icon: Sparkles,
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

export const checks: TTargetCheckItem[] = [
    {
        key: "check_uptime",
        label: "Uptime",
    },
    {
        key: "check_certificate_health",
        label: "Certificate Health",
    },
    {
        key: "check_broken_links",
        label: "Broken Links",
    },
    {
        key: "check_mixed_content",
        label: "Mixed Content",
    },
    {
        key: "check_lighthouse",
        label: "Lighthouse",
    },
    {
        key: "check_scheduled_tasks",
        label: "Scheduled Tasks",
    },
    {
        key: "check_application_health",
        label: "Application Health",
    },
    {
        key: "check_sitemap",
        label: "Sitemap",
    },
    {
        key: "check_dns",
        label: "DNS",
    },
    {
        key: "check_domain",
        label: "Domain",
    },
    {
        key: "check_dns_blocklist",
        label: "DNS Blocklist",
    },
    {
        key: "check_open_ports",
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

export const details = (
    team: TTeam | null,
    target: TTarget,
): Record<
    TTargetCheck,
    {
        description: string;
        stats: string[];
        advanced?: boolean;
        href?: string;
    }
> => {
    return {
        check_uptime: {
            description: "We check if your target is up and notify you as soon as it goes down.",
            stats: ["Past 7 days", "Past 14 days", "Past 30 days"],
            href: route("dashboard.targets.show.uptime", { team, target }),
        },
        check_certificate_health: {
            description: "We check your SSL certificate and notify you before it expires.",
            stats: ["Expires in"],
            href: route("dashboard.targets.show.certificate-health", { team, target }),
        },
        check_broken_links: {
            description: "We crawl your site and notify you when we find broken links.",
            stats: ["Broken links", "URLs crawled"],
            href: route("dashboard.targets.show.broken-links", { team, target }),
        },
        check_mixed_content: {
            description: "We crawl your site and notify you when we find insecure resources.",
            stats: ["Pieces of mixed content", "URLs crawled"],
            href: route("dashboard.targets.show.mixed-content", { team, target }),
        },
        check_lighthouse: {
            description: "We run Lighthouse audits and notify you when your scores drop.",
            stats: ["Performance", "Accessibility", "SEO"],
            href: route("dashboard.targets.show.lighthouse", { team, target }),
        },
        check_scheduled_tasks: {
            description:
                "As soon as one of your scheduled tasks isn't running on time, or errors, we'll send you a notification.",
            stats: ["Tasks", "Failing"],
            advanced: true,
        },
        check_application_health: {
            description:
                "We monitor critical parts of your server and application, like disk space, queues and the APIs you depend on.",
            stats: ["Checks", "Failing"],
            advanced: true,
        },
        check_sitemap: {
            description:
                "We check the format of your sitemap and notify you whenever we detect any problems with it.",
            stats: ["URLs in sitemap", "Issues"],
            advanced: true,
        },
        check_dns: {
            description: "We monitor your DNS records and notify you when they change.",
            stats: ["Records"],
            href: route("dashboard.targets.show.dns", { team, target }),
        },
        check_domain: {
            description: "We check your domain registration and notify you before it expires.",
            stats: ["Expires in"],
            href: route("dashboard.targets.show.domain", { team, target }),
        },
        check_dns_blocklist: {
            description: "We check if your domain or IP appears on any DNS blocklist.",
            stats: ["Blocklists checked", "Listed on"],
            href: route("dashboard.targets.show.dns-blocklist", { team, target }),
        },
        check_open_ports: {
            description: "We scan your server and notify you when unexpected ports are open.",
            stats: ["Open ports"],
        },
    };
};
