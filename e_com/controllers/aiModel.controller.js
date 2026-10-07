import { prisma } from "../config/database.js";
import { handleError, HttpError } from "../utils/errors.js";

// GET /ai-models
export const getAIModels = async (req, res) => {
try {
const models = await prisma.aI_MODEL.findMany({
orderBy: {
model_id: "asc"
}
});

    res.json(models);
} catch (error) {
    return handleError(res, error, "Cannot get AI models", "Get AI models error:");
}

};

// GET /ai-models/
export const getAIModelById = async (req, res) => {
try {
const id = Number(req.params.id);

    const model = await prisma.aI_MODEL.findUnique({
        where: {
            model_id: id
        }
    });

    if (!model) {
        return res.status(404).json({
            message: "AI model not found"
        });
    }

    res.json(model);
} catch (error) {
    return handleError(res, error, "Cannot get AI model", "Get AI model error:");
}

};

// POST /ai-models
export const createAIModel = async (req, res) => {
try {
const {
model_name,
version,
algorithm,
trained_date,
status
} = req.body;

    const model = await prisma.aI_MODEL.create({
        data: {
            model_name,
            version: Number(version),
            algorithm,
            trained_date: trained_date
                ? new Date(trained_date)
                : undefined,
            status: status ?? "active"
        }
    });

    res.status(201).json(model);
} catch (error) {
    return handleError(res, error, "Cannot create AI model", "Create AI model error:");
}

};

// PUT /ai-models/
export const updateAIModel = async (req, res) => {
try {
const id = Number(req.params.id);

    const {
        model_name,
        version,
        algorithm,
        trained_date,
        status
    } = req.body;

    const model = await prisma.aI_MODEL.update({
        where: {
            model_id: id
        },
        data: {
            model_name,
            version: version !== undefined
                ? Number(version)
                : undefined,
            algorithm,
            trained_date: trained_date
                ? new Date(trained_date)
                : undefined,
            status
        }
    });

    res.json(model);
} catch (error) {
    return handleError(res, error, "Cannot update AI model", "Update AI model error:");
}

};

// DELETE /ai-models/
export const deleteAIModel = async (req, res) => {
try {
const id = Number(req.params.id);

    await prisma.aI_MODEL.delete({
        where: {
            model_id: id
        }
    });

    res.json({
        message: "AI model deleted successfully"
    });
} catch (error) {
    return handleError(res, error, "Cannot delete AI model", "Delete AI model error:");
}

};

// POST /ai-models/:id/train
// Snapshots every behavior not yet recorded for this model into DATA_TRAINING and
// stamps trained_date. Safe to call repeatedly (only new behaviors are added).
export const trainAIModel = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const model = await prisma.aI_MODEL.findUnique({ where: { model_id: id } });
        if (!model) throw new HttpError(404, "AI model not found");

        const [behaviors, existing] = await Promise.all([
            prisma.uSER_BEHAVIER.findMany({
                select: { behavior_id: true, user_id: true, product_id: true },
            }),
            prisma.dATA_TRAINING.findMany({ where: { model_id: id }, select: { behavior_id: true } }),
        ]);

        const seen = new Set(existing.map((e) => e.behavior_id));
        const fresh = behaviors
            .filter((b) => !seen.has(b.behavior_id))
            .map((b) => ({ model_id: id, user_id: b.user_id, product_id: b.product_id, behavior_id: b.behavior_id }));

        // SQL Server allows 2100 parameters per statement: 4 columns x 400 rows is safe.
        const updated = await prisma.$transaction(async (tx) => {
            for (let i = 0; i < fresh.length; i += 400) {
                await tx.dATA_TRAINING.createMany({ data: fresh.slice(i, i + 400) });
            }
            return tx.aI_MODEL.update({ where: { model_id: id }, data: { trained_date: new Date() } });
        });

        res.json({
            model: updated,
            added: fresh.length,
            total: existing.length + fresh.length,
        });
    } catch (error) {
        return handleError(res, error, "Cannot train AI model", "Train AI model error:");
    }
};
