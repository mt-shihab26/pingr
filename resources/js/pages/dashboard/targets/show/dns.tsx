import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";

import { Heading } from "@/components/elements/heading";
import { ShowLayout } from "@/components/screens/dashboard/targets/show/show-layout";

const DnsShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            breadcrumbs={[
                {
                    title: "DNS",
                    href: route("dashboard.targets.show.dns", { team, target }),
                },
            ]}
        >
            <Heading title="DNS" />
        </ShowLayout>
    );
};

export default DnsShowPage;
