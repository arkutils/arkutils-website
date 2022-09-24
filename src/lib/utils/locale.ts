import { browser } from "$app/environment";

export function getLocale() {
    if (browser) {
        return navigator.languages && navigator.languages.length
            ? navigator.languages[0]
            : navigator.language;
    } else {
        return 'en-US';
    }
}
