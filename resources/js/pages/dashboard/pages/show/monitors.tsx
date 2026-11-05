import { StatusPageLayout } from "@/components/screens/dashboard/pages/show/shared/status-page-layout";

const MonitorsStatusPage = ({ statusPageId }: { statusPageId: string }) => {
    return <StatusPageLayout statusPageId={statusPageId} title="Monitors" />;
};

export default MonitorsStatusPage;
