import { apiClient } from "../../api/client";
import type { AuthUser } from "./auth.types";

export type MeResponse = {
    user: AuthUser;
};

export async function getCurrentUser() {
    return apiClient<MeResponse>(
        "/auth/me"
    );
}