import { Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { Fragment } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { TBreadcrumb } from "@/types/utils";

export function Breadcrumbs({ breadcrumbs }: { breadcrumbs: TBreadcrumb[] }) {
    return (
        <>
            {breadcrumbs.length > 0 && (
                <Breadcrumb>
                    <BreadcrumbList>
                        {breadcrumbs.map((item, index) => {
                            const isLast = index === breadcrumbs.length - 1;

                            return (
                                <Fragment key={index}>
                                    <BreadcrumbItem>
                                        {item.type === "back" ? (
                                            <BreadcrumbLink
                                                render={
                                                    <Link
                                                        href={item.href}
                                                        className="inline-flex items-center gap-2"
                                                    >
                                                        <ArrowLeft className="size-4" />
                                                        {item.title}
                                                    </Link>
                                                }
                                            />
                                        ) : isLast ? (
                                            <BreadcrumbPage>{item.title}</BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink
                                                render={<Link href={item.href}>{item.title}</Link>}
                                            />
                                        )}
                                    </BreadcrumbItem>
                                    {!isLast && <BreadcrumbSeparator />}
                                </Fragment>
                            );
                        })}
                    </BreadcrumbList>
                </Breadcrumb>
            )}
        </>
    );
}
