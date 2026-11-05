import { CircleCheck, ExternalLink } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { contentFilters, resolvedIps, securityBlocklists } from "./blocklists";

const okClassName = "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400";
const warnClassName = "bg-amber-500/15 text-amber-600 dark:text-amber-400";

const statuses: Record<string, string> = { "CleanBrowsing Security": "Timed out" };

const BlocklistTable = ({
    heading,
    rows,
    okLabel,
    showIps,
}: {
    heading: string;
    rows: { name: string; kind?: string }[];
    okLabel: string;
    showIps?: boolean;
}) => (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead className="w-64 pl-4">{heading}</TableHead>
                <TableHead className="pr-4">Status</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {rows.map((row) => {
                const status = statuses[row.name] ?? okLabel;

                return (
                    <TableRow key={row.name}>
                        <TableCell className="pl-4">
                            <div className="flex flex-col">
                                <span className="flex items-center gap-1.5 font-medium">
                                    {row.name}
                                    <ExternalLink className="size-3 text-muted-foreground" />
                                </span>
                                {showIps && row.kind === "IP-based" && (
                                    <span className="font-mono text-muted-foreground">
                                        {resolvedIps.join(", ")}
                                    </span>
                                )}
                            </div>
                        </TableCell>
                        <TableCell className="pr-4">
                            <Badge className={status === okLabel ? okClassName : warnClassName}>
                                {status}
                            </Badge>
                        </TableCell>
                    </TableRow>
                );
            })}
        </TableBody>
    </Table>
);

export const Report = ({ endpoint }: { endpoint: string }) => {
    return (
        <div className="flex flex-col gap-4">
            <Alert>
                <CircleCheck className="text-emerald-500" />
                <AlertTitle>Not listed on any blocklists</AlertTitle>
                <AlertDescription>Last checked at 30 Oct 2026 10:02</AlertDescription>
            </Alert>

            <Card className="pb-0">
                <CardHeader>
                    <CardTitle className="text-base">Security & email blocklists</CardTitle>
                    <CardDescription>
                        Critical - affects email deliverability, checked against the IP addresses
                        and domain name of {endpoint}
                    </CardDescription>
                    <CardAction>
                        <Badge variant="secondary">Checked 11 hours ago</Badge>
                    </CardAction>
                </CardHeader>
                <BlocklistTable
                    heading="Blocklist"
                    rows={securityBlocklists}
                    okLabel="Not listed"
                    showIps
                />
            </Card>

            <Card className="pb-0">
                <CardHeader>
                    <CardTitle className="text-base">Content filtering DNS</CardTitle>
                    <CardDescription>
                        Informational - checked by resolving {endpoint} through each service's DNS
                        resolver
                    </CardDescription>
                </CardHeader>
                <BlocklistTable heading="Service" rows={contentFilters} okLabel="Not blocked" />
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Resolved IP addresses</CardTitle>
                    <CardDescription>
                        IP addresses resolved for your domain that were checked against IP-based
                        blocklists.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    <div className="flex flex-wrap gap-2">
                        {resolvedIps.map((ip) => (
                            <Badge key={ip} variant="secondary" className="font-mono">
                                {ip}
                            </Badge>
                        ))}
                    </div>
                    <p className="text-muted-foreground">
                        Behind a CDN or WAF?{" "}
                        <Button variant="link" className="h-auto p-0">
                            Set your origin IP
                        </Button>{" "}
                        so we check your actual server instead.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};
