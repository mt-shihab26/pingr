import type { ReactNode } from "react";

import { Fragment } from "react";
import { CircleCheck } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const details: { label: string; value: ReactNode }[] = [
    { label: "Issuer", value: "WE1" },
    { label: "Valid from", value: <span className="font-mono">2026-09-22 02:04:14</span> },
    {
        label: "Valid until",
        value: (
            <>
                <span className="font-mono">2026-12-21 03:04:11</span>{" "}
                <span className="text-muted-foreground">(45 days remaining)</span>
            </>
        ),
    },
    { label: "Lifetime in days", value: "90 days" },
    {
        label: "Valid for domains",
        value: (
            <ul className="flex flex-col gap-1">
                <li>developershihab.com</li>
                <li>tic-tac-toe.developershihab.com</li>
                <li>*.tic-tac-toe.developershihab.com</li>
            </ul>
        ),
    },
    { label: "Avoids SHA1 hash", value: <CircleCheck className="size-4 text-emerald-500" /> },
    {
        label: "Certificate retrieved from",
        value: <span className="font-mono">104.21.44.186:443</span>,
    },
];

export const CertificateDetailsCard = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Main certificate details</CardTitle>
            </CardHeader>
            <CardContent>
                <dl className="grid gap-3 sm:grid-cols-[18rem_1fr]">
                    {details.map((detail, index) => (
                        <Fragment key={detail.label}>
                            {index > 0 && <Separator className="sm:col-span-2" />}
                            <dt className="text-muted-foreground">{detail.label}</dt>
                            <dd>{detail.value}</dd>
                        </Fragment>
                    ))}
                </dl>
            </CardContent>
        </Card>
    );
};
