import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import type { TTarget } from "@/types/models";
import type { TTargetCheckItem } from "@/types/utils";

import { useShared } from "@/hooks/use-shared";
import { details } from "@/lib/targets";
import { router } from "@inertiajs/react";

import { CheckActions } from "./check-actions";

export const ActiveCheckCard = ({
    target,
    check,
}: {
    target: TTarget;
    check: TTargetCheckItem;
}) => {
    const { team } = useShared();

    const { stats, href } = details(team, target)[check.key];

    const disable = () => {
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
                </CardTitle>
                <CardDescription>We haven't checked this yet.</CardDescription>
                <CardAction>
                    <CheckActions check={check} href={href} onDisable={disable} />
                </CardAction>
            </CardHeader>
            <CardContent>
                <dl
                    className="grid divide-x border"
                    style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}
                >
                    {stats.map((stat) => (
                        <div key={stat} className="flex flex-col gap-1 p-3">
                            <dt className="text-muted-foreground uppercase">{stat}</dt>
                            <dd className="text-base">—</dd>
                        </div>
                    ))}
                </dl>
            </CardContent>
        </Card>
    );
};
