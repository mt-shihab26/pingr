import { cn } from "cn";

export const Heading = ({
    title,
    description,
    variant = "default",
    required,
}: {
    title: string;
    description?: string;
    variant?: "default" | "small";
    required?: boolean;
}) => {
    return (
        <header className="flex flex-col gap-0.5">
            <h2
                className={cn(
                    "flex items-center gap-1",
                    variant === "small"
                        ? "text-base font-medium"
                        : "text-xl font-semibold tracking-tight",
                )}
            >
                {title}
                {required && (
                    <span aria-hidden="true" className="text-destructive">
                        *
                    </span>
                )}
            </h2>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </header>
    );
};
