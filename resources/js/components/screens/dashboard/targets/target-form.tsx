import type { TTarget } from "@/types/models";
import type { TTargetAIFrequencyUnit, TTargetType } from "@/types/enums";
import type { TTargetCheck } from "@/types/utils";

import { aiFrequencyUnits, checks, types } from "@/lib/targets";
import { useForm } from "@inertiajs/react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useShared } from "@/hooks/use-shared";
import { cn } from "cn";

import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { InputError } from "@/components/elements/input-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

export const TargetForm = ({ target }: { target?: TTarget }) => {
    const { team } = useShared();

    const { data, setData, errors, post, patch, processing } = useForm<{
        type: TTargetType;
        label: string | null;
        endpoint: string | null;
        ai_frequency_value: number | null;
        ai_frequency_unit: TTargetAIFrequencyUnit;
        check_uptime: boolean;
        check_certificate_health: boolean;
        check_broken_links: boolean;
        check_mixed_content: boolean;
        check_lighthouse: boolean;
        check_scheduled_tasks: boolean;
        check_application_health: boolean;
        check_sitemap: boolean;
        check_dns: boolean;
        check_domain: boolean;
        check_dns_blocklist: boolean;
        check_open_ports: boolean;
    }>({
        type: target?.type ?? "website",
        label: target?.label ?? null,
        endpoint: target?.endpoint ?? null,
        ai_frequency_value: target?.ai_frequency_value ?? 1,
        ai_frequency_unit: target?.ai_frequency_unit ?? "day",
        check_uptime: target?.check_uptime ?? false,
        check_certificate_health: target?.check_certificate_health ?? false,
        check_broken_links: target?.check_broken_links ?? false,
        check_mixed_content: target?.check_mixed_content ?? false,
        check_lighthouse: target?.check_lighthouse ?? false,
        check_scheduled_tasks: target?.check_scheduled_tasks ?? false,
        check_application_health: target?.check_application_health ?? false,
        check_sitemap: target?.check_sitemap ?? false,
        check_dns: target?.check_dns ?? false,
        check_domain: target?.check_domain ?? false,
        check_dns_blocklist: target?.check_dns_blocklist ?? false,
        check_open_ports: target?.check_open_ports ?? false,
    });

    const previousType = useRef<TTargetType | null>(target?.type ?? null);

    useEffect(() => {
        if (previousType.current === data.type) return;
        previousType.current = data.type;

        const unchecked = {
            check_uptime: false,
            check_certificate_health: false,
            check_broken_links: false,
            check_mixed_content: false,
            check_lighthouse: false,
            check_scheduled_tasks: false,
            check_application_health: false,
            check_sitemap: false,
            check_dns: false,
            check_domain: false,
            check_dns_blocklist: false,
            check_open_ports: false,
        };

        if (data.type === "website") {
            setData((d) => ({
                ...d,
                ...unchecked,
                check_uptime: true,
                check_certificate_health: true,
                check_broken_links: true,
                check_mixed_content: true,
                check_lighthouse: true,
                check_dns: true,
                check_domain: true,
                check_dns_blocklist: true,
            }));
        } else if (data.type === "server") {
            setData((d) => ({
                ...d,
                ...unchecked,
                check_uptime: true,
            }));
        } else if (data.type === "tcpport") {
            setData((d) => ({
                ...d,
                ...unchecked,
                check_uptime: true,
            }));
        } else {
            setData((d) => ({
                ...d,
                ...unchecked,
            }));
        }
    }, [data.type]);

    const selectedType = useMemo(() => {
        return types.find((type) => type.key === data.type)!;
    }, [data.type]);

    const checkField = useCallback((check: TTargetCheck) => {
        return `check_${check}` as Extract<keyof typeof data, `check_${TTargetCheck}`>;
    }, []);

    const toggleAllChecks = () => {
        const checked = !selectedType.checks.every((key) => data[checkField(key)]);
        setData((d) => ({
            ...d,
            ...Object.fromEntries(selectedType.checks.map((key) => [checkField(key), checked])),
        }));
    };

    return (
        <form
            className="flex flex-col gap-6"
            onSubmit={(e) => {
                e.preventDefault();
                if (target) {
                    patch(route("dashboard.targets.update", { team, target: target.id }));
                } else {
                    post(route("dashboard.targets.store", { team }));
                }
            }}
        >
            <div className="flex flex-col space-y-2">
                <div className="flex flex-col space-y-1">
                    <Label required>Type</Label>
                    <p className="text-xs text-muted-foreground">
                        Select type of target you want to monitor
                    </p>
                </div>
                <div className="flex w-full space-x-2">
                    {types.map((type) => (
                        <Card
                            key={type.key}
                            onClick={() => setData("type", type.key)}
                            className={cn("w-full cursor-pointer", {
                                "ring-primary": data.type === type.key,
                            })}
                        >
                            <CardContent className="flex flex-col gap-2">
                                <type.display.icon className="size-5" />
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
                        <p className="text-xs text-muted-foreground">
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
                                max={365}
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
                    <div className="flex items-center justify-between">
                        <Label>Checks</Label>
                        <Button type="button" variant="link" size="xs" onClick={toggleAllChecks}>
                            {selectedType.checks.every((key) => data[checkField(key)])
                                ? "Deselect all"
                                : "Select all"}
                        </Button>
                    </div>
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
            <div className="flex w-full gap-2">
                <Button type="submit" className="flex-1" disabled={processing}>
                    {processing && <Spinner />}
                    {target ? "Save changes" : "Create target"}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    nativeButton={false}
                    render={<Link href={route("dashboard.targets.index", { team })} />}
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
};
