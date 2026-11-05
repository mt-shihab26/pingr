import type { KeyboardEvent } from "react";

import { useState } from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { SettingsSection } from "@/components/screens/dashboard/targets/show/uptime/settings/settings-section";

export const TagsSection = () => {
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== "Enter" && event.key !== ",") return;

        event.preventDefault();
        const value = tag.trim();

        if (value && !tags.includes(value)) setTags([...tags, value]);
        setTag("");
    };

    return (
        <SettingsSection
            title="Tags"
            description="We'll display these tags across our UI and will send them along when requesting sites via the API."
        >
            <Field>
                <FieldLabel htmlFor="tags">Tags</FieldLabel>
                <Input
                    id="tags"
                    placeholder="production, client-a"
                    value={tag}
                    onChange={(event) => setTag(event.target.value)}
                    onKeyDown={onKeyDown}
                />
                <FieldDescription>Press enter or comma to add a tag.</FieldDescription>
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {tags.map((item) => (
                            <Badge key={item} variant="secondary">
                                {item}
                                <button
                                    type="button"
                                    aria-label={`Remove ${item}`}
                                    onClick={() => setTags(tags.filter((t) => t !== item))}
                                >
                                    <X />
                                </button>
                            </Badge>
                        ))}
                    </div>
                )}
            </Field>
        </SettingsSection>
    );
};
