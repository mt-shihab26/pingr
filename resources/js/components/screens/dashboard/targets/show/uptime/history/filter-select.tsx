import { Field, FieldLabel } from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export const FilterSelect = ({
    label,
    items,
    value,
    onChange,
}: {
    label: string;
    items: { value: string; label: string }[];
    value: string;
    onChange: (value: string) => void;
}) => {
    return (
        <Field>
            <FieldLabel>{label}</FieldLabel>
            <Select
                items={items}
                value={value}
                onValueChange={(value) => onChange(value as string)}
            >
                <SelectTrigger className="w-full">
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
        </Field>
    );
};
