import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export const SettingsSection = ({
    title,
    description,
    children,
    save = true,
}: {
    title: string;
    description: string;
    children: ReactNode;
    save?: boolean;
}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>{children}</CardContent>
            {save && (
                <CardFooter>
                    <Button>Save</Button>
                </CardFooter>
            )}
        </Card>
    );
};
