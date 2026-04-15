import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

let _prisma: PrismaClient | undefined;

function getPrismaClient(): PrismaClient {
  const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }
  
  if (globalForPrisma.prisma) return globalForPrisma.prisma;
  
  if (!_prisma) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      console.warn("DATABASE_URL is missing. Prisma will likely fail when used.");
    }
    
    // Configure pool with SSL for production environments (Vercel/Neon)
    const pool = new Pool({ 
      connectionString,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    const adapter = new PrismaPg(pool);
    _prisma = new PrismaClient({ 
      adapter,
      log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"]
    });

    if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = _prisma;
  }
  return _prisma;
}

// Export a Proxy that initializes Prisma on first access
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getPrismaClient();
    return Reflect.get(client, prop, receiver);
  },
});

export default prisma;
