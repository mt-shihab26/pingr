import type { ChartConfig } from "@/components/ui/chart";

import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const ranges = [
    { value: "hour", label: "Last hour" },
    { value: "day", label: "Last 24 hours" },
    { value: "week", label: "Last 7 days" },
    { value: "month", label: "Last 30 days" },
];

const chartConfig = {
    dns: { label: "DNS lookup", color: "var(--chart-1)" },
    tcp: { label: "TCP connection", color: "var(--chart-2)" },
    tls: { label: "TLS handshake", color: "var(--chart-3)" },
    ttfb: { label: "Time to first byte", color: "var(--chart-4)" },
} satisfies ChartConfig;

const performance = Array.from({ length: 60 }, (_, index) => {
    const spike = index % 20 === 7 ? 140 : 0;

    return {
        time: `11:${String(index).padStart(2, "0")}`,
        dns: Math.round(6 + Math.abs(Math.sin(index)) * 8),
        tcp: Math.round(12 + Math.abs(Math.cos(index / 2)) * 10),
        tls: Math.round(18 + Math.abs(Math.sin(index / 3)) * 14 + spike / 2),
        ttfb: Math.round(50 + Math.abs(Math.cos(index / 4)) * 30 + spike),
    };
});

export const PerformanceHistoryCard = () => {
    const [range, setRange] = useState("hour");

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Performance history</CardTitle>
                <CardDescription>Response times for the selected range.</CardDescription>
                <CardAction>
                    <Select
                        items={ranges}
                        value={range}
                        onValueChange={(value) => setRange(value as string)}
                    >
                        <SelectTrigger className="w-36">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {ranges.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <dl className="flex w-fit divide-x border">
                    {[
                        { label: "Highest", value: "281ms" },
                        { label: "Lowest", value: "77ms" },
                        { label: "Average", value: "117ms" },
                    ].map((stat) => (
                        <div key={stat.label} className="flex flex-col gap-0.5 px-3 py-2">
                            <dt className="text-muted-foreground uppercase">{stat.label}</dt>
                            <dd className="flex items-center gap-1.5 font-mono font-medium">
                                <span className="size-1.5 rounded-full bg-emerald-500" />
                                {stat.value}
                            </dd>
                        </div>
                    ))}
                </dl>

                <ChartContainer config={chartConfig} className="aspect-auto h-64 w-full">
                    <AreaChart data={performance} margin={{ left: 0, right: 0 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="time" tickLine={false} axisLine={false} minTickGap={48} />
                        <YAxis tickLine={false} axisLine={false} width={48} unit="ms" />
                        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                        {Object.keys(chartConfig).map((key) => (
                            <Area
                                key={key}
                                dataKey={key}
                                type="monotone"
                                stackId="response"
                                stroke={`var(--color-${key})`}
                                fill={`var(--color-${key})`}
                                fillOpacity={0.3}
                            />
                        ))}
                    </AreaChart>
                </ChartContainer>

                <div className="flex h-6 gap-px">
                    {performance.map((point) => (
                        <span
                            key={point.time}
                            className="flex-1 bg-emerald-500"
                            title={point.time}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
