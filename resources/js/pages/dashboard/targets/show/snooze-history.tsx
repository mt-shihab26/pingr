import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";
import { Info } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";

import { ShowLayout } from "@/components/screens/dashboard/targets/show/shared/show-layout";

import { SnoozesCard } from "@/components/screens/dashboard/targets/show/snooze-history/snoozes-card";

const SnoozeHistoryShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            title="Acknowledgements & snoozes"
            breadcrumbs={[
                {
                    title: "Snooze History",
                    href: route("dashboard.targets.show.snooze-history", { team, target }),
                },
            ]}
        >
            <div className="flex flex-col gap-4">
                <Alert>
                    <Info />
                    <AlertDescription>
                        This page shows the history of each time an alert was acknowledged or
                        snoozed for {target.label ?? target.endpoint}.
                    </AlertDescription>
                </Alert>
                <SnoozesCard />
            </div>
        </ShowLayout>
    );
};

export default SnoozeHistoryShowPage;
