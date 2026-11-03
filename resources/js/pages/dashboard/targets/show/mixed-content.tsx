import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";

import { Heading } from "@/components/elements/heading";
import { ShowLayout } from "@/components/screens/dashboard/targets/show/show-layout";

const MixedContentShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            breadcrumbs={[
                {
                    title: "Mixed content",
                    href: route("dashboard.targets.show.mixed-content", { team, target }),
                },
            ]}
        >
            <Heading title="Mixed content" />
        </ShowLayout>
    );
};

export default MixedContentShowPage;
