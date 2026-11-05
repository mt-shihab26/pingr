import type { ChartConfig } from "@/components/ui/chart";

import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";

import { ChartContainer } from "@/components/ui/chart";

const scoreColor = (value: number) =>
    value >= 90
        ? "var(--color-emerald-500)"
        : value >= 50
          ? "var(--color-amber-500)"
          : "var(--destructive)";

export const ScoreGauge = ({
    label,
    value,
    size = "default",
}: {
    label: string;
    value: number;
    size?: "default" | "sm";
}) => {
    const chartConfig = { score: { label, color: scoreColor(value) } } satisfies ChartConfig;

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="relative">
                <ChartContainer
                    config={chartConfig}
                    className={size === "sm" ? "aspect-square size-16" : "aspect-square size-28"}
                >
                    <RadialBarChart
                        data={[{ score: value }]}
                        startAngle={90}
                        endAngle={-270}
                        innerRadius="80%"
                        outerRadius="100%"
                    >
                        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                        <RadialBar dataKey="score" background fill="var(--color-score)" />
                    </RadialBarChart>
                </ChartContainer>
                <span
                    className="absolute inset-0 flex items-center justify-center font-mono font-medium tabular-nums"
                    style={{
                        color: scoreColor(value),
                        fontSize: size === "sm" ? "1rem" : "1.75rem",
                    }}
                >
                    {value}
                </span>
            </div>
            <span className={size === "sm" ? "text-xs" : "text-sm"}>{label}</span>
        </div>
    );
};
