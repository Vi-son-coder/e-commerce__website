// Smoke tests for routes that do not need the database.
import test, { before, after } from "node:test";
import assert from "node:assert/strict";

process.env.JWT_SECRET = "test-secret-test-secret-1234";
process.env.PORT = "0";
process.env.PROTECT_ROUTES = "true";

let base;
let server;
before(async () => {
    const http = await import("node:http");
    const origListen = http.Server.prototype.listen;
    http.Server.prototype.listen = function (...a) {
        server = this;
        return origListen.apply(this, a);
    };
    await import("../server.js");
    await new Promise((r) => (server.listening ? r() : server.once("listening", r)));
    base = `http://127.0.0.1:${server.address().port}`;
});
after(() => server?.close());

const j = (path, opts) => fetch(base + path, opts).then(async (r) => ({ status: r.status, body: await r.json().catch(() => null) }));

test("root + 404", async () => {
    assert.equal((await j("/")).status, 200);
    assert.equal((await j("/nope")).status, 404);
});

test("checkout and /auth/me need a token", async () => {
    assert.equal((await j("/orders/checkout", { method: "POST" })).status, 401);
    assert.equal((await j("/auth/me")).status, 401);
    assert.equal((await j("/orders/mine")).status, 401);
});

test("bad token is rejected", async () => {
    const r = await j("/auth/me", { headers: { Authorization: "Bearer abc" } });
    assert.equal(r.status, 401);
});

test("protected CRUD requires admin; customer token gets 403", async () => {
    const { signToken } = await import("../utils/auth.js");
    const tok = signToken({ user_id: 5, username: "bob" });
    const r = await j("/customers", { headers: { Authorization: `Bearer ${tok}` } });
    assert.equal(r.status, 403);
    assert.equal((await j("/customers")).status, 401);
});

test("checkout validates body before touching the DB", async () => {
    const { signToken } = await import("../utils/auth.js");
    const headers = { "Content-Type": "application/json", Authorization: `Bearer ${signToken({ user_id: 5, username: "bob" })}` };
    const post = (b) => j("/orders/checkout", { method: "POST", headers, body: JSON.stringify(b) });
    assert.equal((await post({ items: [{ product_id: 1, quantity: 1 }] })).status, 400); // no address
    assert.equal((await post({ shipping_address: "x", items: [] })).status, 400);
    assert.equal((await post({ shipping_address: "x", items: [{ product_id: 1, quantity: 0 }] })).status, 400);
});

test("register validates input; invalid id and malformed JSON -> 400", async () => {
    const headers = { "Content-Type": "application/json" };
    assert.equal((await j("/auth/register", { method: "POST", headers, body: JSON.stringify({ username: "ab" }) })).status, 400);
    assert.equal((await j("/auth/login", { method: "POST", headers, body: "{}" })).status, 400);
    assert.equal((await j("/auth/register", { method: "POST", headers, body: "{bad" })).status, 400);
    assert.equal((await j("/products/abc")).status, 400);
});
