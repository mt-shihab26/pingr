import { route } from "ziggy-js";

export const initializeSsrRoute = (props: Record<string, unknown>): void => {
    const ziggy = props.ziggy as Parameters<typeof route>[3];

    globalThis.route = ((
        name: Parameters<typeof route>[0],
        params?: Parameters<typeof route>[1],
        absolute?: boolean,
    ) => route(name, params, absolute, ziggy)) as typeof route;
};

// Allow clipboard access in Inertia's development error modal.
export const initializeInertiaErrorModal = (): void => {
    if (!import.meta.env.DEV || typeof window === "undefined") {
        return;
    }

    const observer = new MutationObserver(() => {
        const iframe = document.querySelector<HTMLIFrameElement>(
            "#inertia-error-dialog iframe",
        );

        if (iframe && iframe.getAttribute("sandbox") === "allow-scripts") {
            const content = iframe.srcdoc;
            iframe.setAttribute("sandbox", "allow-scripts allow-same-origin");
            iframe.srcdoc = content;
        }
    });

    observer.observe(document.body, { childList: true });
};
