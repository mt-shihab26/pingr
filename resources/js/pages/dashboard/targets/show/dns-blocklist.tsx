import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";

import { ShowLayout } from "@/components/screens/dashboard/targets/show/shared/show-layout";

const DnsBlocklistShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            title="DNS blocklist"
            breadcrumbs={[
                {
                    title: "DNS blocklist",
                    href: route("dashboard.targets.show.dns-blocklist", { team, target }),
                },
            ]}
        />
    );
};

export default DnsBlocklistShowPage;
