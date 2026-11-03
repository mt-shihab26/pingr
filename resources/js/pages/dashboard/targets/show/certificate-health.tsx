import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";

import { Heading } from "@/components/elements/heading";
import { ShowLayout } from "@/components/screens/dashboard/targets/show/show-layout";

const CertificateHealthShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            breadcrumbs={[
                {
                    title: "Certificate health",
                    href: route("dashboard.targets.show.certificate-health", { team, target }),
                },
            ]}
        >
            <Heading title="Certificate health" />
        </ShowLayout>
    );
};

export default CertificateHealthShowPage;
