import { FieldGroup } from "@/components/ui/field";

import { CopyField } from "./copy-field";
import { SettingsSection } from "./settings-section";

export const ApiSection = ({ targetId }: { targetId: string }) => {
    return (
        <SettingsSection
            title="API"
            description="Whenever an integration asks for a check ID, you'll need to provide this value."
            save={false}
        >
            <FieldGroup>
                <CopyField
                    label="Target ID"
                    value={targetId}
                    description="Use this target ID to fetch information around the target this check belongs to."
                />
            </FieldGroup>
        </SettingsSection>
    );
};
