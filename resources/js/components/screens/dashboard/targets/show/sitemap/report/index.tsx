import { Download, TriangleAlert, FileX } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const filters = [
    { value: "all", label: "All" },
    { value: "with-errors", label: "Sitemaps with errors" },
    { value: "without-errors", label: "Sitemaps without errors" },
];

export const Report = ({ endpoint }: { endpoint: string }) => {
    const sitemapUrl = `https://${endpoint}/sitemap.xml`;

    return (
        <div className="flex flex-col gap-4">
            <Alert className="*:[svg]:text-amber-500">
                <TriangleAlert />
                <AlertTitle>Sitemap is invalid</AlertTitle>
                <AlertDescription className="flex flex-col gap-3">
                    <div>
                        <p>We could not load the sitemap from {sitemapUrl}</p>
                        <ul className="list-disc pl-5">
                            <li>Reason: Response code: 404</li>
                        </ul>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm">
                            View sitemap
                        </Button>
                        <Button variant="outline" size="sm">
                            Manage settings
                        </Button>
                    </div>
                </AlertDescription>
            </Alert>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Check details</CardTitle>
                    <CardAction>
                        <Badge variant="secondary">Checked 5 minutes ago</Badge>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <dl className="grid gap-3 sm:grid-cols-[12rem_1fr]">
                        <dt className="text-muted-foreground">Sitemap URL</dt>
                        <dd className="font-mono">{sitemapUrl}</dd>
                        <Separator className="sm:col-span-2" />
                        <dt className="text-muted-foreground">Sitemaps found</dt>
                        <dd>0, of which 1 has issues</dd>
                        <Separator className="sm:col-span-2" />
                        <dt className="text-muted-foreground">Urls found</dt>
                        <dd>0, of which 1 has issues</dd>
                    </dl>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Sitemaps</CardTitle>
                    <CardAction className="flex items-center gap-2">
                        <span className="hidden text-muted-foreground sm:inline">
                            Download all issues as
                        </span>
                        <Button variant="outline" size="sm">
                            Excel
                            <Download data-icon="inline-end" />
                        </Button>
                        <Button variant="outline" size="sm">
                            CSV
                            <Download data-icon="inline-end" />
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="all">
                        <TabsList variant="line">
                            {filters.map((filter) => (
                                <TabsTrigger key={filter.value} value={filter.value}>
                                    {filter.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        {filters.map((filter) => (
                            <TabsContent key={filter.value} value={filter.value} className="pt-2">
                                <Empty>
                                    <EmptyHeader>
                                        <EmptyMedia variant="icon">
                                            <FileX />
                                        </EmptyMedia>
                                        <EmptyTitle>No sitemaps found.</EmptyTitle>
                                        <EmptyDescription>
                                            We couldn't find any sitemaps at {sitemapUrl}.
                                        </EmptyDescription>
                                    </EmptyHeader>
                                </Empty>
                            </TabsContent>
                        ))}
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
};
