import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { TTargetCheckItem } from "@/types/utils";

import { useState } from "react";
import { Link } from "@inertiajs/react";
import {
    BellOff,
    BookOpen,
    ChartPie,
    CircleStop,
    EllipsisVertical,
    RefreshCw,
    Settings,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { SnoozeField } from "@/components/screens/dashboard/targets/show/uptime/snooze/snooze-field";

// Checks whose alerts are acknowledged (until recovery) instead of snoozed.
const acknowledged: TTargetCheckItem["key"][] = ["check_broken_links", "check_sitemap"];

// Checks whose show page has no settings or snooze tabs yet.
const withoutTabs: TTargetCheckItem["key"][] = ["check_open_ports"];

const withTab = (href: string, tab: string) => `${href}${href.includes("?") ? "&" : "?"}tab=${tab}`;

export const CheckActions = ({
    check,
    href,
    onDisable,
}: {
    check: TTargetCheckItem;
    href?: string;
    onDisable: () => void;
}) => {
    const [snoozing, setSnoozing] = useState(false);

    const hasTabs = href !== undefined && !withoutTabs.includes(check.key);
    const acknowledge = acknowledged.includes(check.key);
    const docs = `https://pingr.app/docs/checks/${check.key.replace("check_", "").replaceAll("_", "-")}`;

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger
                    render={
                        <Button variant="ghost" size="icon-sm">
                            <EllipsisVertical />
                            <span className="sr-only">Actions</span>
                        </Button>
                    }
                />
                <DropdownMenuContent align="end" className="w-48">
                    {href && (
                        <DropdownMenuItem render={<Link href={href} />}>
                            <ChartPie />
                            View report
                        </DropdownMenuItem>
                    )}
                    {hasTabs && (
                        <DropdownMenuItem render={<Link href={withTab(href, "settings")} />}>
                            <Settings />
                            Settings
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuItem render={<a href={docs} target="_blank" rel="noreferrer" />}>
                        <BookOpen />
                        View docs
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <RefreshCw />
                        Check again
                    </DropdownMenuItem>
                    {hasTabs && (
                        <DropdownMenuItem onClick={() => setSnoozing(true)}>
                            <BellOff />
                            {acknowledge ? "Acknowledge alerts..." : "Snooze alerts..."}
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive" onClick={onDisable}>
                        <CircleStop />
                        Disable
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={snoozing} onOpenChange={setSnoozing}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {acknowledge ? "Acknowledge" : "Snooze"} {check.label} alerts
                        </DialogTitle>
                        <DialogDescription>
                            You can see past snoozes on the {acknowledge ? "acknowledge" : "snooze"}{" "}
                            tab of this check.
                        </DialogDescription>
                    </DialogHeader>
                    <SnoozeField
                        label={`Do not send any ${check.label.toLowerCase()} notifications`}
                        action={acknowledge ? "Acknowledge" : "Snooze"}
                        description={
                            acknowledge
                                ? "We'll silence these alerts until the check recovers, or until the selected time runs out, whichever comes first."
                                : undefined
                        }
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};
