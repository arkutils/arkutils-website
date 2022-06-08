export class ReentranceLock {
    lockPromise: Promise<void>;

    constructor() {
        this.lockPromise = null;
    }

    async execute<T>(fn: () => Promise<T>): Promise<T> {
        if (this.lockPromise) {
            // Another call is already in progress

            // Wait for it to complete
            await this.lockPromise;

            // Then recurse, so we check again
            return await this.execute(fn);
        } else {
            // Create a locking promise
            let resolve;
            let reject;
            this.lockPromise = new Promise((_resolve, _reject) => {
                resolve = _resolve;
                reject = _reject;
            });

            // Execute the function, clearing the lock before resolving/rejecting
            try {
                const result = await fn();
                this.lockPromise = null;

                // Unblock waiting callers and return result
                resolve();
                return result;
            } catch (e) {
                this.lockPromise = null;

                // Also fail all callers and bail
                reject();
                throw e;
            }
        }
    }
}
