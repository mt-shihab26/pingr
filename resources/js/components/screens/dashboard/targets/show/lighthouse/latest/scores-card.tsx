import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { scores } from "../data";
import { ScoreGauge } from "./score-gauge";

export const ScoresCard = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Scores</CardTitle>
                <CardAction>
                    <Badge variant="secondary">Checked 13 hours ago</Badge>
                </CardAction>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                {scores.map((score) => (
                    <ScoreGauge key={score.key} label={score.label} value={score.value} />
                ))}
            </CardContent>
        </Card>
    );
};
