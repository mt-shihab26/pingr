import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

import { SettingsSection } from "./settings-section";

export const ResponsesSection = () => {
    return (
        <SettingsSection
            title="Responses"
            description="These settings determine how we interpret a response from your site."
        >
            <Tabs defaultValue="status-codes">
                <TabsList variant="line">
                    <TabsTrigger value="status-codes">Status Codes</TabsTrigger>
                    <TabsTrigger value="verify-text">Verify Text</TabsTrigger>
                    <TabsTrigger value="headers">Headers</TabsTrigger>
                    <TabsTrigger value="body-assertions">Body Assertions</TabsTrigger>
                </TabsList>
                <TabsContent value="status-codes" className="pt-2">
                    <Field>
                        <FieldLabel>Expected response status codes</FieldLabel>
                        <Input defaultValue="2*" />
                        <FieldDescription>
                            If the response of your server, after following redirects, has one of
                            these status codes, we'll consider your site as up. You can specify a
                            comma-separated list and use wildcards. '2*' means everything in the 200
                            range.
                        </FieldDescription>
                    </Field>
                </TabsContent>
                <TabsContent value="verify-text" className="pt-2">
                    <Field>
                        <FieldLabel>Text that should be on the page</FieldLabel>
                        <Input placeholder="Welcome" />
                        <FieldDescription>
                            We'll mark your site as down when this text is missing.
                        </FieldDescription>
                    </Field>
                </TabsContent>
                <TabsContent value="headers" className="pt-2">
                    <Field>
                        <FieldLabel>Expected response headers</FieldLabel>
                        <Textarea placeholder="Content-Type: text/html" />
                        <FieldDescription>One header per line.</FieldDescription>
                    </Field>
                </TabsContent>
                <TabsContent value="body-assertions" className="pt-2">
                    <Field>
                        <FieldLabel>Body assertions</FieldLabel>
                        <Textarea placeholder="$.status == 'ok'" />
                        <FieldDescription>One assertion per line.</FieldDescription>
                    </Field>
                </TabsContent>
            </Tabs>
        </SettingsSection>
    );
};
