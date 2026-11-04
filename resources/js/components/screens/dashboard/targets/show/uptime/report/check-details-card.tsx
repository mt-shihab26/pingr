import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const CheckDetailsCard = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Check details</CardTitle>
                <CardAction>
                    <Badge variant="secondary">Checked 7 seconds ago</Badge>
                </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <dl className="grid gap-3 sm:grid-cols-[12rem_1fr]">
                    <dt className="text-muted-foreground">Monitored from</dt>
                    <dd>
                        Tokyo, Japan <span className="text-muted-foreground">198.13.48.175</span>
                    </dd>
                    <Separator className="sm:col-span-2" />
                    <dt className="text-muted-foreground">HTTP status code</dt>
                    <dd>
                        <Badge className="bg-emerald-500/15 font-mono text-emerald-600 dark:text-emerald-400">
                            HTTP/1.1 200 OK
                        </Badge>
                    </dd>
                </dl>
                <Separator />
                <Button variant="link" className="w-fit px-0">
                    Show all details
                </Button>
            </CardContent>
        </Card>
    );
};
