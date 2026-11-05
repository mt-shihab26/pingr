import { Card, CardContent } from "@/components/ui/card";

import { SnoozeField } from "@/components/screens/dashboard/targets/show/uptime/snooze/snooze-field";
import { SnoozeHistoryCard } from "@/components/screens/dashboard/targets/show/uptime/snooze/snooze-history-card";

export const SnoozeTab = () => {
    return (
        <div className="flex flex-col gap-4">
            <Card>
                <CardContent>
                    <SnoozeField
                        label="Do not send any certificate health notifications"
                        action="Snooze"
                    />
                </CardContent>
            </Card>
            <SnoozeHistoryCard />
        </div>
    );
};
