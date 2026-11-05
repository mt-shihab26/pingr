import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";

import { ShowLayout } from "@/components/screens/dashboard/targets/show/shared/show-layout";
import { ApiSection } from "@/components/screens/dashboard/targets/show/uptime/settings/api-section";

import { GeneralSection } from "@/components/screens/dashboard/targets/show/settings/general-section";
import { ChecksSection } from "@/components/screens/dashboard/targets/show/settings/checks-section";
import { TagsSection } from "@/components/screens/dashboard/targets/show/settings/tags-section";
import {
    GroupingSection,
    NotesSection,
    ServerDetailsSection,
} from "@/components/screens/dashboard/targets/show/settings/simple-sections";
import {
    DangerZoneSection,
    MoveTeamSection,
} from "@/components/screens/dashboard/targets/show/settings/danger-sections";

const SettingsShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            title="Settings"
            breadcrumbs={[
                {
                    title: "Settings",
                    href: route("dashboard.targets.show.settings", { team, target }),
                },
            ]}
        >
            <div className="flex flex-col gap-4">
                <GeneralSection target={target} />
                <GroupingSection />
                <ChecksSection target={target} />
                <TagsSection />
                <ServerDetailsSection />
                <NotesSection />
                <ApiSection targetId={target.id} />
                <MoveTeamSection />
                <DangerZoneSection endpoint={target.label ?? target.endpoint} />
            </div>
        </ShowLayout>
    );
};

export default SettingsShowPage;
