import { randomBytes, scrypt as _scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(_scrypt);
const KEYLEN = 64;

/** Returns "scrypt$<salt hex>$<hash hex>" */
export async function hashPassword(password) {
    const salt = randomBytes(16);
    const hash = await scrypt(password, salt, KEYLEN);
    return `scrypt$${salt.toString("hex")}$${hash.toString("hex")}`;
}

/** For your future login endpoint. */
export async function verifyPassword(password, stored) {
    const [scheme, saltHex, hashHex] = String(stored).split("$");
    if (scheme !== "scrypt" || !saltHex || !hashHex) return false; // e.g. old plaintext row
    const expected = Buffer.from(hashHex, "hex");
    const actual = await scrypt(password, Buffer.from(saltHex, "hex"), expected.length);
    return timingSafeEqual(actual, expected);
}
