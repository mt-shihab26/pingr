import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";

import { ShowLayout } from "@/components/screens/dashboard/targets/show/shared/show-layout";

const CertificateHealthShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            title="Certificate health"
            breadcrumbs={[
                {
                    title: "Certificate health",
                    href: route("dashboard.targets.show.certificate-health", { team, target }),
                },
            ]}
        />
    );
};

export default CertificateHealthShowPage;
