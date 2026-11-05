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

import { SimpleSelect } from "@/components/screens/dashboard/targets/show/uptime/settings/simple-select";

import { channels } from "./channels";

export const AddConfigurationDialog = ({ endpoint }: { endpoint: string }) => {
    return (
        <Dialog>
            <DialogTrigger
                render={
                    <Button size="sm">
                        <Plus data-icon="inline-start" />
                        Add configuration
                    </Button>
                }
            />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add notification configuration</DialogTitle>
                    <DialogDescription>
                        These alerts are sent only for {endpoint}, in addition to your inherited
                        notifications.
                    </DialogDescription>
                </DialogHeader>
                <FieldGroup>
                    <Field>
                        <FieldLabel>Channel</FieldLabel>
                        <SimpleSelect
                            items={channels.map(({ value, label }) => ({ value, label }))}
                            defaultValue="mail"
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="notification-destination">Destination</FieldLabel>
                        <Input id="notification-destination" placeholder="you@example.com" />
                        <FieldDescription>
                            An email address, webhook URL or channel, depending on the channel.
                        </FieldDescription>
                    </Field>
                </FieldGroup>
                <DialogFooter>
                    <DialogClose render={<Button variant="outline">Cancel</Button>} />
                    <Button>Save configuration</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
