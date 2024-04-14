// src/routes/resumeRoutes.ts
import express, { Request, Response } from "express";
import { upload } from "../utils/multerConfig";
import { Resume } from "../models/ResumeModel"; // Ensure this model is defined as before
import { authenticateToken } from "../middlewares/authMiddleware";
import { AnalysisSession } from "../models/AnalysisSession";

const fs = require("fs");

interface AuthRequest extends Request {
  userId?: string; // userId is optional to reflect that it's only present after authentication
}

const router = express.Router();

router.post(
  "/upload",
  authenticateToken,
  upload.array("resume", 25),
  async (req: AuthRequest, res: Response) => {
    const userId = req.userId; // Extract userId added by authenticateToken middleware
    let sessionId = req.body.sessionId;

    // req.files contains the uploaded files
    if (!req.files || req.files.length === 0) {
      return res.status(400).send("No files uploaded.");
    }

    if (!userId) {
      return res.status(403).send("User ID missing, authentication required.");
    }

    let session;
    if (sessionId) {
      // Verify if the session exists
      session = await AnalysisSession.findById(sessionId);
      if (!session) {
        return res.status(404).send("Session not found.");
      }
    } else {
      // Create a new session if sessionId is not provided
      session = new AnalysisSession({ userId });
      await session.save();
      sessionId = session._id; // Use the new sessionId for uploaded resumes
    }
    try {
      // Process each uploaded file
      const newSession = new AnalysisSession({ userId });
      await newSession.save();

      const uploadedResumes = await Promise.all(
        (req.files as Express.Multer.File[]).map(async (file) => {
          const newResume = new Resume({
            filename: file.originalname,
            contentType: file.mimetype,
            data: file.buffer,
            uploadedAt: new Date(),
            userId: userId,
            sessionId: sessionId,
          });

          // fs.writeFileSync("uploadedFile.pdf", file.buffer);

          await newResume.save(); // Save each resume document in the database
          return newResume._id; // Return the ID of the stored resume
        })
      );

      // Respond with success message and the IDs of the stored resumes
      res.status(201).json({
        message: "Resumes uploaded successfully",
        resumeIds: uploadedResumes,
        sessionId: sessionId,
      });
    } catch (error) {
      console.error("Error storing resumes in MongoDB:", error);
      res.status(500).send("Error uploading resumes");
    }
  }
);

export default router;
