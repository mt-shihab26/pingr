import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FieldDescription, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { SettingsSection } from "@/components/screens/dashboard/targets/show/uptime/settings/settings-section";

export const RequestHeadersSection = ({ endpoint }: { endpoint: string }) => {
    const [headers, setHeaders] = useState<number[]>([]);

    return (
        <SettingsSection
            title="Request headers"
            description={`These headers will be sent with every HTTP request made by broken links, mixed content and sitemap crawlers to ${endpoint}.`}
        >
            <FieldGroup className="gap-2">
                <FieldDescription>
                    We can add extra headers to requests to your site.
                </FieldDescription>
                {headers.map((id) => (
                    <div key={id} className="flex gap-2">
                        <Input placeholder="Name" aria-label="Header name" />
                        <Input placeholder="Value" aria-label="Header value" />
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Remove header"
                            onClick={() => setHeaders(headers.filter((header) => header !== id))}
                        >
                            <Trash2 />
                        </Button>
                    </div>
                ))}
                <Button
                    variant="outline"
                    size="sm"
                    className="w-fit"
                    onClick={() => setHeaders([...headers, Date.now()])}
                >
                    <Plus data-icon="inline-start" />
                    {headers.length ? "Add header" : "Add a first header"}
                </Button>
            </FieldGroup>
        </SettingsSection>
    );
};
