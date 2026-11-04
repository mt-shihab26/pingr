import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";

import { ShowLayout } from "@/components/screens/dashboard/targets/show/shared/show-layout";

const MonthlyReportsShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            title="Monthly reports"
            breadcrumbs={[
                {
                    title: "Monthly reports",
                    href: route("dashboard.targets.show.monthly-reports", { team, target }),
                },
            ]}
        />
    );
};

export default MonthlyReportsShowPage;
