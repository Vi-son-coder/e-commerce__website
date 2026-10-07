import { prisma } from "../config/database.js";
import { handleError } from "../utils/errors.js";

// GET tất cả training data
export const getTraining = async (req, res) => {
try {
const training = await prisma.dATA_TRAINING.findMany({
include: {
AI_MODEL: true,
KHACHHANG: {
select: {
user_id: true,
username: true,
full_name: true
}
},
SANPHAM: true,
USER_BEHAVIER: true
},
orderBy: {
training_id: "desc"
}
});

    res.json(training);
} catch (error) {
    return handleError(res, error, "Cannot get training data", "Get training error:");
}

};

// GET training theo ID
export const getTrainingById = async (req, res) => {
try {
const id = Number(req.params.id);

    const training = await prisma.dATA_TRAINING.findUnique({
        where: {
            training_id: id
        },
        include: {
            AI_MODEL: true,
            KHACHHANG: true,
            SANPHAM: true,
            USER_BEHAVIER: true
        }
    });

    if (!training) {
        return res.status(404).json({
            message: "Training data not found"
        });
    }

    res.json(training);
} catch (error) {
    return handleError(res, error, "Cannot get training data", "Get training by ID error:");
}

};

// GET training theo model
export const getTrainingByModel = async (req, res) => {
try {
const modelId = Number(req.params.modelId);

    const training = await prisma.dATA_TRAINING.findMany({
        where: {
            model_id: modelId
        },
        include: {
            KHACHHANG: true,
            SANPHAM: true,
            USER_BEHAVIER: true
        },
        orderBy: {
            create_date: "desc"
        }
    });

    res.json(training);
} catch (error) {
    return handleError(res, error, "Cannot get training data", "Get training by model error:");
}

};

// GET training theo user
export const getTrainingByUser = async (req, res) => {
try {
const userId = Number(req.params.userId);

    const training = await prisma.dATA_TRAINING.findMany({
        where: {
            user_id: userId
        },
        include: {
            AI_MODEL: true,
            SANPHAM: true,
            USER_BEHAVIER: true
        },
        orderBy: {
            create_date: "desc"
        }
    });

    res.json(training);
} catch (error) {
    return handleError(res, error, "Cannot get training data", "Get training by user error:");
}

};

// POST tạo training data
export const createTraining = async (req, res) => {
try {
const {
model_id,
user_id,
product_id,
behavior_id
} = req.body;

    const training = await prisma.dATA_TRAINING.create({
        data: {
            model_id: Number(model_id),
            user_id: Number(user_id),
            product_id: Number(product_id),
            behavior_id: Number(behavior_id)
        }
    });

    res.status(201).json(training);
} catch (error) {
    return handleError(res, error, "Cannot create training data", "Create training error:");
}

};

// DELETE training data
export const deleteTraining = async (req, res) => {
try {
const id = Number(req.params.id);

    await prisma.dATA_TRAINING.delete({
        where: {
            training_id: id
        }
    });

    res.json({
        message: "Training data deleted successfully"
    });
} catch (error) {
    return handleError(res, error, "Cannot delete training data", "Delete training error:");
}

};