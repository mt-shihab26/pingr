import { useShared } from "@/hooks/use-shared";

import { TargetForm } from "@/components/screens/dashboard/targets/target-form";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { Heading } from "@/components/elements/heading";

const CreateTarget = () => {
    const { team } = useShared();

    return (
        <DashboardLayout
            title="Create target"
            breadcrumbs={[
                {
                    type: "back",
                    title: "Back to targets",
                    href: route("dashboard.targets.index", { team }),
                },
                { title: "Overview", href: route("dashboard.overview.index", { team }) },
                { title: "Targets", href: route("dashboard.targets.index", { team }) },
                { title: "Create", href: route("dashboard.targets.create", { team }) },
            ]}
        >
            <Heading title="Add new target" description="Add a target for monitoring." />
            <TargetForm />
        </DashboardLayout>
    );
};

export default CreateTarget;
