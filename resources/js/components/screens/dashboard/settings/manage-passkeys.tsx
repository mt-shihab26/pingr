import { router } from "@inertiajs/react";
import { KeyRound } from "lucide-react";
import { Heading } from "@/components/elements/heading";
import { PasskeyItem, type TPasskey } from "@/components/screens/dashboard/settings/passkey-item";
import { PasskeyRegistration } from "@/components/screens/dashboard/settings/passkey-register";

export type Props = {
    canManagePasskeys?: boolean;
    passkeys?: TPasskey[];
};

const EmptyState = () => {
    return (
        <div className="flex flex-col items-center gap-4 p-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
                <KeyRound className="h-7 w-7 text-muted-foreground" />
            </div>
            <div className="flex flex-col gap-1">
                <p className="font-medium">No passkeys yet</p>
                <p className="text-sm text-muted-foreground">
                    Add a passkey to sign in without a password
                </p>
            </div>
        </div>
    );
};

export function ManagePasskeys(props: Props) {
    const passkeys = props.passkeys ?? [];

    const handleDelete = (id: number, onError: () => void) => {
        router.delete(route("passkey.destroy", { passkey: id }), {
            preserveScroll: true,
            onError,
        });
    };

    const handleRegisterSuccess = () => {
        router.reload();
    };

    if (!(props.canManagePasskeys ?? false)) {
        return null;
    }

    return (
        <div className="space-y-6">
            <Heading
                variant="small"
                title="Passkeys"
                description="Manage your passkeys for passwordless sign-in"
            />

            <div className="overflow-hidden rounded-lg border border-border">
                {passkeys.length > 0 ? (
                    passkeys.map((passkey) => (
                        <PasskeyItem key={passkey.id} passkey={passkey} onDelete={handleDelete} />
                    ))
                ) : (
                    <EmptyState />
                )}
            </div>

            <PasskeyRegistration onSuccess={handleRegisterSuccess} />
        </div>
    );
}
