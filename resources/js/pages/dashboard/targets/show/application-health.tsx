import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";

import { ShowLayout } from "@/components/screens/dashboard/targets/show/shared/show-layout";

const ApplicationHealthShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            title="Application health"
            breadcrumbs={[
                {
                    title: "Application health",
                    href: route("dashboard.targets.show.application-health", { team, target }),
                },
            ]}
        />
    );
};

export default ApplicationHealthShowPage;
