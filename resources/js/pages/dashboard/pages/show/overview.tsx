import { StatusPageLayout } from "@/components/screens/dashboard/pages/show/shared/status-page-layout";

const OverviewStatusPage = ({ statusPageId }: { statusPageId: string }) => {
    return <StatusPageLayout statusPageId={statusPageId} title="Overview" />;
};

export default OverviewStatusPage;
