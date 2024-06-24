import express, { Request, Response } from "express";
const { analyzeWithGeminiApi } = require("../services/geminiApiService");
const { fetchResumes } = require("../services/resumeService");
const { parseJobDescription } = require("../services/jobDescriptionService");
import { authenticateToken } from "../middlewares/authMiddleware";
import { Analysis } from "../models/AnalysisModel";
import {scrapeAndExtract} from "../services/jobDescriptionServ";

import axios from "axios";

interface AuthRequest extends Request {
  userId?: string; // userId is optional to reflect that it's only present after authentication
  token?: string;
}

const router = express.Router();

router.post(
  "/analyze",
  authenticateToken,
  async (req: AuthRequest, res: Response) => {
    const userId = req.userId;
    const token = req.token;
    console.log("-----printing token -----");
    console.log(token);

    try {
      // // Extract resume data and job URL from the request body
      // console.log('this executed before the destructring')
      const { jobUrl, sessionId } = req.body;
      // console.log('after destructruing')
      // console.log(resume)
      console.log(jobUrl);
      console.log("session Id from analysis Route", sessionId);

      const parsedJobDesc = await scrapeAndExtract(jobUrl);
      console.log('printing parsedJobDesc', parsedJobDesc)
      console.log("title");
      console.log(parsedJobDesc.title);
      console.log("parsed job desc");
      console.log(parsedJobDesc);
      // Parse resume data (assuming you have this function implemented)
      // const fetchedResumes = await fetchResumes();
      // console.log('fetched Resumes')
      // console.log(parsedResume)
      console.log("this is before the axios req");
      const parsedResume = await axios.get(
        "http://localhost:3000/api/parse/parse-resumes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { sessionId },
        }
      );
      // console.log("----parsed resume---- :", parsedResume);
      console.log('-------------------')
      console.log('parsedResume.data: ', parsedResume.data);

      // Call the job description parser endpoint with the job URL

      console.log("sending to gemini");
      // Call Gemini API with the parsed data (make sure analyzeWithGeminiApi function exists and is set up to handle this)
      const analysisResults = await analyzeWithGeminiApi(
        parsedJobDesc,
        parsedResume.data
      );

      const newAnalysis = new Analysis({
        userId: userId,
        jobDetails: parsedJobDesc,
        candidates: analysisResults,
      });
      // console.log("newAnalysis", newAnalysis);
      await newAnalysis.save();

      // Send the analysis results back to the client
      // res.json({
      //   jobTitle: parsedJobDesc.data.data.title,
      //   analysisResults: analysisResults,
      // });

      res.json({
        newAnalysis,
      });
    } catch (error) {
      console.error("Analysis failed:", error);
      res.status(500).send("Analysis failed");
    }
  }
);

// Fetch a specific analysis by its ID

router.get("/analyses/:analysisId", authenticateToken, async (req:AuthRequest, res:Response) => {
  const { analysisId } = req.params;

  try {
    const analysis = await Analysis.findById(analysisId);
    if (!analysis) {
      return res.status(404).send("Analysis not found");
    }
    res.json(analysis);
  } catch (error) {
    console.error(`Failed to fetch analysis by ID: ${analysisId}`, error);
    res.status(500).send("Internal server error");
  }
});

export default router;
