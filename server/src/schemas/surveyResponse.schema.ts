import {
  SurveyQuestionResponse,
  SurveyResponseDocument,
} from "../types/surveyResponses.type";
import { model, Schema } from "mongoose";

const surveyQuestionResponseSchema = new Schema<SurveyQuestionResponse>({
  questionId: { type: String, required: true },
  response: { type: String, required: true },
});

const surveyResponseSchema = new Schema<SurveyResponseDocument>({
  trialId: { type: Schema.Types.ObjectId, ref: "Trial", required: true },
  surveyId: { type: String, required: true },
  responseData: { type: [surveyQuestionResponseSchema], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model<SurveyResponseDocument>(
  "SurveyResponse",
  surveyResponseSchema
);
