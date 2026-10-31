import type { TPaginated } from "@/types/utils";

import { router } from "@inertiajs/react";

import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { Link } from "@inertiajs/react";
import { PerPageSelector } from "@/components/elements/per-page-selector";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Paginator = ({ pagination }: { pagination: Omit<TPaginated<unknown>, "data"> }) => {
    const changePerPage = (perPage: number) => {
        const url = new URL(pagination.first_page_url);
        url.searchParams.set("per_page", String(perPage));
        url.searchParams.set("page", "1");

        router.get(url.toString(), {}, { preserveState: true });
    };

    const pageUrl = (page: number) => {
        const url = new URL(pagination.first_page_url);
        url.searchParams.set("page", String(page));

        return url.toString();
    };

    return (
        <div className="flex flex-col gap-4 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="shrink-0 text-xs text-muted-foreground">
                Showing {pagination.from ?? 0}–{pagination.to ?? 0} of {pagination.total} results
            </p>
            <PerPageSelector value={pagination.per_page} onChange={changePerPage} />
            <Pagination className="mx-0 w-auto max-w-full min-w-0 justify-start overflow-x-auto sm:ml-auto">
                <PaginationContent>
                    <PaginationItem>
                        {pagination.current_page > 1 ? (
                            <Button
                                variant="ghost"
                                size="icon"
                                nativeButton={false}
                                render={<Link href={pageUrl(1)} aria-label="Go to first page" />}
                            >
                                <ChevronsLeft />
                            </Button>
                        ) : (
                            <Button
                                variant="ghost"
                                size="icon"
                                disabled
                                aria-label="Go to first page"
                            >
                                <ChevronsLeft />
                            </Button>
                        )}
                    </PaginationItem>
                    <PaginationItem>
                        {pagination.prev_page_url ? (
                            <Button
                                variant="ghost"
                                size="icon"
                                nativeButton={false}
                                render={
                                    <Link
                                        href={pagination.prev_page_url}
                                        aria-label="Go to previous page"
                                    />
                                }
                            >
                                <ChevronLeft />
                            </Button>
                        ) : (
                            <Button
                                variant="ghost"
                                size="icon"
                                disabled
                                aria-label="Go to previous page"
                            >
                                <ChevronLeft />
                            </Button>
                        )}
                    </PaginationItem>
                    {Array.from({ length: pagination.last_page }, (_, index) => index + 1).map(
                        (page) => (
                            <PaginationItem key={page}>
                                <Button
                                    variant={page === pagination.current_page ? "outline" : "ghost"}
                                    size="icon"
                                    nativeButton={false}
                                    render={
                                        <Link
                                            href={pageUrl(page)}
                                            aria-label={`Go to page ${page}`}
                                            aria-current={
                                                page === pagination.current_page
                                                    ? "page"
                                                    : undefined
                                            }
                                        />
                                    }
                                >
                                    {page}
                                </Button>
                            </PaginationItem>
                        ),
                    )}
                    <PaginationItem>
                        {pagination.next_page_url ? (
                            <Button
                                variant="ghost"
                                size="icon"
                                nativeButton={false}
                                render={
                                    <Link
                                        href={pagination.next_page_url}
                                        aria-label="Go to next page"
                                    />
                                }
                            >
                                <ChevronRight />
                            </Button>
                        ) : (
                            <Button
                                variant="ghost"
                                size="icon"
                                disabled
                                aria-label="Go to next page"
                            >
                                <ChevronRight />
                            </Button>
                        )}
                    </PaginationItem>
                    <PaginationItem>
                        {pagination.current_page < pagination.last_page ? (
                            <Button
                                variant="ghost"
                                size="icon"
                                nativeButton={false}
                                render={
                                    <Link
                                        href={pageUrl(pagination.last_page)}
                                        aria-label="Go to last page"
                                    />
                                }
                            >
                                <ChevronsRight />
                            </Button>
                        ) : (
                            <Button
                                variant="ghost"
                                size="icon"
                                disabled
                                aria-label="Go to last page"
                            >
                                <ChevronsRight />
                            </Button>
                        )}
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};
