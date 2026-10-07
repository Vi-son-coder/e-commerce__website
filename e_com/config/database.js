import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaMssql } from "@prisma/adapter-mssql";

const adapter = new PrismaMssql({
server: process.env.DB_SERVER,
port: Number(process.env.DB_PORT),
database: process.env.DB_NAME,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,

options: {
    encrypt: true,
    trustServerCertificate: true
}

});

export const prisma = new PrismaClient({
adapter
});