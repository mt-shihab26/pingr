import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";

import { ShowLayout } from "@/components/screens/dashboard/targets/show/shared/show-layout";

const DnsShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            title="DNS"
            breadcrumbs={[
                {
                    title: "DNS",
                    href: route("dashboard.targets.show.dns", { team, target }),
                },
            ]}
        />
    );
};

export default DnsShowPage;
