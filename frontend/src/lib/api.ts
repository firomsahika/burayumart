import { authClient } from "./auth-client";

const API_URL =
  process.env.EXPO_PUBLIC_API_URL ??
  "http://localhost:5000";

export async function apiFetch(
  path: string,
  options: RequestInit = {}
) {
  const cookie =
    await authClient.getCookie();

  const headers = new Headers(
    options.headers
  );

  if (cookie) {
    headers.set("Cookie", cookie);
  }

  if (
    options.body &&
    !headers.has("Content-Type")
  ) {
    headers.set(
      "Content-Type",
      "application/json"
    );
  }

  return fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });
}