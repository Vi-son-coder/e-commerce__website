import { prisma } from "../config/database.js";
import { handleError } from "../utils/errors.js";

const SORTABLE = new Set(["product_id", "product_name", "price", "quantity"]);

function validateProductBody(b, { partial }) {
    const num = (v) => v !== undefined && v !== null && v !== "" && Number.isFinite(Number(v));
    if (!partial) {
        if (typeof b.product_name !== "string" || !b.product_name.trim()) return "product_name is required";
        if (!num(b.price)) return "price is required and must be a number";
        if (!num(b.category_id)) return "category_id is required";
    }
    if (b.price !== undefined && (!num(b.price) || Number(b.price) < 0)) return "price must be >= 0";
    if (b.quantity !== undefined && (!Number.isInteger(Number(b.quantity)) || Number(b.quantity) < 0)) {
        return "quantity must be an integer >= 0";
    }
    return null;
}

/**
 * GET /products
 * Query: q, category_id, status, min_price, max_price, in_stock=true,
 *        sort=(product_id|product_name|price|quantity), order=(asc|desc), page, limit
 * Always returns an array; paging info is in X-Total-Count / X-Page / X-Limit headers.
 * Without page/limit it returns everything (previous behaviour).
 */
export const getProducts = async (req, res) => {
    try {
        const { q, category_id, status, min_price, max_price, in_stock, sort, order } = req.query;

        const where = {};
        if (q) where.OR = [{ product_name: { contains: String(q) } }, { description: { contains: String(q) } }];
        if (category_id) where.category_id = Number(category_id);
        if (status) where.status = String(status);
        if (min_price || max_price) {
            where.price = {};
            if (min_price) where.price.gte = Number(min_price);
            if (max_price) where.price.lte = Number(max_price);
        }
        if (in_stock === "true") where.quantity = { gt: 0 };

        const orderBy = { [SORTABLE.has(sort) ? sort : "product_id"]: order === "desc" ? "desc" : "asc" };

        const paged = req.query.page !== undefined || req.query.limit !== undefined;
        const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 1), 100);
        const page = Math.max(parseInt(req.query.page, 10) || 1, 1);

        const [products, total] = await Promise.all([
            prisma.sANPHAM.findMany({
                where,
                orderBy,
                ...(paged ? { skip: (page - 1) * limit, take: limit } : {}),
            }),
            prisma.sANPHAM.count({ where }),
        ]);

        res.set("X-Total-Count", String(total));
        if (paged) {
            res.set("X-Page", String(page));
            res.set("X-Limit", String(limit));
        }
        res.json(products);
    } catch (error) {
        return handleError(res, error, "Cannot get products", "Get products error:");
    }
};

// GET /products/:id
export const getProductById = async (req, res) => {
    try {
        const product = await prisma.sANPHAM.findUnique({
            where: { product_id: Number(req.params.id) },
            include: { DANHMUC: true },
        });
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        return handleError(res, error, "Cannot get product", "Get product error:");
    }
};

// POST /products
export const createProduct = async (req, res) => {
    try {
        const body = req.body ?? {};
        const problem = validateProductBody(body, { partial: false });
        if (problem) return res.status(400).json({ message: problem });

        const { product_name, description, price, quantity, image, status, category_id } = body;
        const product = await prisma.sANPHAM.create({
            data: { product_name, description, price, quantity, image, status, category_id: Number(category_id) },
        });
        res.status(201).json(product);
    } catch (error) {
        return handleError(res, error, "Cannot create product", "Create product error:");
    }
};

// PUT /products/:id
export const updateProduct = async (req, res) => {
    try {
        const body = req.body ?? {};
        const problem = validateProductBody(body, { partial: true });
        if (problem) return res.status(400).json({ message: problem });

        const { product_name, description, price, quantity, image, status, category_id } = body;
        const product = await prisma.sANPHAM.update({
            where: { product_id: Number(req.params.id) },
            data: {
                product_name,
                description,
                price,
                quantity,
                image,
                status,
                category_id: category_id !== undefined ? Number(category_id) : undefined,
            },
        });
        res.json(product);
    } catch (error) {
        return handleError(res, error, "Cannot update product", "Update product error:");
    }
};

// DELETE /products/:id  (soft delete if the product is referenced elsewhere: ?soft=true)
export const deleteProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (req.query.soft === "true") {
            await prisma.sANPHAM.update({ where: { product_id: id }, data: { status: "inactive" } });
            return res.json({ message: "Product deactivated successfully" });
        }
        await prisma.sANPHAM.delete({ where: { product_id: id } });
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        return handleError(res, error, "Cannot delete product", "Delete product error:");
    }
};
