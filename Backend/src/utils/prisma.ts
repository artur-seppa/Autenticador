import { PrismaClient } from "@prisma/client";

/* define a conexao com o banco de dados de forma global */
export const prisma = new PrismaClient();