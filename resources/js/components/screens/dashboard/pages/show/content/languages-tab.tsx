import { Fragment, useState } from "react";

import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import { SettingsSection } from "@/components/screens/dashboard/targets/show/uptime/settings/settings-section";

const languages = [
    "Bulgarian",
    "Croatian",
    "Czech",
    "Danish",
    "Dutch",
    "English",
    "Estonian",
    "Finnish",
    "French",
    "German",
    "Greek",
    "Hungarian",
    "Irish",
    "Italian",
    "Japanese",
    "Latvian",
    "Lithuanian",
    "Maltese",
    "Polish",
    "Portuguese",
    "Romanian",
    "Slovak",
    "Slovene",
    "Spanish",
    "Swedish",
];

export const LanguagesTab = () => {
    const [supported, setSupported] = useState(["English"]);
    const [defaultLanguage, setDefaultLanguage] = useState("English");

    const options = supported.map((language) => ({ value: language, label: language }));

    const toggle = (language: string, enabled: boolean) => {
        const next = enabled
            ? [...supported, language]
            : supported.filter((item) => item !== language);

        if (next.length === 0) return;

        setSupported(next);
        if (!next.includes(defaultLanguage)) setDefaultLanguage(next[0]);
    };

    return (
        <div className="flex flex-col gap-4">
            <SettingsSection
                title="Default language"
                description="The language your status page uses by default."
            >
                <Field>
                    <FieldLabel>Default language</FieldLabel>
                    <Select
                        items={options}
                        value={defaultLanguage}
                        onValueChange={(value) => setDefaultLanguage(value as string)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FieldDescription>
                        Only supported languages can be the default.
                    </FieldDescription>
                </Field>
            </SettingsSection>
            <SettingsSection
                title="Supported languages"
                description="When more than one language is active, your status page shows a dropdown so visitors can switch between them."
            >
                <FieldGroup className="gap-2">
                    {languages.map((language, index) => {
                        const id = `language-${language.toLowerCase()}`;
                        const checked = supported.includes(language);

                        return (
                            <Fragment key={language}>
                                {index > 0 && <FieldSeparator />}
                                <Field orientation="horizontal" className="justify-between">
                                    <FieldLabel htmlFor={id} className="font-normal">
                                        {language}
                                    </FieldLabel>
                                    <Switch
                                        id={id}
                                        checked={checked}
                                        disabled={checked && supported.length === 1}
                                        onCheckedChange={(enabled) => toggle(language, enabled)}
                                    />
                                </Field>
                            </Fragment>
                        );
                    })}
                </FieldGroup>
            </SettingsSection>
        </div>
    );
};
