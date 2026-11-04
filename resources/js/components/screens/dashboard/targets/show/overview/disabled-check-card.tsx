import type { TTarget } from "@/types/models";
import type { TTargetCheckItem } from "@/types/utils";

import { useShared } from "@/hooks/use-shared";
import { details } from "@/lib/targets";

import { router } from "@inertiajs/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const DisabledCheckCard = ({
    target,
    check,
}: {
    target: TTarget;
    check: TTargetCheckItem;
}) => {
    const { team } = useShared();

    const { description, advanced } = details(team, target)[check.key];

    const enable = () => {
        router.patch(
            route("dashboard.targets.show.toggle", { team, target }),
            { check: check.key },
            { preserveScroll: true },
        );
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                    <span className="size-2 rounded-full bg-muted-foreground" />
                    {check.label}
                    {advanced && <Badge variant="destructive">Advanced</Badge>}
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
                <Button variant="outline" onClick={enable}>
                    Enable
                </Button>
            </CardFooter>
        </Card>
    );
};
