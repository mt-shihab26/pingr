import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export const DatePicker = ({
    label,
    value,
    onChange,
}: {
    label: string;
    value: Date | undefined;
    onChange: (value: Date | undefined) => void;
}) => {
    return (
        <Field>
            <FieldLabel>{label}</FieldLabel>
            <Popover>
                <PopoverTrigger
                    render={
                        <Button variant="outline" className="w-full justify-between font-normal">
                            {value ? format(value, "yyyy-MM-dd") : "Pick a date"}
                            <CalendarIcon />
                        </Button>
                    }
                />
                <PopoverContent className="w-auto p-0" align="end">
                    <Calendar mode="single" selected={value} onSelect={onChange} />
                </PopoverContent>
            </Popover>
        </Field>
    );
};
