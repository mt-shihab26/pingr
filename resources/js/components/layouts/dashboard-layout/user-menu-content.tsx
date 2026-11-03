import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import type { TUser } from "@/types/models";

import { router } from "@inertiajs/react";
import { useMobileNavigation } from "@/hooks/use-mobile-navigation";

import { Link } from "@inertiajs/react";
import { LogOut, Settings, Users } from "lucide-react";
import { UserInfo } from "./user-info";
import { ThemeSelector } from "./theme-selector";

export const UserMenuContent = ({ user }: { user: TUser }) => {
    const cleanup = useMobileNavigation();

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
                <ThemeSelector />
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} data-test="logout-button">
                <LogOut />
                Log out
            </DropdownMenuItem>
        </>
    );
};
