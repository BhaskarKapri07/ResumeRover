import mongoose, { Schema, Document } from "mongoose";

interface IRequirement {
  requirement: string;
  satisfied: boolean;
  explanation: string;
}

interface ICandidateMatch {
  name: string;
  matchResults: {
    requirements: IRequirement[];
    bonus_requirements: IRequirement[];
  };
}

interface IAnalysis extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  jobDetails: {
    title: string;
    requirements: string[];
    bonus_requirements: string[];
  };
  candidates: ICandidateMatch[];
  analysisDate: Date;
}

const AnalysisSchema: Schema = new Schema({
  jobDetails: {
    title: { type: String, required: true },
    requirements: [{ type: String }],
    bonusRequirements: [{ type: String }],
  },
  candidates: [
    {
      name: { type: String, required: true },
      requirements: [
        {
          requirement: { type: String, required: true },
          satisfied: { type: Boolean, required: true },
          explanation: { type: String, required: true },
        },
      ],
      bonus_requirements: [
        {
          requirement: { type: String, required: true },
          satisfied: { type: Boolean, required: true },
          explanation: { type: String, required: true },
        },
      ],
    },
  ],
  analysisDate: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export const Analysis = mongoose.model<IAnalysis>("Analysis", AnalysisSchema);
