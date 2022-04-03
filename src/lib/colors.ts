export type Color3 = {
    r: number;
    g: number;
    b: number;
};

export type Color4 = Color3 & {
    a: number;
};

export function cmpToHex(v: number) {
    const hex = clamp255(Math.round(v * 255)).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
}

export function asHex(rgb: Color3) {
    return '#' + cmpToHex(rgb.r) + cmpToHex(rgb.g) + cmpToHex(rgb.b);
}

export function asRgbTo1(color: Color3): string {
    return `rgb(${asFloat(color.r)}, ${asFloat(color.g)}, ${asFloat(color.b)})`;
}

export function asRgbTo256(color: Color3): string {
    return `rgb(${clamp255(Math.floor(color.r * 256))}, ${clamp255(
        Math.floor(color.g * 256)
    )}, ${clamp255(Math.floor(color.b * 256))})`;
}

export function srgbPow22(linear: Color3) {
    return {
        r: Math.pow(clamp(linear.r), 1 / 2.2),
        g: Math.pow(clamp(linear.g), 1 / 2.2),
        b: Math.pow(clamp(linear.b), 1 / 2.2)
    };
}

export function srgbFilm(linear: Color3) {
    return {
        r: calcFilmCmp(clamp(linear.r)),
        g: calcFilmCmp(clamp(linear.g)),
        b: calcFilmCmp(clamp(linear.b))
    };
}

export function calcFilmCmp(v: number) {
    if (v < 0.0031308) {
        return 12.92 * v;
    } else {
        return 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
    }
}

export function selectTextColor(color: Color3): string {
    return color.r * 0.2126 + color.g * 0.7152 + color.b * 0.0722 > 0.5 ? 'black' : 'white';
}

function clamp(v: number): number {
    return Math.max(0.0, Math.min(1.0, v));
}

function clamp255(value: number) {
    return Math.min(value, 255);
}

function asFloat(n: number): string {
    return n.toFixed(3);
}
