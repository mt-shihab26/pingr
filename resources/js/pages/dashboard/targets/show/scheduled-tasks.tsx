import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";

import { ShowLayout } from "@/components/screens/dashboard/targets/show/shared/show-layout";

const ScheduledTasksShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            title="Scheduled tasks"
            breadcrumbs={[
                {
                    title: "Scheduled tasks",
                    href: route("dashboard.targets.show.scheduled-tasks", { team, target }),
                },
            ]}
        />
    );
};

export default ScheduledTasksShowPage;
