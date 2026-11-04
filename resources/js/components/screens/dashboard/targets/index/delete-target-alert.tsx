import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";

import type { TTarget } from "@/types/models";

import { useState } from "react";
import { router } from "@inertiajs/react";
import { useShared } from "@/hooks/use-shared";

export const DeleteTargetAlert = ({
    target,
    open,
    onOpenChange,
}: {
    target: TTarget;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) => {
    const { team } = useShared();

    const [processing, setProcessing] = useState(false);

    const destroy = () => {
        if (processing) return;

        router.delete(route("dashboard.targets.destroy", { team, target: target.id }), {
            preserveScroll: true,
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
            onSuccess: () => onOpenChange(false),
        });
    };

    return (
        <AlertDialog
            open={open}
            onOpenChange={(nextOpen) => {
                if (!processing) onOpenChange(nextOpen);
            }}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete target?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete{" "}
                        <strong>{target.label ?? target.endpoint}</strong>? This action cannot be
                        undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={processing}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        variant="destructive"
                        disabled={processing}
                        onClick={destroy}
                    >
                        {processing ? "Deleting…" : "Delete target"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
