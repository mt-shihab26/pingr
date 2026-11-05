import type { ReactNode } from "react";

import { Copy } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const BadgeCard = ({
    title,
    description,
    preview,
    url,
    alt,
}: {
    title: string;
    description: string;
    preview: ReactNode;
    url: string;
    alt: string;
}) => {
    const snippets = [
        { value: "html", label: "HTML", code: `<img src="${url}" alt="${alt}">` },
        { value: "markdown", label: "Markdown", code: `![${alt}](${url})` },
        { value: "url", label: "URL", code: url },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex min-h-28 items-center justify-center border-y py-8">
                {preview}
            </CardContent>
            <CardFooter>
                <Tabs defaultValue="html" className="w-full">
                    <TabsList>
                        {snippets.map((snippet) => (
                            <TabsTrigger key={snippet.value} value={snippet.value}>
                                {snippet.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {snippets.map((snippet) => (
                        <TabsContent key={snippet.value} value={snippet.value} className="pt-2">
                            <InputGroup>
                                <InputGroupInput
                                    value={snippet.code}
                                    readOnly
                                    className="font-mono"
                                    aria-label={`${title} ${snippet.label}`}
                                />
                                <InputGroupAddon align="inline-end">
                                    <InputGroupButton
                                        size="icon-xs"
                                        aria-label={`Copy ${snippet.label}`}
                                        onClick={() => navigator.clipboard.writeText(snippet.code)}
                                    >
                                        <Copy />
                                    </InputGroupButton>
                                </InputGroupAddon>
                            </InputGroup>
                        </TabsContent>
                    ))}
                </Tabs>
            </CardFooter>
        </Card>
    );
};
