
import { Router } from "express";

import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
} from "./schemas/auth.schema.js";

import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
} from "./services/auth.service.js";

const authRouter = Router();

// ==========================================
// USER REGISTRATION
// POST /api/v1/auth/register
// ==========================================

authRouter.post("/register", async (req, res) => {
  const validation = registerSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid registration details.",
      errors: validation.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  const result = await registerUser(validation.data);

  return res.status(201).json({
    success: true,
    message: "Account created successfully.",
    data: result,
  });
});

// ==========================================
// USER LOGIN
// POST /api/v1/auth/login
// ==========================================

authRouter.post("/login", async (req, res) => {
  const validation = loginSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid login details.",
      errors: validation.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  const result = await loginUser(validation.data);

  return res.status(200).json({
    success: true,
    message: "Login successful.",
    data: result,
  });
});

// ==========================================
// REFRESH ACCESS TOKEN
// POST /api/v1/auth/refresh
// ==========================================

authRouter.post("/refresh", async (req, res) => {
  const validation = refreshTokenSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      success: false,
      message: "A valid refresh token is required.",
    });
  }

  const result = await refreshAccessToken(
    validation.data.refreshToken
  );

  return res.status(200).json({
    success: true,
    message: "Tokens refreshed successfully.",
    data: result,
  });
});

// ==========================================
// USER LOGOUT
// POST /api/v1/auth/logout
// ==========================================

authRouter.post("/logout", async (req, res) => {
  const validation = refreshTokenSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      success: false,
      message: "A valid refresh token is required.",
    });
  }

  const result = await logoutUser(
    validation.data.refreshToken
  );

  return res.status(200).json(result);
});

export default authRouter;
