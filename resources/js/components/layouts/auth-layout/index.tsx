import { AuthSimpleLayout } from "./auth-simple-layout";

export function AuthLayout({
    title = "",
    description = "",
    children,
}: {
    title?: string;
    description?: string;
    children: React.ReactNode;
}) {
    return (
        <AuthSimpleLayout title={title} description={description}>
            {children}
        </AuthSimpleLayout>
    );
}
