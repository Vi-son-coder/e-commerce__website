import { prisma } from "../config/database.js";
import { handleError, HttpError } from "../utils/errors.js";

const round2 = (n) => Math.round(n * 100) / 100;

/** Keeps DONHANG.total_amount equal to the sum of its lines. */
async function recalcTotal(tx, orderId) {
    const rows = await tx.cHITIETDONHANG.findMany({
        where: { order_id: orderId },
        select: { quantity: true, price: true },
    });
    const total = rows.reduce((s, r) => s + r.quantity * Number(r.price), 0);
    await tx.dONHANG.update({ where: { order_id: orderId }, data: { total_amount: round2(total) } });
}

// GET /order-details
export const getOrderDetails = async (req, res) => {
    try {
        const details = await prisma.cHITIETDONHANG.findMany({
            include: { DONHANG: true, SANPHAM: true },
            orderBy: { order_detail_id: "asc" },
        });
        res.json(details);
    } catch (error) {
        return handleError(res, error, "Cannot get order details", "Get order details error:");
    }
};

// GET /order-details/:id
export const getOrderDetailById = async (req, res) => {
    try {
        const detail = await prisma.cHITIETDONHANG.findUnique({
            where: { order_detail_id: Number(req.params.id) },
            include: { DONHANG: true, SANPHAM: true },
        });
        if (!detail) return res.status(404).json({ message: "Order detail not found" });
        res.json(detail);
    } catch (error) {
        return handleError(res, error, "Cannot get order detail", "Get order detail error:");
    }
};

// GET /order-details/order/:orderId
export const getDetailsByOrder = async (req, res) => {
    try {
        const details = await prisma.cHITIETDONHANG.findMany({
            where: { order_id: Number(req.params.orderId) },
            include: { SANPHAM: true },
            orderBy: { order_detail_id: "asc" },
        });
        res.json(details);
    } catch (error) {
        return handleError(res, error, "Cannot get order details", "Get order details by order error:");
    }
};

// POST /order-details  (price defaults to the product's current price)
export const createOrderDetail = async (req, res) => {
    try {
        const { order_id, product_id, quantity, price } = req.body;

        const detail = await prisma.$transaction(async (tx) => {
            let unitPrice = price;
            if (unitPrice === undefined || unitPrice === null) {
                const p = await tx.sANPHAM.findUnique({ where: { product_id: Number(product_id) } });
                if (!p) throw new HttpError(404, "Product not found");
                unitPrice = p.price;
            }
            const created = await tx.cHITIETDONHANG.create({
                data: {
                    order_id: Number(order_id),
                    product_id: Number(product_id),
                    quantity: Number(quantity),
                    price: unitPrice,
                },
                include: { SANPHAM: true },
            });
            await recalcTotal(tx, created.order_id);
            return created;
        });

        res.status(201).json(detail);
    } catch (error) {
        return handleError(res, error, "Cannot create order detail", "Create order detail error:");
    }
};

// PUT /order-details/:id
export const updateOrderDetail = async (req, res) => {
    try {
        const { quantity, price } = req.body;

        const detail = await prisma.$transaction(async (tx) => {
            const updated = await tx.cHITIETDONHANG.update({
                where: { order_detail_id: Number(req.params.id) },
                data: { quantity: quantity !== undefined ? Number(quantity) : undefined, price },
                include: { SANPHAM: true },
            });
            await recalcTotal(tx, updated.order_id);
            return updated;
        });

        res.json(detail);
    } catch (error) {
        return handleError(res, error, "Cannot update order detail", "Update order detail error:");
    }
};

// DELETE /order-details/:id
export const deleteOrderDetail = async (req, res) => {
    try {
        await prisma.$transaction(async (tx) => {
            const removed = await tx.cHITIETDONHANG.delete({
                where: { order_detail_id: Number(req.params.id) },
            });
            await recalcTotal(tx, removed.order_id);
        });
        res.json({ message: "Order detail deleted successfully" });
    } catch (error) {
        return handleError(res, error, "Cannot delete order detail", "Delete order detail error:");
    }
};
