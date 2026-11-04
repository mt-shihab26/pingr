import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const DowntimePeriodsCard = ({ endpoint }: { endpoint: string }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Latest downtime periods</CardTitle>
                <CardAction>
                    <Button variant="outline" size="sm">
                        Download
                        <Download data-icon="inline-end" />
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <p>No downtime has been detected for {endpoint}.</p>
            </CardContent>
        </Card>
    );
};
