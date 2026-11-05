import { Card, CardContent } from "@/components/ui/card";

import { SnoozeField } from "@/components/screens/dashboard/targets/show/uptime/snooze/snooze-field";
import { SnoozeHistoryCard } from "@/components/screens/dashboard/targets/show/uptime/snooze/snooze-history-card";

export const CheckSnoozeTab = ({
    check,
    action = "Snooze",
    description,
}: {
    check: string;
    action?: string;
    description?: string;
}) => {
    return (
        <div className="flex flex-col gap-4">
            <Card>
                <CardContent>
                    <SnoozeField
                        label={`Do not send any ${check} notifications`}
                        action={action}
                        description={description}
                    />
                </CardContent>
            </Card>
            <SnoozeHistoryCard />
        </div>
    );
};
