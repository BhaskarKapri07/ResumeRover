import mongoose, { Schema, Document } from "mongoose";

interface IResume extends Document {
  filename: string;
  contentType: string;
  data: Buffer;
  uploadedAt: Date;
  userId: mongoose.Schema.Types.ObjectId;
  sessionId: mongoose.Schema.Types.ObjectId;
}

const ResumeSchema: Schema = new Schema(
  {
    filename: { type: String, required: true },
    contentType: { type: String, required: true }, // MIME type (e.g., application/pdf)
    data: { type: Buffer, required: true }, // Resume file data
    uploadedAt: { type: Date, default: Date.now }, // Timestamp of upload
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AnalysisSession",
      required: true,
    },
  },
  { collection: "resumes" }
);

export const Resume = mongoose.model<IResume>("Resume", ResumeSchema);
