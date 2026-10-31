import { useId } from "react";

import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

export const PerPageSelector = ({
    value,
    onChange,
}: {
    value: number;
    onChange: (value: number) => void;
}) => {
    const id = useId();
    const options = [...new Set([10, 20, 25, 50, 100, value])].sort((a, b) => a - b);

    return (
        <div className="flex shrink-0 items-center gap-2">
            <Label htmlFor={id}>Per page</Label>
            <NativeSelect
                id={id}
                value={value}
                onChange={(event) => onChange(Number(event.target.value))}
            >
                {options.map((option) => (
                    <NativeSelectOption key={option} value={option}>
                        {option}
                    </NativeSelectOption>
                ))}
            </NativeSelect>
        </div>
    );
};
