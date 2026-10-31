import type { TTeamRole, TTargetType, TTargetAIFrequencyUnit } from "./enums";

export type TUser = {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
};

export type TTeam = {
    id: number;
    name: string;
    slug: string;
    isPersonal: boolean;
    role?: TTeamRole;
    roleLabel?: string;
    isCurrent?: boolean;
};

export type TTeamMember = {
    id: number;
    name: string;
    email: string;
    avatar?: string | null;
    role: TTeamRole;
    role_label: string;
};

export type TTeamInvitation = {
    code: string;
    email: string;
    role: TTeamRole;
    role_label: string;
    created_at: string;
};

export type TTarget = {
    id: number;
    team_id: number;
    type: TTargetType;
    label: string | null;
    endpoint: string;
    ai_frequency_value: number | null;
    ai_frequency_unit: TTargetAIFrequencyUnit | null;
    check_uptime: boolean;
    check_certificate_health: boolean;
    check_broken_links: boolean;
    check_mixed_content: boolean;
    check_lighthouse: boolean;
    check_scheduled_tasks: boolean;
    check_application_health: boolean;
    check_sitemap: boolean;
    check_dns: boolean;
    check_domain: boolean;
    check_dns_blocklist: boolean;
    check_open_ports: boolean;
    created_at: string;
    updated_at: string;
};
