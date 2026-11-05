import { useState } from "react";
import { CircleCheck, Info } from "lucide-react";

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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { nameservers, records, recordTypeClassNames } from "./records-data";

const typeOptions = [
    { value: "all", label: "all records" },
    ...[...new Set(records.map((record) => record.type))].map((type) => ({
        value: type,
        label: `${type} records`,
    })),
];

export const RecordsTab = ({ endpoint }: { endpoint: string }) => {
    const [nameserver, setNameserver] = useState(nameservers[0]);
    const [type, setType] = useState("all");

    const filtered = records.filter((record) => type === "all" || record.type === type);

    return (
        <div className="flex flex-col gap-4">
            <Alert>
                <CircleCheck className="text-emerald-500" />
                <AlertTitle>DNS records found</AlertTitle>
                <AlertDescription>Discovered at 29 Oct 2026 10:56</AlertDescription>
            </Alert>

            <Card className="pb-0">
                <CardHeader>
                    <CardTitle className="text-base">
                        Authoritative nameservers for {endpoint}
                    </CardTitle>
                    <CardDescription>
                        These nameservers are responsible for serving DNS records for your domain.
                    </CardDescription>
                    <CardAction>
                        <Badge variant="secondary">Checked 31 minutes ago</Badge>
                    </CardAction>
                </CardHeader>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="pl-4">Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Changes</TableHead>
                            <TableHead className="pr-4" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {nameservers.map((name) => (
                            <TableRow key={name} data-state={name === nameserver && "selected"}>
                                <TableCell className="pl-4 font-mono">{name}</TableCell>
                                <TableCell>
                                    <CircleCheck className="size-4 text-emerald-500" />
                                </TableCell>
                                <TableCell>No changes</TableCell>
                                <TableCell className="pr-4 text-right">
                                    {name !== nameserver && (
                                        <Button
                                            variant="link"
                                            className="h-auto p-0"
                                            onClick={() => setNameserver(name)}
                                        >
                                            View {records.length} records
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            <Card className="pb-0">
                <CardHeader>
                    <CardTitle className="text-base">Records of nameserver {nameserver}</CardTitle>
                    <CardAction>
                        <Select
                            items={typeOptions}
                            value={type}
                            onValueChange={(value) => setType(value as string)}
                        >
                            <SelectTrigger className="w-40">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {typeOptions.map((item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <Alert>
                        <Info />
                        <AlertDescription>
                            Learn more about what each of these DNS records mean in our docs.
                        </AlertDescription>
                    </Alert>
                </CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="pl-4">Type</TableHead>
                            <TableHead>Record</TableHead>
                            <TableHead>Value</TableHead>
                            <TableHead className="pr-4 text-right">TTL</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((record) => (
                            <TableRow key={`${record.type}-${record.value}`}>
                                <TableCell className="pl-4">
                                    <Badge
                                        variant="secondary"
                                        className={recordTypeClassNames[record.type]}
                                    >
                                        {record.type}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-primary">{endpoint}</TableCell>
                                <TableCell className="max-w-md font-mono break-all whitespace-normal">
                                    {record.value}
                                </TableCell>
                                <TableCell className="pr-4 text-right">{record.ttl}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
};
