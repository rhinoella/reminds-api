import Trial from "../schemas/trial.schema";
import { Request, Response } from "express";
import { createDefaults } from "../createDefaults";
import { ObjectId } from "mongodb";

async function getTrials(req: Request, res: Response) {
  const trials = await Trial.find();
  res.json(trials);
}

async function createTrial(req: Request, res: Response) {
  const trialParams = req.body;

  const trial = await Trial.create({
    name: trialParams.name,
    description: trialParams.description,
  });

  await createDefaults(trial._id as ObjectId);
  res.json(trial);
}

async function deleteTrial(req: Request, res: Response) {
  const trial = await Trial.findByIdAndDelete(req.params.id);
  res.json(trial);
}

async function updateTrial(req: Request, res: Response) {
  const updateParams = req.body;

  const trial = await Trial.findByIdAndUpdate(
    req.params.id,
    {
      name: updateParams.name,
      description: updateParams.description,
    },
    {
      new: true,
    }
  );
  res.json(trial);
}

export default { getTrials, createTrial, deleteTrial, updateTrial };
