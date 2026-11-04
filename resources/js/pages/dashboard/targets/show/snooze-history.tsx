import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";

import { ShowLayout } from "@/components/screens/dashboard/targets/show/shared/show-layout";

const SnoozeHistoryShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            title="Snooze History"
            breadcrumbs={[
                {
                    title: "Snooze History",
                    href: route("dashboard.targets.show.snooze-history", { team, target }),
                },
            ]}
        />
    );
};

export default SnoozeHistoryShowPage;
