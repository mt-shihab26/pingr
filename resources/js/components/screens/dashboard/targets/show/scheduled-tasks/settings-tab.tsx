import type { TTarget } from "@/types/models";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { ApiSection } from "@/components/screens/dashboard/targets/show/uptime/settings/api-section";
import { PromptBlock } from "@/components/screens/dashboard/targets/show/shared/prompt-block";

import { setupPrompt } from "./setup-prompt";

export const SettingsTab = ({ target }: { target: TTarget }) => {
    return (
        <div className="flex flex-col gap-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Sync your schedule with AI</CardTitle>
                    <CardDescription>
                        Sync every scheduled task in one go instead of adding them by hand. Paste
                        this prompt into your AI coding assistant (Claude Code, Cursor, ...).
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <PromptBlock {...setupPrompt} />
                </CardContent>
            </Card>
            <ApiSection targetId={target.id} />
        </div>
    );
};
