import { useState } from "react";
import { Bell, CircleCheck, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group";

type TChannel = "email" | "slack" | "rss" | "json" | "xml";

const channels: { value: TChannel; label: string }[] = [
    { value: "email", label: "Email" },
    { value: "slack", label: "Slack" },
    { value: "rss", label: "RSS" },
    { value: "json", label: "JSON" },
    { value: "xml", label: "XML" },
];

const forms = {
    email: {
        label: "Email address",
        type: "email",
        placeholder: "you@example.com",
        pattern: /^\S+@\S+\.\S+$/,
        hint: "We'll send you a link to confirm. You can unsubscribe at any time.",
        done: "Check your inbox to confirm your subscription.",
    },
    slack: {
        label: "Slack webhook URL",
        type: "url",
        placeholder: "https://hooks.slack.com/services/...",
        pattern: /^https:\/\/hooks\.slack\.com\/\S+$/,
        hint: "Create an incoming webhook in Slack and paste its URL here.",
        done: "Updates will be posted to your Slack channel.",
    },
};

export const SubscribeDialog = ({ name, slug }: { name: string; slug: string }) => {
    const [channel, setChannel] = useState<TChannel | null>(null);
    const [value, setValue] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const open = (next: TChannel) => {
        setChannel(next);
        setValue("");
        setSubscribed(false);
    };

    const label = channels.find((item) => item.value === channel)?.label;
    const form = channel === "email" || channel === "slack" ? forms[channel] : null;
    const feed = channel && !form ? `${route("status.show", { slug })}/feed.${channel}` : "";

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger
                    render={
                        <Button size="sm">
                            <Bell data-icon="inline-start" />
                            Subscribe
                        </Button>
                    }
                />
                <DropdownMenuContent align="end" className="w-40">
                    {channels.map((item) => (
                        <DropdownMenuItem key={item.value} onClick={() => open(item.value)}>
                            {item.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={channel !== null} onOpenChange={(isOpen) => !isOpen && setChannel(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Subscribe via {label}</DialogTitle>
                        <DialogDescription>
                            Get notified when {name} posts a status update.
                        </DialogDescription>
                    </DialogHeader>

                    {form && subscribed && (
                        <p className="flex items-center gap-2">
                            <CircleCheck className="size-4 text-emerald-500" />
                            {form.done}
                        </p>
                    )}

                    {form && !subscribed && (
                        <>
                            <Field>
                                <FieldLabel htmlFor="subscribe-value">{form.label}</FieldLabel>
                                <Input
                                    id="subscribe-value"
                                    type={form.type}
                                    placeholder={form.placeholder}
                                    value={value}
                                    onChange={(event) => setValue(event.target.value)}
                                />
                                <FieldDescription>{form.hint}</FieldDescription>
                            </Field>
                            <DialogFooter>
                                <Button
                                    disabled={!form.pattern.test(value.trim())}
                                    onClick={() => setSubscribed(true)}
                                >
                                    Subscribe
                                </Button>
                            </DialogFooter>
                        </>
                    )}

                    {!form && channel && (
                        <Field>
                            <FieldLabel htmlFor="subscribe-feed">{label} feed URL</FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    id="subscribe-feed"
                                    value={feed}
                                    readOnly
                                    className="font-mono"
                                />
                                <InputGroupAddon align="inline-end">
                                    <InputGroupButton
                                        size="icon-xs"
                                        aria-label="Copy feed URL"
                                        onClick={() => navigator.clipboard.writeText(feed)}
                                    >
                                        <Copy />
                                    </InputGroupButton>
                                </InputGroupAddon>
                            </InputGroup>
                            <FieldDescription>
                                Add this URL to your feed reader or integration.
                            </FieldDescription>
                        </Field>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};
