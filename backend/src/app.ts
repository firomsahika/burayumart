import express from "express";
import cors from "cors";
import helmet from "helmet";

import { toNodeHandler } from "better-auth/node";
import authRoutes from "./modules/auth/auth.routes";
import usersRoutes from "./modules/users/users.routes";
import sellersRoutes from "./modules/sellers/sellers.routes"
import productRoutes from "./modules/products/products.routes"
import uploadRoutes from "./modules/uploads/uploads.routes"
import categoriesRoutes from "./modules/categories/categories.routes"
import addressesRoutes from "./modules/addresses/addresses.routes"
import cartsRoutes from "./modules/carts/carts.routes"
import ordersRoutes from "./modules/orders/orders.routes"
import wishlistRoutes from "./modules/wishlist/wishlist.routes"

import { auth } from "./lib/auth";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();


app.use(helmet());


app.use(
  cors({
    origin: true,
    credentials: true,
  })
);


app.all("/api/auth/*splat", toNodeHandler(auth));


app.use(express.json());

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", usersRoutes)
app.use("/api/v1/sellers", sellersRoutes)
app.use("/api/v1/products", productRoutes)
app.use("/api/v1/uploads", uploadRoutes)
app.use("/api/v1/categories", categoriesRoutes)
app.use("/api/v1/addresses", addressesRoutes)
app.use("/api/v1/carts", cartsRoutes)
app.use("/api/v1/orders", ordersRoutes)
app.use("/api/v1/wishlists", wishlistRoutes)




app.get("/api/v1/health", (_req, res) => {
  res.json({
    success: true,
    message: "BurayuMart API is running",
  });
});

app.use(errorMiddleware)

export default app;
