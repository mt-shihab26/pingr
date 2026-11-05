import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const durations = [
    { value: "5", label: "for 5 minutes" },
    { value: "15", label: "for 15 minutes" },
    { value: "60", label: "for 1 hour" },
    { value: "240", label: "for 4 hours" },
    { value: "1440", label: "for 1 day" },
];

export const SnoozeField = ({
    label,
    action,
    description = "We'll silence these alerts (both problems & recoveries) until the selected time runs out.",
}: {
    label: string;
    action: string;
    description?: string;
}) => {
    const [duration, setDuration] = useState("5");

    return (
        <Field>
            <FieldLabel>{label}</FieldLabel>
            <div className="flex flex-wrap gap-2">
                <Select
                    items={durations}
                    value={duration}
                    onValueChange={(value) => setDuration(value as string)}
                >
                    <SelectTrigger className="w-44">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {durations.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button variant="outline">{action}</Button>
            </div>
            <FieldDescription>{description}</FieldDescription>
        </Field>
    );
};
