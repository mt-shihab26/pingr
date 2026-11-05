import { Fragment } from "react";
import { CircleCheck } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const dates = [
    {
        label: "Expiration date",
        value: "2027-08-14 07:30:18",
        relative: "9 months 1 week from now",
    },
    { label: "Registration date", value: "2023-08-14 07:30:18" },
    { label: "Last changed at", value: "2026-08-16 10:18:07" },
    { label: "Last updated in the RDAP db at", value: "2026-11-05 04:23:20" },
];

const statuses = ["Client transfer prohibited"];

export const Report = () => {
    return (
        <div className="flex flex-col gap-4">
            <Alert>
                <CircleCheck className="text-emerald-500" />
                <AlertTitle>Domain is healthy</AlertTitle>
                <AlertDescription>No problems detected with your domain.</AlertDescription>
            </Alert>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Important dates</CardTitle>
                    <CardAction>
                        <Badge variant="secondary">Checked 11 hours ago</Badge>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <dl className="grid gap-3 sm:grid-cols-[16rem_1fr]">
                        {dates.map((date, index) => (
                            <Fragment key={date.label}>
                                {index > 0 && <Separator className="sm:col-span-2" />}
                                <dt className="text-muted-foreground">{date.label}</dt>
                                <dd className="flex flex-col">
                                    <span className="font-mono tabular-nums">{date.value}</span>
                                    {date.relative && (
                                        <span className="text-muted-foreground">
                                            {date.relative}
                                        </span>
                                    )}
                                </dd>
                            </Fragment>
                        ))}
                    </dl>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Domain statuses</CardTitle>
                </CardHeader>
                <CardContent>
                    <dl className="grid gap-3 sm:grid-cols-[16rem_1fr]">
                        {statuses.map((status) => (
                            <Fragment key={status}>
                                <dt className="text-muted-foreground">{status}</dt>
                                <dd>
                                    <CircleCheck className="size-4 text-emerald-500" />
                                </dd>
                            </Fragment>
                        ))}
                    </dl>
                </CardContent>
            </Card>
        </div>
    );
};
