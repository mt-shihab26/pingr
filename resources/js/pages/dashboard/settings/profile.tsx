import { useShared } from "@/hooks/use-shared";

import { Form } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import { Heading } from "@/components/elements/heading";
import { InputError } from "@/components/elements/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { DeleteUser } from "@/components/screens/dashboard/settings/delete-user";
import { SettingsLayout } from "@/components/screens/dashboard/settings/settings-layout";

export default function Profile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { user } = useShared();

    return (
        <SettingsLayout
            title="Profile settings"
            breadcrumbs={[
                {
                    title: "Profile settings",
                    href: route("dashboard.settings.profile.edit"),
                },
            ]}
        >
            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Profile"
                    description="Update your name and email address"
                />

                <Form
                    action={route("dashboard.settings.profile.update")}
                    method="patch"
                    options={{
                        preserveScroll: true,
                    }}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>

                                <Input
                                    id="name"
                                    className="mt-1 block w-full"
                                    defaultValue={user.name}
                                    name="name"
                                    required
                                    autoComplete="name"
                                    placeholder="Full name"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.name}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>

                                <Input
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full"
                                    defaultValue={user.email}
                                    name="email"
                                    required
                                    autoComplete="username"
                                    placeholder="Email address"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.email}
                                />
                            </div>

                            {mustVerifyEmail &&
                                user.email_verified_at === null && (
                                    <div>
                                        <p className="-mt-4 text-sm text-muted-foreground">
                                            Your email address is unverified.{" "}
                                            <Link
                                                href={route(
                                                    "verification.send",
                                                )}
                                                as="button"
                                                className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                            >
                                                Click here to re-send the
                                                verification email.
                                            </Link>
                                        </p>

                                        {status ===
                                            "verification-link-sent" && (
                                            <div className="mt-2 text-sm font-medium text-green-600">
                                                A new verification link has been
                                                sent to your email address.
                                            </div>
                                        )}
                                    </div>
                                )}

                            <div className="flex items-center gap-4">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    data-test="update-profile-button"
                                >
                                    Save
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>

            <DeleteUser />
        </SettingsLayout>
    );
}
