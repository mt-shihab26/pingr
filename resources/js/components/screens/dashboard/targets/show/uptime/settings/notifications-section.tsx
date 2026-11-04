import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from "@/components/ui/input-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { SettingsSection } from "./settings-section";

export const NotificationsSection = () => {
    return (
        <SettingsSection
            title="Notifications"
            description="Customize when notifications should be sent."
        >
            <Tabs defaultValue="downtime">
                <TabsList variant="line">
                    <TabsTrigger value="downtime">Downtime</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                </TabsList>
                <TabsContent value="downtime" className="pt-2">
                    <Field>
                        <FieldLabel>Minutes downtime before notification</FieldLabel>
                        <InputGroup>
                            <InputGroupInput type="number" defaultValue={2} min={1} />
                            <InputGroupAddon align="inline-end">
                                <InputGroupText>minutes</InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                        <FieldDescription>
                            The amount of time your site needs to be down for before we alert you.
                        </FieldDescription>
                    </Field>
                </TabsContent>
                <TabsContent value="performance" className="pt-2">
                    <Field>
                        <FieldLabel>Response time threshold</FieldLabel>
                        <InputGroup>
                            <InputGroupInput type="number" defaultValue={1000} min={1} />
                            <InputGroupAddon align="inline-end">
                                <InputGroupText>ms</InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                        <FieldDescription>
                            We'll alert you when responses are slower than this.
                        </FieldDescription>
                    </Field>
                </TabsContent>
            </Tabs>
        </SettingsSection>
    );
};
