import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";

const API_URL =
    process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:5000";

export const authClient = createAuthClient({
    baseURL: `${API_URL}/api/auth`,

    plugins: [
        expoClient({
            scheme: "burayumart",
            storagePrefix: "burayumart",
            storage: SecureStore,
        }),
    ],
});