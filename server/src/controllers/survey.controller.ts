import Survey from "../schemas/survey.schema";
import { Request, Response } from "express";

export async function editSurvey(req: Request, res: Response) {
  const { id } = req.params;
  const { title, questions, videoLink } = req.body;

  const survey = await Survey.findByIdAndUpdate(
    id,
    { title, questions, videoLink },
    { new: true }
  );
}
