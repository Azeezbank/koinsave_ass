import { Router } from "express";
import { body } from "express-validator";
import { auth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { depositMoney } from "../controllers/deposit.controller.js";

const router = Router();

router.post(
  "/deposit",
  auth,
  [
    body("amount").isFloat({ gt: 0 }).withMessage("Amount must be greater than 0"),
  ],
  validate,
  depositMoney
);

export default router;