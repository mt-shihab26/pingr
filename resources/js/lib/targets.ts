import type { TTargetType } from "@/types/enums";

export const types: {
    key: TTargetType;
    label: string;
    description: string;
}[] = [
    {
        key: "website",
        label: "Website",
        description: "Check website uptime, broken pages & more",
    },
    {
        key: "server",
        label: "Server",
        description: "Test server availability via ICMP ping & port scans",
    },
    {
        key: "tcpport",
        label: "TCP Port",
        description: "Verify if a TCP port is reachable",
    },
    {
        key: "ai",
        label: "AI",
        description: "Use AI to verify anything you want",
    },
];
