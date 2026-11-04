import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";

import { ShowLayout } from "@/components/screens/dashboard/targets/show/shared/show-layout";

const BadgesShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            title="Badges"
            breadcrumbs={[
                {
                    title: "Badges",
                    href: route("dashboard.targets.show.badges", { team, target }),
                },
            ]}
        />
    );
};

export default BadgesShowPage;
