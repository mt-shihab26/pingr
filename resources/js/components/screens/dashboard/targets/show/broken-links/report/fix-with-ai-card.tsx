import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { PromptBlock } from "@/components/screens/dashboard/targets/show/shared/prompt-block";

const summary =
    "Fetch the broken links report at https://pingr.app/broken-links/72477598798/ai-report?signature=c4b596bde01c683ce28c514fc5574926e5fda7c1cc37fd1d49ef7029b26fb0b6 and fix the links in this project's code. Verify destinations before changing links, and keep the surrounding text readable.";

const details = `

For each broken link in the report:
1. Find where the link is rendered in this codebase (templates, markdown, components).
2. Decide whether the destination moved, was renamed, or no longer exists.
3. Update the link to the correct destination, or remove it if nothing replaces it.
4. Do not change unrelated content.

When done, list every link you changed with its old and new destination.`;

export const FixWithAiCard = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Fix with AI</CardTitle>
                <CardDescription>
                    Paste this prompt into your AI coding assistant to fix these broken links. The
                    assistant can open the report link without signing in.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <PromptBlock title="Fix broken links prompt" summary={summary} details={details} />
            </CardContent>
        </Card>
    );
};
