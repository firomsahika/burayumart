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
      // Expo development
          "exp://**",

          // Local development
          "http://localhost:8081",
          "http://localhost:5000",
    ],
});
