import { format, subDays } from "date-fns";

export const UPTIME_DAYS = 60;
export const WARNING_THRESHOLD = 98;
export const OUTAGE_THRESHOLD = 50;

export type TUptimeDay = { date: string; uptime: number | null };

export type TIncidentEntry = { kind: "down" | "recovered"; message: string; time: string };

export type TIncidentDay = { date: string; entries: TIncidentEntry[] };

const dips: Record<string, Record<number, number>> = {
    "developershihab.com": { 12: 99.31, 37: 97.12 },
    "tic-tac-toe.developershihab.com": { 1: 99.86, 21: 42.7, 22: 99.86 },
};

// Deterministic sample history, oldest day first. Days before a monitor existed have no data.
export const uptimeHistory = (monitor: string, today = new Date()): TUptimeDay[] => {
    const firstDay = monitor.startsWith("tic-tac-toe") ? 45 : UPTIME_DAYS;

    return Array.from({ length: UPTIME_DAYS }, (_, index) => {
        const daysAgo = UPTIME_DAYS - 1 - index;

        return {
            date: format(subDays(today, daysAgo), "yyyy-MM-dd"),
            uptime: daysAgo >= firstDay ? null : (dips[monitor]?.[daysAgo] ?? 100),
        };
    });
};

export const averageUptime = (days: TUptimeDay[]) => {
    const tracked = days.filter((day) => day.uptime !== null);

    if (tracked.length === 0) return null;

    return tracked.reduce((sum, day) => sum + (day.uptime ?? 0), 0) / tracked.length;
};

export const uptimeColor = (uptime: number | null) => {
    if (uptime === null) return "bg-muted";
    if (uptime < OUTAGE_THRESHOLD) return "bg-red-500";
    if (uptime < WARNING_THRESHOLD) return "bg-amber-400";

    return "bg-emerald-500";
};

// The past 7 days, newest first, with the auto-update entries posted on each day.
export const incidentDays = (monitors: string[], today = new Date()): TIncidentDay[] =>
    Array.from({ length: 7 }, (_, daysAgo) => {
        const monitor = "tic-tac-toe.developershihab.com";
        const entries: TIncidentEntry[] =
            daysAgo === 1 && monitors.includes(monitor)
                ? [
                      { kind: "recovered", message: `${monitor} has recovered.`, time: "08:48" },
                      { kind: "down", message: `${monitor} appears to be down.`, time: "08:46" },
                  ]
                : [];

        return { date: format(subDays(today, daysAgo), "MMM dd"), entries };
    });
