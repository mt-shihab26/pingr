import { useState } from "react";
import { Bell, CircleCheck, Rss } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const SubscribeDialog = ({ name, slug }: { name: string; slug: string }) => {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const valid = /^\S+@\S+\.\S+$/.test(email.trim());
    const feed = `https://pingr.app/status/${slug}/feed`;

    return (
        <Dialog onOpenChange={(open) => !open && setSubscribed(false)}>
            <DialogTrigger
                render={
                    <Button size="sm">
                        <Bell data-icon="inline-start" />
                        Subscribe
                    </Button>
                }
            />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Subscribe to updates</DialogTitle>
                    <DialogDescription>
                        Get notified when {name} posts a status update.
                    </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="email">
                    <TabsList>
                        <TabsTrigger value="email">Email</TabsTrigger>
                        <TabsTrigger value="rss">RSS</TabsTrigger>
                    </TabsList>
                    <TabsContent value="email" className="pt-2">
                        {subscribed ? (
                            <p className="flex items-center gap-2">
                                <CircleCheck className="size-4 text-emerald-500" />
                                Check your inbox to confirm your subscription.
                            </p>
                        ) : (
                            <Field>
                                <FieldLabel htmlFor="subscribe-email">Email address</FieldLabel>
                                <Input
                                    id="subscribe-email"
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                                <FieldDescription>
                                    We'll send you a link to confirm. You can unsubscribe at any
                                    time.
                                </FieldDescription>
                            </Field>
                        )}
                    </TabsContent>
                    <TabsContent value="rss" className="pt-2">
                        <Field>
                            <FieldLabel htmlFor="subscribe-feed">Feed URL</FieldLabel>
                            <Input
                                id="subscribe-feed"
                                value={feed}
                                readOnly
                                className="font-mono"
                            />
                            <FieldDescription>
                                <Rss className="inline size-3" /> Add this URL to your feed reader.
                            </FieldDescription>
                        </Field>
                    </TabsContent>
                </Tabs>
                {!subscribed && (
                    <DialogFooter>
                        <Button disabled={!valid} onClick={() => setSubscribed(true)}>
                            Subscribe
                        </Button>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
};
