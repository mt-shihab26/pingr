import type { TUpdateValues } from "./update-dialog";

import { useState } from "react";
import { FileText, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { SeverityBadge } from "./severity";
import { UpdateDialog } from "./update-dialog";

export const TemplatesTab = () => {
    const [templates, setTemplates] = useState<TUpdateValues[]>([]);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-end">
                <UpdateDialog
                    trigger="Create template"
                    title="Create template"
                    description="Save an update you post often so you can reuse it later."
                    nameLabel="Name"
                    submitLabel="Save template"
                    onSubmit={(values) => setTemplates([...templates, values])}
                />
            </div>
            <Card className="py-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="pl-4">Name</TableHead>
                            <TableHead>Update</TableHead>
                            <TableHead>Severity</TableHead>
                            <TableHead className="pr-4" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {templates.map((template) => (
                            <TableRow key={template.name}>
                                <TableCell className="pl-4 font-medium">{template.name}</TableCell>
                                <TableCell className="max-w-md whitespace-normal text-muted-foreground">
                                    {template.text}
                                </TableCell>
                                <TableCell>
                                    <SeverityBadge severity={template.severity} />
                                </TableCell>
                                <TableCell className="pr-4 text-right">
                                    <Button
                                        variant="ghost"
                                        size="icon-sm"
                                        aria-label={`Delete ${template.name}`}
                                        onClick={() =>
                                            setTemplates(templates.filter((t) => t !== template))
                                        }
                                    >
                                        <Trash2 />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {templates.length === 0 && (
                    <Empty>
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <FileText />
                            </EmptyMedia>
                            <EmptyTitle>No templates have been saved yet.</EmptyTitle>
                            <EmptyDescription>Saved templates will show up here.</EmptyDescription>
                        </EmptyHeader>
                    </Empty>
                )}
            </Card>
        </div>
    );
};
