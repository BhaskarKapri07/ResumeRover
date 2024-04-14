import mongoose, { Schema, Document } from "mongoose";

interface IAnalysisSession extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}

const AnalysisSessionSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
}, { collection: "analysisSessions" });

export const AnalysisSession = mongoose.model<IAnalysisSession>("AnalysisSession", AnalysisSessionSchema);
