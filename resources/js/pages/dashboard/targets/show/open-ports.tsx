import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";

import { ShowLayout } from "@/components/screens/dashboard/targets/show/shared/show-layout";

const OpenPortsShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            title="Open ports"
            breadcrumbs={[
                {
                    title: "Open ports",
                    href: route("dashboard.targets.show.open-ports", { team, target }),
                },
            ]}
        />
    );
};

export default OpenPortsShowPage;
