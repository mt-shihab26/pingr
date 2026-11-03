import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";

import { Heading } from "@/components/elements/heading";
import { ShowLayout } from "@/components/screens/dashboard/targets/show/show-layout";

const NotificationsShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            breadcrumbs={[
                {
                    title: "Notifications",
                    href: route("dashboard.targets.show.notifications", { team, target }),
                },
            ]}
        >
            <Heading title="Notifications" />
        </ShowLayout>
    );
};

export default NotificationsShowPage;
