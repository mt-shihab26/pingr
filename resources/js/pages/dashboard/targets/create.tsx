import type { TTargetType } from "@/types/enums";

import { types } from "@/lib/targets";
import { useForm } from "@inertiajs/react";
import { cn } from "cn";

import { Card, CardContent } from "@/components/ui/card";
import { Heading } from "@/components/elements/heading";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { InputError } from "@/components/elements/input-error";

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
        </DashboardLayout>
    );
};

export default CreateTarget;
