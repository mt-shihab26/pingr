import { useId } from "react";

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
