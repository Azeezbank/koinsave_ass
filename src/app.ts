import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import transactionRoutes from "./routes/transactions.routes.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger/swagger.js";
import depositRoutes from "./routes/deposit.routes.js";
import { logger } from "./middleware/logger.js";
import { apiLimiter } from "./middleware/rateLimit.js";




dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// temp route
app.get("/", (req, res) => {
  res.json({ message: "Koinsave API Running..." });
});

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/wallet", depositRoutes);
app.use("/api/", apiLimiter); // apply to all /api routes

export default app;