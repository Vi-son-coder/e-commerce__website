import { prisma } from "../config/database.js";
import { handleError } from "../utils/errors.js";

// GET /categories
export const getCategories = async (req, res) => {
try {
const categories = await prisma.dANHMUC.findMany({
orderBy: {
category_id: "asc"
}
});

    res.json(categories);
} catch (error) {
    return handleError(res, error, "Cannot get categories", "Get categories error:");
}

};

// GET /categories/
export const getCategoryById = async (req, res) => {
try {
const id = Number(req.params.id);

    const category = await prisma.dANHMUC.findUnique({
        where: {
            category_id: id
        }
    });

    if (!category) {
        return res.status(404).json({
            message: "Category not found"
        });
    }

    res.json(category);
} catch (error) {
    return handleError(res, error, "Cannot get category", "Get category error:");
}

};

// POST /categories
export const createCategory = async (req, res) => {
try {
const {
category_name,
description
} = req.body;

    const category = await prisma.dANHMUC.create({
        data: {
            category_name,
            description
        }
    });

    res.status(201).json(category);
} catch (error) {
    return handleError(res, error, "Cannot create category", "Create category error:");
}

};

// PUT /categories/
export const updateCategory = async (req, res) => {
try {
const id = Number(req.params.id);

    const {
        category_name,
        description
    } = req.body;

    const category = await prisma.dANHMUC.update({
        where: {
            category_id: id
        },
        data: {
            category_name,
            description
        }
    });

    res.json(category);
} catch (error) {
    return handleError(res, error, "Cannot update category", "Update category error:");
}

};

// DELETE /categories/
export const deleteCategory = async (req, res) => {
try {
const id = Number(req.params.id);

    await prisma.dANHMUC.delete({
        where: {
            category_id: id
        }
    });

    res.json({
        message: "Category deleted successfully"
    });
} catch (error) {
    return handleError(res, error, "Cannot delete category", "Delete category error:");
}

};