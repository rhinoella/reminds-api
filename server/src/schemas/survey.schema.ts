import { SurveyDocument, SurveyQuestion } from "../types/survey.type";
import { model, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const surveyQuestionSchema = new Schema<SurveyQuestion>({
  id: { type: String, default: () => uuidv4() },
  question: { type: String, required: true },
  options: { type: [String], required: true },
});

const surveySchema = new Schema<SurveyDocument>({
  title: { type: String, required: true },
  questions: { type: [surveyQuestionSchema], required: true },
  videoLink: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model<SurveyDocument>("Survey", surveySchema);
