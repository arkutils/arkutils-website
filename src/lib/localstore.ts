import { browser } from '$app/environment';
import { writable, type Writable } from '@square/svelte-store';

export type LocalStoreOptions<T> = {
    default: T,
    prep?: (input: T) => T,
    dontWatchTabs?: boolean,
}

const registeredWatchers = new Map<string, Writable<unknown>>();

if (browser) {
    // Watch for localStorage changes in other tabs
    window.addEventListener('storage', (ev) => {
        if (ev.storageArea !== window.localStorage) return;
        registeredWatchers.get(ev.key ?? '---undefined-key---')?.set(JSON.parse(ev.newValue ?? 'undefined'));
    });
}

/**
 * A Svelte writeable store that mirrors its contents to LocalStorage
 * and syncs when changes are detected from other tabs.
 *
 *  * Does not notify when the value is unchanged (comparing JSON transformations)
 *  * Stores itself in localStorage when changed
 *  * Listens for localStorage changes in other tabs
 */
export function localstore<T>(name: string, options: LocalStoreOptions<T>): Writable<T> {
    // Return an existing watcher if we have one for this key
    const existing = registeredWatchers.get(name);
    if (existing) return existing as Writable<T>;

    // We want to maintain both the value and its JSON version
    let json: string = JSON.stringify(options.default);
    let value: T;

    // Handle initialisation from store or default
    if (browser) json = window.localStorage.getItem(name) ?? "undefined";
    json = json ?? JSON.stringify(options.default);
    value = JSON.parse(json);

    // Run prep function if supplied
    if (options.prep) value = options.prep(value);

    // Make a Svelte store, only used for its subscribe mechanism
    const innerStore = writable<T>(value);

    // Make our outer store
    const publicStore: Writable<T> = {
        subscribe: innerStore.subscribe,

        set: (newValue) => {
            // Only respond to actual changes
            const newJson = JSON.stringify(newValue);
            if (newJson === json) return;

            // Store the data and JSON for later use
            json = newJson;
            value = newValue;

            // Let the internal store notify subscribers
            return innerStore.set(newValue);
        },

        update: (fn) => {
            const newValue = fn(value);

            // Only respond to actual changes
            const newJson = JSON.stringify(newValue);
            if (newJson === json) return;

            // Store the data and JSON for later use
            json = newJson;
            value = newValue;

            // Let the internal store notify subscribers
            return innerStore.set(newValue);
        }
    };

    // If in the browser, save store changes into localStorage
    if (browser) {
        innerStore.subscribe((_) => {
            // We can ignore the passed value because we already have it as JSON
            localStorage.setItem(name, json);
        });
    }

    // Register this watcher to re-use and to get updates from other tabs
    if (!options.dontWatchTabs) {
        registeredWatchers.set(name, publicStore);
    }

    return publicStore;
}
