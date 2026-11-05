import { Fragment } from "react";
import { CircleCheck, CornerDownRight, Info } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const chain = [
    {
        name: "developershihab.com",
        issuer: "WE1",
        expiresAt: "2026-12-21 03:04:11",
        relative: "1 month from now",
    },
    {
        name: "WE1",
        issuer: "GTS Root R4",
        expiresAt: "2029-02-20 14:00:00",
        relative: "2 years from now",
    },
    {
        name: "GTS Root R4",
        issuer: "GlobalSign Root CA",
        expiresAt: "2028-01-28 00:00:42",
        relative: "1 year from now",
    },
];

export const CertificateChainCard = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Certificate chain</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <Alert>
                    <Info />
                    <AlertDescription>
                        <p>
                            When we connected to your server, we received these certificates. You
                            can learn more about the importance of correct certificate chains{" "}
                            <Button variant="link" className="h-auto p-0">
                                in our docs
                            </Button>
                            .
                        </p>
                    </AlertDescription>
                </Alert>
                <dl className="grid gap-3 sm:grid-cols-[12rem_1fr]">
                    <dt className="text-muted-foreground">Valid certificate chain</dt>
                    <dd>
                        <CircleCheck className="size-4 text-emerald-500" />
                    </dd>
                    {chain.map((certificate, index) => (
                        <Fragment key={certificate.name}>
                            <Separator className="sm:col-span-2" />
                            <dt className="font-mono text-muted-foreground">#{index + 1}</dt>
                            <dd
                                className="flex gap-2"
                                style={{ paddingLeft: `${Math.max(index - 1, 0) * 1.5}rem` }}
                            >
                                {index > 0 && (
                                    <CornerDownRight className="size-4 shrink-0 text-muted-foreground" />
                                )}
                                <div className="flex flex-col gap-0.5">
                                    <span className="font-medium">{certificate.name}</span>
                                    <span className="text-muted-foreground">
                                        Issuer: {certificate.issuer}
                                    </span>
                                    <span className="text-muted-foreground">
                                        Expires on{" "}
                                        <span className="font-mono">{certificate.expiresAt}</span> (
                                        {certificate.relative})
                                    </span>
                                </div>
                            </dd>
                        </Fragment>
                    ))}
                </dl>
            </CardContent>
        </Card>
    );
};
