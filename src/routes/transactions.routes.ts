import { Router } from "express";
import { body } from "express-validator";
import { auth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { sendMoney } from "../controllers/transaction.controller.ts.js";

const router = Router();

router.post(
  "/transfer",
  auth,
  [
    body("receiverId").isInt().withMessage("receiverId must be a number"),
    body("amount")
      .isFloat({ gt: 0 })
      .withMessage("Amount must be greater than 0"),
  ],
  validate,
  sendMoney
);

export default router;