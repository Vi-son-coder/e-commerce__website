import { prisma } from "../config/database.js";
import { handleError, HttpError } from "../utils/errors.js";
import { recommendForUser } from "../services/recommender.js";

// GET tất cả recommendations
export const getRecommendations = async (req, res) => {
try {
const recommendations = await prisma.pRODUCT_RECOMMENDATIONS.findMany({
include: {
AI_MODEL: true,
KHACHHANG: {
select: {
user_id: true,
username: true,
full_name: true
}
},
SANPHAM: true
},
orderBy: {
recommended_at: "desc"
}
});

    res.json(recommendations);
} catch (error) {
    return handleError(res, error, "Cannot get recommendations", "Get recommendations error:");
}

};

// GET recommendation theo ID
export const getRecommendationById = async (req, res) => {
try {
const id = Number(req.params.id);

    const recommendation =
        await prisma.pRODUCT_RECOMMENDATIONS.findUnique({
            where: {
                recommendation_id: id
            },
            include: {
                AI_MODEL: true,
                KHACHHANG: true,
                SANPHAM: true
            }
        });

    if (!recommendation) {
        return res.status(404).json({
            message: "Recommendation not found"
        });
    }

    res.json(recommendation);
} catch (error) {
    return handleError(res, error, "Cannot get recommendation", "Get recommendation error:");
}

};

// GET recommendation theo user
export const getRecommendationsByUser = async (req, res) => {
try {
const userId = Number(req.params.userId);

    const recommendations =
        await prisma.pRODUCT_RECOMMENDATIONS.findMany({
            where: {
                user_id: userId
            },
            include: {
                AI_MODEL: true,
                SANPHAM: true
            },
            orderBy: {
                score: "desc"
            }
        });

    res.json(recommendations);
} catch (error) {
    return handleError(res, error, "Cannot get recommendations", "Get recommendations by user error:");
}

};

// POST tạo recommendation
export const createRecommendation = async (req, res) => {
try {
const {
user_id,
product_id,
model_id,
score
} = req.body;

    const recommendation =
        await prisma.pRODUCT_RECOMMENDATIONS.create({
            data: {
                user_id: Number(user_id),
                product_id: Number(product_id),
                model_id: Number(model_id),
                score: Number(score)
            }
        });

    res.status(201).json(recommendation);
} catch (error) {
    return handleError(res, error, "Cannot create recommendation", "Create recommendation error:");
}

};

// DELETE recommendation
export const deleteRecommendation = async (req, res) => {
try {
const id = Number(req.params.id);

    await prisma.pRODUCT_RECOMMENDATIONS.delete({
        where: {
            recommendation_id: id
        }
    });

    res.json({
        message: "Recommendation deleted successfully"
    });
} catch (error) {
    return handleError(res, error, "Cannot delete recommendation", "Delete recommendation error:");
}

};

// POST /recommendations/generate/:userId   body/query: { model_id?, limit? }
// Builds item-based CF recommendations from USER_BEHAVIER and replaces the user's
// previous recommendations for that model. Defaults to the newest active AI model.
export const generateRecommendations = async (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const limit = Math.min(Math.max(parseInt(req.body?.limit ?? req.query.limit, 10) || 10, 1), 50);
        const requestedModel = req.body?.model_id ?? req.query.model_id;

        const user = await prisma.kHACHHANG.findUnique({ where: { user_id: userId } });
        if (!user) throw new HttpError(404, "Customer not found");

        const model = requestedModel
            ? await prisma.aI_MODEL.findUnique({ where: { model_id: Number(requestedModel) } })
            : await prisma.aI_MODEL.findFirst({ where: { status: "active" }, orderBy: { model_id: "desc" } });
        if (!model) throw new HttpError(404, "AI model not found (create an active model first)");

        const [rows, products, bought] = await Promise.all([
            prisma.uSER_BEHAVIER.findMany({
                select: { user_id: true, product_id: true, behavior_type: true, duration: true },
            }),
            prisma.sANPHAM.findMany({
                where: { status: "active", quantity: { gt: 0 } },
                select: { product_id: true },
            }),
            prisma.cHITIETDONHANG.findMany({
                where: { DONHANG: { user_id: userId } },
                select: { product_id: true },
            }),
        ]);

        const excludeIds = new Set(bought.map((b) => b.product_id));
        for (const r of rows) {
            if (r.user_id === userId && r.behavior_type === "purchase") excludeIds.add(r.product_id);
        }

        const picks = recommendForUser(rows, userId, {
            candidateIds: new Set(products.map((p) => p.product_id)),
            excludeIds,
            limit,
        });

        await prisma.$transaction(async (tx) => {
            await tx.pRODUCT_RECOMMENDATIONS.deleteMany({ where: { user_id: userId, model_id: model.model_id } });
            if (picks.length) {
                await tx.pRODUCT_RECOMMENDATIONS.createMany({
                    data: picks.map((p) => ({
                        user_id: userId,
                        product_id: p.product_id,
                        model_id: model.model_id,
                        score: p.score,
                    })),
                });
            }
        });

        const saved = await prisma.pRODUCT_RECOMMENDATIONS.findMany({
            where: { user_id: userId, model_id: model.model_id },
            include: { SANPHAM: true },
            orderBy: { score: "desc" },
        });
        res.json({ model_id: model.model_id, count: saved.length, recommendations: saved });
    } catch (error) {
        return handleError(res, error, "Cannot generate recommendations", "Generate recommendations error:");
    }
};
