
import "dotenv/config";

import express from "express";
import cors from "cors";
import helmet from "helmet";

import { prisma } from "./config/database.js";

import authRouter from "./modules/auth/auth.routes.js";
import { AuthError } from "./modules/auth/services/auth.service.js";

const app = express();

const PORT = Number(process.env.PORT) || 5000;

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(helmet());
app.use(cors());
app.use(express.json());

// ==========================================
// ROOT ROUTE
// ==========================================

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to FinPulse AI API",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
  });
});

// ==========================================
// AUTHENTICATION ROUTES
// ==========================================

app.use("/api/v1/auth", authRouter);

// ==========================================
// SERVER HEALTH CHECK
// ==========================================

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    status: "healthy",
    service: "FinPulse AI Backend",
    timestamp: new Date().toISOString(),
  });
});

// ==========================================
// DATABASE HEALTH CHECK
// ==========================================

app.get("/health/db", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      success: true,
      status: "connected",
      database: "PostgreSQL",
      message: "Database connection successful",
    });
  } catch (error) {
    console.error("Database health check failed:", error);

    res.status(503).json({
      success: false,
      status: "disconnected",
      message: "Database connection failed",
    });
  }
});

// ==========================================
// CENTRAL ERROR HANDLER
// ==========================================

app.use(
  (
    error: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error("API error:", error);

    if (error instanceof AuthError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "An unexpected server error occurred.",
    });
  }
);

// ==========================================
// START SERVER
// ==========================================

const server = app.listen(PORT, () => {
  console.log("--------------------------------------");
  console.log("       FINPULSE AI BACKEND");
  console.log("--------------------------------------");
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Database check: http://localhost:${PORT}/health/db`);
  console.log("--------------------------------------");
});

// ==========================================
// GRACEFUL SHUTDOWN
// ==========================================

async function shutdown() {
  console.log("Shutting down FinPulse AI backend...");

  server.close(async () => {
    await prisma.$disconnect();
    console.log("Database disconnected.");
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
