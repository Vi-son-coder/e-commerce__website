import { prisma } from "../config/database.js";
import { hashPassword } from "../utils/password.js";
import { handleError } from "../utils/errors.js";

// GET /customers
export const getCustomers = async (req, res) => {
try {
const customers = await prisma.kHACHHANG.findMany({
select: {
user_id: true,
username: true,
email: true,
full_name: true,
phone: true,
address: true
},
orderBy: {
user_id: "asc"
}
});

    res.json(customers);
} catch (error) {
    return handleError(res, error, "Cannot get customers", "Get customers error:");
}

};

// GET /customers/
export const getCustomerById = async (req, res) => {
try {
const id = Number(req.params.id);

    const customer = await prisma.kHACHHANG.findUnique({
        where: {
            user_id: id
        },
        select: {
            user_id: true,
            username: true,
            email: true,
            full_name: true,
            phone: true,
            address: true
        }
    });

    if (!customer) {
        return res.status(404).json({
            message: "Customer not found"
        });
    }

    res.json(customer);
} catch (error) {
    return handleError(res, error, "Cannot get customer", "Get customer error:");
}

};

// POST /customers
export const createCustomer = async (req, res) => {
try {
const {
username,
password,
email,
full_name,
phone,
address
} = req.body;

    if (typeof password !== "string" || password.length < 8) {
        return res.status(400).json({
            message: "password is required and must be at least 8 characters"
        });
    }

    const customer = await prisma.kHACHHANG.create({
        data: {
            username,
            password: await hashPassword(password),
            email,
            full_name,
            phone,
            address
        },
        select: {
            user_id: true,
            username: true,
            email: true,
            full_name: true,
            phone: true,
            address: true
        }
    });

    res.status(201).json(customer);
} catch (error) {
    return handleError(res, error, "Cannot create customer", "Create customer error:");
}

};

// PUT /customers/
export const updateCustomer = async (req, res) => {
try {
const id = Number(req.params.id);

    const {
        username,
        password,
        email,
        full_name,
        phone,
        address
    } = req.body;

    const customer = await prisma.kHACHHANG.update({
        where: {
            user_id: id
        },
        data: {
            username,
            password: password !== undefined
                ? await hashPassword(password)
                : undefined,
            email,
            full_name,
            phone,
            address
        },
        select: {
            user_id: true,
            username: true,
            email: true,
            full_name: true,
            phone: true,
            address: true
        }
    });

    res.json(customer);
} catch (error) {
    return handleError(res, error, "Cannot update customer", "Update customer error:");
}

};

// DELETE /customers/
export const deleteCustomer = async (req, res) => {
try {
const id = Number(req.params.id);

    await prisma.kHACHHANG.delete({
        where: {
            user_id: id
        }
    });

    res.json({
        message: "Customer deleted successfully"
    });
} catch (error) {
    return handleError(res, error, "Cannot delete customer", "Delete customer error:");
}

};