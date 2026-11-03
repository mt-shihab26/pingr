import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";

import { Heading } from "@/components/elements/heading";
import { ShowLayout } from "@/components/screens/dashboard/targets/show/show-layout";

const DomainShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            breadcrumbs={[
                {
                    title: "Domain",
                    href: route("dashboard.targets.show.domain", { team, target }),
                },
            ]}
        >
            <Heading title="Domain" />
        </ShowLayout>
    );
};

export default DomainShowPage;
