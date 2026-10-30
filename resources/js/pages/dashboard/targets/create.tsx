import type { TTargetType } from "@/types/enums";

import { types } from "@/lib/targets";
import { useForm } from "@inertiajs/react";
import { cn } from "cn";

import { Card, CardContent } from "@/components/ui/card";
import { Heading } from "@/components/elements/heading";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { InputError } from "@/components/elements/input-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CreateTarget = () => {
    const { data, setData, errors } = useForm<{
        type: TTargetType;
        website_url: string | null;
        server_address: string | null;
        tcpport_endpoint: string | null;
        ai_url: string | null;
    }>({
        type: "website",
        website_url: null,
        server_address: null,
        tcpport_endpoint: null,
        ai_url: null,
    });

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
            {data.type === "website" && (
                <div className="flex flex-col gap-2">
                    <Label htmlFor="website_url">Website URL</Label>
                    <Input
                        id="website_url"
                        name="website_url"
                        type="url"
                        placeholder="https://example.com"
                        value={data.website_url ?? ""}
                        onChange={(e) => setData("website_url", e.target.value)}
                    />
                    <InputError message={errors.website_url} />
                </div>
            )}
            {data.type === "server" && (
                <div className="flex flex-col gap-2">
                    <Label htmlFor="server_address">Server address</Label>
                    <Input
                        id="server_address"
                        name="server_address"
                        type="text"
                        placeholder="192.168.1.1 or server.example.com"
                        value={data.server_address ?? ""}
                        onChange={(e) =>
                            setData("server_address", e.target.value)
                        }
                    />
                    <InputError message={errors.server_address} />
                </div>
            )}
            {data.type === "tcpport" && (
                <div className="flex flex-col gap-2">
                    <Label htmlFor="tcpport_endpoint">TCP endpoint</Label>
                    <Input
                        id="tcpport_endpoint"
                        name="tcpport_endpoint"
                        type="text"
                        placeholder="example.com:443"
                        value={data.tcpport_endpoint ?? ""}
                        onChange={(e) =>
                            setData("tcpport_endpoint", e.target.value)
                        }
                    />
                    <InputError message={errors.tcpport_endpoint} />
                </div>
            )}
            {data.type === "ai" && (
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="ai_url">
                            What website would you like to monitor?
                        </Label>
                        <p className="text-sm text-muted-foreground">
                            We'll analyze the page and suggest what to monitor.
                        </p>
                    </div>
                    <Input
                        id="ai_url"
                        name="ai_url"
                        type="url"
                        placeholder="https://example.com"
                        value={data.ai_url ?? ""}
                        onChange={(e) => setData("ai_url", e.target.value)}
                    />
                    <InputError message={errors.ai_url} />
                </div>
            )}
        </DashboardLayout>
    );
};

export default CreateTarget;
