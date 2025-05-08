interface APIOptions<TRequest = unknown> extends Omit<RequestInit, "body" | "method"> {
    auth?: boolean;
    data?: TRequest;
    token?: string;
    query?: Record<string, string>;
}
export declare class APIError extends Error {
    status: number;
    data?: unknown;
    constructor(status: number, message?: string, data?: unknown);
}
export declare const api: {
    get: <TResponse = void>(endpoint: string, options?: Omit<APIOptions<never>, "data">) => Promise<TResponse>;
    post: <TRequest, TResponse>(endpoint: string, options?: APIOptions<TRequest>) => Promise<TResponse>;
    put: <TRequest, TResponse = void>(endpoint: string, options?: APIOptions<TRequest>) => Promise<TResponse>;
    delete: <TRequest, TResponse = void>(endpoint: string, options?: APIOptions<TRequest>) => Promise<TResponse>;
    patch: <TRequest, TResponse = void>(endpoint: string, options?: APIOptions<TRequest>) => Promise<TResponse>;
};
export {};
