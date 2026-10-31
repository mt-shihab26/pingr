import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import type { TTarget } from "@/types/models";

import { useState } from "react";
import { useShared } from "@/hooks/use-shared";

import { Link } from "@inertiajs/react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteTargetAlert } from "./delete-target-alert";

export const TargetActions = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

    const [deleteOpen, setDeleteOpen] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger
                    render={
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label={`Actions for ${target.label ?? target.endpoint}`}
                        />
                    }
                >
                    <MoreHorizontal />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        render={<Link href={route("dashboard.targets.show", { team, target: target.id })} />}
                    >
                        View
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        render={
                            <Link
                                href={route("dashboard.targets.edit", { team, target: target.id })}
                            />
                        }
                    >
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive" onClick={() => setDeleteOpen(true)}>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DeleteTargetAlert target={target} open={deleteOpen} onOpenChange={setDeleteOpen} />
        </>
    );
};
