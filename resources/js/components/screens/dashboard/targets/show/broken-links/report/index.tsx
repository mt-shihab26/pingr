import { StatusAlert } from "./status-alert";
import { BrokenLinksCard } from "./broken-links-card";
import { FixWithAiCard } from "./fix-with-ai-card";
import { ApiTipCard } from "@/components/screens/dashboard/targets/show/shared/api-tip-card";

export const Report = () => {
    return (
        <div className="flex flex-col gap-4">
            <StatusAlert />
            <BrokenLinksCard />
            <FixWithAiCard />
            <ApiTipCard checkId="1253048" subject="broken links" />
        </div>
    );
};
