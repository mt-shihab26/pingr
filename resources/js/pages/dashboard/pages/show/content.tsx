import { StatusPageLayout } from "@/components/screens/dashboard/pages/show/shared/status-page-layout";

const ContentStatusPage = ({ statusPageId }: { statusPageId: string }) => {
    return <StatusPageLayout statusPageId={statusPageId} title="Content" />;
};

export default ContentStatusPage;
