import type { LucideIcon } from "lucide-react";
import type { TAppearance } from "@/hooks/use-appearance";

import { useAppearance } from "@/hooks/use-appearance";

import { Monitor, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const themes: { value: TAppearance; icon: LucideIcon; label: string }[] = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
    { value: "system", icon: Monitor, label: "System" },
];

export const ThemeSwitcher = () => {
    const { appearance, resolvedAppearance, updateAppearance } = useAppearance();

    const TriggerIcon = resolvedAppearance === "dark" ? Moon : Sun;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button variant="ghost" size="icon" className="group h-9 w-9 cursor-pointer">
                        <TriggerIcon className="size-5! opacity-80 group-hover:opacity-100" />
                        <span className="sr-only">Theme</span>
                    </Button>
                }
            />
            <DropdownMenuContent className="w-36" align="end">
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
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
