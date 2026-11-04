import type { TTarget } from "@/types/models";

import { useShared } from "@/hooks/use-shared";

import { ShowLayout } from "@/components/screens/dashboard/targets/show/shared/show-layout";

const SitemapShowPage = ({ target }: { target: TTarget }) => {
    const { team } = useShared();

    return (
        <ShowLayout
            target={target}
            title="Sitemap"
            breadcrumbs={[
                {
                    title: "Sitemap",
                    href: route("dashboard.targets.show.sitemap", { team, target }),
                },
            ]}
        />
    );
};

export default SitemapShowPage;
