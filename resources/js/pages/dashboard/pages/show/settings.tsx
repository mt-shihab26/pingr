import { StatusPageLayout } from "@/components/screens/dashboard/pages/show/shared/status-page-layout";

const SettingsStatusPage = ({ statusPageId }: { statusPageId: string }) => {
    return <StatusPageLayout statusPageId={statusPageId} title="Settings" />;
};

export default SettingsStatusPage;
