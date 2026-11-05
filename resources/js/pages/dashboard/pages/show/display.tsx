import { StatusPageLayout } from "@/components/screens/dashboard/pages/show/shared/status-page-layout";

const DisplayStatusPage = ({ statusPageId }: { statusPageId: string }) => {
    return <StatusPageLayout statusPageId={statusPageId} title="Display settings" />;
};

export default DisplayStatusPage;
