import express, { Request } from "express";
import { Analysis } from "../models/AnalysisModel";
import { authenticateToken } from "../middlewares/authMiddleware"; // Assuming you have authentication middleware

interface AuthRequest extends Request {
  userId?: string;
  token?: string;
}

const router = express.Router();

// Fetch all analyses for the current user
router.get(
  "/user-analyses",
  authenticateToken,
  async (req: AuthRequest, res) => {
    try {
      const userId = req.userId; // Assuming userId is set by authenticateToken
      // console.log('user id gg')
      const userAnalyses = await Analysis.find({ userId }).lean();
      // console.log('analysis ...')
      res.json(userAnalyses);
    } catch (error) {
      console.error("Failed to fetch user's analyses:", error);
      res.status(500).send("Error fetching analyses");
    }
  }
);

export default router;
