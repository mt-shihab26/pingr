import { StatusAlert } from "./status-alert";
import { BrokenLinksCard } from "./broken-links-card";
import { FixWithAiCard } from "./fix-with-ai-card";
import { ApiTipCard } from "./api-tip-card";

export const Report = () => {
    return (
        <div className="flex flex-col gap-4">
            <StatusAlert />
            <BrokenLinksCard />
            <FixWithAiCard />
            <ApiTipCard />
        </div>
    );
};
