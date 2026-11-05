import { StatusPageLayout } from "@/components/screens/dashboard/pages/show/shared/status-page-layout";

const NotificationsStatusPage = ({ statusPageId }: { statusPageId: string }) => {
    return <StatusPageLayout statusPageId={statusPageId} title="Notifications" />;
};

export default NotificationsStatusPage;
