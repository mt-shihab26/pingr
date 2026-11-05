import type { DragEvent } from "react";

import { useId, useState } from "react";
import { Upload } from "lucide-react";

import { cn } from "cn";

export const FileDrop = ({ accept }: { accept: string }) => {
    const id = useId();
    const [file, setFile] = useState<string>();
    const [dragging, setDragging] = useState(false);

    const onDrop = (event: DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setDragging(false);
        setFile(event.dataTransfer.files[0]?.name);
    };

    return (
        <label
            htmlFor={id}
            onDragOver={(event) => {
                event.preventDefault();
                setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className={cn(
                "flex cursor-pointer flex-col items-center justify-center gap-2 border border-dashed bg-muted/30 px-4 py-8 text-center text-muted-foreground transition-colors hover:bg-muted/50",
                dragging && "border-primary bg-muted/50",
            )}
        >
            <Upload className="size-4" />
            {file ? (
                <span className="text-foreground">{file}</span>
            ) : (
                <span>
                    Drag and drop a file or{" "}
                    <span className="text-foreground underline">browse your filesystem</span>
                </span>
            )}
            <input
                id={id}
                type="file"
                accept={accept}
                className="sr-only"
                onChange={(event) => setFile(event.target.files?.[0]?.name)}
            />
        </label>
    );
};
