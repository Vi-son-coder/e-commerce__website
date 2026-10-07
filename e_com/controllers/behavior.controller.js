import { prisma } from "../config/database.js";
import { handleError } from "../utils/errors.js";

// GET /behaviors
export const getBehaviors = async (req, res) => {
try {
const behaviors = await prisma.uSER_BEHAVIER.findMany({
include: {
KHACHHANG: {
select: {
user_id: true,
username: true,
full_name: true
}
},
SANPHAM: {
select: {
product_id: true,
product_name: true,
price: true
}
}
},
orderBy: {
behavior_time: "desc"
}
});

    res.json(behaviors);
} catch (error) {
    return handleError(res, error, "Cannot get behaviors", "Get behaviors error:");
}

};

// GET /behaviors/
export const getBehaviorById = async (req, res) => {
try {
const id = Number(req.params.id);

    const behavior = await prisma.uSER_BEHAVIER.findUnique({
        where: {
            behavior_id: id
        },
        include: {
            KHACHHANG: {
                select: {
                    user_id: true,
                    username: true,
                    full_name: true
                }
            },
            SANPHAM: {
                select: {
                    product_id: true,
                    product_name: true,
                    price: true
                }
            }
        }
    });

    if (!behavior) {
        return res.status(404).json({
            message: "Behavior not found"
        });
    }

    res.json(behavior);
} catch (error) {
    return handleError(res, error, "Cannot get behavior", "Get behavior error:");
}

};

// GET /behaviors/user/
export const getBehaviorsByUser = async (req, res) => {
try {
const userId = Number(req.params.userId);

    const behaviors = await prisma.uSER_BEHAVIER.findMany({
        where: {
            user_id: userId
        },
        include: {
            SANPHAM: {
                select: {
                    product_id: true,
                    product_name: true,
                    price: true,
                    image: true
                }
            }
        },
        orderBy: {
            behavior_time: "desc"
        }
    });

    res.json(behaviors);
} catch (error) {
    return handleError(res, error, "Cannot get user behaviors", "Get user behaviors error:");
}

};

// GET /behaviors/product/
export const getBehaviorsByProduct = async (req, res) => {
try {
const productId = Number(req.params.productId);

    const behaviors = await prisma.uSER_BEHAVIER.findMany({
        where: {
            product_id: productId
        },
        include: {
            KHACHHANG: {
                select: {
                    user_id: true,
                    username: true,
                    full_name: true
                }
            }
        },
        orderBy: {
            behavior_time: "desc"
        }
    });

    res.json(behaviors);
} catch (error) {
    return handleError(res, error, "Cannot get product behaviors", "Get product behaviors error:");
}

};

// POST /behaviors
export const createBehavior = async (req, res) => {
try {
const {
user_id,
product_id,
behavior_type,
duration
} = req.body;

    const behavior = await prisma.uSER_BEHAVIER.create({
        data: {
            user_id: Number(user_id),
            product_id: Number(product_id),
            behavior_type,
            duration: duration !== undefined
                ? Number(duration)
                : undefined
        },
        include: {
            SANPHAM: true
        }
    });

    res.status(201).json(behavior);
} catch (error) {
    return handleError(res, error, "Cannot create behavior", "Create behavior error:");
}

};

// PUT /behaviors/
export const updateBehavior = async (req, res) => {
try {
const id = Number(req.params.id);

    const {
        behavior_type,
        duration
    } = req.body;

    const behavior = await prisma.uSER_BEHAVIER.update({
        where: {
            behavior_id: id
        },
        data: {
            behavior_type,
            duration: duration !== undefined
                ? Number(duration)
                : undefined
        }
    });

    res.json(behavior);
} catch (error) {
    return handleError(res, error, "Cannot update behavior", "Update behavior error:");
}

};

// DELETE /behaviors/
export const deleteBehavior = async (req, res) => {
try {
const id = Number(req.params.id);

    await prisma.uSER_BEHAVIER.delete({
        where: {
            behavior_id: id
        }
    });

    res.json({
        message: "Behavior deleted successfully"
    });
} catch (error) {
    return handleError(res, error, "Cannot delete behavior", "Delete behavior error:");
}

};