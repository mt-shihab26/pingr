import type { LucideIcon } from "lucide-react";

import {
    Bell,
    Hash,
    Mail,
    MessageCircle,
    MessageSquare,
    MessagesSquare,
    Send,
    Siren,
    Smartphone,
    Terminal,
    Users,
    Webhook,
} from "lucide-react";

export const channels: { value: string; label: string; icon: LucideIcon }[] = [
    { value: "mail", label: "Mail", icon: Mail },
    { value: "slack-webhook", label: "Slack Webhook", icon: Hash },
    { value: "slack", label: "Slack", icon: Hash },
    { value: "telegram", label: "Telegram", icon: Send },
    { value: "webhooks", label: "Webhooks", icon: Webhook },
    { value: "sms", label: "Sms", icon: Smartphone },
    { value: "discord", label: "Discord", icon: MessageCircle },
    { value: "google-chat", label: "Google Chat", icon: MessageSquare },
    { value: "teams-legacy", label: "Microsoft Teams (Legacy)", icon: Users },
    { value: "teams", label: "Microsoft Teams", icon: Users },
    { value: "pushover", label: "Pushover", icon: Bell },
    { value: "ntfy", label: "Ntfy", icon: Terminal },
    { value: "opsgenie", label: "Opsgenie", icon: Siren },
    { value: "pagerduty", label: "PagerDuty", icon: MessagesSquare },
];
