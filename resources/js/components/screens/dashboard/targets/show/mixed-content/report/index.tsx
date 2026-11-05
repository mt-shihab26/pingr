import { ApiTipCard } from "@/components/screens/dashboard/targets/show/shared/api-tip-card";

import { StatusAlert } from "./status-alert";
import { CrawledUrlsCard } from "./crawled-urls-card";

const urls = [
    "https://developershihab.com/",
    "/_astro/_slug_.DThAlv0a.css",
    "/_astro/avatar.BqGkp-RD_Z12jOpN.png",
    "/articles",
    "/articles/boiti-niye-amar-kotha",
    "/articles/competitive-programming",
    "/articles/hosting-web-application-for-the-web",
    "/articles/inversion-of-control-principle",
    "/articles/kivabe-c-programming-shikhbo",
    "/articles/notunder-jonno-somossa-somadhan",
    "/articles/oop-in-practice",
    "/articles/series/backend-journey",
    "/articles/series/programming-journey",
    "/articles/categories/backend",
    "/articles/categories/programming",
    "/articles/categories/review",
    "/projects",
    "/projects/tic-tac-toe",
    "/about",
    "/contact",
];

export const Report = () => {
    return (
        <div className="flex flex-col gap-4">
            <StatusAlert pages={urls.length} />
            <CrawledUrlsCard urls={urls} />
            <ApiTipCard checkId="1253049" subject="mixed content" />
        </div>
    );
};
