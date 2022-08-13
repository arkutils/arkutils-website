const factorialCache = new Map<number, number>();

export function factorial(n: number): number {
    if (n <= 1) return n;
    const existing = factorialCache.get(n);
    if (existing !== undefined) return existing;
    const result = n * factorial(n - 1);
    factorialCache.set(n, result);
    return result;
}
