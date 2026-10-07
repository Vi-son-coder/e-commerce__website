import { prisma } from "../config/database.js";
import { handleError } from "../utils/errors.js";

// GET /payments
export const getPayments = async (req, res) => {
try {
const payments = await prisma.tHANHTOAN.findMany({
include: {
DONHANG: true
},
orderBy: {
payment_id: "desc"
}
});

    res.json(payments);
} catch (error) {
    return handleError(res, error, "Cannot get payments", "Get payments error:");
}

};

// GET /payments/
export const getPaymentById = async (req, res) => {
try {
const id = Number(req.params.id);

    const payment = await prisma.tHANHTOAN.findUnique({
        where: {
            payment_id: id
        },
        include: {
            DONHANG: true
        }
    });

    if (!payment) {
        return res.status(404).json({
            message: "Payment not found"
        });
    }

    res.json(payment);
} catch (error) {
    return handleError(res, error, "Cannot get payment", "Get payment error:");
}

};

// GET /payments/order/
export const getPaymentByOrder = async (req, res) => {
try {
const orderId = Number(req.params.orderId);

    const payment = await prisma.tHANHTOAN.findUnique({
        where: {
            order_id: orderId
        },
        include: {
            DONHANG: true
        }
    });

    if (!payment) {
        return res.status(404).json({
            message: "Payment not found for this order"
        });
    }

    res.json(payment);
} catch (error) {
    return handleError(res, error, "Cannot get payment", "Get payment by order error:");
}

};

// POST /payments
export const createPayment = async (req, res) => {
try {
const {
order_id
} = req.body;

    const payment = await prisma.tHANHTOAN.create({
        data: {
            order_id: Number(order_id)
        },
        include: {
            DONHANG: true
        }
    });

    res.status(201).json(payment);
} catch (error) {
    return handleError(res, error, "Cannot create payment", "Create payment error:");
}

};

// DELETE /payments/
export const deletePayment = async (req, res) => {
try {
const id = Number(req.params.id);

    await prisma.tHANHTOAN.delete({
        where: {
            payment_id: id
        }
    });

    res.json({
        message: "Payment deleted successfully"
    });
} catch (error) {
    return handleError(res, error, "Cannot delete payment", "Delete payment error:");
}

};