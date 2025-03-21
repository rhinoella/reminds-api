import { TrialDocument } from "../types/trial.type";
import { model, Schema } from "mongoose";

const trialSchema = new Schema<TrialDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model<TrialDocument>("Trial", trialSchema);
