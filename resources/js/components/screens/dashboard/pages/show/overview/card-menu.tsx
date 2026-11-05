import { Link } from "@inertiajs/react";
import { Ellipsis } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const CardMenu = ({ items }: { items: { label: string; href: string }[] }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button variant="ghost" size="icon-sm" aria-label="More actions">
                        <Ellipsis />
                    </Button>
                }
            />
            <DropdownMenuContent align="end">
                {items.map((item) => (
                    <DropdownMenuItem key={item.label} render={<Link href={item.href} />}>
                        {item.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
