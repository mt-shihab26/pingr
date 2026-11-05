import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
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

const PREVIEW = 10;

export const CrawledUrlsCard = ({ urls }: { urls: string[] }) => {
    const [expanded, setExpanded] = useState(false);
    const visible = expanded ? urls : urls.slice(0, PREVIEW);

    return (
        <Card className="pb-0">
            <CardHeader>
                <CardTitle className="text-base">We checked {urls.length} urls</CardTitle>
                <CardDescription>This table contains all urls that we crawled.</CardDescription>
                <CardAction>
                    <Badge variant="secondary">Checked 5 hours ago</Badge>
                </CardAction>
            </CardHeader>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="px-4">URL</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {visible.map((url) => (
                        <TableRow key={url}>
                            <TableCell className="px-4 font-mono">{url}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {urls.length > PREVIEW && (
                <CardFooter className="justify-center border-t py-4">
                    <Button variant="outline" onClick={() => setExpanded(!expanded)}>
                        {expanded ? "Show fewer urls" : "Show all urls"}
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
};
