import {
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

import type { LucideIcon } from "lucide-react";
import type { TAppearance } from "@/hooks/use-appearance";

import { useAppearance } from "@/hooks/use-appearance";

import { Monitor, Moon, Sun, SunMoon } from "lucide-react";

const themes: { value: TAppearance; icon: LucideIcon; label: string }[] = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
    { value: "system", icon: Monitor, label: "System" },
];

export const ThemeSelector = () => {
    const { appearance, updateAppearance } = useAppearance();

    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger>
                <SunMoon />
                Theme
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={appearance}>
                    {themes.map(({ value, icon: Icon, label }) => (
                        <DropdownMenuRadioItem
                            key={value}
                            value={value}
                            onClick={() => updateAppearance(value)}
                        >
                            <Icon />
                            {label}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
        </DropdownMenuSub>
    );
};
