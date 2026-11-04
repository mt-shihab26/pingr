import { Card, CardContent } from "@/components/ui/card";

import { SnoozeField } from "./snooze-field";
import { SnoozeHistoryCard } from "./snooze-history-card";

export const SnoozeTab = () => {
    return (
        <div className="flex flex-col gap-4">
            <Card>
                <CardContent className="flex flex-col gap-6">
                    <SnoozeField
                        label="Do not send any uptime notifications"
                        action="Snooze uptime"
                    />
                    <SnoozeField
                        label="Do not send any performance notifications"
                        action="Snooze performance"
                    />
                </CardContent>
            </Card>
            <SnoozeHistoryCard />
        </div>
    );
};
