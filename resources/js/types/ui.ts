import type { ReactNode } from "react";
import type { TBreadcrumb } from "@/types/navigation";

export type FlashToast = {
    type: "success" | "info" | "warning" | "error";
    message: string;
};

export type AuthLayoutProps = {
    children?: ReactNode;
    name?: string;
    title?: string;
    description?: string;
};
