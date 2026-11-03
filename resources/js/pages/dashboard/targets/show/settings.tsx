import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";

import { Heading } from "@/components/elements/heading";
import { ShowLayout } from "@/components/screens/dashboard/targets/show/show-layout";

const SettingsShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            breadcrumbs={[
                {
                    title: "Settings",
                    href: route("dashboard.targets.show.settings", { team, target }),
                },
            ]}
        >
            <Heading title="Settings" />
        </ShowLayout>
    );
};

export default SettingsShowPage;
