import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";

import { ShowLayout } from "@/components/screens/dashboard/targets/show/show-layout";

const RunHistoryShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            title="Run History"
            breadcrumbs={[
                {
                    title: "Run History",
                    href: route("dashboard.targets.show.run-history", { team, target }),
                },
            ]}
        />
    );
};

export default RunHistoryShowPage;
