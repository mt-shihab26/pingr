import { SidebarInset } from "@/components/ui/sidebar";

type AppVariant = "header" | "sidebar";

type Props = React.ComponentProps<"main"> & {
    variant?: AppVariant;
};

export function AppContent({ variant = "sidebar", children, ...props }: Props) {
    if (variant === "sidebar") {
        return <SidebarInset {...props}>{children}</SidebarInset>;
    }

    return (
        <main
            className="flex h-full w-full max-w-7xl flex-1 flex-col gap-4 self-center rounded-xl"
            {...props}
        >
            {children}
        </main>
    );
}
