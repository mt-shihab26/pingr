import { createInertiaApp } from "@inertiajs/react";
import { initializeTheme } from "@/hooks/use-appearance";
import { route } from "ziggy-js";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { APP_NAME } from "./lib/env";

const appName = APP_NAME;

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    strictMode: true,
    withApp(app, { ssr, page }) {
        if (ssr) {
            const ziggy = (page.props as Record<string, unknown>)
                .ziggy as Parameters<typeof route>[3];
            globalThis.route = ((
                name: Parameters<typeof route>[0],
                params?: Parameters<typeof route>[1],
                absolute?: boolean,
            ) => route(name, params, absolute, ziggy)) as typeof route;
        }
        return (
            <TooltipProvider delay={0}>
                {app}
                <Toaster />
            </TooltipProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});

initializeTheme();
