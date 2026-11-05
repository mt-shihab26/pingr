import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { severities } from "./severity";

export type TUpdateValues = { name: string; text: string; severity: string };

export const UpdateDialog = ({
    trigger,
    title,
    description,
    nameLabel,
    submitLabel,
    onSubmit,
}: {
    trigger: string;
    title: string;
    description: string;
    nameLabel: string;
    submitLabel: string;
    onSubmit: (values: TUpdateValues) => void;
}) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [severity, setSeverity] = useState("info");

    const submit = () => {
        onSubmit({ name: name.trim(), text: text.trim(), severity });
        setName("");
        setText("");
        setSeverity("info");
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    <Button size="sm">
                        <Plus data-icon="inline-start" />
                        {trigger}
                    </Button>
                }
            />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="update-name">{nameLabel}</FieldLabel>
                        <Input
                            id="update-name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="update-text">Update</FieldLabel>
                        <Textarea
                            id="update-text"
                            rows={4}
                            value={text}
                            onChange={(event) => setText(event.target.value)}
                        />
                        <FieldDescription>Markdown is supported.</FieldDescription>
                    </Field>
                    <Field>
                        <FieldLabel>Severity</FieldLabel>
                        <Select
                            items={severities}
                            value={severity}
                            onValueChange={(value) => setSeverity(value as string)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {severities.map((item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </Field>
                </FieldGroup>
                <DialogFooter>
                    <DialogClose render={<Button variant="outline">Cancel</Button>} />
                    <Button disabled={!name.trim()} onClick={submit}>
                        {submitLabel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
