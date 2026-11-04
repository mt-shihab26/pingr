import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";
import { router } from "@inertiajs/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShowLayout } from "@/components/screens/dashboard/targets/show/show-layout";
import { Badge } from "@/components/ui/badge";

const OverviewShowPage = ({ target, tab }: { target: TTarget; tab: "active" | "disabled" }) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            title={"Overview"}
            breadcrumbs={[
                {
                    title: "Overview",
                    href: route("dashboard.targets.show.overview", { team, target }),
                },
            ]}
        >
            <Tabs
                value={tab}
                onValueChange={(tab) => router.reload({ data: { tab } })}
                className="w-100"
            >
                <TabsList>
                    <TabsTrigger value="active">
                        Active <Badge>0</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="disabled">
                        Disabled <Badge>1</Badge>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="active">Make changes to your account here.</TabsContent>
                <TabsContent value="disabled">Change your password here.</TabsContent>
            </Tabs>
        </ShowLayout>
    );
};

export default OverviewShowPage;
