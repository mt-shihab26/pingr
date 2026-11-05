import { StatusPageLayout } from "@/components/screens/dashboard/pages/show/shared/status-page-layout";

const UpdatesStatusPage = ({ statusPageId }: { statusPageId: string }) => {
    return <StatusPageLayout statusPageId={statusPageId} title="Status updates" />;
};

export default UpdatesStatusPage;
