import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";

import { Heading } from "@/components/elements/heading";
import { ShowLayout } from "@/components/screens/dashboard/targets/show/show-layout";

const LighthouseShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            breadcrumbs={[
                {
                    title: "Lighthouse",
                    href: route("dashboard.targets.show.lighthouse", { team, target }),
                },
            ]}
        >
            <Heading title="Lighthouse" />
        </ShowLayout>
    );
};

export default LighthouseShowPage;
