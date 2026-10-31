import type { ReactNode } from "react";

import { createInertiaApp } from "@inertiajs/react";
import { initializeTheme } from "@/hooks/use-appearance";
import { initializeSsrRoute, initializeInertiaErrorModal } from "@/lib/inertia";
import { useSessionFlashToast } from "@/hooks/use-session-flash-toast";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { APP_NAME } from "./lib/env";

const Layout = ({ children }: { children: ReactNode }) => {
    useSessionFlashToast();

    return (
        <TooltipProvider delay={0}>
            {children}
            <Toaster />
        </TooltipProvider>
    );
};

void createInertiaApp({
    layout: () => Layout,
    title: (title) => (title ? `${title} - ${APP_NAME}` : APP_NAME),
    strictMode: true,
    withApp(app, { ssr, page }) {
        if (ssr) initializeSsrRoute(page.props);
        return app;
    },
    progress: {
        color: "#4B5563",
    },
});

initializeTheme();
initializeInertiaErrorModal();
