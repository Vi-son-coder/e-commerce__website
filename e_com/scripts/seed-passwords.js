// Replaces the placeholder passwords from SQLQuery1.sql ("DEMO_HASH_*") with real scrypt
// hashes so the demo accounts can log in. Rows that already hold a hash are left alone.
// Usage: npm run seed:passwords -- <newPassword>     (default: Password@123)
import { prisma } from "../config/database.js";
import { hashPassword } from "../utils/password.js";

const password = process.argv[2] ?? "Password@123";
if (password.length < 8) {
    console.error("Password must be at least 8 characters");
    process.exit(1);
}

const users = await prisma.kHACHHANG.findMany({ select: { user_id: true, username: true, password: true } });
let n = 0;
for (const u of users) {
    if (u.password.startsWith("scrypt$")) continue;
    await prisma.kHACHHANG.update({
        where: { user_id: u.user_id },
        data: { password: await hashPassword(password) },
    });
    console.log(`reset password for ${u.username}`);
    n++;
}
console.log(`Done, ${n} account(s) updated.`);
await prisma.$disconnect();
