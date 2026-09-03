import { auth } from "../../lib/auth";
import { AppError } from "../../middleware/app-error";

export async function getCurrentUser(headers: HeadersInit) {
  const session = await auth.api.getSession({
    headers,
  });

  if (!session) {
    throw new AppError(
      "Authentication required",
      401,
      "UNAUTHORIZED"
    );
  }

  return session.user;
}