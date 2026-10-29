import { usePage } from "@inertiajs/react";

export const useShared = () => {
    const { shared } = usePage().props;

    return shared;
};
