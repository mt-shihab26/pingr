import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";

import { Heading } from "@/components/elements/heading";
import { ShowLayout } from "@/components/screens/dashboard/targets/show/show-layout";

const BrokenLinksShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            breadcrumbs={[
                {
                    title: "Broken links",
                    href: route("dashboard.targets.show.broken-links", { team, target }),
                },
            ]}
        >
            <Heading title="Broken links" />
        </ShowLayout>
    );
};

export default BrokenLinksShowPage;
