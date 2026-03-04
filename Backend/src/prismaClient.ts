import {PrismaPg} from '@prisma/adapter-pg';
import {PrismaClient} from '@prisma/client';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});


const prisma = new PrismaClient({adapter});

export {prisma};

// import {PrismaClient} from "@prisma/client";
//
// const prismaClientSingleton = () => {
//     return new PrismaClient()
// }
//
// type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>
//
// const globalForPrisma = globalThis as unknown as {
//     prisma: PrismaClientSingleton | undefined
// }
//
// const prisma = globalForPrisma.prisma ?? prismaClientSingleton();
//
// export { prisma };
//
// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// import 'dotenv/config'; // ← Дублируем на всякий случай внутри файла
// import { PrismaClient } from '@prisma/client';
//
// // Простой экземпляр без сложной логики
// const prisma = new PrismaClient({
//     log: ['error'], // Минимум логов
// });
//
// export {prisma};