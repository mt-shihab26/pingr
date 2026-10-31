import { useShared } from "@/hooks/use-shared";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export function useSessionFlashToast(): void {
    const { flash } = useShared();
    const lastFlash = useRef<typeof flash | null>(null);

    useEffect(() => {
        if (!flash || lastFlash.current === flash) {
            return;
        }

        lastFlash.current = flash;

        for (const type of ["success", "error", "warning", "info"] as const) {
            const message = flash[type];

            if (typeof message === "string" && message.length > 0) {
                toast[type](message);
            }
        }
    }, [flash]);
}
