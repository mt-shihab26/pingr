import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";

import { Heading } from "@/components/elements/heading";
import { ShowLayout } from "@/components/screens/dashboard/targets/show/show-layout";

const MonthlyReportsShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            breadcrumbs={[
                {
                    title: "Monthly reports",
                    href: route("dashboard.targets.show.monthly-reports", { team, target }),
                },
            ]}
        >
            <Heading title="Monthly reports" />
        </ShowLayout>
    );
};

export default MonthlyReportsShowPage;
