<?php

namespace App\Enums;

enum TargetType: string
{
    case Website = "website";
    case Server = "server";
    case Tcpport = "tcpport";
    case Ai = "ai";

    /**
     * Get the checks supported by this target type.
     *
     * @return array<int, string>
     */
    public function checks(): array
    {
        return match ($this) {
            self::Website => [
                'check_uptime',
                'check_certificate_health',
                'check_broken_links',
                'check_mixed_content',
                'check_lighthouse',
                'check_scheduled_tasks',
                'check_application_health',
                'check_sitemap',
                'check_dns',
                'check_domain',
                'check_dns_blocklist',
            ],
            self::Server => [
                'check_uptime',
                'check_scheduled_tasks',
                'check_dns',
                'check_domain',
                'check_dns_blocklist',
                'check_open_ports',
            ],
            self::Tcpport => [
                'check_uptime',
                'check_dns',
                'check_domain',
                'check_dns_blocklist',
            ],
            self::Ai => [],
        };
    }
}
