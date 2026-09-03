import { authClient } from "./auth-client";

const API_URL =
  process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:5000";

async function getAuthCookie() {
  try {
    return await authClient.getCookie();
  } catch {
    return null;
  }
}

type RequestOptions = RequestInit & {
  authenticated?: boolean;
};

export async function api<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { authenticated = false, headers,...requestOptions } = options;

  const requestHeaders = new Headers(headers);

  requestHeaders.set("Content-Type", "application/json");

  if (authenticated) {
    const cookie = await getAuthCookie();

    if (cookie) {
      requestHeaders.set("Cookie", cookie);
    }
  }

  const response = await fetch(
    `${API_URL}${path}`,
    {
      ...requestOptions,
      headers: requestHeaders,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.error ||
        "Something went wrong"
    );
  }

  return data;
}