import { derived, type Stores, type StoresValues, type Unsubscriber } from "@square/svelte-store";

export function debouncedDerived<S extends Stores, T>(
    stores: S,
    fn: (values: StoresValues<S>, set: (value: T) => void) => Unsubscriber | void,
    options?: { initialValue?: T, delay?: number }) {

    let timeoutId: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    const actualOptions = {
        initialValue: undefined,
        delay: 500,
        ...options
    };

    return derived(
        stores,
        (values: StoresValues<S>, set) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            timeoutId = setTimeout(() => {
                fn(values, set);
            }, actualOptions.delay);
        },
        actualOptions.initialValue
    );
};
