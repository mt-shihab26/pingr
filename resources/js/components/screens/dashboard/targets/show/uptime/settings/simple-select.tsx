import { useState } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export const SimpleSelect = ({
    items,
    defaultValue,
    className,
}: {
    items: { value: string; label: string }[];
    defaultValue: string;
    className?: string;
}) => {
    const [value, setValue] = useState(defaultValue);

    return (
        <Select items={items} value={value} onValueChange={(value) => setValue(value as string)}>
            <SelectTrigger className={className ?? "w-full"}>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                        {item.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
