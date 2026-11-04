import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from "@/components/ui/input-group";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

import { SettingsSection } from "./settings-section";
import { SimpleSelect } from "./simple-select";

const verbs = ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE"].map((verb) => ({
    value: verb,
    label: verb,
}));

export const RequestsSection = () => {
    return (
        <SettingsSection
            title="Requests"
            description="These settings determine how we send a request to your site."
        >
            <Tabs defaultValue="verb">
                <TabsList variant="line">
                    <TabsTrigger value="verb">Verb</TabsTrigger>
                    <TabsTrigger value="headers">Headers</TabsTrigger>
                    <TabsTrigger value="payload">Payload</TabsTrigger>
                    <TabsTrigger value="timeout">Timeout</TabsTrigger>
                    <TabsTrigger value="redirects">Redirects</TabsTrigger>
                </TabsList>
                <TabsContent value="verb" className="pt-2">
                    <Field>
                        <FieldLabel>HTTP verb/method</FieldLabel>
                        <SimpleSelect items={verbs} defaultValue="GET" />
                        <FieldDescription>Which HTTP request method to use.</FieldDescription>
                    </Field>
                </TabsContent>
                <TabsContent value="headers" className="pt-2">
                    <Field>
                        <FieldLabel>Request headers</FieldLabel>
                        <Textarea placeholder="Authorization: Bearer token" />
                        <FieldDescription>One header per line.</FieldDescription>
                    </Field>
                </TabsContent>
                <TabsContent value="payload" className="pt-2">
                    <Field>
                        <FieldLabel>Request payload</FieldLabel>
                        <Textarea placeholder='{"key": "value"}' />
                        <FieldDescription>
                            Sent as the request body for POST, PUT and PATCH.
                        </FieldDescription>
                    </Field>
                </TabsContent>
                <TabsContent value="timeout" className="pt-2">
                    <Field>
                        <FieldLabel>Timeout</FieldLabel>
                        <InputGroup>
                            <InputGroupInput type="number" defaultValue={5} />
                            <InputGroupAddon align="inline-end">
                                <InputGroupText>seconds</InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                        <FieldDescription>How long we wait for a response.</FieldDescription>
                    </Field>
                </TabsContent>
                <TabsContent value="redirects" className="pt-2">
                    <Field orientation="horizontal">
                        <Switch defaultChecked />
                        <FieldLabel>Follow redirects</FieldLabel>
                    </Field>
                </TabsContent>
            </Tabs>
        </SettingsSection>
    );
};
