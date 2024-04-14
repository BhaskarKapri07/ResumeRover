import express from "express";
import { parseResumes } from "../resumeParser/src";
import { fetchResumes } from "../services/resumeService";
import { authenticateToken } from "../middlewares/authMiddleware";
import { Request } from "express";

interface AuthRequest extends Request {
  userId?: string;
  query: {
    sessionId?: string; 
  };
}

const router = express.Router();

router.get(
  "/parse-resumes",
  authenticateToken,
  async (req: AuthRequest, res) => {
    const userId = req.userId;
    const sessionId = req.query.sessionId;
    console.log('sessionId', sessionId);

    try {
      const resumeBuffers = await fetchResumes(userId, sessionId);
      const parsedResumes = await parseResumes(resumeBuffers);
      res.json(parsedResumes);
    } catch (error) {
      console.error("Failed to parse resumes:", error);
      res.status(500).send("Failed to parse resumes");
    }
  }
);

export default router;
