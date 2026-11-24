
import { z } from "zod";

// ==========================================
// REGISTRATION VALIDATION
// ==========================================

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),

  email: z
    .string()
    .trim()
    .email("Please provide a valid email address")
    .max(254, "Email address is too long")
    .transform((value) => value.toLowerCase()),

  password: z
    .string()
    .min(12, "Password must contain at least 12 characters")
    .max(128, "Password cannot exceed 128 characters")
    .regex(/[a-z]/, "Password must contain a lowercase letter")
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[0-9]/, "Password must contain a number")
    .regex(/[^A-Za-z0-9]/, "Password must contain a special character"),
});

// ==========================================
// LOGIN VALIDATION
// ==========================================

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address")
    .max(254, "Email address is too long")
    .transform((value) => value.toLowerCase()),

  password: z
    .string()
    .min(1, "Password is required")
    .max(128, "Invalid email or password"),
});

// ==========================================
// REFRESH TOKEN VALIDATION
// ==========================================

export const refreshTokenSchema = z.object({
  refreshToken: z
    .string()
    .min(32, "Invalid refresh token")
    .max(512, "Invalid refresh token"),
});

// ==========================================
// TYPESCRIPT TYPES
// ==========================================

export type RegisterInput = z.infer<typeof registerSchema>;

export type LoginInput = z.infer<typeof loginSchema>;

export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
