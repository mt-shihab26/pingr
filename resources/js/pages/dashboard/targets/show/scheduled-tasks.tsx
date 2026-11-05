import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";
import { router } from "@inertiajs/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ShowLayout } from "@/components/screens/dashboard/targets/show/shared/show-layout";
import { CheckSnoozeTab } from "@/components/screens/dashboard/targets/show/shared/check-snooze-tab";

import { TasksTab } from "@/components/screens/dashboard/targets/show/scheduled-tasks/tasks-tab";
import { SettingsTab } from "@/components/screens/dashboard/targets/show/scheduled-tasks/settings-tab";

const ScheduledTasksShowPage = ({
    target,
    tab,
}: {
    target: TTarget;
    tab: "tasks" | "snooze" | "settings";
}) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            title="Scheduled tasks"
            breadcrumbs={[
                {
                    title: "Scheduled tasks",
                    href: route("dashboard.targets.show.scheduled-tasks", { team, target }),
                },
            ]}
        >
            <Tabs value={tab} onValueChange={(tab) => router.reload({ data: { tab } })}>
                <TabsList variant="line">
                    <TabsTrigger value="tasks">Scheduled tasks</TabsTrigger>
                    <TabsTrigger value="snooze">Snooze</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="tasks">
                    <TasksTab />
                </TabsContent>
                <TabsContent value="snooze">
                    <CheckSnoozeTab check="scheduled tasks" />
                </TabsContent>
                <TabsContent value="settings">
                    <SettingsTab target={target} />
                </TabsContent>
            </Tabs>
        </ShowLayout>
    );
};

export default ScheduledTasksShowPage;
