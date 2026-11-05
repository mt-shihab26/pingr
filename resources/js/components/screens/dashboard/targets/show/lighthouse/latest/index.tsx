import { CircleCheck } from "lucide-react";

import { Alert, AlertTitle } from "@/components/ui/alert";

import { MetricTrendsCard, ScoreTrendsCard } from "../history/trend-cards";
import { ScoresCard } from "./scores-card";
import { MetricsCard } from "./metrics-card";
import { FullReportCard } from "./full-report-card";

export const LatestTab = () => {
    return (
        <div className="flex flex-col gap-4">
            <Alert>
                <CircleCheck className="text-emerald-500" />
                <AlertTitle>Things are looking good!</AlertTitle>
            </Alert>
            <ScoresCard />
            <MetricsCard />
            <ScoreTrendsCard />
            <MetricTrendsCard />
            <FullReportCard />
        </div>
    );
};
