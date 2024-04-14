import { connectDatabase } from "./utils/database";
import resumeRoutes from "./routes/resumeRoutes";
import parseRoutes from "./routes/parseRoutes";
import analysisRoutes from "./routes/analysisRoutes";
import authRoutes from "./routes/authRoutes";
import sessionRoutes from "./routes/sessionRoutes";
import allAnalysisRoutes from "./routes/allAnalysisRoutes";
import express, { Express, Request, Response } from "express";
const cors = require("cors");

const app: Express = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

connectDatabase();
// app.use((req, res, next) => {
//   // console.log(req.headers);
//   console.log(req.body); // This will log undefined if body is not parsed yet
//   next();
// });
app.use(express.json());
app.use("/api", sessionRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/parse", parseRoutes);
app.use("/api", analysisRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", allAnalysisRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
