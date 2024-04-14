import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware";
import { AnalysisSession } from "../models/AnalysisSession";
import { Request } from "express";

interface AuthRequest extends Request {
  userId?: string; // userId is optional to reflect that it's only present after authentication
}

const router = express.Router();
// Assuming you're using Express and have a sessions controller
router.post(
  "/sessions/create",
  authenticateToken,
  async (req: AuthRequest, res) => {
    const userId = req.userId; // Assuming your authentication middleware adds userId to req
    try {
      const newSession = new AnalysisSession({ userId });
      await newSession.save();
      res.json({ sessionId: newSession._id });
    } catch (error) {
      console.error("Error creating analysis session:", error);
      res.status(500).send("Failed to create analysis session");
    }
  }
);

export default router;
