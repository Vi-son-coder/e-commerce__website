import jwt from "jsonwebtoken";

function secret() {
    const s = process.env.JWT_SECRET;
    if (!s || s.length < 16) {
        throw new Error("JWT_SECRET must be set in .env (at least 16 characters)");
    }
    return s;
}

// The schema has no role column, so admins are configured by username.
const adminNames = () =>
    (process.env.ADMIN_USERNAMES ?? "admin")
        .split(",")
        .map((x) => x.trim().toLowerCase())
        .filter(Boolean);

export function signToken(user) {
    const role = adminNames().includes(user.username.toLowerCase()) ? "admin" : "customer";
    return jwt.sign({ sub: user.user_id, username: user.username, role }, secret(), {
        expiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
    });
}

/** Requires "Authorization: Bearer <token>"; sets req.user = { id, username, role }. */
export function authenticate(req, res, next) {
    const header = req.headers.authorization ?? "";
    const [scheme, token] = header.split(" ");
    if (scheme !== "Bearer" || !token) {
        return res.status(401).json({ message: "Authentication required" });
    }
    try {
        const payload = jwt.verify(token, secret());
        req.user = { id: Number(payload.sub), username: payload.username, role: payload.role };
        next();
    } catch {
        res.status(401).json({ message: "Invalid or expired token" });
    }
}

export function requireAdmin(req, res, next) {
    if (req.user?.role !== "admin") {
        return res.status(403).json({ message: "Admin only" });
    }
    next();
}

/** Public reads, admin-only writes (products, categories). */
export function adminForWrites(req, res, next) {
    if (req.method === "GET" || req.method === "HEAD") return next();
    authenticate(req, res, () => requireAdmin(req, res, next));
}

/** Whether the optional route protection is switched on (PROTECT_ROUTES=true). */
export const protectEnabled = () => process.env.PROTECT_ROUTES === "true";
