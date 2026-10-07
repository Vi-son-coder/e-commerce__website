const isProd = process.env.NODE_ENV === "production";

/** Throw inside controllers/transactions to return a specific HTTP status. */
export class HttpError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

/**
 * Map a thrown error to a proper HTTP response.
 *  - Prisma P2025 (record not found on update/delete)  -> 404
 *  - Prisma P2002 (unique constraint, e.g. duplicate email) -> 409
 *  - Prisma P2003 (foreign key violation / row still referenced) -> 409
 *  - Prisma P2000 / validation errors (bad input)      -> 400
 *  - anything else                                      -> 500
 * Internal error details are only returned outside production.
 */
export function handleError(res, error, fallbackMessage, logLabel) {
    if (error instanceof HttpError) {
        return res.status(error.status).json({ message: error.message });
    }
    console.error(logLabel ?? fallbackMessage, error);

    let status = 500;
    let message = fallbackMessage;

    switch (error?.code) {
        case "P2025":
            status = 404;
            message = "Record not found";
            break;
        case "P2002": {
            status = 409;
            const target = error.meta?.target;
            message = `Duplicate value${target ? ` for ${[].concat(target).join(", ")}` : ""}`;
            break;
        }
        case "P2003":
            status = 409;
            message =
                "Operation violates a relationship: a referenced record does not exist, or this record is still referenced by others";
            break;
        case "P2000":
            status = 400;
            message = "A provided value is too long for its column";
            break;
        default:
            if (error?.name === "PrismaClientValidationError") {
                status = 400;
                message = "Invalid or missing fields in request body";
            }
    }

    const body = { message };
    if (!isProd && status === 500) body.error = error?.message;
    return res.status(status).json(body);
}

/** Express error middleware: JSON for malformed bodies and anything uncaught. */
export function errorMiddleware(err, req, res, next) {
    if (res.headersSent) return next(err);
    if (err?.type === "entity.parse.failed") {
        return res.status(400).json({ message: "Malformed JSON body" });
    }
    console.error("Unhandled error:", err);
    const body = { message: "Internal server error" };
    if (!isProd) body.error = err?.message;
    res.status(err?.status ?? 500).json(body);
}
