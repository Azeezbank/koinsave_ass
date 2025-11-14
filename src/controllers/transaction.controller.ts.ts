import { Request, Response } from "express";
import prisma from "../prismaClient.js";
import { AuthRequest } from "../middleware/auth.js";


export const sendMoney = async (req: AuthRequest, res: Response) => {
  try {
    const senderId = req.user.id;
    const { receiverId, amount } = req.body;
    const amt = Number(amount);

    if (senderId === receiverId) {
      return res.status(400).json({ message: "You cannot send money to yourself" });
    }

    const result = await prisma.$transaction(async (tx: any) => {
      
      // Lock sender row to prevent double spending
      const sender = await tx.user.findUnique({
        where: { id: senderId },
        include: { transactionsSent: true },
      });

      if (!sender) throw new Error("Sender not found");

      // Lock receiver row
      const receiver = await tx.user.findUnique({
        where: { id: receiverId },
      });

      if (!receiver) throw new Error("Receiver not found");

      // Check overdraft
      if (sender.balance < amt) {
        throw new Error("Insufficient balance");
      }

      // Deduct from sender
      await tx.user.update({
        where: { id: senderId },
        data: { balance: sender.balance - amt },
      });

      // Add to receiver
      await tx.user.update({
        where: { id: receiverId },
        data: { balance: receiver.balance + amt },
      });

      // Record transaction
      const transaction = await tx.transaction.create({
        data: {
          amount: amt,
          senderId: senderId,
          receiverId: receiverId,
        },
      });

      return transaction;
    });

    return res.status(201).json({
      success: true,
      message: "Transfer successful",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Transaction failed",
    });
  }
};