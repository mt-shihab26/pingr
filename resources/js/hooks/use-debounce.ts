import { useEffect, useEffectEvent } from "react";

export const useDebounce = <T>(value: T, callback: (value: T) => void, delay = 300): void => {
    const onDebounce = useEffectEvent(callback);

    useEffect(() => {
        const timeout = window.setTimeout(() => onDebounce(value), delay);

        return () => window.clearTimeout(timeout);
    }, [value, delay]);
};
