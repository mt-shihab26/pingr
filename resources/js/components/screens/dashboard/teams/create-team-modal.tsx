import { Form } from "@inertiajs/react";
import {
    cloneElement,
    type MouseEvent,
    type MouseEventHandler,
    type ReactElement,
} from "react";
import { useState } from "react";
import { InputError } from "@/components/elements/input-error";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CreateTeamModal({ children }: { children: ReactElement }) {
    const [open, setOpen] = useState(false);
    const triggerElement = children as ReactElement<{
        onClick?: MouseEventHandler;
    }>;
    const trigger = cloneElement(triggerElement, {
        onClick: (event: MouseEvent) => {
            triggerElement.props.onClick?.(event);

            if (!event.defaultPrevented) {
                setOpen(true);
            }
        },
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {trigger}
            <DialogContent>
                <Form
                    key={String(open)}
                    action={route("dashboard.settings.teams.store")}
                    method="post"
                    className="space-y-6"
                    onSuccess={() => setOpen(false)}
                >
                    {({ errors, processing }) => (
                        <>
                            <DialogHeader>
                                <DialogTitle>Create a new team</DialogTitle>
                                <DialogDescription>
                                    Create a new team to collaborate with
                                    others.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-2">
                                <Label htmlFor="name">Team name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    data-test="create-team-name"
                                    placeholder="My team"
                                    required
                                />
                                <InputError message={errors.name} />
                            </div>

                            <DialogFooter className="gap-2">
                                <DialogClose
                                    render={
                                        <Button variant="secondary">
                                            Cancel
                                        </Button>
                                    }
                                ></DialogClose>

                                <Button
                                    type="submit"
                                    data-test="create-team-submit"
                                    disabled={processing}
                                >
                                    Create team
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}
