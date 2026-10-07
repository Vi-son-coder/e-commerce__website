import test from "node:test";
import assert from "node:assert/strict";
import { recommendForUser, behaviorWeight } from "../services/recommender.js";

const rows = [
    // user 1 and 2 both liked product 1; user 2 also liked product 2 -> recommend 2 to user 1
    { user_id: 1, product_id: 1, behavior_type: "purchase" },
    { user_id: 2, product_id: 1, behavior_type: "view", duration: 60 },
    { user_id: 2, product_id: 2, behavior_type: "click" },
    // user 3 only touches product 3 (unrelated)
    { user_id: 3, product_id: 3, behavior_type: "view" },
];
const all = new Set([1, 2, 3]);

test("weights: purchase > click > view, long views count more", () => {
    assert.ok(behaviorWeight("purchase") > behaviorWeight("click"));
    assert.ok(behaviorWeight("click") > behaviorWeight("view"));
    assert.ok(behaviorWeight("view", 120) > behaviorWeight("view", 5));
});

test("collaborative neighbour is ranked first, scores in [0,1]", () => {
    const out = recommendForUser(rows, 1, { candidateIds: all, excludeIds: new Set([1]), limit: 5 });
    assert.equal(out[0].product_id, 2);
    for (const r of out) assert.ok(r.score >= 0 && r.score <= 1);
});

test("never recommends excluded, own, or unavailable products", () => {
    const out = recommendForUser(rows, 1, { candidateIds: new Set([1, 3]), excludeIds: new Set([1]), limit: 5 });
    assert.ok(!out.some((r) => r.product_id === 1 || r.product_id === 2));
});

test("cold start user gets popular products with low scores", () => {
    const out = recommendForUser(rows, 99, { candidateIds: all, limit: 2 });
    assert.equal(out.length, 2);
    assert.ok(out.every((r) => r.score <= 0.1));
});
