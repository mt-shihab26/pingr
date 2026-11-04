import { Download } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { UptimeGrid } from "./uptime-grid";

const days = [
    { label: "Today", uptime: "100%" },
    { label: "Yesterday", uptime: "100%" },
    { label: "2026-11-02", uptime: "100%" },
    { label: "2026-11-01", uptime: "100%" },
    { label: "2026-10-31", uptime: "100%" },
    { label: "2026-10-30", uptime: "100%" },
    { label: "2026-10-29", uptime: "100%" },
];

const months = [
    { label: "Nov 2026", uptime: "100%" },
    { label: "Oct 2026", uptime: "100%" },
    { label: "Sep 2026", uptime: "99.98%" },
    { label: "Aug 2026", uptime: "100%" },
];

export const UptimeSummaryCard = () => {
    return (
        <Card>
            <CardContent>
                <Tabs defaultValue="days">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <TabsList variant="line">
                            <TabsTrigger value="days">
                                Past 7 days <Badge>100%</Badge>
                            </TabsTrigger>
                            <TabsTrigger value="months">
                                Past 12 months <Badge variant="secondary">100%</Badge>
                            </TabsTrigger>
                        </TabsList>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                                Daily uptime
                                <Download data-icon="inline-end" />
                            </Button>
                            <Button variant="outline" size="sm">
                                Run history
                                <Download data-icon="inline-end" />
                            </Button>
                        </div>
                    </div>
                    <TabsContent value="days" className="pt-2">
                        <UptimeGrid items={days} />
                    </TabsContent>
                    <TabsContent value="months" className="pt-2">
                        <UptimeGrid items={months} />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
};
