import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export type TBrokenLink = {
    status: number;
    type: "link" | "image" | "script" | "stylesheet" | "og-image";
    url: string;
    foundOn: string;
    linkText: string;
};

export const LinksTable = ({ links, action }: { links: TBrokenLink[]; action?: string }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="pl-4">Status</TableHead>
                    <TableHead>Broken page</TableHead>
                    <TableHead>Found on</TableHead>
                    {action && <TableHead className="pr-4" />}
                </TableRow>
            </TableHeader>
            <TableBody>
                {links.map((link) => (
                    <TableRow key={link.url}>
                        <TableCell className="pl-4">
                            <Badge variant="destructive" className="font-mono">
                                {link.status}
                            </Badge>
                        </TableCell>
                        <TableCell className="font-mono">{link.url}</TableCell>
                        <TableCell>
                            <div className="flex flex-col">
                                <span className="font-mono">{link.foundOn}</span>
                                <span className="text-muted-foreground">
                                    Link text: {link.linkText}
                                </span>
                            </div>
                        </TableCell>
                        {action && (
                            <TableCell className="pr-4 text-right">
                                <Button variant="ghost" size="sm">
                                    {action}
                                </Button>
                            </TableCell>
                        )}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
