import { writable } from 'svelte/store';
import { browser } from '$app/env';

/** A Svelte writeable store that mirrors its contents to LocalStorage */
export function localstore<T>(name: string, options: { default: T }) {
    let value: string = browser ? window.localStorage.getItem(name) : undefined;
    if (typeof (value) === 'undefined' || value === null) {
        value = JSON.stringify(options.default);
    }
    const store = writable<T>(JSON.parse(value));
    if (browser) {
        store.subscribe(value => {
            localStorage.setItem(name, JSON.stringify(value));
        });
    }

    return store;
}
