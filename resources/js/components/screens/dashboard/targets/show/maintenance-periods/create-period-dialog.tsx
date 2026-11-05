import type { TMaintenancePeriod } from "./periods-card";

import { useState } from "react";
import { format } from "date-fns";
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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { DatePicker } from "@/components/screens/dashboard/targets/show/uptime/history/date-picker";

export const CreatePeriodDialog = ({
    onCreate,
}: {
    onCreate: (period: TMaintenancePeriod) => void;
}) => {
    const [open, setOpen] = useState(false);
    const [startDate, setStartDate] = useState<Date>();
    const [startTime, setStartTime] = useState("02:00");
    const [endDate, setEndDate] = useState<Date>();
    const [endTime, setEndTime] = useState("03:00");

    const valid = startDate && endDate;

    const create = () => {
        if (!startDate || !endDate) return;

        onCreate({
            start: `${format(startDate, "yyyy-MM-dd")} ${startTime}`,
            end: `${format(endDate, "yyyy-MM-dd")} ${endTime}`,
        });
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    <Button size="sm">
                        <Plus data-icon="inline-start" />
                        Create a new maintenance period
                    </Button>
                }
            />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New maintenance period</DialogTitle>
                    <DialogDescription>
                        We won't send notifications while this period is active.
                    </DialogDescription>
                </DialogHeader>
                <FieldGroup>
                    <div className="grid grid-cols-[1fr_8rem] gap-2">
                        <DatePicker label="Starts at" value={startDate} onChange={setStartDate} />
                        <Field>
                            <FieldLabel htmlFor="period-start-time">Time</FieldLabel>
                            <Input
                                id="period-start-time"
                                type="time"
                                value={startTime}
                                onChange={(event) => setStartTime(event.target.value)}
                            />
                        </Field>
                    </div>
                    <div className="grid grid-cols-[1fr_8rem] gap-2">
                        <DatePicker label="Ends at" value={endDate} onChange={setEndDate} />
                        <Field>
                            <FieldLabel htmlFor="period-end-time">Time</FieldLabel>
                            <Input
                                id="period-end-time"
                                type="time"
                                value={endTime}
                                onChange={(event) => setEndTime(event.target.value)}
                            />
                        </Field>
                    </div>
                </FieldGroup>
                <DialogFooter>
                    <DialogClose render={<Button variant="outline">Cancel</Button>} />
                    <Button disabled={!valid} onClick={create}>
                        Create period
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
