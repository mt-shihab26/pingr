import type { TIncidentDay } from "./status-data";

import { CircleAlert, CircleCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const IncidentHistory = ({ days, timezone }: { days: TIncidentDay[]; timezone: string }) => {
    return (
        <section className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-medium">Incidents in the past 7 days</h2>
                <Button variant="link" size="sm" className="px-0 text-muted-foreground">
                    View full history
                </Button>
            </div>
            {days.map((day, index) => (
                <div key={day.date} className="flex flex-col gap-6 pt-6">
                    <div className="grid grid-cols-[6rem_1fr] gap-4">
                        <span className="font-medium">{day.date}</span>
                        {day.entries.length === 0 ? (
                            <span>No incidents on this day.</span>
                        ) : (
                            <ol className="flex flex-col gap-6">
                                {day.entries.map((entry, entryIndex) => (
                                    <li key={entry.message} className="relative flex gap-3">
                                        {entryIndex < day.entries.length - 1 && (
                                            <span className="absolute top-6 bottom-[-1.5rem] left-2.5 w-px bg-border" />
                                        )}
                                        {entry.kind === "recovered" ? (
                                            <CircleCheck className="size-5 shrink-0 text-emerald-500" />
                                        ) : (
                                            <CircleAlert className="size-5 shrink-0 text-amber-500" />
                                        )}
                                        <div className="flex flex-col gap-0.5">
                                            <span className="font-medium">{entry.message}</span>
                                            <span className="text-xs text-muted-foreground">
                                                {entry.time} {timezone}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        )}
                    </div>
                    {index < days.length - 1 && <Separator />}
                </div>
            ))}
        </section>
    );
};
