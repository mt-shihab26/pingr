import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";

import { Heading } from "@/components/elements/heading";
import { ShowLayout } from "@/components/screens/dashboard/targets/show/show-layout";

const DnsBlocklistShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            breadcrumbs={[
                {
                    title: "DNS blocklist",
                    href: route("dashboard.targets.show.dns-blocklist", { team, target }),
                },
            ]}
        >
            <Heading title="DNS blocklist" />
        </ShowLayout>
    );
};

export default DnsBlocklistShowPage;
