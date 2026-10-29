import { Link, router } from "@inertiajs/react";
import { LogOut, Settings, Users } from "lucide-react";
import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { UserInfo } from "./user-info";
import { useMobileNavigation } from "@/hooks/use-mobile-navigation";
import type { TUser } from "@/types/models";

type Props = {
    user: TUser;
};

export function UserMenuContent({ user }: Props) {
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
                        className="block w-full cursor-pointer"
                        href={route("dashboard.teams.index")}
                        onClick={cleanup}
                    >
                        <Users className="mr-2" />
                        Switch team
                    </Link>
                }
            />
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem
                    render={
                        <Link
                            className="block w-full cursor-pointer"
                            href={route("dashboard.settings.profile.edit")}
                            prefetch
                            onClick={cleanup}
                        >
                            <Settings className="mr-2" />
                            Settings
                        </Link>
                    }
                />
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
                onClick={handleLogout}
                data-test="logout-button"
            >
                <LogOut className="mr-2" />
                Log out
            </DropdownMenuItem>
        </>
    );
}
