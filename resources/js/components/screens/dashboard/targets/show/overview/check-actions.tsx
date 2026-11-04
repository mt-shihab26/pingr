import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Link } from "@inertiajs/react";
import { ChartPie, CircleStop, EllipsisVertical, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

export const CheckActions = ({ href, onDisable }: { href?: string; onDisable: () => void }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button variant="ghost" size="icon-sm">
                        <EllipsisVertical />
                        <span className="sr-only">Actions</span>
                    </Button>
                }
            />
            <DropdownMenuContent align="end" className="w-44">
                {href && (
                    <DropdownMenuItem render={<Link href={href} />}>
                        <ChartPie />
                        View report
                    </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                    <RefreshCw />
                    Check again
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={onDisable}>
                    <CircleStop />
                    Disable
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
