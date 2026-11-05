import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";

import { SettingsSection } from "@/components/screens/dashboard/targets/show/uptime/settings/settings-section";
import { SimpleSelect } from "@/components/screens/dashboard/targets/show/uptime/settings/simple-select";

const teams = [
    { value: "none", label: "Select a team..." },
    { value: "personal", label: "Personal team" },
    { value: "agency", label: "Agency team" },
];

export const MoveTeamSection = () => (
    <SettingsSection
        title="Move to another team"
        description="Move this monitor to one of your other teams."
        save={false}
    >
        <FieldGroup>
            <Field>
                <FieldLabel>Team</FieldLabel>
                <SimpleSelect items={teams} defaultValue="none" />
                <FieldDescription>
                    All of this monitor's checks, reports and history move with it. You need to be
                    an owner or admin of both this team and the destination team.
                </FieldDescription>
            </Field>
            <Button variant="destructive" className="w-fit">
                Move monitor
            </Button>
        </FieldGroup>
    </SettingsSection>
);

export const DangerZoneSection = ({ endpoint }: { endpoint: string }) => (
    <SettingsSection
        title="Danger zone"
        description="Permanently delete this monitor."
        save={false}
    >
        <FieldGroup>
            <FieldDescription>
                Once a monitor is deleted, all of its checks, reports and historical data are
                permanently removed. This cannot be undone.
            </FieldDescription>
            <AlertDialog>
                <AlertDialogTrigger
                    render={
                        <Button variant="destructive" className="w-fit">
                            Delete monitor
                        </Button>
                    }
                />
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete {endpoint}?</AlertDialogTitle>
                        <AlertDialogDescription>
                            All checks, reports and historical data for this monitor will be
                            permanently removed. This cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction variant="destructive">Delete monitor</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </FieldGroup>
    </SettingsSection>
);
