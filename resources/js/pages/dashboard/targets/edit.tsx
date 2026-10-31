import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";

import { TargetForm } from "@/components/screens/dashboard/targets/target-form";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { Heading } from "@/components/elements/heading";

const EditTarget = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

    return (
        <DashboardLayout
            title="Edit target"
            breadcrumbs={[
                {
                    type: "back",
                    title: "Back to targets",
                    href: route("dashboard.targets.index", { team }),
                },
                { title: "Overview", href: route("dashboard.overview.index", { team }) },
                { title: "Targets", href: route("dashboard.targets.index", { team }) },
                {
                    title: target.label ?? target.endpoint,
                    href: route("dashboard.targets.show", { team, target: target.id }),
                },
                {
                    title: "Edit",
                    href: route("dashboard.targets.edit", { team, target }),
                },
            ]}
        >
            <Heading
                title="Edit target"
                description="Update this target's monitoring configuration."
            />
            <TargetForm target={target} />
        </DashboardLayout>
    );
};

export default EditTarget;
