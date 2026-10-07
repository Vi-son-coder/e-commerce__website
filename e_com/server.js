import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { prisma } from "./config/database.js";
import { errorMiddleware } from "./utils/errors.js";
import { authenticate, requireAdmin, adminForWrites, protectEnabled } from "./utils/auth.js";

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import orderRoutes from "./routes/order.routes.js";
import orderDetailRoutes from "./routes/orderDetail.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import aiModelRoutes from "./routes/aiModel.routes.js";
import behaviorRoutes from "./routes/behavior.routes.js";
import trainingRoutes from "./routes/training.routes.js";
import recommendationRoutes from "./routes/recommendation.routes.js";

const app = express();
const PORT = Number(process.env.PORT ?? 3000);

app.use(
    cors({
        origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim()) : true,
        exposedHeaders: ["X-Total-Count", "X-Page", "X-Limit"],
    })
);
app.use(express.json({ limit: "1mb" }));

// Ảnh sản phẩm: SANPHAM.image lưu tên file (vd "iphone17.jpg") -> đặt file vào public/images,
// frontend sẽ tải tại GET /images/<tên file>.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use("/images", express.static(path.join(__dirname, "public", "images"), { maxAge: "1d" }));

app.get("/", (req, res) => {
    res.json({ message: "E-commerce API is running" });
});

app.get("/health", async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.json({ status: "ok", database: "up" });
    } catch {
        res.status(503).json({ status: "degraded", database: "down" });
    }
});

// Optional route protection: set PROTECT_ROUTES=true in .env.
//  - products/categories: public reads, admin-only writes
//  - customers/payments/order-details/ai-models/training: admin only
//  - orders/behavior/recommendations: any logged-in user
// (Ownership checks per user are NOT enforced on these legacy CRUD routes.)
const on = protectEnabled();
const none = (req, res, next) => next();
const admin = on ? [authenticate, requireAdmin] : [none];
const loggedIn = on ? [authenticate] : [none];
const writesAdmin = on ? [adminForWrites] : [none];

app.use("/auth", authRoutes);
app.use("/products", ...writesAdmin, productRoutes);
app.use("/categories", ...writesAdmin, categoryRoutes);
app.use("/customers", ...admin, customerRoutes);
// /orders/checkout and /orders/mine always require login (enforced in the router)
const ordersGuard = on
    ? (req, res, next) => (req.path === "/checkout" || req.path === "/mine" ? next() : authenticate(req, res, next))
    : none;
app.use("/orders", ordersGuard, orderRoutes);
app.use("/order-details", ...admin, orderDetailRoutes);
app.use("/payments", ...admin, paymentRoutes);
app.use("/ai-models", ...admin, aiModelRoutes);
app.use("/behavior", ...loggedIn, behaviorRoutes);
app.use("/training", ...admin, trainingRoutes);
app.use("/recommendations", ...loggedIn, recommendationRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use(errorMiddleware);

const server = app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    if (!process.env.JWT_SECRET) console.warn("WARNING: JWT_SECRET is not set - auth endpoints will fail");
});

async function shutdown(signal) {
    console.log(`${signal} received, shutting down...`);
    server.close(async () => {
        await prisma.$disconnect().catch(() => {});
        process.exit(0);
    });
    setTimeout(() => process.exit(1), 10000).unref();
}
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
