const INT_MAX = 2147483647; // SQL Server INT

function validateId(req, res, next, value, name) {
    if (!/^\d+$/.test(value) || Number(value) < 1 || Number(value) > INT_MAX) {
        return res
            .status(400)
            .json({ message: `Invalid ${name}: must be a positive integer` });
    }
    next();
}

/** Validates every id-like URL param on a router (400 instead of NaN -> Prisma 500). */
export function validateIdParams(router) {
    ["id", "userId", "productId", "orderId", "modelId"].forEach((name) =>
        router.param(name, validateId)
    );
}
