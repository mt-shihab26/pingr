import { Badge } from "@/components/ui/badge";

export const severities = [
    { value: "info", label: "Info" },
    { value: "warning", label: "Warning" },
    { value: "high", label: "High" },
    { value: "resolved", label: "Resolved" },
    { value: "scheduled", label: "Scheduled maintenance" },
];

const classNames: Record<string, string> = {
    info: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
    warning: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
    resolved: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    scheduled: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
};

export const SeverityBadge = ({ severity }: { severity: string }) => {
    const label = severities.find((item) => item.value === severity)?.label ?? severity;

    return severity === "high" ? (
        <Badge variant="destructive">{label}</Badge>
    ) : (
        <Badge className={classNames[severity]}>{label}</Badge>
    );
};
