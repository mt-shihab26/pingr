import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";

import { ShowLayout } from "@/components/screens/dashboard/targets/show/shared/show-layout";

const MixedContentShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            title="Mixed content"
            breadcrumbs={[
                {
                    title: "Mixed content",
                    href: route("dashboard.targets.show.mixed-content", { team, target }),
                },
            ]}
        />
    );
};

export default MixedContentShowPage;
