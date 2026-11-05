import { useState } from "react";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    CodeBlock,
    CodeBlockActions,
    CodeBlockContent,
    CodeBlockCopyButton,
    CodeBlockHeader,
    CodeBlockTitle,
} from "@/components/ui/code-block";

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
    const [expanded, setExpanded] = useState(false);
    const prompt = summary + details;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Fix with AI</CardTitle>
                <CardDescription>
                    Paste this prompt into your AI coding assistant to fix these broken links. The
                    assistant can open the report link without signing in.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <CodeBlock>
                    <CodeBlockHeader>
                        <CodeBlockTitle>
                            <Sparkles className="text-primary" />
                            Fix broken links prompt
                        </CodeBlockTitle>
                        <CodeBlockActions>
                            <CodeBlockCopyButton value={prompt} />
                        </CodeBlockActions>
                    </CodeBlockHeader>
                    <CodeBlockContent wrap>{expanded ? prompt : summary}</CodeBlockContent>
                </CodeBlock>
                <Button
                    variant="link"
                    className="w-fit px-0"
                    onClick={() => setExpanded((expanded) => !expanded)}
                >
                    {expanded ? "Show less" : "Show full prompt"}
                </Button>
            </CardContent>
        </Card>
    );
};
