import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";

import { ShowLayout } from "@/components/screens/dashboard/targets/show/shared/show-layout";

const DomainShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            title="Domain"
            breadcrumbs={[
                {
                    title: "Domain",
                    href: route("dashboard.targets.show.domain", { team, target }),
                },
            ]}
        />
    );
};

export default DomainShowPage;
