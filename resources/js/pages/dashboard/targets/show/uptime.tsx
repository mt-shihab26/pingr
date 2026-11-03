import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";

import { Heading } from "@/components/elements/heading";
import { ShowLayout } from "@/components/screens/dashboard/targets/show/show-layout";

const UptimeShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            breadcrumbs={[
                {
                    title: "Uptime",
                    href: route("dashboard.targets.show.uptime", { team, target }),
                },
            ]}
        >
            <Heading title="Uptime" />
        </ShowLayout>
    );
};

export default UptimeShowPage;
