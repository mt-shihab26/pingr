import { Fragment } from "react";
import { CircleCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const checks = [
    "Certificate is present",
    "Will not expire soon",
    "Covers the right domain",
    "Connects with a known root certificate",
    "Is currently active",
    "Is not self-signed",
    "Uses a valid hashing algorithm",
    "Has not expired",
    "Unchanged since last checked",
    "Certificate is not valid for too long",
    "Connected to host",
    "Host exists",
    "Certificate is installed",
    "Certificate downloaded",
];

export const CertificateChecksCard = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Certificate checks</CardTitle>
                <CardDescription>
                    We verify your SSL certificate against common issues that could affect security
                    or trust.
                </CardDescription>
                <CardAction>
                    <Badge variant="secondary">Checked 32 minutes ago</Badge>
                </CardAction>
            </CardHeader>
            <CardContent>
                <dl className="grid gap-3 sm:grid-cols-[18rem_1fr]">
                    {checks.map((check, index) => (
                        <Fragment key={check}>
                            {index > 0 && <Separator className="sm:col-span-2" />}
                            <dt className="text-muted-foreground">{check}</dt>
                            <dd>
                                <CircleCheck className="size-4 text-emerald-500" />
                            </dd>
                        </Fragment>
                    ))}
                </dl>
            </CardContent>
        </Card>
    );
};
