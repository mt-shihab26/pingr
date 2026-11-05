import { Card, CardContent } from "@/components/ui/card";

import { SnoozeField } from "@/components/screens/dashboard/targets/show/uptime/snooze/snooze-field";
import { SnoozeHistoryCard } from "@/components/screens/dashboard/targets/show/uptime/snooze/snooze-history-card";

export const AcknowledgeTab = () => {
    return (
        <div className="flex flex-col gap-4">
            <Card>
                <CardContent>
                    <SnoozeField
                        label="Do not send any broken links notifications"
                        action="Acknowledge"
                        description="We'll silence these alerts until the check recovers, or until the selected time runs out, whichever comes first."
                    />
                </CardContent>
            </Card>
            <SnoozeHistoryCard />
        </div>
    );
};
