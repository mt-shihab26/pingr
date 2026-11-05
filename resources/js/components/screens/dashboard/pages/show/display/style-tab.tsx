import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { SimpleSelect } from "@/components/screens/dashboard/targets/show/uptime/settings/simple-select";

type TPalette = Record<string, string>;

const colorLabels: Record<string, string> = {
    headerBackground: "Header background",
    headerText: "Header text",
    headerBorder: "Header border",
    background: "Background",
    text: "Text",
    secondaryText: "Secondary text",
    buttonBackground: "Button background",
    buttonBorder: "Button border",
    buttonText: "Button text",
    ok: "OK",
    warning: "Warning",
    danger: "Danger",
};

const defaults: Record<"light" | "dark", TPalette> = {
    light: {
        headerBackground: "#ffffff",
        headerText: "#a0aec0",
        headerBorder: "#e2e8f0",
        background: "#ffffff",
        text: "#333333",
        secondaryText: "#7e7e7e",
        buttonBackground: "#ffffff",
        buttonBorder: "#ffffff",
        buttonText: "#a0aec0",
        ok: "#33d4a0",
        warning: "#fde047",
        danger: "#f87171",
    },
    dark: {
        headerBackground: "#191919",
        headerText: "#e2e2e2",
        headerBorder: "#2f2f30",
        background: "#191919",
        text: "#e2e2e2",
        secondaryText: "#e2e2e2",
        buttonBackground: "#191919",
        buttonBorder: "#f1f7fd",
        buttonText: "#e2e2e2",
        ok: "#33d4a0",
        warning: "#fde047",
        danger: "#f87171",
    },
};

const themes = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "auto", label: "Follow the visitor's system" },
];

const widths = [
    { value: "narrow", label: "Narrow" },
    { value: "wide", label: "Wide" },
];

const ColorGrid = ({
    mode,
    palette,
    onChange,
}: {
    mode: string;
    palette: TPalette;
    onChange: (key: string, value: string) => void;
}) => (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(palette).map(([key, value]) => {
            const id = `${mode}-${key}`;

            return (
                <Field key={key}>
                    <FieldLabel htmlFor={id} className="font-normal">
                        {colorLabels[key]}
                    </FieldLabel>
                    <div className="flex gap-2">
                        <Input
                            id={id}
                            type="color"
                            value={value}
                            onChange={(event) => onChange(key, event.target.value)}
                            className="w-12 shrink-0 p-1"
                        />
                        <Input
                            aria-label={`${colorLabels[key]} hex value`}
                            value={value}
                            onChange={(event) => onChange(key, event.target.value)}
                            className="font-mono"
                        />
                    </div>
                </Field>
            );
        })}
    </div>
);

export const StyleTab = () => {
    const [palettes, setPalettes] = useState(defaults);

    const update = (mode: "light" | "dark") => (key: string, value: string) =>
        setPalettes({ ...palettes, [mode]: { ...palettes[mode], [key]: value } });

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Style</CardTitle>
                <CardDescription>
                    Choose a theme for your status page and customize its colors.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <FieldGroup>
                    <Field>
                        <FieldLabel>Theme</FieldLabel>
                        <SimpleSelect items={themes} defaultValue="light" />
                    </Field>
                    <FieldSeparator />
                    <div className="grid gap-4 sm:grid-cols-3">
                        <Field>
                            <FieldLabel htmlFor="header-border-width">
                                Header border width (px)
                            </FieldLabel>
                            <Input
                                id="header-border-width"
                                type="number"
                                min={0}
                                defaultValue={1}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="border-radius">Border radius (px)</FieldLabel>
                            <Input id="border-radius" type="number" min={0} defaultValue={4} />
                        </Field>
                        <Field>
                            <FieldLabel>Header width</FieldLabel>
                            <SimpleSelect items={widths} defaultValue="wide" />
                        </Field>
                    </div>
                    <FieldSeparator />
                    <h3 className="font-medium">Light mode</h3>
                    <ColorGrid mode="light" palette={palettes.light} onChange={update("light")} />
                    <FieldSeparator />
                    <h3 className="font-medium">Dark mode</h3>
                    <ColorGrid mode="dark" palette={palettes.dark} onChange={update("dark")} />
                </FieldGroup>
            </CardContent>
            <CardFooter className="gap-2">
                <Button>Save</Button>
                <Button variant="outline" onClick={() => setPalettes(defaults)}>
                    Reset
                </Button>
            </CardFooter>
        </Card>
    );
};
