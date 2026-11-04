import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";

import { ShowLayout } from "@/components/screens/dashboard/targets/show/show-layout";

const BrokenLinksShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            title="Broken links"
            breadcrumbs={[
                {
                    title: "Broken links",
                    href: route("dashboard.targets.show.broken-links", { team, target }),
                },
            ]}
        />
    );
};

export default BrokenLinksShowPage;
