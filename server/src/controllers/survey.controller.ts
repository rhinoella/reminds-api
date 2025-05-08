import Survey from "../schemas/survey.schema";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";

async function getSurvey(req: Request, res: Response) {
  try {
    const survey = await Survey.findOne({
      trialId: new ObjectId(req.params.trialId),
    });
    if (!survey) {
      // Return empty survey if none exists
      return res.json({
        title: "",
        questions: [],
        videoLink: "",
      });
    }
    res.json(survey);
  } catch (error) {
    console.error("Error fetching survey:", error);
    res.status(500).json({ message: "Failed to fetch survey" });
  }
}

async function updateSurvey(req: Request, res: Response) {
  try {
    const { title, questions, videoLink } = req.body;
    const trialId = req.params.trialId;

    const survey = await Survey.findOneAndUpdate(
      { trialId: new ObjectId(trialId) },
      { title, questions, videoLink },
      { new: true, upsert: true }
    );

    res.json(survey);
  } catch (error) {
    console.error("Error updating survey:", error);
    res.status(500).json({ message: "Failed to update survey" });
  }
}

export default {
  getSurvey,
  updateSurvey,
};
