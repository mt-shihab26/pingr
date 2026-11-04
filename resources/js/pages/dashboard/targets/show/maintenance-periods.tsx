import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";

import { ShowLayout } from "@/components/screens/dashboard/targets/show/show-layout";

const MaintenancePeriodsShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

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
        />
    );
};

export default MaintenancePeriodsShowPage;
