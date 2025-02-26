export declare function safeError<T>(promise: Promise<T>): Promise<[T, null] | [null, Error]>;
