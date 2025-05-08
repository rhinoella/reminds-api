import AppConfig from "../schemas/appConfig.schema";
import { Request, Response } from "express";

async function getConfig(req: Request, res: Response) {
  const config = await AppConfig.findOne({ trialId: req.params.trialId });
  res.json(config);
}

async function updateConfig(req: Request, res: Response) {
  const config = await AppConfig.findOneAndUpdate(
    { trialId: req.params.trialId },
    req.body,
    { new: true }
  );
  res.json(config);
}

export default { getConfig, updateConfig };
