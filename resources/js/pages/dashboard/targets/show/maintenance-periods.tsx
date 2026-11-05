import type { TTarget } from "@/types/models";
import type { TMaintenancePeriod } from "@/components/screens/dashboard/targets/show/maintenance-periods/periods-card";

import { useState } from "react";
import { useShared } from "@/hooks/use-shared";
import { Info } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";

import { ShowLayout } from "@/components/screens/dashboard/targets/show/shared/show-layout";

import { CreatePeriodDialog } from "@/components/screens/dashboard/targets/show/maintenance-periods/create-period-dialog";
import { PeriodsCard } from "@/components/screens/dashboard/targets/show/maintenance-periods/periods-card";
import { ApiTipCard } from "@/components/screens/dashboard/targets/show/maintenance-periods/api-tip-card";

const MaintenancePeriodsShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();
    const [periods, setPeriods] = useState<TMaintenancePeriod[]>([]);

    return (
        <ShowLayout
            target={target}
            title="Maintenance periods"
            breadcrumbs={[
                {
                    title: "Maintenance periods",
                    href: route("dashboard.targets.show.maintenance-periods", { team, target }),
                },
            ]}
        >
            <div className="flex flex-col gap-4">
                <div className="flex justify-end">
                    <CreatePeriodDialog onCreate={(period) => setPeriods([...periods, period])} />
                </div>
                <Alert>
                    <Info />
                    <AlertDescription>
                        When a maintenance period is active, Pingr will not send any notifications
                        when problems are detected on {target.label ?? target.endpoint}.
                    </AlertDescription>
                </Alert>
                <PeriodsCard
                    periods={periods}
                    onRemove={(period) => setPeriods(periods.filter((p) => p !== period))}
                />
                <ApiTipCard targetId={target.id} />
            </div>
        </ShowLayout>
    );
};

export default MaintenancePeriodsShowPage;
