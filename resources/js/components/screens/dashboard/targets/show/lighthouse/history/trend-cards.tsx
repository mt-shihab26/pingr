import type { ChartConfig } from "@/components/ui/chart";

import { Area, AreaChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

import { reports } from "../data";

const data = [...reports].reverse();

const scoreConfig = {
    performance: { label: "Performance", color: "var(--chart-1)" },
    accessibility: { label: "Accessibility", color: "var(--chart-2)" },
    bestPractices: { label: "Best practices", color: "var(--chart-3)" },
    seo: { label: "SEO", color: "var(--chart-4)" },
} satisfies ChartConfig;

const metricConfig = {
    fcp: { label: "First contentful paint", color: "var(--chart-1)" },
    lcp: { label: "Largest contentful paint", color: "var(--chart-2)" },
    si: { label: "Speed index", color: "var(--chart-3)" },
    tbt: { label: "Total blocking time", color: "var(--chart-4)" },
    tti: { label: "Time to interactive", color: "var(--chart-5)" },
} satisfies ChartConfig;

export const ScoreTrendsCard = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Score trends</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={scoreConfig} className="aspect-auto h-64 w-full">
                    <LineChart data={data}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="date" tickLine={false} axisLine={false} />
                        <YAxis domain={[0, 100]} tickLine={false} axisLine={false} width={32} />
                        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        {Object.keys(scoreConfig).map((key) => (
                            <Line
                                key={key}
                                dataKey={key}
                                type="monotone"
                                stroke={`var(--color-${key})`}
                                strokeWidth={2}
                                dot={false}
                            />
                        ))}
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export const MetricTrendsCard = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Metric trends in ms</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={metricConfig} className="aspect-auto h-64 w-full">
                    <AreaChart data={data}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="date" tickLine={false} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} width={48} unit="ms" />
                        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        {Object.keys(metricConfig).map((key) => (
                            <Area
                                key={key}
                                dataKey={key}
                                type="monotone"
                                stroke={`var(--color-${key})`}
                                fill={`var(--color-${key})`}
                                fillOpacity={0.15}
                            />
                        ))}
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};
