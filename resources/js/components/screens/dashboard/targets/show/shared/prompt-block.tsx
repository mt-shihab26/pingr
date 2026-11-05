import { useState } from "react";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    CodeBlock,
    CodeBlockActions,
    CodeBlockContent,
    CodeBlockCopyButton,
    CodeBlockHeader,
    CodeBlockTitle,
} from "@/components/ui/code-block";

export const PromptBlock = ({
    title,
    summary,
    details,
}: {
    title: string;
    summary: string;
    details: string;
}) => {
    const [expanded, setExpanded] = useState(false);
    const prompt = summary + details;

    return (
        <div className="flex flex-col gap-2">
            <CodeBlock>
                <CodeBlockHeader>
                    <CodeBlockTitle>
                        <Sparkles className="text-primary" />
                        {title}
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
        </div>
    );
};
