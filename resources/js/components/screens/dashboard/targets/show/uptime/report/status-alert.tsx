import { CircleCheck } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const StatusAlert = ({ endpoint }: { endpoint: string }) => {
    return (
        <Alert>
            <CircleCheck className="text-emerald-500" />
            <AlertTitle>All good!</AlertTitle>
            <AlertDescription>We were able to verify that {endpoint} is online.</AlertDescription>
        </Alert>
    );
};
