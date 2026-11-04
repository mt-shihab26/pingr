import { Copy } from "lucide-react";

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group";

export const CopyField = ({
    label,
    value,
    description,
}: {
    label: string;
    value: string;
    description: string;
}) => {
    return (
        <Field>
            <FieldLabel>{label}</FieldLabel>
            <InputGroup>
                <InputGroupInput value={value} readOnly />
                <InputGroupAddon align="inline-end">
                    <InputGroupButton
                        size="icon-xs"
                        aria-label={`Copy ${label}`}
                        onClick={() => navigator.clipboard.writeText(value)}
                    >
                        <Copy />
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
            <FieldDescription>{description}</FieldDescription>
        </Field>
    );
};
