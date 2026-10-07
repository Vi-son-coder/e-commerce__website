// Item-based collaborative filtering over USER_BEHAVIER.
// Pure functions (no DB access) so they can be unit-tested.

const WEIGHTS = {
    view: 1,
    click: 2,
    wishlist: 3,
    add_to_cart: 3,
    cart: 3,
    purchase: 5,
};

export function behaviorWeight(type, duration) {
    const key = String(type ?? "").toLowerCase();
    let w = WEIGHTS[key] ?? 1;
    // Longer views signal more interest (capped at +1 for 2 minutes).
    if (key === "view" && Number.isFinite(duration) && duration > 0) {
        w += Math.min(duration, 120) / 120;
    }
    return w;
}

/** rows: [{ user_id, product_id, behavior_type, duration }] -> Map<productId, Map<userId, weight>> */
export function buildItemVectors(rows) {
    const items = new Map();
    for (const r of rows) {
        const w = behaviorWeight(r.behavior_type, r.duration);
        if (!items.has(r.product_id)) items.set(r.product_id, new Map());
        const users = items.get(r.product_id);
        users.set(r.user_id, (users.get(r.user_id) ?? 0) + w);
    }
    return items;
}

function cosine(a, b) {
    let dot = 0;
    for (const [u, wa] of a) {
        const wb = b.get(u);
        if (wb) dot += wa * wb;
    }
    if (dot === 0) return 0;
    const norm = (m) => Math.sqrt([...m.values()].reduce((s, x) => s + x * x, 0));
    return dot / (norm(a) * norm(b));
}

/**
 * @param rows            all behavior rows
 * @param userId          target user
 * @param candidateIds    Set of product ids that may be recommended (active + in stock)
 * @param excludeIds      Set of product ids to skip (already purchased)
 * @returns [{ product_id, score }] sorted by score desc, score in [0, 1]
 */
export function recommendForUser(rows, userId, { candidateIds, excludeIds = new Set(), limit = 10 }) {
    const items = buildItemVectors(rows);
    const own = new Map(); // productId -> weight for the target user
    for (const [pid, users] of items) {
        if (users.has(userId)) own.set(pid, users.get(userId));
    }
    const ownTotal = [...own.values()].reduce((s, x) => s + x, 0);
    const allowed = (pid) => candidateIds.has(pid) && !excludeIds.has(pid);

    const scored = new Map();
    if (ownTotal > 0) {
        for (const [cid, cvec] of items) {
            if (!allowed(cid) || own.has(cid)) continue;
            let s = 0;
            for (const [pid, w] of own) s += w * cosine(items.get(pid), cvec);
            s /= ownTotal;
            if (s > 0) scored.set(cid, s);
        }
    }

    const result = [...scored].map(([product_id, score]) => ({ product_id, score }));
    result.sort((a, b) => b.score - a.score);
    const out = result.slice(0, limit);

    // Cold-start / not enough neighbours: fill with popular products (low score, 0..0.1).
    if (out.length < limit) {
        const taken = new Set(out.map((x) => x.product_id));
        const popularity = [...items]
            .filter(([pid]) => allowed(pid) && !taken.has(pid) && !own.has(pid))
            .map(([pid, users]) => [pid, [...users.values()].reduce((s, x) => s + x, 0)])
            .sort((a, b) => b[1] - a[1]);
        const max = popularity[0]?.[1] ?? 1;
        for (const [pid, pop] of popularity) {
            if (out.length >= limit) break;
            out.push({ product_id: pid, score: 0.1 * (pop / max) });
        }
    }

    return out.map((x) => ({ ...x, score: Math.round(x.score * 10000) / 10000 }));
}
