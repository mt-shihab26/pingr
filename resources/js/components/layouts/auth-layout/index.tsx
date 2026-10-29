import { AuthSimpleLayout } from "./auth-simple-layout";
import { Head } from "@inertiajs/react";

export function AuthLayout({
    title,
    description = "",
    children,
}: {
    title: string;
    description?: string;
    children: React.ReactNode;
}) {
    return (
        <AuthSimpleLayout title={title} description={description}>
            <Head title={title} />
            {children}
        </AuthSimpleLayout>
    );
}
