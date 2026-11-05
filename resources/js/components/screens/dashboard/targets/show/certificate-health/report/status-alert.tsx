import { CircleCheck } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const StatusAlert = () => {
    return (
        <Alert>
            <CircleCheck className="text-emerald-500" />
            <AlertTitle>Certificate is valid</AlertTitle>
            <AlertDescription>No problems detected with your certificate.</AlertDescription>
        </Alert>
    );
};
