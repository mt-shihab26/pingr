import type { TUser, TTeam } from "./models";

declare module "react" {
    interface InputHTMLAttributes<T> {
        passwordrules?: string;
    }
}

declare module "@inertiajs/core" {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: {
                user: TUser;
            };
            sidebarOpen: boolean;
            currentTeam: TTeam | null;
            teams: TTeam[];
            [key: string]: unknown;
        };
    }
}
