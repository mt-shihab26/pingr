import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";
import { Info } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";

import { ShowLayout } from "@/components/screens/dashboard/targets/show/shared/show-layout";

import { RunsCard } from "@/components/screens/dashboard/targets/show/run-history/runs-card";

const RunHistoryShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();
    const endpoint = target.label ?? target.endpoint;

    return (
        <ShowLayout
            target={target}
            title="Run History"
            breadcrumbs={[
                {
                    title: "Run History",
                    href: route("dashboard.targets.show.run-history", { team, target }),
                },
            ]}
        >
            <div className="flex flex-col gap-4">
                <Alert>
                    <Info />
                    <AlertDescription>
                        This page shows the history of all important events related to {endpoint}.
                        We only keep the last successful check, all downtime events are stored for
                        14 days.
                    </AlertDescription>
                </Alert>
                <RunsCard endpoint={endpoint} />
            </div>
        </ShowLayout>
    );
};

export default RunHistoryShowPage;
