import { Document, ObjectId } from "mongoose";

export type SurveyQuestion = {
  id: string;
  question: string;
  options: string[];
};

export interface Survey {
  trialId: ObjectId;
  title: string;
  questions: SurveyQuestion[];
  videoLink: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SurveyDocument extends Survey, Document {}
