import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const globalForPrisma = global as unknown as {
    prisma: PrismaClient
}

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });

// Hot reload aşamasında her seferinde yeni bir instance oluşmaması için 
const prisma  = globalForPrisma.prisma ||  new PrismaClient({ adapter });


if(process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
}


export default prisma;



