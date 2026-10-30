import { Heading } from "@/components/elements/heading";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

const CreateTarget = () => {
    return (
        <DashboardLayout title="Create new target for monitor">
            <Heading
                title="Add new Target"
                description="Add new target for monitoring of those targets status"
            />
        </DashboardLayout>
    );
};

export default CreateTarget;
