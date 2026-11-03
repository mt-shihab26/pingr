import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";

import { Heading } from "@/components/elements/heading";
import { ShowLayout } from "@/components/screens/dashboard/targets/show/show-layout";

const RunHistoryShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            breadcrumbs={[
                {
                    title: "Run History",
                    href: route("dashboard.targets.show.run-history", { team, target }),
                },
            ]}
        >
            <Heading title="Run History" />
        </ShowLayout>
    );
};

export default RunHistoryShowPage;
