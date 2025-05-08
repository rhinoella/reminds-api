import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import SurveySubmission from "../schemas/survey-submission.schema";
import Survey from "../schemas/survey.schema";

async function submitSurvey(req: Request, res: Response) {
  try {
    const { answers } = req.body;

    // Validate required fields
    if (!answers || !Array.isArray(answers)) {
      res.status(400).json({
        message:
          "Missing required fields: surveyId, and answers array are required",
      });
      return;
    }

    // Validate that the survey exists
    const survey = await Survey.findOne();

    if (!survey) {
      res.status(404).json({ message: "Survey not found" });
      return;
    }

    // Validate that all questions are answered
    const surveyQuestionIds = survey.questions.map((q) => q.id);
    const submittedQuestionIds = answers.map((a) => a.questionId);

    if (surveyQuestionIds.length !== submittedQuestionIds.length) {
      res.status(400).json({
        message: "All questions must be answered",
      });
      return;
    }

    // Validate that all submitted question IDs exist in the survey
    const invalidQuestions = submittedQuestionIds.filter(
      (id) => !surveyQuestionIds.includes(id)
    );

    if (invalidQuestions.length > 0) {
      res.status(400).json({
        message: "Invalid question IDs submitted",
      });
      return;
    }

    // Create the submission
    const submission = new SurveySubmission({
      surveyId: survey._id,
      answers,
    });

    await submission.save();

    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: "Failed to submit survey" });
  }
}

async function getSubmissions(req: Request, res: Response) {
  try {
    const submissions = await SurveySubmission.find().sort({
      submittedAt: -1,
    });

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch survey submissions" });
  }
}

export default {
  submitSurvey,
  getSubmissions,
};
