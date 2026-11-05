import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { UPTIME_DAYS, averageUptime, uptimeColor, uptimeHistory } from "./status-data";

const formatUptime = (uptime: number) => `${Number(uptime.toFixed(3))}% uptime`;

export const MonitorUptime = ({ monitor }: { monitor: string }) => {
    const days = uptimeHistory(monitor);
    const average = averageUptime(days);

    return (
        <section className="flex flex-col gap-2">
            <h3 className="flex items-center gap-2 font-medium">
                <span className="size-2 rounded-full bg-emerald-500" />
                {monitor}
            </h3>
            <div
                className="flex h-8 gap-0.5"
                aria-label={`${monitor} uptime for the last ${UPTIME_DAYS} days`}
            >
                {days.map((day) => (
                    <Tooltip key={day.date}>
                        <TooltipTrigger
                            render={
                                <span className={`flex-1 rounded-sm ${uptimeColor(day.uptime)}`} />
                            }
                        />
                        <TooltipContent>
                            <span className="font-mono">{day.date}</span>
                            {" · "}
                            {day.uptime === null ? "No data" : formatUptime(day.uptime)}
                        </TooltipContent>
                    </Tooltip>
                ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
                <span>{UPTIME_DAYS} days ago</span>
                <span>{average === null ? "No data" : formatUptime(average)}</span>
                <span>Today</span>
            </div>
        </section>
    );
};
