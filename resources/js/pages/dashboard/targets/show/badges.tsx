import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";

import { Heading } from "@/components/elements/heading";
import { ShowLayout } from "@/components/screens/dashboard/targets/show/show-layout";

const BadgesShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            breadcrumbs={[
                {
                    title: "Badges",
                    href: route("dashboard.targets.show.badges", { team, target }),
                },
            ]}
        >
            <Heading title="Badges" />
        </ShowLayout>
    );
};

export default BadgesShowPage;
