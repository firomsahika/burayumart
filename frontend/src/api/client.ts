import { ApiError } from "./errors";
import type {
    ApiErrorResponse,
    ApiSuccessResponse,
} from "./types";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

if (!API_URL) {
    throw new Error(
        "EXPO_PUBLIC_API_URL is not configured"
    );
}

type RequestOptions = {
    method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
    body?: unknown;
    headers?: Record<string, string>;
};

export async function apiClient<T>(
    endpoint: string,
    options: RequestOptions = {}
): Promise<T> {
    const {
        method = "GET",
        body,
        headers = {},
    } = options;

    let response: Response;

    try {
        response = await fetch(
            `${API_URL}${endpoint}`,
            {
                method,
                credentials: "include",
                headers: {
                    "Content-Type":
                        "application/json",
                    ...headers,
                },
                body:
                    body !== undefined
                        ? JSON.stringify(body)
                        : undefined,
            }
        );
    } catch {
        throw new ApiError(
            "Unable to connect to the server. Please check your internet connection.",
            0,
            "NETWORK_ERROR"
        );
    }

    let result:
        | ApiSuccessResponse<T>
        | ApiErrorResponse;

    try {
        result = await response.json();
    } catch {
        throw new ApiError(
            "The server returned an invalid response.",
            response.status,
            "INVALID_SERVER_RESPONSE"
        );
    }

    if (!response.ok || !result.success) {
        if (!result.success) {
            throw new ApiError(
                result.error.message,
                response.status,
                result.error.code
            );
        }

        throw new ApiError(
            "An unexpected server error occurred.",
            response.status,
            "HTTP_ERROR"
        );
    }

    return result.data;
}