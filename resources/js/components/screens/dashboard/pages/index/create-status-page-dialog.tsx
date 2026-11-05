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

export const CreateStatusPageDialog = () => {
    return (
        <Dialog>
            <DialogTrigger
                render={
                    <Button size="sm">
                        <Plus data-icon="inline-start" />
                        New status page
                    </Button>
                }
            />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New status page</DialogTitle>
                    <DialogDescription>
                        Keep your users informed about the health of your services.
                    </DialogDescription>
                </DialogHeader>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="status-page-name">Name</FieldLabel>
                        <Input id="status-page-name" placeholder="Acme status" />
                        <FieldDescription>
                            Shown in the header and the browser tab of your status page.
                        </FieldDescription>
                    </Field>
                </FieldGroup>
                <DialogFooter>
                    <DialogClose render={<Button variant="outline">Cancel</Button>} />
                    <Button>Create status page</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
