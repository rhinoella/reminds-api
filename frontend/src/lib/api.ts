const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface APIOptions<TRequest = unknown>
  extends Omit<RequestInit, "body" | "method"> {
  auth?: boolean;
  data?: TRequest;
  token?: string;
  query?: Record<string, string>;
}

export class APIError extends Error {
  public status: number;
  public data?: unknown;

  constructor(status: number, message?: string, data?: unknown) {
    super(message);
    this.name = "APIError";
    this.status = status;
    this.data = data;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

async function fetchWithAuth<TResponse, TRequest>(
  endpoint: string,
  method: HTTPMethod,
  { data, query, token, ...options }: APIOptions<TRequest> = {}
): Promise<TResponse> {
  let url = `${API_URL}${endpoint}`;

  if (query) {
    const params = new URLSearchParams(query);
    url = `${url}?${params.toString()}`;
  }

  console.log("Calling " + url);

  const headers = new Headers({
    "Content-Type": "application/json",
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  });

  const response = await fetch(url, {
    ...options,
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  const responseData = await response.json().catch(() => ({}));

  console.log("Api response", responseData);

  if (!response.ok) {
    console.log(responseData);
    console.log(responseData.message);
    throw new APIError(response.status, responseData.error, responseData);
  }

  return responseData;
}

export const api = {
  get: <TResponse = void>(
    endpoint: string,
    options?: Omit<APIOptions<never>, "data">
  ) => fetchWithAuth<TResponse, never>(endpoint, "GET", options),

  post: <TRequest, TResponse>(
    endpoint: string,
    options?: APIOptions<TRequest>
  ) => fetchWithAuth<TResponse, TRequest>(endpoint, "POST", options),

  put: <TRequest, TResponse = void>(
    endpoint: string,
    options?: APIOptions<TRequest>
  ) => fetchWithAuth<TResponse, TRequest>(endpoint, "PUT", options),

  delete: <TRequest, TResponse = void>(
    endpoint: string,
    options?: APIOptions<TRequest>
  ) => fetchWithAuth<TResponse, TRequest>(endpoint, "DELETE", options),

  patch: <TRequest, TResponse = void>(
    endpoint: string,
    options?: APIOptions<TRequest>
  ) => fetchWithAuth<TResponse, TRequest>(endpoint, "PATCH", options),
};
