const factorialCache = new Map<number, bigint>();

const BIGONE = BigInt(1);

export function factorial(n: number, stop = 0): bigint {
    if (n < stop) throw new Error(`n must be >= ${stop}`);
    if (n <= stop) return BIGONE;
    if (n === 0) return BIGONE;
    if (n <= 2) return BigInt(n);
    if (stop < 2) {
        const existing = factorialCache.get(n);
        if (existing !== undefined) return existing;
        const result = BigInt(n) * factorial(n - 1);
        factorialCache.set(n, result);
        return result;
    } else {
        return BigInt(n) * factorial(n - 1, stop);
    }
}

/* Optimised (n! / x!) calculation */
export function fbyf(n: number, x: number): number {
    if (n === x) {
        return 1;
    } else if (n > x) {
        return Number(factorial(n, x));
    } else {
        return 1 / Number(factorial(x, n));
    }
}


export function clamp(min: number, value: number, max: number) {
    return Math.min(Math.max(min, value), max);
}



/*  The following JavaScript functions for calculating normal and
    chi-square probabilities and critical values were adapted by
    John Walker from C implementations
    written by Gary Perlman of Wang Institute, Tyngsboro, MA
    01879.  Both the original C code and this JavaScript edition
    are in the public domain.  */

/*  POZ  --  probability of normal z value
    Adapted from a polynomial approximation in:
            Ibbetson D, Algorithm 209
            Collected Algorithms of the CACM 1963 p. 616
    Note:
            This routine has six digit accuracy, so it is only useful for absolute
            z values <= 6.  For z values > to 6.0, poz() returns 0.0.
*/

export function zScoreToProbability(z: number) {
    const Z_MAX = 6;
    let y, x, w;

    if (z == 0.0) {
        x = 0.0;
    } else {
        y = 0.5 * Math.abs(z);
        if (y > (Z_MAX * 0.5)) {
            x = 1.0;
        } else if (y < 1.0) {
            w = y * y;
            x = ((((((((0.000124818987 * w
                - 0.001075204047) * w + 0.005198775019) * w
                - 0.019198292004) * w + 0.059054035642) * w
                - 0.151968751364) * w + 0.319152932694) * w
                - 0.531923007300) * w + 0.797884560593) * y * 2.0;
        } else {
            y -= 2.0;
            x = (((((((((((((-0.000045255659 * y
                + 0.000152529290) * y - 0.000019538132) * y
                - 0.000676904986) * y + 0.001390604284) * y
                - 0.000794620820) * y - 0.002034254874) * y
                + 0.006549791214) * y - 0.010557625006) * y
                + 0.011630447319) * y - 0.009279453341) * y
                + 0.005353579108) * y - 0.002141268741) * y
                + 0.000535310849) * y + 0.999936657524;
        }
    }
    return z > 0.0 ? ((x + 1.0) * 0.5) : ((1.0 - x) * 0.5);
}


/*  CRITZ  --  Compute critical normal z value to
               produce given p.  We just do a bisection
               search for a value within CHI_EPSILON,
               relying on the monotonicity of pochisq().  */

export function probabilityToZScore(p: number) {
    const Z_MAX = 6;
    const Z_EPSILON = 0.000001;     /* Accuracy of z approximation */
    let minz = -Z_MAX;
    let maxz = Z_MAX;
    let zval = 0.0;
    let pval;
    if (p < 0.0) p = 0.0;
    if (p > 1.0) p = 1.0;

    while ((maxz - minz) > Z_EPSILON) {
        pval = zScoreToProbability(zval);
        if (pval > p) {
            maxz = zval;
        } else {
            minz = zval;
        }
        zval = (maxz + minz) * 0.5;
    }
    return (zval);
}


export function pct(value: number, places: number | undefined = undefined) {
    if (value === 0) return "0%";
    if (typeof (value) === "undefined") return "-";
    if (typeof (places) === "undefined") places = Math.floor(-Math.log10(value)) + 2;
    if (places < 0) places = 0;
    return Number(value).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: places });
}
