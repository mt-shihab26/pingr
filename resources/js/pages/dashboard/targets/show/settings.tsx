import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";

import { ShowLayout } from "@/components/screens/dashboard/targets/show/show-layout";

const SettingsShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            title="Settings"
            breadcrumbs={[
                {
                    title: "Settings",
                    href: route("dashboard.targets.show.settings", { team, target }),
                },
            ]}
        />
    );
};

export default SettingsShowPage;
