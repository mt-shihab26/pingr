import type { TTarget } from "@/types/models";

import { StatusAlert } from "./status-alert";
import { CheckDetailsCard } from "./check-details-card";
import { PerformanceHistoryCard } from "./performance-history-card";
import { UptimeSummaryCard } from "./uptime-summary-card";
import { DowntimePeriodsCard } from "./downtime-periods-card";

export const Report = ({ target }: { target: TTarget }) => {
    const endpoint = target.label ?? target.endpoint;

    return (
        <div className="flex flex-col gap-4">
            <StatusAlert endpoint={endpoint} />
            <CheckDetailsCard />
            <PerformanceHistoryCard />
            <UptimeSummaryCard />
            <DowntimePeriodsCard endpoint={endpoint} />
        </div>
    );
};
