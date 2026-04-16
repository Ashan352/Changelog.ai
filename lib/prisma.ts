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
      throw new Error("DATABASE_URL is missing. Please check your .env file.");
    }
    
    // Configure pool with SSL for production environments (Vercel/Neon)
    // Also enable SSL if the connection string explicitly requests it (common for remote DBs in dev)
    const hasSslMode = connectionString.includes("sslmode=");
    const pool = new Pool({ 
      connectionString,
      ssl: (process.env.NODE_ENV === "production" || hasSslMode) 
        ? { rejectUnauthorized: false } 
        : false,
      max: 10,
      idleTimeoutMillis: 60000,
      connectionTimeoutMillis: 15000,
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
