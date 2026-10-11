import { useEffect, useState } from 'react';

// Like useState, but remembers the value in localStorage. Restored after mount (not in the
// initial state) so the prerendered HTML matches the first client render; only values in
// `allowed` are accepted, and unavailable storage just falls back to `initial`.
export function usePersistedState<T extends string>(
    key: string,
    initial: T,
    allowed: readonly T[],
): [T, (next: T) => void] {
    const [value, setValue] = useState<T>(initial);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(key) as T | null;
            if (saved && allowed.includes(saved)) setValue(saved);
        } catch {
            // Storage blocked (e.g. private mode): keep the default.
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    const set = (next: T) => {
        setValue(next);
        try {
            localStorage.setItem(key, next);
        } catch {
            // The choice still applies for this visit.
        }
    };

    return [value, set];
}
