import { ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { scores } from "../data";
import { ScoreGauge } from "./score-gauge";

export const FullReportCard = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Full report</CardTitle>
                <CardAction>
                    <Button variant="outline" size="sm">
                        Open full report
                        <ExternalLink data-icon="inline-end" />
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent className="flex flex-wrap justify-center gap-8 border-t pt-4">
                {scores.map((score) => (
                    <ScoreGauge key={score.key} label={score.label} value={score.value} size="sm" />
                ))}
            </CardContent>
        </Card>
    );
};
