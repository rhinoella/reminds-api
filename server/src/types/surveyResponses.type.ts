import { Document, ObjectId } from "mongoose";

export type SurveyQuestionResponse = {
  questionId: string;
  response: string;
};

export type SurveyResponse = {
  trialId: ObjectId;
  surveyId: ObjectId;
  responseData: SurveyQuestionResponse[];
  createdAt: Date;
  updatedAt: Date;
};

export interface SurveyResponseDocument extends SurveyResponse, Document {}
