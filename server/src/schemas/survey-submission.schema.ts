import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

interface SurveySubmission {
  id: string;
  surveyId: Schema.Types.ObjectId;
  answers: {
    questionId: string;
    answer: string;
  }[];
  submittedAt: Date;
}

const surveySubmissionSchema = new Schema<SurveySubmission>({
  id: { type: String, default: () => uuidv4() },
  surveyId: { type: Schema.Types.ObjectId, ref: "Survey", required: true },
  answers: [
    {
      questionId: { type: String, required: true },
      answer: { type: String, required: true },
    },
  ],
  submittedAt: { type: Date, default: Date.now },
});

export default model<SurveySubmission>(
  "SurveySubmission",
  surveySubmissionSchema
);
