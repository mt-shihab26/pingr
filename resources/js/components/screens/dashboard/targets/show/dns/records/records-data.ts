export type TDnsRecord = { type: string; value: string; ttl: string };

export const nameservers = ["kallie.ns.cloudflare.com", "vicente.ns.cloudflare.com"];

export const records: TDnsRecord[] = [
    { type: "A", value: "172.67.202.223", ttl: "5 minutes" },
    { type: "A", value: "104.21.44.186", ttl: "5 minutes" },
    { type: "AAAA", value: "2606:4700:3033::ac43:cadf", ttl: "5 minutes" },
    { type: "AAAA", value: "2606:4700:3033::6815:2cba", ttl: "5 minutes" },
    { type: "MX", value: "10 eforward1.registrar-servers.com", ttl: "5 minutes" },
    { type: "MX", value: "10 eforward2.registrar-servers.com", ttl: "5 minutes" },
    { type: "MX", value: "10 eforward3.registrar-servers.com", ttl: "5 minutes" },
    { type: "MX", value: "15 eforward4.registrar-servers.com", ttl: "5 minutes" },
    { type: "MX", value: "20 eforward5.registrar-servers.com", ttl: "5 minutes" },
    { type: "NS", value: "kallie.ns.cloudflare.com", ttl: "1 day" },
    { type: "NS", value: "vicente.ns.cloudflare.com", ttl: "1 day" },
    {
        type: "TXT",
        value: "google-site-verification=x6tNCOJsEuMEafBY4hbb4296-Bg8_K3ACO4K6xL6S4Q",
        ttl: "5 minutes",
    },
    { type: "TXT", value: "v=spf1 include:spf.efwd.registrar-servers.com ~all", ttl: "5 minutes" },
];

export const recordTypeClassNames: Record<string, string> = {
    A: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    AAAA: "bg-orange-500/15 text-orange-600 dark:text-orange-400",
    MX: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
    NS: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
};
