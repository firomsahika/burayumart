import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { expo } from "@better-auth/expo"

import { prisma } from "./prisma";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    emailAndPassword: {
        enabled: true,
    },

    plugins: [
        expo()
    ],

    trustedOrigins: [
        "burayumart://",
    ],
});