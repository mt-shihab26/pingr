import type { TTargetAIFrequencyUnit, TTargetType } from "@/types/enums";

import { aiFrequencyUnits, types } from "@/lib/targets";
import { useForm } from "@inertiajs/react";
import { useMemo } from "react";
import { cn } from "cn";

import { Card, CardContent } from "@/components/ui/card";
import { Heading } from "@/components/elements/heading";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { InputError } from "@/components/elements/input-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

const CreateTarget = () => {
    const { data, setData, errors } = useForm<{
        type: TTargetType;
        label: string | null;
        endpoint: string | null;
        ai_frequency_unit: TTargetAIFrequencyUnit;
    }>({
        type: "website",
        label: null,
        endpoint: null,
        ai_frequency_unit: "day",
    });

    const selectedType = useMemo(() => {
        return types.find((type) => type.key === data.type)!;
    }, [data.type]);

    return (
        <DashboardLayout title="Create new target for monitor">
            <Heading
                title="Add new Target"
                description="Add new target for monitoring of those targets status"
            />
            <div className="flex flex-col space-y-2">
                <Heading
                    variant="small"
                    title="Type"
                    description="Select type of target you want to monitor"
                    required
                />
                <div className="flex w-full space-x-2">
                    {types.map((type) => (
                        <Card
                            key={type.key}
                            onClick={() => setData("type", type.key)}
                            className={cn("w-full cursor-pointer", {
                                "ring-primary": data.type === type.key,
                            })}
                        >
                            <CardContent>
                                <div>{type.label}</div>
                                <div>{type.description}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <InputError message={errors.type} />
            </div>
            <div className="flex flex-col space-y-2">
                <div className="flex flex-col space-y-1">
                    <Label htmlFor={`endpoint_${selectedType.key}`} required>
                        {selectedType.target.label}
                    </Label>
                    {selectedType.target.description && (
                        <p className="text-sm text-muted-foreground">
                            {selectedType.target.description}
                        </p>
                    )}
                </div>
                <Input
                    id={`endpoint_${selectedType.key}`}
                    name={`endpoint_${selectedType.key}`}
                    maxLength={selectedType.target.maxLength}
                    minLength={selectedType.target.minLength}
                    type={selectedType.target.type}
                    placeholder={selectedType.target.placeholder}
                    value={data.endpoint ?? ""}
                    onChange={(e) => setData("endpoint", e.target.value)}
                    required
                />
                <InputError message={errors.endpoint} />
            </div>
            <div className="flex flex-col space-y-2">
                <Label htmlFor="label">Label</Label>
                <Input
                    id="label"
                    name="label"
                    maxLength={255}
                    minLength={3}
                    type="text"
                    placeholder="My website"
                    value={data.label ?? ""}
                    onChange={(e) => setData("label", e.target.value)}
                />
                <InputError message={errors.label} />
            </div>
            {data.type === "ai" && (
                <div className="flex flex-col space-y-2">
                    <Label>How often should we execute this prompt?</Label>
                    <div>
                        <div>
                            <Input
                                id="label"
                                name="label"
                                maxLength={255}
                                minLength={3}
                                type="text"
                                placeholder="My website"
                                value={data.label ?? ""}
                                onChange={(e) => setData("label", e.target.value)}
                            />
                            <InputError message={errors.label} />
                        </div>
                        <div>
                            <NativeSelect>
                                {aiFrequencyUnits.map((x) => (
                                    <NativeSelectOption key={x.key} value={x.key}>
                                        {x.label}
                                    </NativeSelectOption>
                                ))}
                            </NativeSelect>
                            <InputError message={errors.label} />
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default CreateTarget;
