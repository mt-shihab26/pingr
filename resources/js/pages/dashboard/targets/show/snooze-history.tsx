import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";

import { Heading } from "@/components/elements/heading";
import { ShowLayout } from "@/components/screens/dashboard/targets/show/show-layout";

const SnoozeHistoryShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            breadcrumbs={[
                {
                    title: "Snooze History",
                    href: route("dashboard.targets.show.snooze-history", { team, target }),
                },
            ]}
        >
            <Heading title="Snooze History" />
        </ShowLayout>
    );
};

export default SnoozeHistoryShowPage;
