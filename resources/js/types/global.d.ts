import type { route as routeFn } from "ziggy-js";
import type { TUser, TTeam } from "./models";

declare global {
    var route: typeof routeFn;
}

declare module "react" {
    interface InputHTMLAttributes<T> {
        passwordrules?: string;
    }
}

declare module "@inertiajs/core" {
    export interface InertiaConfig {
        sharedPageProps: {
            shared: {
                name: string;
                user: TUser;
                sidebar: boolean;
                team: TTeam | null;
                teams: TTeam[];
            };
        };
    }
}
