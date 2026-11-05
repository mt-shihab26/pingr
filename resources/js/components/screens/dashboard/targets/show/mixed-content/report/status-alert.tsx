import { CircleCheck } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const StatusAlert = ({ pages }: { pages: number }) => {
    return (
        <Alert>
            <CircleCheck className="text-emerald-500" />
            <AlertTitle>No mixed content found</AlertTitle>
            <AlertDescription>No mixed content found on {pages} pages.</AlertDescription>
        </Alert>
    );
};
