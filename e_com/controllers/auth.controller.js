import { prisma } from "../config/database.js";
import { handleError } from "../utils/errors.js";
import { hashPassword, verifyPassword } from "../utils/password.js";
import { signToken } from "../utils/auth.js";

const publicFields = {
    user_id: true,
    username: true,
    email: true,
    full_name: true,
    phone: true,
    address: true,
};

const isEmail = (v) => typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// POST /auth/register
export const register = async (req, res) => {
    try {
        const { username, password, email, full_name, phone, address } = req.body ?? {};

        if (typeof username !== "string" || username.trim().length < 3) {
            return res.status(400).json({ message: "username is required (min 3 characters)" });
        }
        if (!isEmail(email)) {
            return res.status(400).json({ message: "A valid email is required" });
        }
        if (typeof password !== "string" || password.length < 8) {
            return res.status(400).json({ message: "password is required and must be at least 8 characters" });
        }

        const user = await prisma.kHACHHANG.create({
            data: {
                username: username.trim(),
                password: await hashPassword(password),
                email: email.trim().toLowerCase(),
                full_name,
                phone,
                address,
            },
            select: publicFields,
        });

        res.status(201).json({ token: signToken(user), user });
    } catch (error) {
        return handleError(res, error, "Cannot register", "Register error:");
    }
};

// POST /auth/login  { username | email, password }
export const login = async (req, res) => {
    try {
        const { username, email, password } = req.body ?? {};
        const identifier = (username ?? email)?.toString().trim();

        if (!identifier || typeof password !== "string") {
            return res.status(400).json({ message: "username (or email) and password are required" });
        }

        const found = await prisma.kHACHHANG.findFirst({
            where: { OR: [{ username: identifier }, { email: identifier.toLowerCase() }] },
        });

        if (!found || !(await verifyPassword(password, found.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const { password: _pw, ...user } = found;
        res.json({ token: signToken(user), user });
    } catch (error) {
        return handleError(res, error, "Cannot login", "Login error:");
    }
};

// GET /auth/me
export const me = async (req, res) => {
    try {
        const user = await prisma.kHACHHANG.findUnique({
            where: { user_id: req.user.id },
            select: publicFields,
        });
        if (!user) return res.status(404).json({ message: "Customer not found" });
        res.json({ ...user, role: req.user.role });
    } catch (error) {
        return handleError(res, error, "Cannot get profile", "Get profile error:");
    }
};
