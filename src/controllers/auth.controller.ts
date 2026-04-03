const { registerUser, loginUser } = require("../services/auth.service");
const { registerSchema, loginSchema } = require("../validations/auth.validation");
import type { Request, Response, NextFunction } from "express";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = registerSchema.safeParse(req.body);  // Also fix: use registerSchema, not loginSchema

    if (!result.success) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const { email, password } = result.data;

    const user = await registerUser(email, password);
    
    res.status(201).json({
      message: "User registered",
      user,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const { email, password } = result.data;

    const token = await loginUser(email, password);

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = { register, login };