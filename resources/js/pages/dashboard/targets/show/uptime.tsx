import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";

import { ShowLayout } from "@/components/screens/dashboard/targets/show/show-layout";

const UptimeShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            title="Uptime"
            breadcrumbs={[
                {
                    title: "Uptime",
                    href: route("dashboard.targets.show.uptime", { team, target }),
                },
            ]}
        />
    );
};

export default UptimeShowPage;
