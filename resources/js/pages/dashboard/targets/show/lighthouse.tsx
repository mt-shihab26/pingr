import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";

import { ShowLayout } from "@/components/screens/dashboard/targets/show/shared/show-layout";

const LighthouseShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            title="Lighthouse"
            breadcrumbs={[
                {
                    title: "Lighthouse",
                    href: route("dashboard.targets.show.lighthouse", { team, target }),
                },
            ]}
        />
    );
};

export default LighthouseShowPage;
