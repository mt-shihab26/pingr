import type { TBrokenLink } from "./links-table";

import { useState } from "react";
import { Link2Off, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { LinksTable } from "./links-table";

const linkTypes = [
    { value: "all", label: "All link types" },
    { value: "link", label: "Links" },
    { value: "image", label: "Images" },
    { value: "script", label: "Scripts" },
    { value: "stylesheet", label: "Stylesheets" },
    { value: "og-image", label: "Open Graph images" },
];

const internal: TBrokenLink[] = [
    "categories/backend",
    "categories/programming",
    "categories/review",
    "series/backend-journey",
    "series/programming-journey",
].map((path) => ({
    status: 404,
    type: "link",
    url: `/articles/articles/${path}`,
    foundOn: "/articles/",
    linkText: `#${path.split("/")[1]}`,
}));

const sections = [
    { value: "internal", label: "Internal", links: internal, action: "Ignore" },
    { value: "ignored", label: "Ignored", links: [], action: "Unignore" },
    { value: "fixed", label: "Fixed", links: [] },
    { value: "removed", label: "Removed", links: [] },
    { value: "added", label: "Added", links: [] },
    { value: "crawled", label: "Crawled", links: [] },
] satisfies { value: string; label: string; links: TBrokenLink[]; action?: string }[];

export const BrokenLinksCard = () => {
    const [search, setSearch] = useState("");
    const [type, setType] = useState("all");

    const filter = (links: TBrokenLink[]) =>
        links.filter(
            (link) =>
                (type === "all" || link.type === type) &&
                [link.url, link.foundOn, link.linkText].some((value) =>
                    value.toLowerCase().includes(search.toLowerCase()),
                ),
        );

    return (
        <Card className="pb-0">
            <CardHeader>
                <CardTitle className="text-base">Broken links</CardTitle>
                <CardAction>
                    <Badge variant="secondary">Checked 5 hours ago</Badge>
                </CardAction>
            </CardHeader>
            <Tabs defaultValue="internal">
                <CardContent className="flex flex-wrap items-center justify-between gap-2">
                    <TabsList variant="line">
                        {sections.map((section) => (
                            <TabsTrigger key={section.value} value={section.value}>
                                {section.label}
                                {section.links.length > 0 && (
                                    <Badge variant="destructive">{section.links.length}</Badge>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <div className="flex gap-2">
                        <InputGroup className="w-48">
                            <InputGroupInput
                                placeholder="Search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                            />
                            <InputGroupAddon>
                                <Search />
                            </InputGroupAddon>
                        </InputGroup>
                        <Select
                            items={linkTypes}
                            value={type}
                            onValueChange={(value) => setType(value as string)}
                        >
                            <SelectTrigger className="w-44">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {linkTypes.map((item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
                {sections.map((section) => {
                    const links = filter(section.links);

                    return (
                        <TabsContent key={section.value} value={section.value} className="pt-2">
                            {links.length > 0 ? (
                                <LinksTable links={links} action={section.action} />
                            ) : (
                                <Empty>
                                    <EmptyHeader>
                                        <EmptyMedia variant="icon">
                                            <Link2Off />
                                        </EmptyMedia>
                                        <EmptyTitle>No links found.</EmptyTitle>
                                        <EmptyDescription>
                                            There are no {section.label.toLowerCase()} links
                                            matching your filters.
                                        </EmptyDescription>
                                    </EmptyHeader>
                                </Empty>
                            )}
                        </TabsContent>
                    );
                })}
            </Tabs>
        </Card>
    );
};
