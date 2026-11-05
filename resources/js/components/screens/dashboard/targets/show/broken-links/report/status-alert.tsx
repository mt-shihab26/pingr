import { CircleX } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export const StatusAlert = () => {
    return (
        <Alert variant="destructive">
            <CircleX />
            <AlertTitle>Broken links found</AlertTitle>
            <AlertDescription className="flex flex-col gap-3">
                <p>5 broken links found out of 38 scanned pages on Thursday, Nov 5th, 16:01h</p>
                <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                        Check again
                    </Button>
                    <Button variant="outline" size="sm">
                        View site in browser
                    </Button>
                    <Button variant="outline" size="sm">
                        Manage ignored links
                    </Button>
                </div>
            </AlertDescription>
        </Alert>
    );
};
