import { MetricTrendsCard, ScoreTrendsCard } from "./trend-cards";
import { DetailedReportsCard } from "./detailed-reports-card";

export const HistoryTab = () => {
    return (
        <div className="flex flex-col gap-4">
            <ScoreTrendsCard />
            <MetricTrendsCard />
            <DetailedReportsCard />
        </div>
    );
};
