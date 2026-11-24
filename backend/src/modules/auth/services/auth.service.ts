
import argon2 from "argon2";
import { createHash, randomBytes } from "node:crypto";
import { SignJWT } from "jose";

import { prisma } from "../../../config/database.js";
import type {
  RegisterInput,
  LoginInput,
} from "../schemas/auth.schema.js";

// ==========================================
// CONFIGURATION
// ==========================================

const JWT_SECRET = process.env.AUTH_ACCESS_TOKEN_SECRET;

if (!JWT_SECRET || JWT_SECRET.length < 40) {
  throw new Error("A valid AUTH_ACCESS_TOKEN_SECRET is required.");
}

const JWT_KEY = new TextEncoder().encode(JWT_SECRET);

const JWT_ISSUER = process.env.AUTH_ISSUER || "finpulse-ai";
const JWT_AUDIENCE =
  process.env.AUTH_AUDIENCE || "finpulse-ai-users";

const ACCESS_TOKEN_EXPIRES_IN =
  process.env.AUTH_ACCESS_TOKEN_EXPIRES_IN || "15m";

const REFRESH_TOKEN_EXPIRES_DAYS = Number(
  process.env.AUTH_REFRESH_TOKEN_EXPIRES_DAYS || 30
);

if (
  !Number.isInteger(REFRESH_TOKEN_EXPIRES_DAYS) ||
  REFRESH_TOKEN_EXPIRES_DAYS < 1 ||
  REFRESH_TOKEN_EXPIRES_DAYS > 90
) {
  throw new Error("Refresh-token expiry must be between 1 and 90 days.");
}

// ==========================================
// CUSTOM AUTHENTICATION ERROR
// ==========================================

export class AuthError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number
  ) {
    super(message);
    this.name = "AuthError";
  }
}

// ==========================================
// HELPER FUNCTIONS
// ==========================================

function hashRefreshToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function generateRefreshToken(): string {
  return randomBytes(48).toString("base64url");
}

function getRefreshExpiry(): Date {
  return new Date(
    Date.now() + REFRESH_TOKEN_EXPIRES_DAYS * 24 * 60 * 60 * 1000
  );
}

async function generateAccessToken(
  userId: string,
  email: string,
  sessionId: string
): Promise<string> {
  return new SignJWT({
    email,
    sid: sessionId,
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setSubject(userId)
    .setIssuer(JWT_ISSUER)
    .setAudience(JWT_AUDIENCE)
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRES_IN)
    .sign(JWT_KEY);
}

// ==========================================
// SAFE USER RESPONSE
// ==========================================

function publicUser(user: {
  id: string;
  name: string | null;
  email: string;
  createdAt: Date;
}) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

// ==========================================
// REGISTER USER
// ==========================================

export async function registerUser(input: RegisterInput) {
  const existingUser = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (existingUser) {
    throw new AuthError("An account with this email already exists.", 409);
  }

  const passwordHash = await argon2.hash(input.password, {
    type: argon2.argon2id,
  });

  const refreshToken = generateRefreshToken();

  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      passwordHash,
      sessions: {
        create: {
          tokenHash: hashRefreshToken(refreshToken),
          expiresAt: getRefreshExpiry(),
        },
      },
    },
    include: {
      sessions: {
        select: { id: true },
      },
    },
  });

  const session = user.sessions[0];

  if (!session) {
    throw new Error("Failed to create authentication session.");
  }

  const accessToken = await generateAccessToken(
    user.id,
    user.email,
    session.id
  );

  return {
    user: publicUser(user),
    accessToken,
    refreshToken,
    tokenType: "Bearer",
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  };
}

// ==========================================
// LOGIN USER
// ==========================================

export async function loginUser(input: LoginInput) {
  const user = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (!user || !user.isActive) {
    throw new AuthError("Invalid email or password.", 401);
  }

  const passwordMatches = await argon2.verify(
    user.passwordHash,
    input.password
  );

  if (!passwordMatches) {
    throw new AuthError("Invalid email or password.", 401);
  }

  const refreshToken = generateRefreshToken();

  const session = await prisma.session.create({
    data: {
      userId: user.id,
      tokenHash: hashRefreshToken(refreshToken),
      expiresAt: getRefreshExpiry(),
    },
  });

  const accessToken = await generateAccessToken(
    user.id,
    user.email,
    session.id
  );

  return {
    user: publicUser(user),
    accessToken,
    refreshToken,
    tokenType: "Bearer",
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  };
}

// ==========================================
// REFRESH ACCESS TOKEN
// ==========================================

export async function refreshAccessToken(token: string) {
  const currentTokenHash = hashRefreshToken(token);
  const newRefreshToken = generateRefreshToken();
  const now = new Date();

  const session = await prisma.session.findUnique({
    where: { tokenHash: currentTokenHash },
    include: { user: true },
  });

  if (
    !session ||
    session.revokedAt ||
    session.expiresAt <= now ||
    !session.user.isActive
  ) {
    throw new AuthError("Invalid or expired refresh token.", 401);
  }

  // Atomically rotate the token. A reused token cannot refresh again.
  const result = await prisma.session.updateMany({
    where: {
      id: session.id,
      tokenHash: currentTokenHash,
      revokedAt: null,
      expiresAt: { gt: now },
    },
    data: {
      tokenHash: hashRefreshToken(newRefreshToken),
      lastUsedAt: now,
      expiresAt: getRefreshExpiry(),
    },
  });

  if (result.count !== 1) {
    throw new AuthError("Invalid or expired refresh token.", 401);
  }

  const accessToken = await generateAccessToken(
    session.user.id,
    session.user.email,
    session.id
  );

  return {
    accessToken,
    refreshToken: newRefreshToken,
    tokenType: "Bearer",
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  };
}

// ==========================================
// LOGOUT / REVOKE SESSION
// ==========================================

export async function logoutUser(token: string) {
  const tokenHash = hashRefreshToken(token);

  await prisma.session.updateMany({
    where: {
      tokenHash,
      revokedAt: null,
    },
    data: {
      revokedAt: new Date(),
    },
  });

  return {
    success: true,
    message: "Logged out successfully.",
  };
}
