import { Link, router } from "@inertiajs/react";
import type { LucideIcon } from "lucide-react";
import { LogOut, Monitor, Moon, Settings, Sun, SunMoon, Users } from "lucide-react";
import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { UserInfo } from "./user-info";
import type { TAppearance } from "@/hooks/use-appearance";
import { useAppearance } from "@/hooks/use-appearance";
import { useMobileNavigation } from "@/hooks/use-mobile-navigation";
import type { TUser } from "@/types/models";

const themes: { value: TAppearance; icon: LucideIcon; label: string }[] = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
    { value: "system", icon: Monitor, label: "System" },
];

type Props = {
    user: TUser;
};

export function UserMenuContent({ user }: Props) {
    const cleanup = useMobileNavigation();
    const { appearance, updateAppearance } = useAppearance();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
        router.post(route("logout"));
    };

    return (
        <>
            <DropdownMenuGroup>
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <UserInfo user={user} showEmail={true} />
                    </div>
                </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
                render={
                    <Link
                        className="w-full cursor-pointer"
                        href={route("dashboard.teams.index")}
                        onClick={cleanup}
                    >
                        <Users />
                        Teams
                    </Link>
                }
            />
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem
                    render={
                        <Link
                            className="w-full cursor-pointer"
                            href={route("dashboard.settings.profile.edit")}
                            prefetch
                            onClick={cleanup}
                        >
                            <Settings />
                            Settings
                        </Link>
                    }
                />
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
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} data-test="logout-button">
                <LogOut />
                Log out
            </DropdownMenuItem>
        </>
    );
}
