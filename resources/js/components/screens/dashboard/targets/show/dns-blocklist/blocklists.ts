export type TBlocklist = { name: string; kind?: string; description: string };

export const securityBlocklists: TBlocklist[] = [
    { name: "Barracuda", kind: "IP-based", description: "IP reputation blocklist" },
    { name: "SpamCop", kind: "IP-based", description: "Email-based spam reporting blocklist" },
    { name: "SURBL", kind: "Domain-based", description: "Multi-source domain blocklist" },
    { name: "URLhaus", kind: "Domain-based", description: "Malware URL blocklist" },
];

export const contentFilters: TBlocklist[] = [
    { name: "AdGuard DNS", description: "Blocks ads, trackers, and malware domains" },
    { name: "AdGuard Family", description: "Blocks adult content, ads, and malware" },
    {
        name: "CleanBrowsing Security",
        description: "Blocks malware, phishing, and dangerous sites",
    },
    { name: "Cloudflare Family", description: "Blocks malware and adult content" },
    { name: "OpenDNS", description: "Blocks malware and phishing domains" },
    { name: "OpenDNS Family", description: "Blocks adult content, malware, and phishing" },
    { name: "Quad9", description: "Blocks malware and phishing domains" },
];

export const resolvedIps = ["104.21.44.186", "172.67.202.223"];
