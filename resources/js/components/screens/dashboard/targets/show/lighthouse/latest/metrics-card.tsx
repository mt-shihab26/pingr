import { CircleHelp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { metrics } from "../data";

export const MetricsCard = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Metrics</CardTitle>
            </CardHeader>
            <CardContent>
                <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {metrics.map((metric) => (
                        <div key={metric.label} className="flex flex-col gap-1">
                            <dt className="flex items-center gap-1.5">
                                <span className="size-2 rounded-full bg-emerald-500" />
                                {metric.label}
                                <Tooltip>
                                    <TooltipTrigger
                                        render={
                                            <CircleHelp className="size-3.5 text-muted-foreground" />
                                        }
                                    />
                                    <TooltipContent>{metric.hint}</TooltipContent>
                                </Tooltip>
                            </dt>
                            <dd className="pl-3.5 font-mono text-base text-emerald-600 tabular-nums dark:text-emerald-400">
                                {metric.value}
                            </dd>
                        </div>
                    ))}
                </dl>
            </CardContent>
        </Card>
    );
};
