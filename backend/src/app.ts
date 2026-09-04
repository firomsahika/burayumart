import express from "express";
import cors from "cors";
import helmet from "helmet";

import { toNodeHandler } from "better-auth/node";
import authRoutes from "./modules/auth/auth.routes";

import { auth } from "./lib/auth";

const app = express();

/**

* Security headers
  */
app.use(helmet());

/**

* CORS
  */
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

/**

* Better Auth
*
* Must be registered before express.json()
* because Better Auth needs access to the raw request.
  */
app.all("/api/auth/*splat", toNodeHandler(auth));


app.use(express.json());

 app.use("/api/v1/auth", authRoutes)
app.get("/api/v1/health", (_req, res) => {
    res.json({
        success: true,
        message: "BurayuMart API is running",
    });
});

export default app;
