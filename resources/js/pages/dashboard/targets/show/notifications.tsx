import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";

import { ShowLayout } from "@/components/screens/dashboard/targets/show/shared/show-layout";

const NotificationsShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            title="Notifications"
            breadcrumbs={[
                {
                    title: "Notifications",
                    href: route("dashboard.targets.show.notifications", { team, target }),
                },
            ]}
        />
    );
};

export default NotificationsShowPage;
