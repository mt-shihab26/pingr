import type { TTargetAIFrequencyUnit, TTargetCheck, TTargetType } from "@/types/enums";

import { aiFrequencyUnits, checks, types } from "@/lib/targets";
import { useForm } from "@inertiajs/react";
import { useCallback, useMemo } from "react";
import { cn } from "cn";

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
        ai_frequency_value: number | null;
        ai_frequency_unit: TTargetAIFrequencyUnit;
        check_website_uptime: boolean;
        check_website_certificate_health: boolean;
        check_website_broken_links: boolean;
        check_website_mixed_content: boolean;
        check_website_lighthouse: boolean;
        check_website_scheduled_tasks: boolean;
        check_website_application_health: boolean;
        check_website_sitemap: boolean;
        check_website_dns: boolean;
        check_website_domain: boolean;
        check_website_dns_blocklist: boolean;
        check_server_uptime: boolean;
        check_server_scheduled_tasks: boolean;
        check_server_dns: boolean;
        check_server_domain: boolean;
        check_server_dns_blocklist: boolean;
        check_server_open_ports: boolean;
        check_tcpport_uptime: boolean;
        check_tcpport_dns: boolean;
        check_tcpport_domain: boolean;
        check_tcpport_dns_blocklist: boolean;
    }>({
        type: "website",
        label: null,
        endpoint: null,
        ai_frequency_value: 1,
        ai_frequency_unit: "day",
        check_website_uptime: true,
        check_website_certificate_health: true,
        check_website_broken_links: true,
        check_website_mixed_content: true,
        check_website_lighthouse: true,
        check_website_scheduled_tasks: true,
        check_website_application_health: true,
        check_website_sitemap: true,
        check_website_dns: true,
        check_website_domain: true,
        check_website_dns_blocklist: true,
        check_server_uptime: true,
        check_server_scheduled_tasks: true,
        check_server_dns: true,
        check_server_domain: true,
        check_server_dns_blocklist: true,
        check_server_open_ports: true,
        check_tcpport_uptime: true,
        check_tcpport_dns: true,
        check_tcpport_domain: true,
        check_tcpport_dns_blocklist: true,
    });

    const selectedType = useMemo(() => {
        return types.find((type) => type.key === data.type)!;
    }, [data.type]);

    const checkField = useCallback(
        (check: TTargetCheck) =>
            `check_${data.type}_${check}` as Extract<
                keyof typeof data,
                `check_${TTargetType}_${TTargetCheck}`
            >,
        [data.type],
    );

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
                                <div>{type.display.label}</div>
                                <div>{type.display.description}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <InputError message={errors.type} />
            </div>
            <div className="flex flex-col space-y-2">
                <div className="flex flex-col space-y-1">
                    <Label htmlFor={`endpoint_${selectedType.key}`} required>
                        {selectedType.endpoint.label}
                    </Label>
                    {selectedType.endpoint.description && (
                        <p className="text-sm text-muted-foreground">
                            {selectedType.endpoint.description}
                        </p>
                    )}
                </div>
                <Input
                    id={`endpoint_${selectedType.key}`}
                    name={`endpoint_${selectedType.key}`}
                    maxLength={selectedType.endpoint.maxLength}
                    minLength={selectedType.endpoint.minLength}
                    type={selectedType.endpoint.type}
                    placeholder={selectedType.endpoint.placeholder}
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
                    <Label htmlFor="ai_frequency" required>
                        How often should we execute this prompt?
                    </Label>
                    <div className="flex w-full items-start gap-2">
                        <div className="flex min-w-0 flex-1 flex-col space-y-2">
                            <Input
                                id="ai_frequency"
                                name="ai_frequency"
                                min={1}
                                required
                                type="number"
                                placeholder="1"
                                value={data.ai_frequency_value ?? ""}
                                className="w-full"
                                onChange={(e) =>
                                    setData(
                                        "ai_frequency_value",
                                        e.target.value === "" ? null : Number(e.target.value),
                                    )
                                }
                            />
                            <InputError message={errors.ai_frequency_value} />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col space-y-2">
                            <NativeSelect
                                id="ai_frequency_unit"
                                name="ai_frequency_unit"
                                aria-label="Frequency unit"
                                value={data.ai_frequency_unit}
                                className="w-full"
                                onChange={(e) =>
                                    setData(
                                        "ai_frequency_unit",
                                        e.target.value as TTargetAIFrequencyUnit,
                                    )
                                }
                            >
                                {aiFrequencyUnits.map((x) => (
                                    <NativeSelectOption key={x.key} value={x.key}>
                                        {x.label}
                                    </NativeSelectOption>
                                ))}
                            </NativeSelect>
                            <InputError message={errors.ai_frequency_unit} />
                        </div>
                    </div>
                </div>
            )}
            {selectedType.checks.length > 0 && (
                <div className="flex flex-col space-y-2">
                    <Label>Checks</Label>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                        {checks
                            .filter((check) => selectedType.checks.includes(check.key))
                            .map((check) => (
                                <Label key={check.key} className="cursor-pointer">
                                    <Checkbox
                                        checked={data[checkField(check.key)]}
                                        onCheckedChange={(checked) =>
                                            setData(checkField(check.key), checked)
                                        }
                                    />
                                    {check.label}
                                </Label>
                            ))}
                    </div>
                    {selectedType.checks.map((key) => (
                        <InputError key={key} message={errors[checkField(key)]} />
                    ))}
                </div>
            )}
        </DashboardLayout>
    );
};

export default CreateTarget;
