import { prisma } from "../config/database.js";
import { handleError, HttpError } from "../utils/errors.js";

const round2 = (n) => Math.round(n * 100) / 100;

// GET /orders
export const getOrders = async (req, res) => {
    try {
        const orders = await prisma.dONHANG.findMany({
            include: {
                KHACHHANG: { select: { user_id: true, username: true, email: true, full_name: true } },
                CHITIETDONHANG: true,
                THANHTOAN: true,
            },
            orderBy: { order_id: "desc" },
        });
        res.json(orders);
    } catch (error) {
        return handleError(res, error, "Cannot get orders", "Get orders error:");
    }
};

// GET /orders/:id
export const getOrderById = async (req, res) => {
    try {
        const order = await prisma.dONHANG.findUnique({
            where: { order_id: Number(req.params.id) },
            include: {
                KHACHHANG: { select: { user_id: true, username: true, email: true, full_name: true } },
                CHITIETDONHANG: { include: { SANPHAM: true } },
                THANHTOAN: true,
            },
        });
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.json(order);
    } catch (error) {
        return handleError(res, error, "Cannot get order", "Get order error:");
    }
};

// GET /orders/customer/:userId
export const getOrdersByCustomer = async (req, res) => {
    try {
        const orders = await prisma.dONHANG.findMany({
            where: { user_id: Number(req.params.userId) },
            include: { CHITIETDONHANG: { include: { SANPHAM: true } }, THANHTOAN: true },
            orderBy: { order_date: "desc" },
        });
        res.json(orders);
    } catch (error) {
        return handleError(res, error, "Cannot get customer orders", "Get customer orders error:");
    }
};

// GET /orders/mine  (requires login)
export const getMyOrders = async (req, res) => {
    req.params.userId = String(req.user.id);
    return getOrdersByCustomer(req, res);
};

// POST /orders  (raw insert, kept for compatibility; prefer /orders/checkout)
export const createOrder = async (req, res) => {
    try {
        const { user_id, shipping_address, total_amount } = req.body;
        const order = await prisma.dONHANG.create({
            data: { user_id: Number(user_id), shipping_address, total_amount: total_amount ?? 0 },
        });
        res.status(201).json(order);
    } catch (error) {
        return handleError(res, error, "Cannot create order", "Create order error:");
    }
};

/**
 * POST /orders/checkout  (requires login)
 * body: { shipping_address, items: [{ product_id, quantity }], pay?: boolean }
 * One transaction: validates stock, snapshots prices from the DB (never trusts the
 * client), creates order + details, decrements stock, logs "purchase" behaviors,
 * and optionally records the payment.
 */
export const checkout = async (req, res) => {
    try {
        const userId = req.user.id;
        const { shipping_address, items, pay } = req.body ?? {};

        if (typeof shipping_address !== "string" || !shipping_address.trim()) {
            return res.status(400).json({ message: "shipping_address is required" });
        }
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "items must be a non-empty array" });
        }

        // Merge duplicate product lines and validate quantities.
        const wanted = new Map();
        for (const it of items) {
            const pid = Number(it?.product_id);
            const qty = Number(it?.quantity);
            if (!Number.isInteger(pid) || pid < 1 || !Number.isInteger(qty) || qty < 1) {
                return res.status(400).json({
                    message: "Each item needs a positive integer product_id and quantity",
                });
            }
            wanted.set(pid, (wanted.get(pid) ?? 0) + qty);
        }

        const order = await prisma.$transaction(async (tx) => {
            const products = await tx.sANPHAM.findMany({
                where: { product_id: { in: [...wanted.keys()] } },
            });
            const byId = new Map(products.map((p) => [p.product_id, p]));

            let total = 0;
            const lines = [];
            for (const [pid, qty] of wanted) {
                const p = byId.get(pid);
                if (!p) throw new HttpError(404, `Product ${pid} not found`);
                if (p.status !== "active") throw new HttpError(409, `Product ${pid} is not available`);
                if (p.quantity < qty) {
                    throw new HttpError(409, `Not enough stock for "${p.product_name}" (available: ${p.quantity})`);
                }
                total += Number(p.price) * qty;
                lines.push({ product_id: pid, quantity: qty, price: p.price });
            }

            const created = await tx.dONHANG.create({
                data: {
                    user_id: userId,
                    shipping_address: shipping_address.trim(),
                    total_amount: round2(total),
                    CHITIETDONHANG: { create: lines },
                },
            });

            // Atomic guard against overselling under concurrent checkouts.
            for (const l of lines) {
                const r = await tx.sANPHAM.updateMany({
                    where: { product_id: l.product_id, quantity: { gte: l.quantity } },
                    data: { quantity: { decrement: l.quantity } },
                });
                if (r.count === 0) {
                    throw new HttpError(409, `Product ${l.product_id} just went out of stock`);
                }
            }

            await tx.uSER_BEHAVIER.createMany({
                data: lines.map((l) => ({
                    user_id: userId,
                    product_id: l.product_id,
                    behavior_type: "purchase",
                })),
            });

            if (pay === true) {
                await tx.tHANHTOAN.create({ data: { order_id: created.order_id } });
            }

            return tx.dONHANG.findUnique({
                where: { order_id: created.order_id },
                include: { CHITIETDONHANG: { include: { SANPHAM: true } }, THANHTOAN: true },
            });
        });

        res.status(201).json(order);
    } catch (error) {
        return handleError(res, error, "Cannot checkout", "Checkout error:");
    }
};

// PUT /orders/:id
export const updateOrder = async (req, res) => {
    try {
        const { user_id, shipping_address, total_amount } = req.body;
        const order = await prisma.dONHANG.update({
            where: { order_id: Number(req.params.id) },
            data: {
                user_id: user_id !== undefined ? Number(user_id) : undefined,
                shipping_address,
                total_amount,
            },
        });
        res.json(order);
    } catch (error) {
        return handleError(res, error, "Cannot update order", "Update order error:");
    }
};

// DELETE /orders/:id[?restock=true]
// Removes payment + details first (the FKs would otherwise block the delete).
export const deleteOrder = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const restock = req.query.restock === "true";

        await prisma.$transaction(async (tx) => {
            const order = await tx.dONHANG.findUnique({
                where: { order_id: id },
                include: { CHITIETDONHANG: true },
            });
            if (!order) throw new HttpError(404, "Order not found");

            if (restock) {
                for (const d of order.CHITIETDONHANG) {
                    await tx.sANPHAM.update({
                        where: { product_id: d.product_id },
                        data: { quantity: { increment: d.quantity } },
                    });
                }
            }
            await tx.tHANHTOAN.deleteMany({ where: { order_id: id } });
            await tx.cHITIETDONHANG.deleteMany({ where: { order_id: id } });
            await tx.dONHANG.delete({ where: { order_id: id } });
        });

        res.json({ message: "Order deleted successfully" });
    } catch (error) {
        return handleError(res, error, "Cannot delete order", "Delete order error:");
    }
};
