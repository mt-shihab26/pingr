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
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export const AddSubscriberDialog = ({ onAdd }: { onAdd: (email: string) => void }) => {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");

    const valid = /^\S+@\S+\.\S+$/.test(email.trim());

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    <Button size="sm">
                        <Plus data-icon="inline-start" />
                        Add subscriber
                    </Button>
                }
            />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add subscriber</DialogTitle>
                    <DialogDescription>
                        They'll receive an email to confirm their subscription.
                    </DialogDescription>
                </DialogHeader>
                <Field>
                    <FieldLabel htmlFor="subscriber-email">Email address</FieldLabel>
                    <Input
                        id="subscriber-email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </Field>
                <DialogFooter>
                    <DialogClose render={<Button variant="outline">Cancel</Button>} />
                    <Button
                        disabled={!valid}
                        onClick={() => {
                            onAdd(email.trim());
                            setEmail("");
                            setOpen(false);
                        }}
                    >
                        Add subscriber
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
