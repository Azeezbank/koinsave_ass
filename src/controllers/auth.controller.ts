import { Request, Response } from "express";
import prisma from "../prismaClient.js"
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";


export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user.id,
        email: user.email,
        // token: generateToken(user.id),
      },
    });
  } catch (error: any) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    return res.json({
      success: true,
      message: "Login successful",
      data: {
        id: user.id,
        email: user.email,
        token: generateToken(user.id),
      },
    });
  } catch (error: any) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};